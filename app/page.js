export default function HomePage() {
  return (
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
  );
}
