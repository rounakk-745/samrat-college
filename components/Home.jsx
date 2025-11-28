import React from 'react';
import { HeroSection } from './HeroSection';
import NewsTicker from './NewsTicker';
import StatsGrid from './ui/stats/StatsGrid';
import FeaturesSection from './FeaturesSection';
import EventsSection from './EventsSection';
import CTASection from './CTASection';

export const Home = ({ setActivePage }) => (
  <>
    <HeroSection setActivePage={setActivePage} />
    <NewsTicker />
    <StatsGrid />
    <FeaturesSection setActivePage={setActivePage} />
    <EventsSection />
    <CTASection setActivePage={setActivePage} />
  </>
);
