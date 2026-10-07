import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  BellRing, 
  CheckCircle2, 
  X, 
  AlertCircle, 
  Sparkles, 
  Send,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { NotificationManager, NotificationStatus } from '../utils/notification';

interface NotificationBannerProps {
  onStatusChange?: (status: NotificationStatus) => void;
}

export const NotificationBanner: React.FC<NotificationBannerProps> = ({ onStatusChange }) => {
  const [status, setStatus] = useState<NotificationStatus>('default');
  const [isDismissed, setIsDismissed] = useState<boolean>(true);
  const [isRequesting, setIsRequesting] = useState<boolean>(false);
  const [showSuccessToast, setShowSuccessToast] = useState<boolean>(false);

  useEffect(() => {
    const current = NotificationManager.getPermission();
    setStatus(current);
    setIsDismissed(NotificationManager.isDismissed());
  }, []);

  const handleRequestAllow = async () => {
    setIsRequesting(true);
    const newStatus = await NotificationManager.requestPermission();
    setStatus(newStatus);
    setIsRequesting(false);
    if (onStatusChange) onStatusChange(newStatus);

    if (newStatus === 'granted') {
      setShowSuccessToast(true);
      setTimeout(() => setShowSuccessToast(false), 6000);
    }
  };

  const handleDismiss = () => {
    setIsDismissed(true);
    NotificationManager.setDismissed(true);
  };

  const handleSendTestAlert = () => {
    NotificationManager.sendNotification(
      'MECEE 2027 Mock Test Alert 🎯',
      'Daily Practice Reminder: Solve 50 high-yield questions today to stay on track for MBBS entrance!'
    );
  };

  // If already granted and not showing success toast, don't show the banner
  if (status === 'granted' && !showSuccessToast) {
    return null;
  }

  // If dismissed and not granted, don't show
  if (isDismissed && !showSuccessToast) {
    return null;
  }

  // Success Toast after user clicks Allow
  if (showSuccessToast) {
    return (
      <div className="bg-emerald-950/90 border-b border-emerald-500/40 text-emerald-200 px-4 py-3 shadow-lg transition-all animate-fadeIn">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-1.5 bg-emerald-500/20 rounded-lg text-emerald-400">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">Notifications Enabled! 🔔</p>
              <p className="text-xs text-emerald-300">You will receive MECEE 2027 exam updates, full mock alerts, and daily high-yield questions.</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleSendTestAlert}
              className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <Send className="w-3.5 h-3.5" />
              Send Test Alert
            </button>
            <button
              onClick={() => setShowSuccessToast(false)}
              className="p-1.5 rounded-lg text-emerald-400 hover:text-white hover:bg-emerald-900/60 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // If denied, show helpful instructions
  if (status === 'denied') {
    return (
      <div className="bg-slate-900 border-b border-rose-500/30 text-slate-300 px-4 py-2.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2.5 text-rose-300">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>
              <strong className="text-white">Notifications are blocked in your browser:</strong> To allow notifications, click the tune/lock icon next to the URL in your browser bar &rarr; select <strong>Permissions</strong> &rarr; switch <strong>Notifications</strong> to <strong>Allow</strong>.
            </span>
          </div>
          <button
            onClick={handleDismiss}
            className="p-1 rounded text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    );
  }

  // Default state: Prompt user to "Take Notification Allow"
  return (
    <div className="bg-gradient-to-r from-teal-950 via-slate-900 to-indigo-950 border-b border-teal-500/30 px-4 py-3 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="relative p-2 rounded-xl bg-teal-500/20 border border-teal-500/40 text-teal-300">
            <BellRing className="w-5 h-5 animate-pulse" />
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-teal-500"></span>
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-white">Enable MECEE 2027 Push Notifications</span>
              <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 text-[10px] font-semibold uppercase tracking-wide">
                Webpushr Active
              </span>
            </div>
            <p className="text-xs text-slate-300">
              Get notified for new 50 full mock tests, high-yield CEE updates, and exam countdowns.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button
            onClick={handleRequestAllow}
            disabled={isRequesting}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 active:scale-95 text-slate-950 font-bold text-xs shadow-lg shadow-teal-500/25 transition-all"
          >
            <Bell className="w-3.5 h-3.5 fill-current" />
            {isRequesting ? 'Requesting...' : 'Take Notification / Allow'}
          </button>

          <button
            onClick={handleDismiss}
            className="px-2.5 py-2 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800 text-xs transition-colors"
            title="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
