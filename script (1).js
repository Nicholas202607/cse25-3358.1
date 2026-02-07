// script.js - immersive experience: preloader, audio, modal player, parallax and lazy-loading.

document.addEventListener('DOMContentLoaded', () => {
  const preloader = document.getElementById('preloader');
  const immersiveBtn = document.getElementById('immersiveBtn');
  const bgVideo = document.getElementById('bg-video');
  const ambient = document.getElementById('ambientAudio');
  const fullscreenBtn = document.getElementById('fullscreenBtn');
  const toggleAudio = document.getElementById('toggleAudio');
  const playerModal = document.getElementById('playerModal');
  const scenePlayer = document.getElementById('scenePlayer');
  const closeModal = document.getElementById('closeModal');
  const thumbs = document.querySelectorAll('.thumb');
  const lazyImages = document.querySelectorAll('img.lazy');

  // Hide preloader when media is ready-ish
  let loaded = false;
  const hidePre = () => {
    if (loaded) return;
    loaded = true;
    preloader.classList.add('hidden');
    preloader.setAttribute('aria-hidden','true');
  };
  // if bg video canplay, hide preloader
  bgVideo.addEventListener('canplay', hidePre);
  // fallback timeout
  setTimeout(hidePre, 3000);

  // Lazy load images
  const lazyObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting){
        const img = e.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        lazyObserver.unobserve(img);
      }
    });
  }, {rootMargin:'200px'});
  lazyImages.forEach(img => lazyObserver.observe(img));

  // Play ambient audio on first user gesture
  function tryStartAmbient() {
    if (ambient.paused){
      ambient.play().catch(()=>{/* user gesture required — ignore */});
    }
    document.removeEventListener('click', tryStartAmbient);
  }
  document.addEventListener('click', tryStartAmbient, {once:true});

  // Toggle ambient manually
  toggleAudio.addEventListener('click', () => {
    if (ambient.paused) ambient.play();
    else ambient.pause();
    toggleAudio.innerText = ambient.paused ? 'Toggle Ambient' : 'Ambient On';
  });

  // Immersive entry: bring focus, start interactions
  immersiveBtn.addEventListener('click', async () => {
    // ensure ambient starts
    ambient.play().catch(()=>{});
    // request fullscreen for immersive effect
    try {
      await document.documentElement.requestFullscreen();
    } catch (e){}
    // subtle zoom-in effect: scale video slightly
    bgVideo.style.transform = 'scale(1.06)';
    // focus hero for keyboard accessibility
    document.getElementById('hero').focus();
  });

  // Fullscreen toggle (controls)
  fullscreenBtn.addEventListener('click', async () => {
    if (!document.fullscreenElement){
      try { await document.documentElement.requestFullscreen(); } catch(e){}
    } else {
      try { await document.exitFullscreen(); } catch(e){}
    }
  });

  // Thumbnails open modal and load the scene video
  thumbs.forEach(t => {
    t.addEventListener('click', () => {
      const src = t.dataset.video;
      scenePlayer.src = src;
      playerModal.setAttribute('aria-hidden','false');
      // ensure focus inside modal
      scenePlayer.focus();
      // play when loaded
      scenePlayer.play().catch(()=>{});
    });
  });

  closeModal.addEventListener('click', () => {
    scenePlayer.pause();
    scenePlayer.src = '';
    playerModal.setAttribute('aria-hidden','true');
  });

  // Close modal with Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (playerModal.getAttribute('aria-hidden') === 'false') {
        closeModal.click();
      } else if (document.fullscreenElement) {
        document.exitFullscreen();
      }
    }
  });

  // Parallax subtle effect on mouse move
  document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth) - 0.5;
    const y = (e.clientY / window.innerHeight) - 0.5;
    const rotateX = y * 3;
    const rotateY = x * -3;
    // apply slight transform to overlay hero elements
    const hero = document.getElementById('hero');
    hero.style.transform = `translateZ(0) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  // Small idle animation to keep atmosphere
  setInterval(() => {
    // toggles video brightness for breathing effect
    const flicker = (Math.random() > 0.92);
    bgVideo.style.filter = flicker ? 'brightness(.45) contrast(1.05)' : 'brightness(.55) contrast(.95)';
  }, 2200);

  // Accessibility: ensure ambient is paused on page hide
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) ambient.pause();
    else ambient.play().catch(()=>{});
  });

  // Clean up on unload
  window.addEventListener('beforeunload', () => {
    ambient.pause();
    scenePlayer.pause();
  });
});