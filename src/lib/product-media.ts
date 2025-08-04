import type { MediaFile } from './media-utils';

// Manually define media files for each product
// This ensures reliable media loading in all environments
export const PRODUCT_MEDIA: Record<string, MediaFile[]> = {
  'wireless-headphones': [
    { url: '/images/products/wireless-headphones/main.png', type: 'image', filename: 'main.png' },
    { url: '/images/products/wireless-headphones/front.png', type: 'image', filename: 'front.png' },
    { url: '/images/products/wireless-headphones/back.png', type: 'image', filename: 'back.png' },
    { url: '/images/products/wireless-headphones/side.png', type: 'image', filename: 'side.png' },
  ],
  'fitness-tracker': [
    { url: '/images/products/fitness-tracker/main.png', type: 'image', filename: 'main.png' },
    { url: '/images/products/fitness-tracker/front.png', type: 'image', filename: 'front.png' },
    { url: '/images/products/fitness-tracker/back.png', type: 'image', filename: 'back.png' },
    { url: '/images/products/fitness-tracker/side.png', type: 'image', filename: 'side.png' },
  ],
  'bluetooth-speaker': [
    { url: '/images/products/bluetooth-speaker/main.png', type: 'image', filename: 'main.png' },
    { url: '/images/products/bluetooth-speaker/1.png', type: 'image', filename: '1.png' },
    { url: '/images/products/bluetooth-speaker/2.png', type: 'image', filename: '2.png' },
    { url: '/images/products/bluetooth-speaker/detail1.png', type: 'image', filename: 'detail1.png' },
  ],
  'gaming-keyboard': [
    { url: '/images/products/gaming-keyboard/main.png', type: 'image', filename: 'main.png' },
    { url: '/images/products/gaming-keyboard/front.png', type: 'image', filename: 'front.png' },
    { url: '/images/products/gaming-keyboard/back.png', type: 'image', filename: 'back.png' },
  ],
  'action-camera': [
    { url: '/images/products/action-camera/main.png', type: 'image', filename: 'main.png' },
    { url: '/images/products/action-camera/front.png', type: 'image', filename: 'front.png' },
    { url: '/images/products/action-camera/detail1.png', type: 'image', filename: 'detail1.png' },
  ],
  'wireless-charger': [
    { url: '/images/products/wireless-charger/wireless-charging-pad.png', type: 'image', filename: 'wireless-charging-pad.png' },
  ],
  'smart-home-hub': [
    { url: '/images/products/smart-home-hub/smart-home-hub.png', type: 'image', filename: 'smart-home-hub.png' },
  ],
  'noise-cancelling-earbuds': [
    { url: '/images/products/noise-cancelling-earbuds/noise-cancelling-earbuds.png', type: 'image', filename: 'noise-cancelling-earbuds.png' },
  ],
  'audio-recorder': [
    { url: '/images/products/audio-recorder/digital-audio-recorder.png', type: 'image', filename: 'digital-audio-recorder.png' },
  ],
  'usb-c-hub': [
    { url: '/images/products/usb-c-hub/usb-c-hub-adapter.png', type: 'image', filename: 'usb-c-hub-adapter.png' },
  ],
  'small-classic-retro-handheld-400-games': [
    { url: '/images/products/small-classic-retro-handheld-400-games/S1b70a9e380a64eaa815d16bd0218c4baL.jpg_480x480q75.jpg_.png', type: 'image', filename: 'main.png' },
    { url: '/images/products/small-classic-retro-handheld-400-games/S262be9f6b4b74906a8fd3bb52d55e6109.jpg_220x220q75.jpg_.png', type: 'image', filename: 'front.png' },
    { url: '/images/products/small-classic-retro-handheld-400-games/S262be9f6b4b74906a8fd3bb52d55e6109.jpg_960x960q75.jpg_.png', type: 'image', filename: 'detail1.png' },
    { url: '/images/products/small-classic-retro-handheld-400-games/S53843a0252f24a67ac47aa8eaab93e7cS.png_220x220.png_.png', type: 'image', filename: 'detail2.png' },
    { url: '/images/products/small-classic-retro-handheld-400-games/S53f1a9fd97f840718cd4efae023c85ad5.png_220x220.png_.png', type: 'image', filename: 'detail3.png' },
    { url: '/images/products/small-classic-retro-handheld-400-games/S6a61d8e768d44034afe4a2c628864069k.jpg_220x220q75.jpg_.png', type: 'image', filename: 'side1.png' },
    { url: '/images/products/small-classic-retro-handheld-400-games/S6f37f1c7e07d438787bd546a343947deh.png_220x220.png_.png', type: 'image', filename: 'side2.png' },
    { url: '/images/products/small-classic-retro-handheld-400-games/S807566e50d6b416eaa8abc64baeb0164P.jpg_220x220q75.jpg_.png', type: 'image', filename: 'back.png' },
    { url: '/images/products/small-classic-retro-handheld-400-games/S97aa55812ec246cfafba42e0191b851cR.png_220x220.png_.png', type: 'image', filename: 'angle1.png' },
    { url: '/images/products/small-classic-retro-handheld-400-games/S9935630a9f5a4671b62ca65792557e490.jpg_220x220q75.jpg_.png', type: 'image', filename: 'angle2.png' },
    { url: '/images/products/small-classic-retro-handheld-400-games/Sba3ad25cc4c14f1fac506e40274d7713N.jpg_220x220q75.jpg_.png', type: 'image', filename: 'lifestyle.png' },
    { url: '/images/products/small-classic-retro-handheld-400-games/Scb8fa3c88ee84cafb684e0f4ff7285533.png_220x220.png_.png', type: 'image', filename: 'unboxed.png' },
    { url: '/images/products/small-classic-retro-handheld-400-games/Sfb1dbb61096b4857813b833d2467b0f8Z.jpg_220x220q75.jpg_.png', type: 'image', filename: 'packaging.png' },
  ],
};

/**
 * Get media files for a product using the static definition
 * This is more reliable than dynamic detection for static builds
 */
export function getProductMediaStatic(productSlug: string): MediaFile[] {
  return PRODUCT_MEDIA[productSlug] || [];
}

/**
 * Check if a product has multiple media files
 */
export function hasMultipleMedia(productSlug: string): boolean {
  const media = PRODUCT_MEDIA[productSlug];
  return media ? media.length > 1 : false;
}

/**
 * Get the primary (first) media file for a product
 */
export function getPrimaryMedia(productSlug: string): MediaFile | null {
  const media = PRODUCT_MEDIA[productSlug];
  return media && media.length > 0 ? media[0] : null;
}