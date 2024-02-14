import PageTitle from 'components/ui/pageTitle/pageTitle'
import React from 'react'
import EventsSection from './components/eventsSection/eventsSection'
import PreviousEventsSection from './components/previousEventsSection/previousEventsSection'

export default function Events() {
  return (
    <>
      <PageTitle>Events</PageTitle>
      <EventsSection />
      <PreviousEventsSection />
    </>
  )
}
