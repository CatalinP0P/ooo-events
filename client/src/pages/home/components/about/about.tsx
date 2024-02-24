import React from 'react'
import './about.Module.scss'
import useHomePage from 'hooks/useHomePage'

export default function About() {
  const { data, loading } = useHomePage()

  if (loading) return <></>

  return (
    <div className="about">
      <div className="about__container">
        <div className="about__text">
          <p>{data?.text}</p>
        </div>
      </div>
    </div>
  )
}
