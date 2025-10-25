# 🎉 READY TO TEST PAYMENTS!

## ✅ Everything is Configured

All systems are GO:

```
✅ Frontend: Running on http://34.55.140.241:8080
✅ Backend: Running on http://34.55.140.241:3000
✅ Database: Connected to Cloud SQL
✅ Stripe Webhook: Configured (whsec_tK37G3fOEuvKEP6dQ7GWv88PuUaKtYls)
✅ Payment Pages: Success/Failure/Cancel ready
✅ API Integration: Working
```

## 🧪 TEST THE PAYMENT FLOW (5 Minutes)

### Step 1: Open the Site
```
http://34.55.140.241:8080
```

### Step 2: Sign In
- Create account or sign in with existing account
- You need to be logged in to purchase

### Step 3: Go to Marketplace
```
http://34.55.140.241:8080/marketplace
```

### Step 4: Purchase an NFT

1. **Click "Buy Now"** on any NFT card
2. You'll go to: `/payment/{moment_id}`
3. **Select a listing** (should be pre-selected)
4. **Click "Pay with Card"** button

### Step 5: Complete Stripe Checkout

You'll be redirected to Stripe's checkout page at `checkout.stripe.com`

**Use Stripe Test Cards:**

✅ **Success (Use This):**
```
Card Number: 4242 4242 4242 4242
Expiry: 12/34 (any future date)
CVC: 123 (any 3 digits)
ZIP: 12345 (any 5 digits)
Name: Test User
Email: test@example.com
```

❌ **Decline (Test Failures):**
```
Card Number: 4000 0000 0000 0002
```

⚠️ **3D Secure:**
```
Card Number: 4000 0025 0000 3155
```

### Step 6: Verify Success

After completing payment:

1. **Should redirect to:**
   ```
   http://34.55.140.241:8080/payment/success?session_id=cs_test_...
   ```

2. **Success page shows:**
   - ✅ Green checkmark
   - ✅ "Payment Successful!"
   - ✅ Amount paid
   - ✅ Transaction ID
   - ✅ Buttons: "View My Collection" & "Continue Shopping"

3. **Click "View My Collection"**
   - Goes to: `/profile`
   - **NFT should appear here!** (may take 30 seconds)

## 🔍 Verify Backend Processing

### Check Webhook Was Received

1. **Go to Stripe Dashboard:**
   ```
   https://dashboard.stripe.com/test/webhooks/we_1SMAe0FtSDaQoKTUPel7wk79
   ```

2. **Check "Event deliveries" tab:**
   - Should show 3 events delivered
   - All should be ✅ Succeeded (200 OK)

### Check Backend Logs

```bash
gcloud compute ssh crowdflix-vm-restored --zone=us-central1-c
docker logs crowdlix-app-backend --tail 100 | grep -i "order\|payment\|checkout"
```

You should see:
```
✅ "Checkout session created for order..."
✅ "Order ... marked as PAID"
✅ "Blockchain transfer queued for order..."
✅ "NFT transfer completed for order..."
```

### Check Database

```bash
gcloud compute ssh crowdflix-vm-restored --zone=us-central1-c

PGPASSWORD='Crowdflix2025' psql -h 34.173.233.13 -U postgres -d crowdflix-dev-db -c "
SELECT 
  order_id,
  amount,
  status,
  blockchain_confirmed,
  paid_at,
  created_at
FROM orders 
ORDER BY created_at DESC 
LIMIT 5;"
```

Should show:
- ✅ status: `paid`
- ✅ blockchain_confirmed: `true`
- ✅ paid_at: timestamp

## 🎯 Expected Flow

```
[You] Click "Buy Now"
  ↓
[Frontend] Creates checkout session via API
  ↓
[Backend] Creates order in DB (status: pending)
  ↓
[Backend] Creates Stripe session, returns URL
  ↓
[Frontend] Redirects to Stripe checkout page
  ↓
[You] Enter card 4242 4242 4242 4242
  ↓
[Stripe] Processes payment ($X.XX charged)
  ↓
[Stripe] Redirects back to success page
  ↓
[Stripe] Sends webhook to backend (within seconds)
  ↓
[Backend] Receives checkout.session.completed
  ↓
[Backend] Updates order status to "paid"
  ↓
[Backend] Queues blockchain transfer
  ↓
[Backend] Transfers NFT to your wallet
  ↓
[Backend] Updates edition owner_id to your user_id
  ↓
[You] Refresh profile page
  ↓
[Frontend] Fetches your editions via GET /nfts/editions
  ↓
✨ NFT APPEARS IN YOUR COLLECTION! ✨
```

## ⏱️ Timeline

- **Checkout creation:** Instant
- **Stripe redirect:** 1 second
- **Payment processing:** 5-10 seconds
- **Redirect to success:** Instant
- **Webhook delivery:** 1-5 seconds
- **Blockchain transfer:** 10-30 seconds
- **NFT in profile:** Within 1 minute total

## 🐛 Troubleshooting

### NFT Not Appearing?

**Check 1: Order Status**
```sql
SELECT order_id, status, blockchain_confirmed, blockchain_error 
FROM orders 
WHERE user_id = (SELECT user_id FROM users WHERE email = 'your@email.com')
ORDER BY created_at DESC;
```

**Check 2: Edition Owner**
```sql
SELECT e.edition_id, e.serial_number, e.owner_id, u.email
FROM editions e
LEFT JOIN users u ON e.owner_id = u.user_id
WHERE e.edition_id = 'your-edition-id';
```

**Check 3: Backend Logs**
```bash
docker logs crowdlix-app-backend --tail 200 | grep -E "ERROR|error|failed"
```

### Webhook Not Working?

Check in Stripe Dashboard:
1. Go to webhook page
2. Click on a failed event
3. See the error message
4. Common issues:
   - Wrong endpoint URL
   - Signature verification failed
   - Backend not responding

### Payment Stuck?

If payment succeeded on Stripe but order still "pending":
- Webhook might not have fired
- Manually trigger in Stripe dashboard:
  - Go to the payment
  - Click "Resend" on the event

## 🎊 Testing Scenarios

### Test 1: Successful Purchase
- Card: 4242 4242 4242 4242
- Expected: Success page → NFT in profile

### Test 2: Cancelled Payment
- Start checkout
- Click "Back" on Stripe page
- Expected: Cancel page, no charge

### Test 3: Declined Card
- Card: 4000 0000 0000 0002
- Expected: Error message, no NFT

### Test 4: Multiple Purchases
- Buy 3 different NFTs
- Expected: All 3 appear in profile

## 📊 What to Monitor

### Stripe Dashboard
- Payments: Should show successful charges
- Webhooks: Should show delivered events
- Customers: Should show test customer

### Backend
- Logs: Should show order processing
- No errors about Stripe keys
- Webhook events being handled

### Database
- Orders table: New rows with status "paid"
- Editions table: owner_id updated to buyer
- Transactions table: NFT transfer recorded

## 🚀 Ready to Test!

**Everything is configured and running.**

1. Open: http://34.55.140.241:8080/marketplace
2. Click "Buy Now"
3. Use card: 4242 4242 4242 4242
4. Watch the magic happen! ✨

---

## 📞 If Something Goes Wrong

Check in order:
1. Browser console for frontend errors
2. Network tab for API calls
3. Backend logs for processing errors
4. Stripe dashboard for webhook status
5. Database for data state

---

**Let's test it! 🎉**

