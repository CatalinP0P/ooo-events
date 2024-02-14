import React from 'react'
import PageTitle from 'components/ui/pageTitle/pageTitle'
import AmbassadorsForm from './components/ambassadorsForm/ambassadorsForm'
import './ambassadors.Module.scss'

export default function Ambassadors() {
  return (
    <>
      <PageTitle>Ambasadors</PageTitle>
      <AmbassadorsForm />
    </>
  )
}
