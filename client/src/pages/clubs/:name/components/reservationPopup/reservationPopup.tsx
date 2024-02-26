import Popup from 'components/layout/popup/popup'
import React, { Dispatch, SetStateAction, useState } from 'react'
import './reservationPopup.Module.scss'
import { ClubProps } from 'types/club'
import { CloseRounded } from '@mui/icons-material'
import ReservationForm from './components/reservationForm/reservationForm'
import { RestaurantProps } from 'types/restaurant'
import Button from 'components/ui/button/button'
import { EventProps } from 'types/event'

interface reservationPopupProps {
  visibility: boolean
  setVisibility: Dispatch<SetStateAction<boolean>>
  club: ClubProps | RestaurantProps | EventProps
  plus18?: boolean
}

export default function ReservationPopup({
  club,
  visibility,
  setVisibility,
  plus18 = false,
}: reservationPopupProps) {
  const [step, setStep] = useState(plus18 ? 0 : 1)

  return (
    <Popup visibility={visibility} setVisibility={setVisibility}>
      <div className="reservation">
        {step == 0 && (
          <div className="over18">
            <p>You must be over 18 to book a table</p>
            <Button onClick={() => setStep(1)}>Confirm</Button>
          </div>
        )}
        {step == 1 && (
          <>
            <div className="reservation__header">
              <label className="header__title">Table Reservation</label>
              <div
                className="header__close"
                onClick={() => setVisibility(false)}
              >
                <CloseRounded fontSize="inherit" />
              </div>
            </div>
            <div className="reservation__body">
              <div className="body__form">
                <ReservationForm club={club} />
              </div>
            </div>
          </>
        )}
      </div>
    </Popup>
  )
}
