/**
 * PostsLoader - JavaScript module for loading and displaying blog posts
 * 
 * This module loads JSON files from the /data/posts/ directory,
 * parses Markdown content to HTML, and renders posts in a container.
 */

class PostsLoader {
  constructor(options = {}) {
    this.options = {
      containerId: options.containerId || 'posts-container',
      postsDir: options.postsDir || '/data/posts/',
      markdownLibrary: options.markdownLibrary || 'marked',
      filterByCategory: options.filterByCategory || false,
      postsPerPage: options.postsPerPage || 10,
      currentPage: 1,
      currentCategory: 'all'
    };
    
    this.posts = [];
    this.categories = new Set();
    this.container = null;
    
    console.log('PostsLoader initialized with options:', this.options);
  }

  async init() {
    console.log('Initializing PostsLoader...');
    
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      await new Promise(resolve => document.addEventListener('DOMContentLoaded', resolve));
    }

    // Get container element
    this.container = document.getElementById(this.options.containerId);
    if (!this.container) {
      console.error(`Container with id "${this.options.containerId}" not found`);
      return;
    }
    
    console.log('Container found:', this.container);

    // Load posts
    await this.loadPosts();

    // Add category filter if enabled
    if (this.options.filterByCategory) {
      this.addCategoryFilter();
    }

    // Add pagination
    this.addPagination();

    // Render initial posts
    this.renderPosts();
    
    console.log('PostsLoader initialization complete');
  }

  async loadPosts() {
    try {
      console.log('Loading posts from:', `${this.options.postsDir}all-posts.json`);
      const response = await fetch(`${this.options.postsDir}all-posts.json`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      this.posts = await response.json();
      console.log('Posts loaded successfully:', this.posts.length);
      
      // Extract unique categories
      this.posts.forEach(post => {
        if (post.category) {
          this.categories.add(post.category);
        }
      });
      
      console.log('Categories found:', Array.from(this.categories));

      // Sort posts by date (newest first)
      this.posts.sort((a, b) => new Date(b.date) - new Date(a.date));
    } catch (error) {
      console.error('Error loading posts:', error);
      // Create sample posts for testing
      this.posts = this.createSamplePosts();
      console.log('Using sample posts instead:', this.posts.length);

      // Extract unique categories from sample posts
      this.posts.forEach(post => {
        if (post.category) {
          this.categories.add(post.category);
        }
      });

      // Sort sample posts by date (newest first)
      this.posts.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
  }

  createSamplePosts() {
    return [
      {
        title: 'Sample Post 1',
        date: '2025-04-01',
        category: 'fitness',
        image: '/images/blog/sample1.jpg',
        content: '# Sample Post 1\n\nThis is a sample post with **Markdown** content.'
      },
      {
        title: 'Sample Post 2',
        date: '2025-04-02',
        category: 'nutrition',
        image: '/images/blog/sample2.jpg',
        content: '# Sample Post 2\n\nAnother sample post with *italic* text.'
      }
    ];
  }

  filterPostsByCategory(category) {
    console.log('Filtering posts by category:', category);
    this.options.currentCategory = category;
    this.options.currentPage = 1;
    this.renderPosts();
  }

  addCategoryFilter() {
    console.log('Adding category filter');
    const filterContainer = document.createElement('div');
    filterContainer.className = 'category-filters';
    
    // Add "All" category
    const allButton = document.createElement('button');
    allButton.className = 'category-btn active';
    allButton.textContent = 'All';
    allButton.addEventListener('click', () => {
      document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
      allButton.classList.add('active');
      this.filterPostsByCategory('all');
    });
    filterContainer.appendChild(allButton);

    // Add category buttons
    this.categories.forEach(category => {
      const button = document.createElement('button');
      button.className = 'category-btn';
      button.textContent = this.formatCategory(category);
      button.addEventListener('click', () => {
        document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        this.filterPostsByCategory(category);
      });
      filterContainer.appendChild(button);
    });

    // Insert before posts container
    this.container.parentNode.insertBefore(filterContainer, this.container);
  }

  formatCategory(category) {
    return category.charAt(0).toUpperCase() + category.slice(1);
  }

  addPagination() {
    console.log('Adding pagination');
    const paginationContainer = document.createElement('div');
    paginationContainer.className = 'pagination';
    this.container.parentNode.insertBefore(paginationContainer, this.container.nextSibling);
  }

  updatePagination(totalPages) {
    const paginationContainer = document.querySelector('.pagination');
    if (!paginationContainer) return;

    paginationContainer.innerHTML = '';

    // Previous button
    if (this.options.currentPage > 1) {
      const prevButton = document.createElement('button');
      prevButton.textContent = '← Previous';
      prevButton.addEventListener('click', () => {
        this.options.currentPage--;
        this.renderPosts();
      });
      paginationContainer.appendChild(prevButton);
    }

    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
      const pageButton = document.createElement('button');
      pageButton.textContent = i;
      pageButton.className = i === this.options.currentPage ? 'active' : '';
      pageButton.addEventListener('click', () => {
        this.options.currentPage = i;
        this.renderPosts();
      });
      paginationContainer.appendChild(pageButton);
    }

    // Next button
    if (this.options.currentPage < totalPages) {
      const nextButton = document.createElement('button');
      nextButton.textContent = 'Next →';
      nextButton.addEventListener('click', () => {
        this.options.currentPage++;
        this.renderPosts();
      });
      paginationContainer.appendChild(nextButton);
    }
  }

  renderPosts() {
    console.log('Rendering posts');
    
    // Filter posts by category
    let filteredPosts = this.posts;
    if (this.options.currentCategory !== 'all') {
      filteredPosts = this.posts.filter(post => post.category === this.options.currentCategory);
    }
    
    console.log('Filtered posts:', filteredPosts.length);

    // Calculate pagination
    const totalPages = Math.ceil(filteredPosts.length / this.options.postsPerPage);
    const startIndex = (this.options.currentPage - 1) * this.options.postsPerPage;
    const endIndex = startIndex + this.options.postsPerPage;
    const currentPosts = filteredPosts.slice(startIndex, endIndex);
    
    console.log('Current page posts:', currentPosts.length);

    // Update pagination
    this.updatePagination(totalPages);

    // Clear container
    this.container.innerHTML = '';

    // Render posts
    if (currentPosts.length === 0) {
      this.container.innerHTML = '<p class="no-posts">No posts found.</p>';
      return;
    }

    currentPosts.forEach(post => {
      console.log('Rendering post:', post.title);
      
      const postElement = document.createElement('article');
      postElement.className = 'blog-post';
      
      // Convert Markdown to HTML using marked
      let contentHtml = '';
      try {
        contentHtml = marked.parse(post.content);
        console.log('Markdown parsed successfully');
      } catch (error) {
        console.error('Error parsing Markdown:', error);
        contentHtml = `<p>${post.content}</p>`;
      }
      
      postElement.innerHTML = `
        <div class="post-image">
          <img src="${post.image}" alt="${post.title}">
        </div>
        <div class="post-content">
          <h2>${post.title}</h2>
          <div class="post-meta">
            <span class="post-date">${new Date(post.date).toLocaleDateString()}</span>
            <span class="post-category">${this.formatCategory(post.category)}</span>
          </div>
          <div class="post-body">
            ${contentHtml}
          </div>
        </div>
      `;
      
      this.container.appendChild(postElement);
    });
  }
}

// Export the PostsLoader class
window.PostsLoader = PostsLoader; 