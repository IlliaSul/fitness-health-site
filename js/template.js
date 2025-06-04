class TemplateLoader {
  constructor() {
    this.templatePath = '/templates/base.html';
    this.articlesPath = '/data/articles.json';
    this.darkModeKey = 'darkMode';
    this.articles = null;
  }

  async init() {
    try {
      // Wait for DOM content to be loaded
      if (document.readyState === 'loading') {
        await new Promise(resolve => document.addEventListener('DOMContentLoaded', resolve));
      }

      // Load articles first
      await this.loadArticles();
      
      // Get current page content
      const mainContent = document.querySelector('.main-content');
      if (!mainContent) return;
      
      const content = mainContent.innerHTML;
      const pageTitle = document.title.replace(' - Healthy Life Hub', '');

      // Load and process template
      const template = await this.loadTemplate();
      if (!template) return;

      // Create temporary container
      const temp = document.createElement('div');
      temp.innerHTML = template;

      // Replace content placeholder
      const templateContent = temp.querySelector('.main-content');
      if (templateContent) {
        templateContent.innerHTML = content;
      }

      // Add sidebar
      const container = temp.querySelector('.container');
      if (container) {
        container.innerHTML += this.createSidebar();
      }

      // Replace entire body content
      document.body.innerHTML = temp.innerHTML;

      // Initialize dark mode
      this.initDarkMode();

      // Re-execute scripts
      this.reExecuteScripts();
      
    } catch (error) {
      console.error('Template loading error:', error);
    }
  }

  async loadTemplate() {
    try {
      // Fetch template with no-cache headers
      const response = await fetch(this.templatePath, {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      });
      
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.text();
      
    } catch (error) {
      console.error('Error loading template:', error);
      return null;
    }
  }

  async loadArticles() {
    try {
      const response = await fetch(this.articlesPath);
      if (!response.ok) throw new Error('Failed to load articles');
      
      const data = await response.json();
      this.articles = data.articles;
    } catch (error) {
      console.error('Error loading articles:', error);
      this.articles = [];
    }
  }

  createSidebar() {
    if (!this.articles || this.articles.length === 0) {
      return `
        <aside class="sidebar">
          <h3>✨ Trending Now</h3>
          <div class="recommended-articles">
            <p>Loading articles...</p>
          </div>
        </aside>
      `;
    }

    return `
      <aside class="sidebar">
        <h3>✨ Trending Now</h3>
        <div class="recommended-articles">
          ${this.articles.slice(0, 4).map(article => `
            <div class="recommended-article">
              <span class="category-tag">${article.category}</span>
              <h4>${article.title}</h4>
              <p>${article.description}</p>
              <a href="${article.path}">Learn more →</a>
            </div>
          `).join('')}
        </div>
      </aside>
    `;
  }

  initDarkMode() {
    const isDark = localStorage.getItem(this.darkModeKey) === 'true';
    if (isDark) {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
    
    const toggle = document.querySelector('.dark-mode-toggle');
    if (toggle) {
      toggle.textContent = isDark ? '☀️' : '🌙';
      toggle.addEventListener('click', () => this.toggleDarkMode());
    }
  }

  toggleDarkMode() {
    const isDark = document.documentElement.hasAttribute('data-theme');
    if (isDark) {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
    localStorage.setItem(this.darkModeKey, !isDark);
    
    const toggle = document.querySelector('.dark-mode-toggle');
    if (toggle) toggle.textContent = !isDark ? '☀️' : '🌙';
  }

  reExecuteScripts() {
    Array.from(document.getElementsByTagName('script'))
      .filter(script => !script.src.includes('template.js'))
      .forEach(script => {
        const newScript = document.createElement('script');
        Array.from(script.attributes).forEach(attr => {
          newScript.setAttribute(attr.name, attr.value);
        });
        newScript.textContent = script.textContent;
        script.parentNode.replaceChild(newScript, script);
      });
  }
}

// Make TemplateLoader available globally
window.TemplateLoader = TemplateLoader; 