import { useEffect } from 'react';

export default function Toast({ message, onDismiss }) {
  useEffect(() => {
    const timer = window.setTimeout(onDismiss, 2600);
    return () => window.clearTimeout(timer);
  }, [message, onDismiss]);

  return (
    <div className="toast" role="status" aria-live="polite">
      {message}
    </div>
  );
}
