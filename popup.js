document.addEventListener('DOMContentLoaded', function () {
  const homepageSelect = document.getElementById('homepageSelect');
  const saveBtn = document.getElementById('saveBtn');
  const deleteBtn = document.getElementById('deleteBtn');

  // Load saved homepage options
  chrome.storage.local.get(['homepageList', 'selectedHomepage'], function(result) {
    // Clear existing options
    homepageSelect.innerHTML = '';
    
    if (result.homepageList && result.homepageList.length > 0) {
      result.homepageList.forEach(option => {
        const item = document.createElement('option');
        item.value = option.url;
        item.text = option.title;
        homepageSelect.add(item);
      });
    } else {
      // Add default option only if the list is empty
      const defaultOption = document.createElement('option');
      defaultOption.value = "";
      defaultOption.text = "Choose a new Tab";
      homepageSelect.add(defaultOption);
    }
    
    if (result.selectedHomepage) {
      homepageSelect.value = result.selectedHomepage;
    }
  });

  // Save current tab URL and title as new homepage option
  saveBtn.addEventListener('click', function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const currentTab = tabs[0];
      const newUrl = currentTab.url;
      const newTitle = currentTab.title;

      if (newUrl && !urlAlreadyExists(newUrl)) {
        // Remove default option if it exists
        if (homepageSelect.options[0].value === "") {
          homepageSelect.remove(0);
        }
        
        const option = document.createElement('option');
        option.value = newUrl;
        option.text = newTitle;
        homepageSelect.add(option);
        homepageSelect.value = newUrl;  // Select the new option
        saveHomepageList('Settings saved.');  // Update feedback message
      } else {
        alert("This URL is already in the list!");
      }
    });
  });

  // Handle homepage selection change
  homepageSelect.addEventListener('change', function() {
    saveHomepageList();  // Call saveHomepageList without feedback
  });

  // Delete selected homepage
  deleteBtn.addEventListener('click', function() {
    const selectedIndex = homepageSelect.selectedIndex;
    if (selectedIndex !== -1 && homepageSelect.options[selectedIndex].value !== "") {
      homepageSelect.remove(selectedIndex);
      if (homepageSelect.options.length === 0) {
        const defaultOption = document.createElement('option');
        defaultOption.value = "";
        defaultOption.text = "Choose a new Tab";
        homepageSelect.add(defaultOption);
      }
      saveHomepageList('Setting deleted.');  // Update feedback message
    }
  });

  // Save homepage list and selected homepage
  function saveHomepageList(feedbackMessage) {
    const homepageList = Array.from(homepageSelect.options)
      .filter(option => option.value !== "") // Exclude the default option
      .map(option => ({
        url: option.value,
        title: option.text
      }));
    chrome.storage.local.set({
      homepageList: homepageList,
      selectedHomepage: homepageSelect.value
    }, function() {
      // Provide feedback to the user
      const status = document.createElement('div');
      status.textContent = feedbackMessage || 'Settings saved.';  // Use feedbackMessage if provided
      status.style.color = 'green';
      document.body.appendChild(status);
      setTimeout(() => status.remove(), 2000);
    });
  }

  // Helper function to check if the URL is already in the list
  function urlAlreadyExists(newUrl) {
    return Array.from(homepageSelect.options).some(option => option.value === newUrl);
  }
});
