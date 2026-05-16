import Navigation from './components/Navigation';
import HeroSection from './sections/HeroSection';
import PricesSection from './sections/PricesSection';
import EventsSection from './sections/EventsSection';
import PhotosSection from './sections/PhotosSection';
import ReviewsSection from './sections/ReviewsSection';
import Footer from './sections/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-club-bg text-white font-inter overflow-x-hidden">
      <Navigation />
      <HeroSection />
      <PricesSection />
      <EventsSection />
      <PhotosSection />
      <ReviewsSection />
      <Footer />
    </div>
  );
}
