import React from 'react'
import PageTitle from 'components/ui/pageTitle/pageTitle'
import AmbassadorsForm from './components/ambassadorsForm/ambassadorsForm'
import './ambassadors.Module.scss'
import Hero from './components/hero/hero'

export default function Ambassadors() {
  return (
    <>
      <PageTitle>Ambasadors</PageTitle>
      <Hero />
      <AmbassadorsForm />
    </>
  )
}
