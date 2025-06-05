'use client';
import Link from 'next/link';
import DarkModeToggle from './DarkModeToggle';
import styles from '../styles/Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles['header-content']}>
        <h1><Link href="/" className={styles.logo}>Healthy Life Hub</Link></h1>
        <nav>
          <ul className={styles.navList}>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/blog">Blog</Link></li>
            <li><Link href="/nutrition">Nutrition</Link></li>
            <li><Link href="/tools">Tools</Link></li>
            <li><DarkModeToggle /></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
