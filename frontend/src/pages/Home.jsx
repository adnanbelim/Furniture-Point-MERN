import React from 'react'
import Hero from '../component/Hero.jsx';
import LatestCollection from '../component/LatestCollection.jsx';
import BestSeller from '../component/BestSeller.jsx';
import OurPolicy from '../component/OurPolicy.jsx';
import NewsletterBox from '../component/NewsletterBox.jsx';

const Home = () => {
  return (
    <div>
      <Hero />
      <LatestCollection />
      <BestSeller />
      <OurPolicy />
      <NewsletterBox />
    </div>
  )
}

export default Home