#!/bin/bash

# Script to update Stripe webhook secret in backend container
# Usage: ./update-webhook-secret.sh <your-webhook-secret>

if [ -z "$1" ]; then
    echo "❌ Error: Please provide the webhook secret"
    echo "Usage: ./update-webhook-secret.sh whsec_your_secret_here"
    exit 1
fi

WEBHOOK_SECRET=$1
GCP_INSTANCE="crowdflix-vm-restored"
GCP_ZONE="us-central1-c"
CONTAINER_NAME="crowdlix-app-backend"

echo "🔄 Updating Stripe webhook secret in backend..."

# Stop the container
echo "⏸️  Stopping backend container..."
gcloud compute ssh $GCP_INSTANCE --zone=$GCP_ZONE --command="docker stop $CONTAINER_NAME"

# Update the environment variable and restart
echo "✨ Starting backend with new webhook secret..."
gcloud compute ssh $GCP_INSTANCE --zone=$GCP_ZONE --command="
# Update webhook secret in the .env file
sed -i 's/STRIPE_WEBHOOK_SECRET=.*/STRIPE_WEBHOOK_SECRET='$WEBHOOK_SECRET'/' ~/.env

# Restart backend with updated .env file
docker run -d \
  --name $CONTAINER_NAME \
  --restart unless-stopped \
  -p 3000:3000 \
  --env-file ~/backend-complete.env \
  crowdflix-backend:production
"

echo "✅ Webhook secret updated successfully!"
echo "🔍 Verifying backend is running..."

sleep 3
gcloud compute ssh $GCP_INSTANCE --zone=$GCP_ZONE --command="docker ps | grep $CONTAINER_NAME"

echo ""
echo "✅ Done! Backend is now configured with your webhook secret."
echo "You can now test payments!"

