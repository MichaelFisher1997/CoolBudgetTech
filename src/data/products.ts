import type { MediaFile } from '../lib/media-utils';
import { getProductMediaStatic } from '../lib/product-media';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string; // Primary image URL (for backward compatibility)
  slug: string;
  category: string;
  media?: MediaFile[]; // Multiple media files (populated dynamically)
}

export interface ProductWithMedia extends Product {
  media: MediaFile[];
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Wireless Bluetooth Headphones',
    description: 'High-quality wireless headphones with noise cancellation',
    price: 89.99,
    image: '/images/products/wireless-headphones/main.png',
    slug: 'wireless-headphones',
    category: 'Headphones'
  },
  {
    id: '2',
    name: 'Smart Fitness Tracker',
    description: 'Track your steps, heart rate, and sleep patterns',
    price: 49.99,
    image: '/images/products/fitness-tracker/smart-fitness-tracker.png',
    slug: 'fitness-tracker',
    category: 'Smart Tech'
  },
  {
    id: '3',
    name: 'Portable Bluetooth Speaker',
    description: 'Compact speaker with 360-degree sound',
    price: 39.99,
    image: '/images/products/bluetooth-speaker/portable-bluetooth-speaker.png',
    slug: 'bluetooth-speaker',
    category: 'Speakers'
  },
  {
    id: '4',
    name: 'Mechanical Gaming Keyboard',
    description: 'RGB backlit mechanical keyboard with blue switches',
    price: 79.99,
    image: '/images/products/gaming-keyboard/mechanical-gaming-keyboard.png',
    slug: 'gaming-keyboard',
    category: 'Accessories'
  },
  {
    id: '5',
    name: '4K Action Camera',
    description: 'Waterproof action camera with image stabilization',
    price: 129.99,
    image: '/images/products/action-camera/action-camera.png',
    slug: 'action-camera',
    category: 'Gadgets'
  },
  {
    id: '6',
    name: 'Wireless Charging Pad',
    description: 'Fast wireless charging pad for all Qi-enabled devices',
    price: 24.99,
    image: '/images/products/wireless-charger/wireless-charging-pad.png',
    slug: 'wireless-charger',
    category: 'Accessories'
  },
  {
    id: '7',
    name: 'Smart Home Hub',
    description: 'Control all your smart devices from one hub',
    price: 99.99,
    image: '/images/products/smart-home-hub/smart-home-hub.png',
    slug: 'smart-home-hub',
    category: 'Smart Tech'
  },
  {
    id: '8',
    name: 'Noise Cancelling Earbuds',
    description: 'True wireless earbuds with active noise cancellation',
    price: 119.99,
    image: '/images/products/noise-cancelling-earbuds/noise-cancelling-earbuds.png',
    slug: 'noise-cancelling-earbuds',
    category: 'Headphones'
  },
  {
    id: '9',
    name: 'Digital Audio Recorder',
    description: 'Professional grade recorder with high-quality microphones',
    price: 69.99,
    image: '/images/products/audio-recorder/digital-audio-recorder.png',
    slug: 'audio-recorder',
    category: 'Music'
  },
  {
    id: '10',
    name: 'USB-C Hub Adapter',
    description: 'Multi-port hub with HDMI, USB 3.0, and SD card reader',
    price: 34.99,
    image: '/images/products/usb-c-hub/usb-c-hub-adapter.png',
    slug: 'usb-c-hub',
    category: 'Accessories'
  },
  {
    id: '11',
    name: 'Small Classic Retro Handheld 400 Games',
    description: 'Small Classic Retro Handheld 400 Games',
    price: 19.99,
    image: '/images/products/small-classic-retro-handheld-400-games/S262be9f6b4b74906a8fd3bb52d55e6109.jpg_220x220q75.jpg_.png',
    slug: 'small-classic-retro-handheld-400-games',
    category: 'Accessories'
  }
];

/**
 * Get a product with its media files loaded
 */
export function getProductWithMedia(slug: string): ProductWithMedia | null {
  const product = products.find(p => p.slug === slug);
  if (!product) return null;
  
  // Use static media definition for reliable loading
  const media = getProductMediaStatic(slug);
  
  return {
    ...product,
    media: media.length > 0 ? media : [{ url: product.image, type: 'image', filename: 'main' }]
  };
}
