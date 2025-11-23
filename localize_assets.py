#!/usr/bin/env python3
import os
import re
from pathlib import Path

base_dir = Path("/home/ubuntu/GREY")

# Mapping of external URLs to local paths
url_mappings = {
    # Images
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop": "./assets/images/image_01.jpg",
    "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=2564&auto=format&fit=crop": "./assets/images/image_02.jpg",
    "https://images.unsplash.com/photo-1555421689-492638d213e3?q=80&w=2564&auto=format&fit=crop": "./assets/images/image_02.jpg",  # Fallback
    "https://images.unsplash.com/photo-1634942537034-2531766767d1?q=80&w=2670&auto=format&fit=crop": "./assets/images/image_04.jpg",
    "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?q=80&w=2670&auto=format&fit=crop": "./assets/images/image_05.jpg",
    "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2670&auto=format&fit=crop": "./assets/images/image_06.jpg",
    "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2532&auto=format&fit=crop": "./assets/images/image_07.jpg",
    "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2664&auto=format&fit=crop": "./assets/images/image_08.jpg",
    "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=2574&auto=format&fit=crop": "./assets/images/image_09.jpg",
    "https://images.unsplash.com/photo-1611974765270-ca1258634369?q=80&w=2664&auto=format&fit=crop": "./assets/images/image_08.jpg",  # Fallback
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2653&auto=format&fit=crop": "./assets/images/image_11.jpg",
    
    # Videos
    "https://assets.mixkit.co/videos/preview/mixkit-ink-swirling-in-water-228-large.mp4": "./assets/videos/video_01.mp4",
    "https://assets.mixkit.co/videos/preview/mixkit-black-and-white-video-of-a-car-driving-on-the-road-15502-large.mp4": "./assets/videos/video_02.mp4",
    "https://assets.mixkit.co/videos/preview/mixkit-abstract-video-of-a-man-with-heads-like-a-fan-32622-large.mp4": "./assets/videos/video_03.mp4",
    "https://assets.mixkit.co/videos/preview/mixkit-fire-burning-in-slow-motion-1358-large.mp4": "./assets/videos/video_04.mp4",
    "https://assets.mixkit.co/videos/preview/mixkit-white-network-connection-lines-on-blue-background-28318-large.mp4": "./assets/videos/video_05.mp4",
    "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-city-traffic-at-night-11-large.mp4": "./assets/videos/video_06.mp4",
    
    # Textures
    "https://www.transparenttextures.com/patterns/cubes.png": "./assets/textures/cubes.png",
    "https://www.transparenttextures.com/patterns/stardust.png": "./assets/textures/stardust.png",
}

def localize_file(file_path):
    """Replace external URLs with local paths in a file"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        replacements = 0
        
        for external_url, local_path in url_mappings.items():
            if external_url in content:
                content = content.replace(external_url, local_path)
                replacements += 1
        
        if replacements > 0:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"✓ {file_path.relative_to(base_dir)}: {replacements} replacements")
            return replacements
        
        return 0
    except Exception as e:
        print(f"✗ Error processing {file_path}: {e}")
        return 0

# Process all TypeScript/TSX files
print("="*60)
print("LOCALIZING EXTERNAL REFERENCES")
print("="*60)

total_replacements = 0
files_processed = 0

# Find all .tsx, .ts files
for ext in ['*.tsx', '*.ts']:
    for file_path in base_dir.glob(f'**/{ext}'):
        if '.git' not in str(file_path) and 'node_modules' not in str(file_path):
            replacements = localize_file(file_path)
            if replacements > 0:
                files_processed += 1
                total_replacements += replacements

print("="*60)
print(f"Total files modified: {files_processed}")
print(f"Total replacements: {total_replacements}")
print("="*60)
