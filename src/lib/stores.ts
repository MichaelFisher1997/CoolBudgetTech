import { atom } from 'nanostores';

// Initialize with default values
export const locale = atom('en');
export const currency = atom('GBP');
export const darkMode = atom(false);

// Initialize stores from localStorage (client-side only)
export function initializeStores() {
  if (typeof localStorage !== 'undefined') {
    const savedLocale = localStorage.getItem('locale');
    if (savedLocale) {
      locale.set(savedLocale);
    }
    
    const savedCurrency = localStorage.getItem('currency');
    if (savedCurrency) {
      currency.set(savedCurrency);
    }
    
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode !== null) {
      darkMode.set(savedDarkMode === 'true');
    }
    
    // Set up subscriptions to save changes
    locale.subscribe((value) => {
      localStorage.setItem('locale', value);
    });
    
    currency.subscribe((value) => {
      localStorage.setItem('currency', value);
      // Dispatch event for other components
      window.dispatchEvent(new CustomEvent('currency-change', { detail: value }));
    });
    
    darkMode.subscribe((value) => {
      localStorage.setItem('darkMode', String(value));
      
      // Apply class to document
      if (typeof document !== 'undefined') {
        if (value) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
    });
  }
}

// Currency symbols mapping
export const currencySymbols = {
  USD: '$',
  EUR: '€',
  GBP: '£'
};

// Currency conversion rates (base: GBP)
export const currencyRates = {
  GBP: 1,
  USD: 1.27, // Example rate
  EUR: 1.17  // Example rate
};

// Convert price from GBP to target currency
export const convertPrice = (price: number, targetCurrency: string): number => {
  const rate = currencyRates[targetCurrency as keyof typeof currencyRates] || 1;
  return Number((price * rate).toFixed(2));
};
