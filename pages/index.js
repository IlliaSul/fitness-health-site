import Head from 'next/head';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    const btn = document.querySelector('.dark-mode-toggle');
    if (!btn) return;
    const handler = () => {
      document.documentElement.classList.toggle('dark');
    };
    btn.addEventListener('click', handler);
    return () => btn.removeEventListener('click', handler);
  }, []);

  return (
    <>
      <Head>
        <title>Healthy Life Hub</title>
      </Head>
      <header>
        <div className="header-content">
          <h1>
            <a href="/" className="logo">Healthy Life Hub</a>
          </h1>
          <nav>
            <ul>
              <li><a href="/">Home</a></li>
              <li className="dropdown">
                <a href="/blog">Blog</a>
                <div className="dropdown-menu">
                  <a href="/blog/fitness">Fitness</a>
                  <a href="/blog/nutrition">Nutrition</a>
                  <a href="/blog/mental-health">Mental Health</a>
                  <a href="/blog/hypochondria">Hypochondria</a>
                  <a href="/blog/weight-loss">Weight Loss</a>
                </div>
              </li>
              <li><a href="/nutrition">Nutrition</a></li>
              <li><a href="/tools">Tools</a></li>
              <li>
                <button className="dark-mode-toggle" aria-label="Toggle dark mode">🌙</button>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <main className="container">
        <div className="main-content">
          <section className="intro">
            <h2>Welcome to your Health Journey</h2>
            <p>Explore workouts, nutrition advice, mental health support and more.</p>
          </section>
          <section className="featured-articles">
            <h2>Latest Articles</h2>
            <div className="articles">
              <article>
                <h3>How to Gain Muscle Without Overtraining</h3>
                <p>Tips and science-based approach to growing your muscles safely.</p>
                <a href="/blog#muscle-gain" className="read-more">Read More →</a>
              </article>
              <article>
                <h3>Healthy Eating Made Simple</h3>
                <p>Essential principles of balanced nutrition for overall wellbeing.</p>
                <a href="/nutrition#balanced-diet" className="read-more">Read More →</a>
              </article>
              <article>
                <h3>Should I Be Worried About My Headache?</h3>
                <p>We cover the most common causes and when to actually worry.</p>
                <a href="/blog#headache" className="read-more">Read More →</a>
              </article>
            </div>
          </section>
        </div>
      </main>
      <footer>
        <p>© 2024 Healthy Life Hub. All rights reserved.</p>
      </footer>
    </>
  );
}
