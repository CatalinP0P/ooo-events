import React, { useEffect, useState } from 'react'
import backgroundImage from 'assets/images/background.png'
import './hero.Module.scss'
import Button, { ButtonStyles } from 'components/ui/button/button'
import useUpcomingEvents from 'hooks/useUpcomingEvents'
import {
  ArrowBackIosRounded,
  ArrowForwardIosRounded,
} from '@mui/icons-material'
import usePastEvents from 'hooks/usePastEvents'
import { EventProps } from 'types/event'
import { useNavigate } from 'react-router-dom'

export default function Hero() {
  const upcomingEvents = useUpcomingEvents()
  const pastEvents = usePastEvents()
  const navigate = useNavigate()

  const [events, setEvents] = useState<EventProps[]>([])

  useEffect(() => {
    if (pastEvents.loading || upcomingEvents.loading) return

    setEvents([
      ...(pastEvents.data as EventProps[]),
      ...(upcomingEvents.data as EventProps[]),
    ])

    setEventIndex((pastEvents.data as EventProps[]).length)
  }, [pastEvents.loading, upcomingEvents.loading])

  const [eventIndex, setEventIndex] = useState(0)

  const prevEvent = () => {
    if (!events) return
    const newIndex = eventIndex - 1

    if (newIndex < 0) return

    setEventIndex(newIndex)
  }

  const nextEvent = () => {
    if (!events) return
    const newIndex = eventIndex + 1

    if (newIndex + 1 > events.length) return

    setEventIndex(newIndex)
  }

  return (
    <div className="hero">
      <div
        className={
          'hero__background ' +
          (eventIndex < (pastEvents.data ? pastEvents.data?.length : 0)
            ? 'black__white'
            : '')
        }
        style={{
          backgroundImage: `url(${
            events
              ? events[eventIndex]
                ? events[eventIndex].image
                : backgroundImage
              : backgroundImage
          })`,
        }}
      />
      <div className="arrow__left" onClick={prevEvent}>
        <ArrowBackIosRounded fontSize="inherit" />
      </div>
      <div className="arrow__right" onClick={nextEvent}>
        <ArrowForwardIosRounded fontSize="inherit" />
      </div>
      <div className="hero__container">
        <label className="hero__date">
          {upcomingEvents.loading
            ? ''
            : events?.length
              ? events[eventIndex].date
              : ''}
        </label>
        <h3 className="hero__text">
          {!upcomingEvents.loading
            ? events.length
              ? events[eventIndex].title
              : 'Sorry, no events planned for the future'
            : ''}
        </h3>
        <div>
          <Button
            buttonStyle={ButtonStyles.Primary}
            onClick={() => {
              if (
                eventIndex >= (pastEvents.data ? pastEvents.data.length : 0)
              ) {
                return navigate('/events/' + events[eventIndex].slug)
              }

              window.open(
                eventIndex >= (pastEvents.data ? pastEvents.data.length : 0)
                  ? events[eventIndex].url
                  : events[eventIndex].image,
              )
            }}
          >
            {eventIndex >= (pastEvents.data ? pastEvents.data.length : 0) &&
              'Book Now'}

            {eventIndex < (pastEvents.data ? pastEvents.data.length : 0) &&
              'See Photos'}
          </Button>
        </div>
      </div>
    </div>
  )
}
