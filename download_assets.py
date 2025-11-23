#!/usr/bin/env python3
import os
import urllib.request
import urllib.parse
from pathlib import Path

# Create asset directories
base_dir = Path("/home/ubuntu/GREY")
assets_dir = base_dir / "assets"

# Define all external assets to download
assets = {
    "images": [
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=2564&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1555421689-492638d213e3?q=80&w=2564&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1634942537034-2531766767d1?q=80&w=2670&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?q=80&w=2670&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2670&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2532&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2664&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=2574&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1611974765270-ca1258634369?q=80&w=2664&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2653&auto=format&fit=crop",
    ],
    "videos": [
        "https://assets.mixkit.co/videos/preview/mixkit-ink-swirling-in-water-228-large.mp4",
        "https://assets.mixkit.co/videos/preview/mixkit-black-and-white-video-of-a-car-driving-on-the-road-15502-large.mp4",
        "https://assets.mixkit.co/videos/preview/mixkit-abstract-video-of-a-man-with-heads-like-a-fan-32622-large.mp4",
        "https://assets.mixkit.co/videos/preview/mixkit-fire-burning-in-slow-motion-1358-large.mp4",
        "https://assets.mixkit.co/videos/preview/mixkit-white-network-connection-lines-on-blue-background-28318-large.mp4",
        "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-city-traffic-at-night-11-large.mp4",
    ],
    "textures": [
        "https://www.transparenttextures.com/patterns/cubes.png",
        "https://www.transparenttextures.com/patterns/stardust.png",
    ]
}

def download_file(url, dest_path):
    """Download a file from URL to destination path"""
    try:
        print(f"Downloading: {url}")
        headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'}
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=30) as response:
            with open(dest_path, 'wb') as out_file:
                out_file.write(response.read())
        print(f"  ✓ Saved to: {dest_path}")
        return True
    except Exception as e:
        print(f"  ✗ Error: {e}")
        return False

# Download all assets
for asset_type, urls in assets.items():
    print(f"\n{'='*60}")
    print(f"Downloading {asset_type.upper()}")
    print(f"{'='*60}")
    
    dest_dir = assets_dir / asset_type
    dest_dir.mkdir(parents=True, exist_ok=True)
    
    for idx, url in enumerate(urls, 1):
        # Extract file extension
        parsed = urllib.parse.urlparse(url)
        path_parts = parsed.path.split('/')
        
        if asset_type == "images":
            ext = ".jpg"
            filename = f"image_{idx:02d}{ext}"
        elif asset_type == "videos":
            ext = ".mp4"
            filename = f"video_{idx:02d}{ext}"
        elif asset_type == "textures":
            filename = path_parts[-1]
        else:
            filename = f"{asset_type}_{idx:02d}"
        
        dest_path = dest_dir / filename
        download_file(url, dest_path)

print(f"\n{'='*60}")
print("Download complete!")
print(f"{'='*60}")
