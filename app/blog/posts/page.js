'use client';
import { Suspense } from 'react';
import PostsLoaderClient from '../../../components/PostsLoaderClient';

export default function PostsPage() {
  return (
    <div className="main-content">
      <h2 style={{marginBottom:'1rem'}}>Articles</h2>
      <Suspense fallback={<p>Loading...</p>}>
        <PostsLoaderClient />
      </Suspense>
    </div>
  );
}
