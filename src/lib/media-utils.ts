export interface MediaFile {
  url: string;
  type: 'image' | 'video';
  filename: string;
}

// Supported image extensions
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg'];

// Supported video extensions  
const VIDEO_EXTENSIONS = ['.mp4', '.webm', '.mov', '.avi'];

/**
 * Get media type from file extension
 */
function getMediaType(filename: string): 'image' | 'video' | null {
  const ext = filename.toLowerCase().substring(filename.lastIndexOf('.'));
  
  if (IMAGE_EXTENSIONS.includes(ext)) {
    return 'image';
  }
  
  if (VIDEO_EXTENSIONS.includes(ext)) {
    return 'video';
  }
  
  return null;
}

/**
 * Dynamically import all media files from a product folder
 * Uses a hybrid approach: try static detection first, fallback to runtime checks
 */
export async function getProductMedia(productSlug: string): Promise<MediaFile[]> {
  // First try static detection during build
  try {
    const staticMedia = getProductMediaStatic(productSlug);
    if (staticMedia.length > 0) {
      return staticMedia;
    }
  } catch (error) {
    console.warn(`Static media detection failed for ${productSlug}:`, error);
  }
  
  // Fallback to runtime detection
  const media: MediaFile[] = [];
  const basePath = `/images/products/${productSlug}`;
  
  // Common filenames to check for
  const commonFilenames = [
    'main', 'primary', 'hero', 'front', 'back', 'side', 'top', 'bottom',
    'angle1', 'angle2', 'angle3', 'detail1', 'detail2', 'detail3',
    'lifestyle', 'in-use', 'unboxed', 'packaging',
    '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'
  ];
  
  // Check for each combination of filename and extension
  for (const filename of commonFilenames) {
    // Check images
    for (const ext of IMAGE_EXTENSIONS) {
      const url = `${basePath}/${filename}${ext}`;
      if (await checkFileExists(url)) {
        media.push({
          url,
          type: 'image',
          filename: `${filename}${ext}`
        });
      }
    }
    
    // Check videos
    for (const ext of VIDEO_EXTENSIONS) {
      const url = `${basePath}/${filename}${ext}`;
      if (await checkFileExists(url)) {
        media.push({
          url,
          type: 'video', 
          filename: `${filename}${ext}`
        });
      }
    }
  }
  
  // Sort by filename to ensure consistent ordering
  media.sort((a, b) => {
    // Prioritize main/primary/hero images
    const priorityOrder = ['main', 'primary', 'hero', 'front'];
    const aBasename = a.filename.substring(0, a.filename.lastIndexOf('.'));
    const bBasename = b.filename.substring(0, b.filename.lastIndexOf('.'));
    
    const aPriority = priorityOrder.indexOf(aBasename);
    const bPriority = priorityOrder.indexOf(bBasename);
    
    if (aPriority !== -1 && bPriority !== -1) {
      return aPriority - bPriority;
    }
    if (aPriority !== -1) return -1;
    if (bPriority !== -1) return 1;
    
    return a.filename.localeCompare(b.filename);
  });
  
  return media;
}

/**
 * Check if a file exists (client-side)
 */
async function checkFileExists(url: string): Promise<boolean> {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok;
  } catch {
    return false;
  }
}

/**
 * Get the first (primary) image for a product
 */
export async function getProductPrimaryImage(productSlug: string): Promise<string | null> {
  const media = await getProductMedia(productSlug);
  const firstImage = media.find(m => m.type === 'image');
  return firstImage?.url || null;
}

/**
 * Server-side version using import.meta.glob for build-time optimization
 * This version works in Astro components during build
 */
export function getProductMediaStatic(productSlug: string): MediaFile[] {
  // This will be populated at build time
  const mediaFiles: MediaFile[] = [];
  
  try {
    // Use import.meta.glob to get all files in the product folder
    const glob = import.meta.glob('/public/images/products/**/*', { query: '?url', import: 'default', eager: false });
    
    for (const [path, modulePromise] of Object.entries(glob)) {
      if (path.includes(`/products/${productSlug}/`)) {
        const filename = path.split('/').pop() || '';
        const mediaType = getMediaType(filename);
        
        if (mediaType) {
          const url = path.replace('/public', '');
          mediaFiles.push({
            url,
            type: mediaType,
            filename
          });
        }
      }
    }
  } catch (error) {
    console.warn(`Could not load media for product ${productSlug}:`, error);
  }
  
  // Sort media files same as dynamic version
  mediaFiles.sort((a, b) => {
    const priorityOrder = ['main', 'primary', 'hero', 'front'];
    const aBasename = a.filename.substring(0, a.filename.lastIndexOf('.'));
    const bBasename = b.filename.substring(0, b.filename.lastIndexOf('.'));
    
    const aPriority = priorityOrder.indexOf(aBasename);
    const bPriority = priorityOrder.indexOf(bBasename);
    
    if (aPriority !== -1 && bPriority !== -1) {
      return aPriority - bPriority;
    }
    if (aPriority !== -1) return -1;
    if (bPriority !== -1) return 1;
    
    return a.filename.localeCompare(b.filename);
  });
  
  return mediaFiles;
}