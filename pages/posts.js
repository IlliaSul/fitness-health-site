import Head from 'next/head';
import PostsLoader from '../components/PostsLoader';

export default function Posts() {
  return (
    <>
      <Head>
        <title>Blog Posts</title>
      </Head>
      <main className="container">
        <PostsLoader />
      </main>
    </>
  );
}
