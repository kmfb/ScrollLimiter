document.addEventListener("DOMContentLoaded", () => {
  // Load saved scroll limit and enabled state
  chrome.storage.sync.get(["scrollLimit", "enabled"], (result) => {
    document.getElementById("scrollLimitInput").value =
      result.scrollLimit || 8000;
    document.getElementById("enableToggle").checked = result.enabled ?? true; // Default to enabled
  });
});

// Add toggle event listener
document.getElementById("enableToggle").addEventListener("change", (e) => {
  const enabled = e.target.checked;
  chrome.storage.sync.set({ enabled }, () => {
    document.getElementById("status").textContent = `Scroll limiter ${
      enabled ? "enabled" : "disabled"
    }!`;
    setTimeout(() => {
      document.getElementById("status").textContent = "";
    }, 1500);
  });
});
