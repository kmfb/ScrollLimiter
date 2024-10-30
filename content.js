// Constants
const DEFAULTS = {
  SCROLL_LIMIT: 8000,
  PROGRESS_BAR_CONFIG: {
    HEIGHT: "4px",
    COLOR: "#4CAF50",
    HIDE_DELAY: 1000, // ms
  },
  NOTIFICATION_CONFIG: {
    DURATION: 3000, // ms
    BACKGROUND: "#333",
    TEXT_COLOR: "#fff",
  },
};

// State management
const state = {
  scrollLimit: DEFAULTS.SCROLL_LIMIT,
  hasReachedLimit: false,
  progressBar: null,
  scrollTimeout: null,
  enabled: true,
};

// Progress bar management
const progressBarManager = {
  create() {
    const bar = document.createElement("div");
    Object.assign(bar.style, {
      position: "fixed",
      top: "0",
      left: "0",
      height: DEFAULTS.PROGRESS_BAR_CONFIG.HEIGHT,
      backgroundColor: DEFAULTS.PROGRESS_BAR_CONFIG.COLOR,
      transition: "width 0.2s",
      zIndex: "9999",
    });
    document.body.appendChild(bar);
    return bar;
  },

  update(percentage) {
    if (state.progressBar) {
      state.progressBar.style.width = `${percentage}%`;
    }
  },

  remove() {
    if (state.progressBar) {
      state.progressBar.remove();
      state.progressBar = null;
    }
  },
};

// Notification management
const notificationManager = {
  show() {
    this.removeExisting();
    const notification = document.createElement("div");
    Object.assign(notification.style, {
      position: "fixed",
      bottom: "10px",
      right: "10px",
      backgroundColor: DEFAULTS.NOTIFICATION_CONFIG.BACKGROUND,
      color: DEFAULTS.NOTIFICATION_CONFIG.TEXT_COLOR,
      padding: "10px",
      borderRadius: "5px",
      zIndex: "10000",
    });

    notification.className = "scroll-limit-notification";
    notification.textContent = "You've reached your scrolling limit!";
    document.body.appendChild(notification);

    setTimeout(
      () => notification.remove(),
      DEFAULTS.NOTIFICATION_CONFIG.DURATION
    );
  },

  removeExisting() {
    document
      .querySelectorAll(".scroll-limit-notification")
      .forEach((notification) => notification.remove());
  },
};

// Scroll handler
function handleScroll() {
  if (!state.enabled) return;

  if (!state.progressBar) {
    state.progressBar = progressBarManager.create();
  }

  clearTimeout(state.scrollTimeout);
  state.scrollTimeout = setTimeout(() => {
    progressBarManager.remove();
  }, DEFAULTS.PROGRESS_BAR_CONFIG.HIDE_DELAY);

  const scrollPercentage = (window.scrollY / state.scrollLimit) * 100;
  progressBarManager.update(scrollPercentage);

  if (window.scrollY >= state.scrollLimit) {
    window.scrollTo(0, state.scrollLimit);
    notificationManager.show();
  } else {
    state.hasReachedLimit = false;
  }
}

// Add debounce to scroll handler
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Use debounced scroll handler
const debouncedHandleScroll = debounce(handleScroll, 16); // ~60fps
window.addEventListener("scroll", debouncedHandleScroll);

// Initialize
window.addEventListener("scroll", handleScroll);

// Add error handling for storage
chrome.storage.sync.get(["scrollLimit", "enabled"], (result) => {
  try {
    if (result.scrollLimit && Number.isFinite(result.scrollLimit)) {
      state.scrollLimit = result.scrollLimit;
    }
    state.enabled = result.enabled ?? true;
  } catch (error) {
    console.error("Error loading settings:", error);
  }
});

// Add storage change listener
chrome.storage.onChanged.addListener((changes) => {
  if (changes.enabled) {
    state.enabled = changes.enabled.newValue;
    if (!state.enabled) {
      cleanup();
    }
  }
  if (changes.scrollLimit) {
    state.scrollLimit = changes.scrollLimit.newValue;
  }
});

// Add cleanup function for extension unload
function cleanup() {
  progressBarManager.remove();
  notificationManager.removeExisting();
  window.removeEventListener("scroll", handleScroll);
}

// Add listener for extension cleanup
chrome.runtime.onDisconnect.addListener(cleanup);
