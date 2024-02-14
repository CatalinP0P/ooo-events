import React from 'react'
import background from 'assets/images/events.jpeg'
import './pageTitle.Module.scss'

export default function PageTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="section__title">
      <div
        className="section__title__background"
        style={{ backgroundImage: `url(${background})` }}
      />
      <div className="section__title__container">
        <div className="section__title__body">
          <h2 className="section__title__title">{children}</h2>
        </div>
      </div>
    </div>
  )
}
