import React, { useEffect } from 'react'
import './schedule.Module.scss'
import SectionTitle from 'components/ui/sectionTitle/sectionTitle'
import useClubs from 'hooks/useClubs'
import { ClubProps } from 'types/club'
import { useNavigate } from 'react-router-dom'

export default function Schedule() {
  const daysOfWeek = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ]

  const navigate = useNavigate()
  const clubs = useClubs()

  useEffect(() => {
    if (clubs.loading) return
    console.log(clubs.data)
  }, [clubs.loading])

  return (
    <div className="schedule">
      <SectionTitle title="Schedule" />
      <div className="schedule__container">
        {daysOfWeek.map((day) => {
          return (
            <div key={day} className="schedule__item">
              <div className="schedule__header">
                <label className="schedule__title">{day.slice(0, 3)}</label>
              </div>
              <div className="schedule__body">
                {clubs.data
                  //eslint-disable-next-line
                  .filter((club: any) => club[day.toLowerCase()] == true)
                  .map((club: ClubProps) => {
                    return (
                      <div
                        key={club.name}
                        className="schedule__club"
                        onClick={() => navigate('/clubs/' + club.name)}
                        style={{ backgroundImage: `url(${club.image})` }}
                      >
                        <label className="club__name">{club.name}</label>
                      </div>
                    )
                  })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
