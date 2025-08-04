# Snipcart Integration Setup Guide

This guide will help you set up Snipcart for payment processing in your Astro ecommerce site.

## 🚀 Quick Start

### 1. Get Your Snipcart API Key

1. Go to [Snipcart Dashboard](https://app.snipcart.com/)
2. Create an account or log in
3. Navigate to Account → API Keys
4. Copy your **Public Test Key** (starts with `pk_test_`)

### 2. Configure Environment Variables

Create or update your `.env` file:

```bash
# Snipcart Configuration (Test Mode)
SNIPCART_API_KEY=pk_test_your_test_key_here

# Site Configuration
SITE_NAME=CoolBudgetTech
DEFAULT_LANG=en
DEFAULT_CURRENCY=GBP
```

### 3. Test the Integration

1. Start your development server:
   ```bash
   npm run dev
   # or
   bun run dev
   ```

2. Navigate to any product page or the homepage
3. Click "Add to Cart" on any product
4. Click the cart icon in the header to open Snipcart
5. Proceed through checkout using test card numbers

## 🧪 Test Card Numbers

Use these test card numbers for testing:

- **Visa**: `4242 4242 4242 4242`
- **Visa (Debit)**: `4000 0566 5566 5556`
- **Mastercard**: `5555 5555 5555 4444`
- **American Express**: `3782 822463 10005`
- **Declined Card**: `4000 0000 0000 0002`

**Use any future expiry date and any 3-digit CVC.**

## 🎨 Customization

### Styling

The integration includes custom CSS variables in `DefaultLayout.astro`:

```css
.snipcart {
  --color-default: #374151;
  --color-link: #6366f1;
  --bgColor-default: #ffffff;
  /* ... more variables */
}
```

### Templates

Custom templates are defined in `/public/snipcart-templates.html` for:
- Cart header
- Cart items
- Empty cart state
- Billing address fields
- Test mode notices

### Currency Support

The integration supports multiple currencies:
- GBP (default)
- USD
- EUR

Currency can be changed via the header dropdown.

## 🛠️ Features Included

### ✅ What's Working

1. **Product Integration**
   - All product cards have Snipcart attributes
   - Proper product URLs for validation
   - Category and shipping information

2. **Cart Functionality**
   - Cart icon with item count in header
   - Cart opening/closing
   - Add/remove items
   - Quantity updates

3. **Checkout Process**
   - Secure checkout flow
   - Test mode indicators
   - Order confirmation
   - Success page with order details

4. **Styling & UX**
   - Dark mode support
   - Responsive design
   - Custom notifications
   - Loading states

5. **Currency Conversion**
   - Real-time currency switching
   - Persistent currency selection
   - Snipcart currency sync

### 🎯 Advanced Features

1. **Webhooks** (Optional)
   - Order completion tracking
   - Inventory management
   - Email notifications

2. **Analytics Integration**
   - Google Analytics ecommerce events
   - Order tracking
   - Conversion funnel analysis

3. **Tax Configuration**
   - Regional tax rates
   - VAT/GST support
   - Tax-inclusive pricing

## 🚦 Going Live

### 1. Switch to Production

1. In your Snipcart dashboard, get your **Live Public Key**
2. Update your environment variables:
   ```bash
   SNIPCART_API_KEY=pk_live_your_live_key_here
   ```

### 2. Configure Webhooks (Optional)

1. In Snipcart dashboard → Webhooks
2. Add your webhook URL: `https://yourdomain.com/api/snipcart-webhook`
3. Select events to listen for

### 3. Set Up Domains

1. In Snipcart dashboard → Domains
2. Add your production domain
3. Configure allowed domains for security

### 4. Configure Shipping

1. In Snipcart dashboard → Shipping
2. Set up shipping rates and zones
3. Configure tax rates by region

## 🔧 Troubleshooting

### Common Issues

1. **Cart not opening**
   - Check API key is correct
   - Verify Snipcart script is loading
   - Check browser console for errors

2. **Products not adding to cart**
   - Ensure all required data attributes are present
   - Verify product URLs are accessible
   - Check data-item-id is unique

3. **Styling issues**
   - Snipcart CSS variables may need adjustment
   - Check for CSS conflicts
   - Verify dark mode styles

4. **Currency not switching**
   - Check localStorage currency setting
   - Verify Snipcart currency API calls
   - Ensure currency is supported

### Debug Mode

Add to your Snipcart configuration:
```html
<div 
  id="snipcart" 
  data-api-key="your-key"
  data-config-debug="true"
></div>
```

## 📚 Resources

- [Snipcart Documentation](https://docs.snipcart.com/)
- [Snipcart Dashboard](https://app.snipcart.com/)
- [Snipcart Webhooks](https://docs.snipcart.com/v3/webhooks/introduction)
- [Test Cards Reference](https://docs.snipcart.com/v3/setup/test-mode)

## 🎉 What's Next?

1. **Product Catalog**: Add more products with proper images
2. **User Accounts**: Integrate with Supabase for user management
3. **Inventory**: Set up inventory tracking
4. **Analytics**: Implement Google Analytics 4 ecommerce events
5. **SEO**: Add structured data for products
6. **Performance**: Optimize loading and caching

---

**Need Help?**
- Check the [Snipcart Community](https://community.snipcart.com/)
- Contact [Snipcart Support](https://snipcart.com/support)
- Review our implementation in the codebase