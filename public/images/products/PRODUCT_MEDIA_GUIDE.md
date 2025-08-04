# Product Media System Guide

## Overview

The product system now supports multiple images and videos for each product with automatic detection from organized folders. You can simply copy and paste media files into product folders and they'll be automatically detected and displayed.

## Folder Structure

Each product has its own folder under `/public/images/products/{product-slug}/`:

```
public/images/products/
├── wireless-headphones/
│   ├── main.png          # Primary image (shows first)
│   ├── front.png         # Additional views
│   ├── back.png
│   ├── side.png
│   └── detail1.mp4       # Videos are also supported
├── fitness-tracker/
│   ├── main.jpg
│   ├── 1.jpg
│   └── 2.jpg
└── bluetooth-speaker/
    ├── primary.png
    ├── lifestyle.jpg
    └── unboxed.mp4
```

## Supported File Types

### Images
- `.jpg`, `.jpeg`, `.png`, `.webp`, `.gif`, `.svg`

### Videos  
- `.mp4`, `.webm`, `.mov`, `.avi`

## File Naming Convention

### Priority Names (show first)
- `main.*` - Main product image
- `primary.*` - Primary view
- `hero.*` - Hero image
- `front.*` - Front view

### Additional Names (show in order)
- `back.*`, `side.*`, `top.*`, `bottom.*` - Different angles
- `angle1.*`, `angle2.*`, `angle3.*` - Multiple angles
- `detail1.*`, `detail2.*`, `detail3.*` - Detail shots
- `lifestyle.*` - Lifestyle/in-use photos
- `in-use.*` - Product in use
- `unboxed.*` - Unboxing photos
- `packaging.*` - Package photos
- `1.*`, `2.*`, `3.*`, etc. - Numbered sequence

## How to Add Media

1. **Create/navigate to your product folder:**
   ```
   public/images/products/{product-slug}/
   ```

2. **Copy your media files** using the naming convention above

3. **The system automatically detects** all supported files and displays them in priority order

## Features

### Product Listings
- Use the first (priority) image automatically
- Fallback to the original `image` field for backward compatibility

### Product Pages
- Interactive slideshow with all media
- Navigation arrows for multiple items
- Thumbnail strip for quick navigation
- Video support with HTML5 player
- Keyboard navigation (left/right arrows)
- Loading states and error handling

### Search Results
- Show primary image in dropdown results
- Fast loading with optimized thumbnails

## Example: Adding Media for a New Product

1. **Create the product folder:**
   ```bash
   mkdir public/images/products/new-smartphone
   ```

2. **Add your media files:**
   ```
   public/images/products/new-smartphone/
   ├── main.jpg           # Primary product image
   ├── front.jpg          # Front view
   ├── back.jpg           # Back view  
   ├── side.jpg           # Side view
   ├── detail1.jpg        # Close-up of screen
   ├── detail2.jpg        # Close-up of camera
   ├── lifestyle.jpg      # Person using phone
   └── demo.mp4           # Demo video
   ```

3. **Update products.ts:**
   ```typescript
   {
     id: '11',
     name: 'New Smartphone',
     description: 'Latest smartphone with amazing features',
     price: 699.99,
     image: '/images/products/new-smartphone/main.jpg', // Fallback
     slug: 'new-smartphone',
     category: 'Smart Tech'
   }
   ```

That's it! The system will automatically detect and display all media files in the slideshow.

## Technical Details

### Automatic Detection
- Files are detected using a priority-based naming system
- Both build-time (static) and runtime detection supported
- Graceful fallback to single image if media detection fails

### Performance
- Images are lazy-loaded in the slideshow
- Thumbnail navigation for quick previews
- Optimized file checking to minimize load time

### Browser Support
- Modern browsers with ES6+ support
- Responsive design for mobile and desktop
- Keyboard navigation support

## Troubleshooting

### Media not showing?
1. Check file names match the supported naming convention
2. Ensure files are in the correct folder: `/public/images/products/{slug}/`
3. Verify file extensions are supported
4. Check browser console for any errors

### Slideshow not working?
1. Ensure the product page is using the updated `ProductMediaSlideshow` component
2. Check that the product data includes the `media` array
3. Verify React client-side hydration is working (`client:load`)

### Performance issues?
1. Optimize image file sizes (recommended: under 1MB each)
2. Use modern formats like WebP for better compression
3. Consider video compression for large video files