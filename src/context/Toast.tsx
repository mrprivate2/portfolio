import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, Info } from 'lucide-react';
import type { ComponentType } from 'react';

interface ToastItem {
  id: number;
  message: string;
  icon: ComponentType<{ className?: string }>;
}

interface ToastValue {
  notify: (message: string, icon?: ComponentType<{ className?: string }>) => void;
}

const ToastContext = createContext<ToastValue | null>(null);

const TOAST_MS = 2400;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const nextId = useRef(1);

  const notify = useCallback(
    (message: string, icon: ComponentType<{ className?: string }> = CheckCircle2) => {
      const id = nextId.current;
      nextId.current += 1;
      setToasts((prev) => [...prev.slice(-2), { id, message, icon }]);
      window.setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, TOAST_MS);
    },
    []
  );

  const value = useMemo(() => ({ notify }), [notify]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      {/* Toast stack — bottom right, above the dock */}
      <div
        className="fixed bottom-24 right-4 z-[9700] flex flex-col items-end gap-2 pointer-events-none"
        aria-live="polite"
      >
        <AnimatePresence>
          {toasts.map((toast) => {
            const Icon = toast.icon;
            return (
              <motion.div
                key={toast.id}
                initial={{ opacity: 0, y: 12, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.96 }}
                transition={{ duration: 0.18 }}
                className="flex items-center gap-2.5 rounded-lg glass-strong shadow-xl shadow-black/40 px-3.5 py-2.5 text-[13px] text-white/90"
              >
                <Icon className="w-4 h-4 text-[#22c55e]" />
                {toast.message}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used inside ToastProvider');
  return ctx;
}

// Re-export Info so callers can pass a different icon if needed
export { Info as ToastInfoIcon };
