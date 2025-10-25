# 🚀 Stripe Payment Setup & Testing Guide

## ✅ What's Already Done

- ✅ Frontend configured with Stripe
- ✅ Backend has Stripe integration
- ✅ Payment flow implemented
- ✅ Success/Failure/Cancel pages created
- ✅ All code deployed to GCP

## 🔧 Step 1: Configure Stripe Webhook (REQUIRED)

### Option A: For Testing (Quick Setup - HTTP)

1. **Go to Stripe Dashboard:**
   - Test Mode: https://dashboard.stripe.com/test/webhooks
   - Live Mode: https://dashboard.stripe.com/webhooks

2. **Click "+ Add endpoint"**

3. **Endpoint URL:**
   ```
   http://34.55.140.241:3000/payments/webhook
   ```

4. **Events to select:**
   - `checkout.session.completed`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`

5. **Copy the signing secret** (whsec_...)

6. **Run the update script:**
   ```bash
   ./update-webhook-secret.sh whsec_YOUR_SECRET_HERE
   ```

### Option B: For Production (HTTPS Required)

Stripe requires HTTPS for webhooks in production. You have 2 options:

**Option 1: Use ngrok (Temporary Testing)**
```bash
# On your GCP instance
ngrok http 3000
# Use the HTTPS URL like: https://abc123.ngrok.io/payments/webhook
```

**Option 2: Set up domain with SSL**
- Point domain to 34.55.140.241
- Set up nginx with Let's Encrypt
- Use https://yourdomain.com/payments/webhook

## 🧪 Step 2: Test the Payment Flow

### A. With Stripe Test Cards (Recommended for Testing)

1. **Switch Stripe to Test Mode** in dashboard
2. **Use test webhook endpoint** (as above)
3. **Use test API keys** instead of live keys

**Stripe Test Cards:**
```
✅ Success: 4242 4242 4242 4242
❌ Decline: 4000 0000 0000 0002
⚠️  Auth Required: 4000 0025 0000 3155
```
- Any future expiry date
- Any 3-digit CVC
- Any ZIP code

### B. Complete Test Flow

1. **Open frontend:**
   ```
   http://34.55.140.241:8080
   ```

2. **Sign in** (create account if needed)

3. **Go to Marketplace:**
   ```
   http://34.55.140.241:8080/marketplace
   ```

4. **Click "Buy Now"** on any NFT

5. **Select a listing** and click "Pay with Card"

6. **You'll redirect to Stripe Checkout** (stripe.com)

7. **Enter test card details:**
   - Card: 4242 4242 4242 4242
   - Expiry: 12/34
   - CVC: 123
   - ZIP: 12345

8. **Complete payment**

9. **Should redirect to:**
   ```
   http://34.55.140.241:8080/payment/success
   ```

10. **Check your profile:**
    ```
    http://34.55.140.241:8080/profile
    ```
    - NFT should appear after webhook processes (may take 30 seconds)

## 🔍 Step 3: Verify Everything Works

### Check Backend Logs
```bash
gcloud compute ssh crowdflix-vm-restored --zone=us-central1-c
docker logs crowdlix-app-backend --tail 100
```

Look for:
- ✅ "Checkout session created for order..."
- ✅ "Order ... marked as PAID"
- ✅ "NFT transfer completed for order..."

### Check Database
```bash
gcloud compute ssh crowdflix-vm-restored --zone=us-central1-c
PGPASSWORD='Crowdflix2025' psql -h 34.173.233.13 -U postgres -d crowdflix-dev-db -c "
SELECT 
  order_id, 
  amount, 
  status, 
  blockchain_confirmed, 
  created_at 
FROM orders 
ORDER BY created_at DESC 
LIMIT 5;"
```

Should show:
- Status: `paid`
- blockchain_confirmed: `true`

### Check Stripe Dashboard
- Go to: https://dashboard.stripe.com/payments
- Find your test payment
- Check webhook delivery status

## ⚠️ Common Issues & Solutions

### Issue 1: "Webhook signature verification failed"
**Solution:** Update the webhook secret using the script:
```bash
./update-webhook-secret.sh whsec_YOUR_NEW_SECRET
```

### Issue 2: NFT not appearing in profile
**Causes:**
- Webhook not configured
- Webhook failing silently
- Blockchain transfer error

**Check:**
```bash
# Check backend logs
docker logs crowdlix-app-backend --tail 200 | grep -i error

# Check order status
PGPASSWORD='Crowdflix2025' psql -h 34.173.233.13 -U postgres -d crowdflix-dev-db -c "
SELECT order_id, status, blockchain_confirmed, blockchain_error 
FROM orders 
WHERE user_id = 'YOUR_USER_ID';"
```

### Issue 3: "Failed to create checkout session"
**Causes:**
- Backend not running
- API URL mismatch
- Edition not found

**Check:**
```bash
# Test backend is accessible
curl http://34.55.140.241:3000/payments/checkout
# Should return error about authorization
```

## 📊 Testing Checklist

- [ ] Stripe webhook configured
- [ ] Webhook secret updated in backend
- [ ] Can access marketplace
- [ ] Can click "Buy Now"
- [ ] Redirects to Stripe Checkout
- [ ] Can complete payment
- [ ] Redirects to success page
- [ ] NFT appears in profile
- [ ] Backend logs show successful payment
- [ ] Database shows order as "paid"
- [ ] Blockchain transfer completed

## 🎯 Production Deployment Checklist

Before going live with real payments:

- [ ] Switch to HTTPS webhook endpoint
- [ ] Use live Stripe API keys (not test)
- [ ] Update FRONTEND_URL to your domain
- [ ] Test with real card (small amount)
- [ ] Set up monitoring/alerts
- [ ] Add error tracking (Sentry, etc.)
- [ ] Test refund flow
- [ ] Test webhook retry logic
- [ ] Document customer support process

## 🆘 Need Help?

If you encounter issues:
1. Check backend logs first
2. Check Stripe dashboard webhook logs
3. Verify database orders table
4. Test API endpoints manually with curl
5. Check frontend network tab in browser dev tools

---

**Current Status:**
- Frontend: ✅ http://34.55.140.241:8080
- Backend: ✅ http://34.55.140.241:3000  
- Stripe: ⚠️ Needs webhook setup

