import React from 'react'
import Hero from './Hero'
import Features from './Features'
import Categories from './Categories'
import FeaturedProducts from './FeaturedProducts'
import CTABanner from './CTABanner'
import BestSellers from './BestSellers'

const LandingPage = () => {
  return (
     <div>
      <Hero />
      <Features />
      <Categories />
      <FeaturedProducts />
      <CTABanner />
      <BestSellers />
    </div>
  )
}

export default LandingPage