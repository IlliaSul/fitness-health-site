export default function BlogPage() {
  return (
    <div className="main-content">
      <section className="intro">
        <h2>Blog</h2>
        <p>Explore our latest articles on health, fitness, nutrition and mental wellbeing.</p>
      </section>

      <section className="blog-categories">
        <div className="category">
          <h3>Fitness</h3>
          <p>Expert guidance on workouts and training.</p>
          <a href="/blog/posts?category=fitness" className="read-more">View Articles →</a>
        </div>
        <div className="category">
          <h3>Nutrition</h3>
          <p>Healthy eating tips and meal planning.</p>
          <a href="/blog/posts?category=nutrition" className="read-more">View Articles →</a>
        </div>
        <div className="category">
          <h3>Mental Health</h3>
          <p>Support for emotional wellbeing.</p>
          <a href="/blog/posts?category=mental-health" className="read-more">View Articles →</a>
        </div>
        <div className="category">
          <h3>Health Anxiety</h3>
          <p>Managing health-related worries.</p>
          <a href="/blog/posts?category=hypochondria" className="read-more">View Articles →</a>
        </div>
        <div className="category">
          <h3>Weight Loss</h3>
          <p>Safe and sustainable approaches.</p>
          <a href="/blog/posts?category=weight-loss" className="read-more">View Articles →</a>
        </div>
      </section>
    </div>
  );
}
