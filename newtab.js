document.addEventListener('DOMContentLoaded', function () {
  chrome.storage.local.get('selectedHomepage', function(data) {
    if (data.selectedHomepage) {
      window.location.href = data.selectedHomepage;
    } else {
      // Create a container for the message
      const messageContainer = document.createElement('div');
      messageContainer.style.position = 'fixed';
      messageContainer.style.top = '40%';  // Adjusted value to move the message up
      messageContainer.style.left = '50%';
      messageContainer.style.transform = 'translate(-50%, -50%)';
      messageContainer.style.textAlign = 'center';
      messageContainer.style.fontSize = '18px';
      messageContainer.style.fontFamily = 'Arial, sans-serif';
      messageContainer.style.padding = '20px';
      messageContainer.style.backgroundColor = '#ffffff';  // Light background color
      messageContainer.style.color = '#333333';  // Dark text color
      messageContainer.style.borderRadius = '8px';
      messageContainer.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';  // Subtle shadow for better visibility

      // Create and style the logo
      const logo = document.createElement('img');
      logo.src = chrome.runtime.getURL('icon128.png');  // Use the 128x128 logo
      logo.style.width = '80px';  // Adjust size as needed
      logo.style.height = '80px'; // Adjust size as needed
      logo.style.marginBottom = '15px';  // Space between logo and message

      // Create and set the message
      const message = document.createElement('p');
      message.textContent = 'Please set your custom homepage first.';

      // Append logo and message to the container
      messageContainer.appendChild(logo);
      messageContainer.appendChild(message);

      // Append the container to the body
      document.body.appendChild(messageContainer);
    }
  });
});
