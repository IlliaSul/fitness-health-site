# Healthy Life Hub (Next.js)

This project is a migration of the original static HTML site to [Next.js](https://nextjs.org/) using the **app** router. It keeps the original layout while enabling easier maintenance and deployment.

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Run the development server:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` to view the site.
3. Build and start production server:
   ```bash
   npm run build
   npm start
   ```

## Deployment

The easiest way to deploy is via [Vercel](https://vercel.com/).

1. Push this repository to GitHub.
2. Create a new project on Vercel and import your repo.
3. Vercel detects the Next.js app automatically and deploys it.

### GitHub Pages

Static export is possible but some scripts rely on client side fetching. You can try:

```bash
next build
next export
```

Then serve the generated `out` directory with GitHub Pages. For full functionality, deploying to Vercel is recommended.

## Project Structure

- `app/` – Next.js routes and pages
- `components/` – reusable React components
- `public/` – static assets (images, json, scripts)
- `styles/` – CSS modules and global styles

## Dynamic Blog Posts

Blog posts are loaded from `/public/data/posts/all-posts.json` using the `PostsLoader` script. The `PostsLoaderClient` component handles loading and rendering posts on the `/blog/posts` page.

## Admin

A simple placeholder admin page is available at `/admin` for future expansion.
