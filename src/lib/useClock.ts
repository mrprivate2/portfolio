import { useEffect, useState } from 'react';

const timeFormatter = new Intl.DateTimeFormat('en-US', {
  hour: 'numeric',
  minute: '2-digit',
});

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  weekday: 'short',
  month: 'short',
  day: 'numeric',
});

export interface Clock {
  time: string;
  date: string;
}

function readClock(): Clock {
  const now = new Date();
  return {
    time: timeFormatter.format(now),
    date: dateFormatter.format(now),
  };
}

/** Live-updating clock for the menu bar. Re-renders at most once a minute. */
export function useClock(intervalMs = 15_000): Clock {
  const [clock, setClock] = useState<Clock>(readClock);

  useEffect(() => {
    const id = window.setInterval(() => setClock(readClock()), intervalMs);
    return () => window.clearInterval(id);
  }, [intervalMs]);

  return clock;
}
