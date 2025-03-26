import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const HeroSection = () => {
  const headerRef = useRef(null);

  useEffect(() => {
    gsap.from(headerRef.current, {
      y: -50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });
  }, []);

  return (
    <section className="pt-32 pb-16 text-center" ref={headerRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          Track Your Mood, Transform Your Life
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Your personal companion for emotional wellness. Track moods, get personalized
          insights, and build better mental health habits.
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
