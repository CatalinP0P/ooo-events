import React from 'react'
import Layout from 'components/layout/layout/layout'
import Home from 'pages/home/home'
import { HashRouter, Route, Routes } from 'react-router-dom'
import About from 'pages/about/about'
import Events from 'pages/events/events'
import Clubs from 'pages/clubs/clubs'
import ClubsName from 'pages/clubs/:name/:name'
import Restaurants from 'pages/restaurants/restaurants'
import RestaurantsSlug from 'pages/restaurants/:slug/:slug'
import Corporate from 'pages/corporate/corporate'
import Services from 'pages/services/services'
import Contact from 'pages/contact/contact'
import Faq from 'pages/faq/faq'
import Newsletter from 'pages/newsletter/newsletter'
import Ambassadors from 'pages/ambassadors/ambassadors'
import TermsAndConditions from 'pages/termsAndConditions/termsAndConditions'
import PolicyPrivacy from 'pages/policyPrivacy/policyPrivacy'

export default function App() {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/events" element={<Events />} />
          <Route path="/clubs" element={<Clubs />} />
          <Route path="/clubs/:name" element={<ClubsName />} />
          <Route path="/restaurants" element={<Restaurants />} />
          <Route path="/restaurants/:slug" element={<RestaurantsSlug />} />
          <Route path="/corporate" element={<Corporate />} />
          <Route path="/services" element={<Services />} />
          <Route path="/ambassadors" element={<Ambassadors />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/newsletter" element={<Newsletter />} />
          <Route path="/termsAndConditions" element={<TermsAndConditions />} />
          <Route path="/privacyPolicy" element={<PolicyPrivacy />} />
        </Routes>
      </Layout>
    </HashRouter>
  )
}
