import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  BellRing, 
  CheckCircle2, 
  X, 
  AlertTriangle, 
  Send, 
  ShieldCheck, 
  Clock, 
  BookOpen, 
  Sparkles,
  Settings
} from 'lucide-react';
import { NotificationManager, NotificationStatus } from '../utils/notification';

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStatusChange?: (status: NotificationStatus) => void;
}

export const NotificationModal: React.FC<NotificationModalProps> = ({
  isOpen,
  onClose,
  onStatusChange
}) => {
  const [status, setStatus] = useState<NotificationStatus>('default');
  const [isRequesting, setIsRequesting] = useState(false);
  const [testSent, setTestSent] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setStatus(NotificationManager.getPermission());
      setTestSent(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleAllowNotifications = async () => {
    setIsRequesting(true);
    const newStatus = await NotificationManager.requestPermission();
    setStatus(newStatus);
    setIsRequesting(false);
    if (onStatusChange) onStatusChange(newStatus);
  };

  const handleSendTestAlert = () => {
    NotificationManager.sendNotification(
      'MECEE 2027 Study Notification 🎯',
      'Test Alert: Push notifications are working perfectly! You will receive daily high-yield questions & mock updates.'
    );
    setTestSent(true);
    setTimeout(() => setTestSent(false), 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow */}
        <div className="absolute top-0 right-0 -mr-12 -mt-12 w-48 h-48 bg-teal-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl border ${
              status === 'granted' 
                ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400' 
                : 'bg-teal-500/20 border-teal-500/40 text-teal-400'
            }`}>
              <BellRing className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-white">Push Notifications</h3>
              <p className="text-xs text-slate-400">Webpushr & Browser Push Alerts</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Status Box */}
        <div className="my-5 p-4 rounded-xl border bg-slate-950/60 border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">Notification Status:</span>
            {status === 'granted' ? (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Allowed & Active
              </span>
            ) : status === 'denied' ? (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-bold">
                <AlertTriangle className="w-3.5 h-3.5" />
                Blocked by Browser
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold">
                <Bell className="w-3.5 h-3.5" />
                Permission Needed
              </span>
            )}
          </div>
          <p className="text-xs text-slate-400">
            {status === 'granted' 
              ? 'You are subscribed to MECEE 2027 entrance exam push notifications and reminders.'
              : status === 'denied'
              ? 'Notifications are blocked in your browser settings. To allow them, click the lock icon in your URL bar and switch Notifications to Allow.'
              : 'Click "Allow Notifications" below to authorize push alerts for daily high-yield questions and full mock tests.'}
          </p>
        </div>

        {/* What You Receive */}
        <div className="space-y-2.5 mb-6">
          <p className="text-xs font-semibold text-slate-300 uppercase tracking-wider">What you will receive:</p>
          <div className="flex items-start gap-2.5 text-xs text-slate-300">
            <Sparkles className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
            <span><strong>Daily Question of the Day:</strong> 1 high-yield CEE MCQ with explanation every morning.</span>
          </div>
          <div className="flex items-start gap-2.5 text-xs text-slate-300">
            <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <span><strong>Mock Test Reminders:</strong> Alerts when new 200-mark mock test series are published.</span>
          </div>
          <div className="flex items-start gap-2.5 text-xs text-slate-300">
            <ShieldCheck className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
            <span><strong>MEC 2027 Official Announcements:</strong> Form deadlines, admit card releases, and CEE updates.</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2.5">
          {status !== 'granted' ? (
            <button
              onClick={handleAllowNotifications}
              disabled={isRequesting}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-teal-500 hover:bg-teal-400 active:scale-[0.98] text-slate-950 font-bold text-sm shadow-lg shadow-teal-500/20 transition-all"
            >
              <Bell className="w-4 h-4 fill-current" />
              {isRequesting ? 'Requesting Permission...' : 'Take Notification / Allow'}
            </button>
          ) : (
            <button
              onClick={handleSendTestAlert}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:scale-[0.98] text-white font-bold text-sm shadow-lg shadow-emerald-600/20 transition-all"
            >
              <Send className="w-4 h-4" />
              {testSent ? 'Test Alert Sent to Browser! 🎉' : 'Send Test Notification'}
            </button>
          )}

          <button
            onClick={onClose}
            className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
