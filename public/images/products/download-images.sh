#!/usr/bin/env bash

urls=(
  "https://ae-pic-a1.aliexpress-media.com/kf/S262be9f6b4b74906a8fd3bb52d55e6109.jpg_220x220q75.jpg_.avif"
  "https://ae-pic-a1.aliexpress-media.com/kf/Sfb1dbb61096b4857813b833d2467b0f8Z.jpg_220x220q75.jpg_.avif"
  "https://ae-pic-a1.aliexpress-media.com/kf/S6a61d8e768d44034afe4a2c628864069k.jpg_220x220q75.jpg_.avif"
  "https://ae-pic-a1.aliexpress-media.com/kf/S807566e50d6b416eaa8abc64baeb0164P.jpg_220x220q75.jpg_.avif"
  "https://ae-pic-a1.aliexpress-media.com/kf/S9935630a9f5a4671b62ca65792557e490.jpg_220x220q75.jpg_.avif"
  "https://ae-pic-a1.aliexpress-media.com/kf/Sba3ad25cc4c14f1fac506e40274d7713N.jpg_220x220q75.jpg_.avif"
  "https://ae-pic-a1.aliexpress-media.com/kf/S53843a0252f24a67ac47aa8eaab93e7cS.png_220x220.png_.avif"
  "https://ae-pic-a1.aliexpress-media.com/kf/Scb8fa3c88ee84cafb684e0f4ff7285533.png_220x220.png_.avif"
  "https://ae-pic-a1.aliexpress-media.com/kf/S6f37f1c7e07d438787bd546a343947deh.png_220x220.png_.avif"
  "https://ae-pic-a1.aliexpress-media.com/kf/S97aa55812ec246cfafba42e0191b851cR.png_220x220.png_.avif"
  "https://ae-pic-a1.aliexpress-media.com/kf/S53f1a9fd97f840718cd4efae023c85ad5.png_220x220.png_.avif"
  "https://ae-pic-a1.aliexpress-media.com/kf/S262be9f6b4b74906a8fd3bb52d55e6109.jpg_960x960q75.jpg_.avif"
  "https://ae-pic-a1.aliexpress-media.com/kf/Sef75ab6f61874a81bfe9335fda1f0ca2W.png_.avif"
  "https://ae-pic-a1.aliexpress-media.com/kf/S835c127f739240568f87af769e3380eet.jpg_480x480q75.jpg_.avif"
  "https://ae-pic-a1.aliexpress-media.com/kf/S089afbc5aca840b3aafbd47d0c96f02f3.jpg_480x480q75.jpg_.avif"
  "https://ae-pic-a1.aliexpress-media.com/kf/S53634ed5d8034bbbbc1065e37a7ac64cP.jpg_480x480q75.jpg_.avif"
  "https://ae-pic-a1.aliexpress-media.com/kf/Scba7e591aceb4432bed48d4b48e361d8C.png_480x480.png_.avif"
  "https://ae-pic-a1.aliexpress-media.com/kf/S1b70a9e380a64eaa815d16bd0218c4baL.jpg_480x480q75.jpg_.avif"
  "https://ae-pic-a1.aliexpress-media.com/kf/Sd0319ac189e74bfeada4437630b1e37aS/232x98.png_.avif"
)

# Make sure we fail fast
set -e

for url in "${urls[@]}"; do
  filename=$(basename "$url" | cut -d'?' -f1)
  name_no_ext="${filename%.avif}"

  echo "Downloading $filename"
  curl -s -O "$url"

  echo "Converting $filename to $name_no_ext.png"

  if command -v ffmpeg >/dev/null 2>&1; then
    ffmpeg -y -i "$filename" "$name_no_ext.png"
  elif command -v avifdec >/dev/null 2>&1 && command -v convert >/dev/null 2>&1; then
    avifdec "$filename" "$name_no_ext.raw.png" && convert "$name_no_ext.raw.png" "$name_no_ext.png" && rm "$name_no_ext.raw.png"
  else
    echo "⚠️ Neither ffmpeg nor avifdec+convert found. Skipping conversion."
  fi
done
