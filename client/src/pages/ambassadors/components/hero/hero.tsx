import SectionTitle from 'components/ui/sectionTitle/sectionTitle'
import React from 'react'
import image from 'assets/images/ambassadors.jpeg'
import './hero.Module.scss'

export default function Hero() {
  return (
    <div className="ambassadors__hero">
      <div className="ambassadors__hero__container">
        <SectionTitle
          title="Become one of the Out Of Office Ambassadors"
          subtitle="Have a big network within IT, Sales, Media, Finance, Bio Tech, Insurance, or similar industries? Would you like VIP Access to our events? Look this way!"
        />
        <div
          className="ambassadors__hero__image"
          style={{ backgroundImage: `url(${image})` }}
        />
      </div>
    </div>
  )
}
