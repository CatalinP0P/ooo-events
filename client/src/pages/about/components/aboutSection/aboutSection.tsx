import React from 'react'
import eventImage from 'assets/images/event1.jpeg'
import './aboutSection.Module.scss'

export default function AboutSection() {
  return (
    <div className="aboutSection">
      <div>
        <div className="aboutSection__container">
          <div className="aboutSection__body">
            <h3 className="aboutSection__title">Out Of Office Events</h3>
            <label className="aboutSection__text">
              {`Out Of Office Evens aren't just parties; they're experiences designed
          to break the monotony of the workweek. With a fresh theme unveiled
          each drop, attendees can anticipate a dynamic atmosphere that
          transcends traditional networking. From masquerade balls to retro
          throwbacks, every gathering promises a new adventure. We specialize in curating parties or tailor-made events for
          discerning corporate employees and working individuals seeking
          exceptional nights out in the vibrant heart of London. Our mission is
          to transform traditional “after work” gatherings into memorable
          adventures, providing an escape from the routine and a gateway to
          unparalleled entertainment.`}
            </label>
          </div>
          <div
            className="aboutSection__image"
            style={{ backgroundImage: `url(${eventImage})` }}
          ></div>
        </div>
      </div>
    </div>
  )
}
