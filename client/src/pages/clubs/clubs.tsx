import PageTitle from 'components/ui/pageTitle/pageTitle'
import React from 'react'
import OpenTodayClubsSection from './components/openTodayClubsSection/openTodayClubsSection'
import AllClubsSection from './components/allClubsSection/allClubsSection'
import Schedule from './components/schedule/schedule'

export default function Clubs() {
  return (
    <>
      <PageTitle>Clubs</PageTitle>
      <Schedule />
      <OpenTodayClubsSection />
      <AllClubsSection />
    </>
  )
}
