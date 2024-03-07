import useUpcomingEvents from 'hooks/useUpcomingEvents'
import React, { useEffect } from 'react'
import { EventProps } from 'types/event'
import './eventsSection.Module.scss'
import Button from 'components/ui/button/button'
import { useNavigate } from 'react-router-dom'

export default function EventsSection() {
  const upcomingEvents = useUpcomingEvents()
  const navigate = useNavigate()

  useEffect(() => {
    if (upcomingEvents.loading) return

    console.log(upcomingEvents.data)
  }, [upcomingEvents.loading])

  return (
    <div className="events">
      <div className="events__container">
        {upcomingEvents.data?.map((event: EventProps) => {
          return (
            <div
              className="events__item"
              key={event.slug}
              onClick={() => navigate('/events/' + event.slug)}
            >
              <div className="item__header">
                <div
                  className="item__image"
                  style={{ backgroundImage: `url(${event.image})` }}
                ></div>
                <h3 className="item__title">{event.title}</h3>
                <label className="item__value">
                  <span className="key">Date</span> <span>{event.date}</span>
                </label>
                <label className="item__value">
                  <span className="key">Location</span>{' '}
                  <span>{event.location}</span>
                </label>
                <label className="item__value">
                  <span className="key">Opening Time</span>{' '}
                  <span>
                    {event.openHour || '??:??'} - {event.closeHour || '??:??'}
                  </span>
                </label>
              </div>
              <Button
                rounded={false}
                onClick={() => navigate('/events/' + event.slug)}
              >
                Book Now
              </Button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
