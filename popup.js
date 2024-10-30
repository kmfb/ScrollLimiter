// Load saved scroll limit when popup opens
document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.sync.get(["scrollLimit"], (result) => {
    document.getElementById("scrollLimitInput").value =
      result.scrollLimit || 8000;
  });
});

// Save scroll limit when user clicks 'Save'
document.getElementById("saveButton").addEventListener("click", () => {
  const scrollLimit = parseInt(
    document.getElementById("scrollLimitInput").value,
  );
  chrome.storage.sync.set({ scrollLimit }, () => {
    document.getElementById("status").textContent = "Scroll limit saved!";
    setTimeout(() => {
      document.getElementById("status").textContent = "";
    }, 1500);
  });
});
