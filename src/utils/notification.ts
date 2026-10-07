// Notification Manager for Webpushr & Browser Push Notifications

export type NotificationStatus = 'default' | 'granted' | 'denied' | 'unsupported';

export const NotificationManager = {
  isSupported(): boolean {
    return typeof window !== 'undefined' && 'Notification' in window;
  },

  getPermission(): NotificationStatus {
    if (!this.isSupported()) return 'unsupported';
    return Notification.permission as NotificationStatus;
  },

  async requestPermission(): Promise<NotificationStatus> {
    if (!this.isSupported()) {
      return 'unsupported';
    }

    try {
      // Trigger Webpushr prompt if initialized
      const w = window as any;
      if (typeof w.webpushr === 'function') {
        try {
          w.webpushr('prompt');
        } catch (err) {
          console.warn('Webpushr prompt call:', err);
        }
      }

      // Request browser native permission
      const result = await Notification.requestPermission();
      localStorage.setItem('mecee_notifications_allowed', result === 'granted' ? 'true' : 'false');

      if (result === 'granted') {
        // Send a welcome / confirmation notification
        this.sendNotification(
          'MECEE QUICK Notifications Allowed! 🎯',
          'You are all set! You will now receive daily high-yield questions, mock test reminders, and 2027 CEE entrance exam updates.'
        );
      }

      return result as NotificationStatus;
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      return this.getPermission();
    }
  },

  sendNotification(title: string, body: string, icon: string = '/favicon.svg') {
    if (!this.isSupported() || Notification.permission !== 'granted') return;

    try {
      if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
        navigator.serviceWorker.ready.then(registration => {
          registration.showNotification(title, {
            body,
            icon,
            badge: icon,
            tag: 'mecee-alert-' + Date.now(),
            data: { url: window.location.origin }
          });
        }).catch(() => {
          // Fallback to standard window Notification
          new Notification(title, { body, icon });
        });
      } else {
        new Notification(title, { body, icon });
      }
    } catch (e) {
      console.warn('Notification display failed:', e);
    }
  },

  isDismissed(): boolean {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('mecee_notification_banner_dismissed') === 'true';
  },

  setDismissed(dismissed: boolean) {
    if (typeof window === 'undefined') return;
    if (dismissed) {
      localStorage.setItem('mecee_notification_banner_dismissed', 'true');
    } else {
      localStorage.removeItem('mecee_notification_banner_dismissed');
    }
  }
};
