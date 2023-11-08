document.addEventListener('DOMContentLoaded', () => {
  const gallery = document.getElementById('gallery');
  const screenshots = JSON.parse(localStorage.getItem('screenshots')) || [];

  screenshots.forEach(screenshot => {
    const img = document.createElement('img');
    img.src = screenshot;
    gallery.appendChild(img);
  });

  // Clear the screenshots after 2 minutes
  setTimeout(() => {
    localStorage.removeItem('screenshots'); // Clear Local Storage
    while (gallery.firstChild) { // Clear the gallery DOM
      gallery.removeChild(gallery.firstChild);
    }
    // Optionally, inform the user or redirect
    alert('Screenshots have been cleared!');
    // window.location.href = 'index.html'; // Redirect to the main page if desired
  }, 120000); // 2 minutes
});