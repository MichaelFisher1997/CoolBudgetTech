// Script to generate placeholder images for products
const fs = require('fs');
const path = require('path');

// Create images directory if it doesn't exist
const imagesDir = path.join(__dirname, '..', 'public', 'images');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Product data
const products = [
  {
    id: '1',
    name: 'Wireless Bluetooth Headphones',
    image: 'headphones1.jpg'
  },
  {
    id: '2',
    name: 'Smart Fitness Tracker',
    image: 'fitness-tracker.jpg'
  },
  {
    id: '3',
    name: 'Portable Bluetooth Speaker',
    image: 'speaker.jpg'
  },
  {
    id: '4',
    name: 'Mechanical Gaming Keyboard',
    image: 'keyboard.jpg'
  },
  {
    id: '5',
    name: '4K Action Camera',
    image: 'action-camera.jpg'
  },
  {
    id: '6',
    name: 'Wireless Charging Pad',
    image: 'charging-pad.jpg'
  },
  {
    id: '7',
    name: 'Smart Home Hub',
    image: 'smart-hub.jpg'
  },
  {
    id: '8',
    name: 'Noise Cancelling Earbuds',
    image: 'earbuds.jpg'
  },
  {
    id: '9',
    name: 'Digital Audio Recorder',
    image: 'audio-recorder.jpg'
  },
  {
    id: '10',
    name: 'USB-C Hub Adapter',
    image: 'usb-hub.jpg'
  }
];

// Generate placeholder image URLs
console.log('Generating placeholder images for products:');
products.forEach(product => {
  const imageUrl = `https://placehold.co/600x600/EEE/31343C?font=montserrat&text=${encodeURIComponent(product.name)}`;
  console.log(`${product.image}: ${imageUrl}`);
});

console.log('\nUpdate your product data to use these URLs or download and save the images locally.');
