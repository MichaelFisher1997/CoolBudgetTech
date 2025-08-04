// Grab all image URLs ending in .avif
const imageUrls = Array.from(document.querySelectorAll('img'))
  .map(img => img.src)
  .filter(src => src && src.endsWith('.avif'));

// Log the results
console.log('Found AVIF images:', imageUrls);

// Optionally copy to clipboard
navigator.clipboard.writeText(imageUrls.join('\n')).then(() => {
  console.log('Copied to clipboard!');
});

