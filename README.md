# The House — Immersive Horror Experience

This is a starter static site for a horror movie / immersive experience. The site uses a full-screen video background, ambient audio, parallax interactions, and a small gallery of scene clips.

## Files added
- `index.html` — main markup and player modal
- `styles.css` — visual theme and effects
- `script.js` — interactive behaviors, lazy-loading, and accessibility helpers

## Adding your assets
Create an `assets/` folder in the repo root and add:
- `house_loop_1080p.mp4` — high-quality background loop (1080p or 4K; ~8–30s loop recommended)
- `ambient_loop.mp3` — 1–5 minute ambient audio loop (stereo, normalized)
- `poster.jpg` — fallback poster image for the background video
- `thumb1.jpg`, `thumb2.jpg`, `thumb3.jpg` — thumbnails for gallery
- `scene1.mp4`, `scene2.mp4`, `scene3.mp4` — short scene clips for the modal player

Recommended formats:
- Video: MP4 (H.264) for broad compatibility. Optionally provide WebM fallback.
- Audio: MP3 or OGG.
- Images: WebP or optimized JPEG.

## Best-practice guidance for immersive quality
- Use 1080p+ video encoded with two-pass H.264 at ~6–10 Mbps for web — balance quality and bandwidth.
- Provide short loops to reduce file size; loop seamlessly when possible.
- Compress ambient audio but keep dynamic range — normalize loudness to -14 LUFS for web.
- Host assets on a CDN or use GitHub Pages for static hosting; for very large videos use a video CDN or streaming host.

## Performance & accessibility
- Lazy-load off-screen images (implemented).
- Autoplay restrictions: browsers often require a user gesture to start audio. The UI will start ambient when user interacts.
- Ensure keyboard navigation for modal (ESC to close).
- Provide captions or transcripts for narrative content if you plan to add spoken words.

## Deploy
- GitHub Pages: push to `main` (or configure `gh-pages` branch) and enable Pages in repo settings.
- For higher bandwidth (4K assets): use Netlify, Vercel, or a CDN-hosted static site.

## Customization suggestions
- Add WebGL/three.js scene for interactive fog or particle effects.
- Add spatial audio (WebAudio API) with positional reverb for more immersion.
- Add progressive enhancement: cheaper experience for mobile (static poster, mild animations).

## Next steps I can help with
- Integrate an animated cursor, shader-based glitch effects (three.js / WebGL).
- Add a timeline-driven cinematic intro with subtitles and sound design.
- Optimize videos (create scripts to transcode/upload to a CDN).
- Prepare GitHub Pages deployment instructions and a deploy-ready commit.

Enjoy — if you want, tell me which videos/images you'll use (or drop links) and I’ll adapt the markup and CSS to match the mood and color grading.