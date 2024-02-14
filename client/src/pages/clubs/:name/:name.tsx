import useClub from 'hooks/useClub'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import Button from 'components/ui/button/button'
import ContentfulRichText from 'components/ui/richTextBox/richTextBox'
import './:name.Module.scss'
import ReservationPopup from './components/reservationPopup/reservationPopup'
import { ClubProps } from 'types/club'
import GuestListPopup from './components/guestListPopup/guestListPopup'

export default function ClubsName() {
  const [visibility, setVisibility] = useState(false)
  const [guestVisibility, setGuestVisibility] = useState(false)

  const { name } = useParams()
  const club = useClub(name as string)

  return (
    <>
      <div className="clubsName">
        <div className="clubsName__header">
          <div className="header__container">
            <div
              className="header__image"
              style={{ backgroundImage: `url(${club.data?.image})` }}
            ></div>
            <div className="header__body">
              <div className="body__header">
                <h3 className="header__title">{club.data?.name}</h3>
                <div className="header__item">
                  <label className="item__key">Location</label>
                  <label className="item__value">{club.data?.location}</label>
                </div>

                <div className="header__item">
                  <label className="item__key">Address</label>
                  <label className="item__value">
                    {club.data?.address}, {club.data?.postcode}
                  </label>
                </div>

                <div className="header__item">
                  <label className="item__key">Open Hours</label>
                  <label className="item__value">
                    {club.data?.openHour ? club.data?.openHour : '??:??'} -{' '}
                    {club.data?.closeHour ? club.data?.closeHour : '??:??'}
                  </label>
                </div>
                {club.data?.rulesAndRegulations != null && (
                  <label
                    className="item__file"
                    onClick={() => window.open(club.data?.rulesAndRegulations)}
                  >
                    Rules and Regulations
                  </label>
                )}

                {club.data?.menu != null && (
                  <label
                    className="item__file"
                    onClick={() => window.open(club.data?.menu)}
                  >
                    Menu
                  </label>
                )}

                {club.data?.floorPlan != null && (
                  <label
                    className="item__file"
                    onClick={() => window.open(club.data?.floorPlan)}
                  ></label>
                )}
              </div>
              <div className="header__footer">
                <Button onClick={() => setGuestVisibility(true)}>
                  Guest List
                </Button>
                <Button onClick={() => setVisibility(true)}>
                  Reserve Table
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="clubName__body">
          <h3 className="clubName__body__title">Description</h3>
          <div className="clubName__body__text">
            <ContentfulRichText content={club.data?.description} />
          </div>
        </div>
      </div>
      <ReservationPopup
        club={club.data as ClubProps}
        visibility={visibility}
        setVisibility={setVisibility}
        plus18
      />
      {club.data && (
        <GuestListPopup
          visibility={guestVisibility}
          setVisibility={setGuestVisibility}
          club={club.data as ClubProps}
        />
      )}
    </>
  )
}
