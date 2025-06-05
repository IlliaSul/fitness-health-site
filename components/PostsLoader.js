import { useEffect, useState } from 'react';
import { marked } from 'marked';

export default function PostsLoader() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('/blog-posts.json')
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error('Failed to load posts', err));
  }, []);

  return (
    <div id="posts-container">
      {posts.map((post, idx) => (
        <article key={idx} className="blog-post">
          <div className="post-image">
            <img src={post.image} alt={post.title} />
          </div>
          <div className="post-content">
            <h2>{post.title}</h2>
            <div className="post-meta">
              <span className="post-date">
                {new Date(post.date).toLocaleDateString()}
              </span>
              <span className="post-category">{post.category}</span>
            </div>
            <div
              className="post-body"
              dangerouslySetInnerHTML={{ __html: marked.parse(post.content) }}
            />
          </div>
        </article>
      ))}
    </div>
  );
}
