// Open popup in the center of the screen
function openPopup() {
  const popup = document.createElement('iframe');
  popup.src = chrome.runtime.getURL('popup.html');
  popup.id = 'custom-homepage-popup';
  popup.style.position = 'fixed';
  popup.style.top = '50%';
  popup.style.left = '50%';
  popup.style.transform = 'translate(-50%, -50%)';
  popup.style.width = '340px';
  popup.style.height = '250px';
  popup.style.border = 'none';
  popup.style.boxShadow = '0 0 10px rgba(0,0,0,0.5)';
  popup.style.zIndex = '10000';
  document.body.appendChild(popup);

  // Add event listener to close popup when clicking outside
  document.addEventListener('click', closePopupOnClickOutside);
}

// Close popup when clicking outside
function closePopupOnClickOutside(event) {
  const popup = document.getElementById('custom-homepage-popup');
  if (popup && !popup.contains(event.target)) {
    popup.remove();
    document.removeEventListener('click', closePopupOnClickOutside);
  }
}

// Listen for keyboard shortcut
document.addEventListener('keydown', function(event) {
  if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
    event.preventDefault();
    openPopup();
  }
});
