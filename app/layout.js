import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

export const metadata = {
  title: 'Healthy Life Hub',
  description: 'Health, fitness and nutrition resources'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="container" style={{maxWidth:'1400px',margin:'0 auto',padding:'0 2rem'}}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
