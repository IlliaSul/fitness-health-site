'use client';
import { useEffect } from 'react';
import Script from 'next/script';

export default function PostsLoaderClient() {
  useEffect(() => {
    if (window.PostsLoader) {
      const loader = new window.PostsLoader({
        containerId: 'posts-container',
        postsDir: '/data/posts/',
        filterByCategory: true,
        postsPerPage: 5
      });
      loader.init();
    }
  }, []);

  return (
    <>
      <Script src="/js/postsLoader.js" strategy="afterInteractive" />
      <div id="posts-container"></div>
    </>
  );
}
