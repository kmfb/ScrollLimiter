// Constants
const DEFAULTS = {
  SCROLL_LIMIT: 2000,
  PROGRESS_BAR_CONFIG: {
    HEIGHT: '4px',
    COLOR: '#4CAF50',
    HIDE_DELAY: 1000, // ms
  },
  NOTIFICATION_CONFIG: {
    DURATION: 3000, // ms
    BACKGROUND: '#333',
    TEXT_COLOR: '#fff',
  }
};

// State management
const state = {
  scrollLimit: DEFAULTS.SCROLL_LIMIT,
  hasReachedLimit: false,
  progressBar: null,
  scrollTimeout: null,
};

// Progress bar management
const progressBarManager = {
  create() {
    const bar = document.createElement('div');
    Object.assign(bar.style, {
      position: 'fixed',
      top: '0',
      left: '0',
      height: DEFAULTS.PROGRESS_BAR_CONFIG.HEIGHT,
      backgroundColor: DEFAULTS.PROGRESS_BAR_CONFIG.COLOR,
      transition: 'width 0.2s',
      zIndex: '9999',
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
  }
};

// Notification management
const notificationManager = {
  show() {
    this.removeExisting();
    const notification = document.createElement('div');
    Object.assign(notification.style, {
      position: 'fixed',
      bottom: '10px',
      right: '10px',
      backgroundColor: DEFAULTS.NOTIFICATION_CONFIG.BACKGROUND,
      color: DEFAULTS.NOTIFICATION_CONFIG.TEXT_COLOR,
      padding: '10px',
      borderRadius: '5px',
    });
    
    notification.className = 'scroll-limit-notification';
    notification.textContent = "You've reached your scrolling limit!";
    document.body.appendChild(notification);

    setTimeout(() => notification.remove(), DEFAULTS.NOTIFICATION_CONFIG.DURATION);
  },

  removeExisting() {
    document.querySelectorAll('.scroll-limit-notification')
      .forEach(notification => notification.remove());
  }
};

// Scroll handler
function handleScroll() {
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
    if (!state.hasReachedLimit) {
      state.hasReachedLimit = true;
      notificationManager.show();
    }
  }
}

// Initialize
window.addEventListener('scroll', handleScroll);

chrome.storage.sync.get(['scrollLimit'], (result) => {
  if (result.scrollLimit) {
    state.scrollLimit = result.scrollLimit;
  }
});