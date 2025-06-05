'use client';
import { useEffect, useState } from 'react';

export default function DarkModeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const stored = localStorage.getItem('darkMode') === 'true';
    setDark(stored);
    if (stored) document.documentElement.setAttribute('data-theme', 'dark');
  }, []);

  useEffect(() => {
    if (dark) document.documentElement.setAttribute('data-theme', 'dark');
    else document.documentElement.removeAttribute('data-theme');
    localStorage.setItem('darkMode', dark);
  }, [dark]);

  return (
    <button onClick={() => setDark(!dark)} aria-label="Toggle dark mode">
      {dark ? '☀️' : '🌙'}
    </button>
  );
}
