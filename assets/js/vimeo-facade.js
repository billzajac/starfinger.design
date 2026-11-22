// Replace a poster button with the Vimeo player when the visitor taps it.
// See layouts/partials/portfolio.html. Styles: assets/css/style.css.
document.addEventListener('click', (event) => {
  const button = event.target.closest('.vimeo-facade');
  if (!button) return;

  const iframe = document.createElement('iframe');
  iframe.src = `https://player.vimeo.com/video/${button.dataset.vimeoId}` +
    '?byline=0&title=0&badge=0&autopause=0&playsinline=1&autoplay=1';
  iframe.allow = 'autoplay; fullscreen; picture-in-picture';
  iframe.title = 'Video';
  button.replaceWith(iframe);
});
