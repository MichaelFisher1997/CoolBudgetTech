# Test Card Numbers for Snipcart

Snipcart uses Stripe as their payment processor, so you can use Stripe's test card numbers with Snipcart in test mode.

## ✅ **Successful Test Cards**

- **4242 4242 4242 4242** - Visa (most common)
- **4000 0566 5566 5556** - Visa (debit)
- **5555 5555 5555 4444** - Mastercard
- **3782 822463 10005** - American Express
- **4000 0082 6000 0000** - Visa (UK)

## ❌ **Cards that Decline (for testing failures)**

- **4000 0000 0000 0002** - Card declined
- **4000 0000 0000 9995** - Insufficient funds
- **4000 0000 0000 9987** - Lost card
- **4000 0000 0000 9979** - Stolen card

## 📝 **General Rules for Test Cards**

- **Expiry date**: Any future date (e.g., 12/26, 01/30)
- **CVC**: Any 3 digits (e.g., 123, 456)
- **ZIP/Postal code**: Any valid format for your country

## 🔒 **Important Notes**

- These only work in **test mode** with your test API key
- In live mode, only real cards work
- Snipcart will show "Test Mode" indicators during checkout
- No real charges are made with test cards

## 🚀 **Quick Test**

For quick testing, use:
- **Card Number**: `4242 4242 4242 4242`
- **Expiry**: `12/26`
- **CVC**: `123`
- **ZIP**: `12345` (or your local format)

## 📚 **Resources**

- [Stripe Test Cards Documentation](https://stripe.com/docs/testing#cards)
- [Snipcart Testing Guide](https://docs.snipcart.com/v3/setup/test-mode)