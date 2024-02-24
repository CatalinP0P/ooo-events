import {
  KeyboardArrowLeft,
  KeyboardArrowRight,
  People,
} from '@mui/icons-material'
import React, { Dispatch, SetStateAction } from 'react'
import './peopleSelector.Module.scss'

interface peopleSelectorProps {
  male: number
  female: number
  setMale: Dispatch<SetStateAction<number>>
  setFemale: Dispatch<SetStateAction<number>>
}

export default function PeopleSelector({
  male,
  female,
  setMale,
  setFemale,
}: peopleSelectorProps) {
  const addPeopleMale = () => {
    setMale(male + 1)
  }

  const removePeopleMale = () => {
    if (male == 0) return

    setMale(male - 1)
  }

  const addPeopleFemale = () => {
    setFemale(female + 1)
  }

  const removePeopleFemale = () => {
    if (female == 0) return

    setFemale(female - 1)
  }

  return (
    <>
      <div className="peopleSelector">
        <div className="people__left">
          <div className="people__logo">
            <People fontSize="inherit" />
          </div>
          <div className="people__text">
            <label>People</label>
            <label>
              <span>(Including You)</span>
            </label>
          </div>
        </div>
        <div className="people__right">
          <div className="people__item">
            <div className="item__icon">
              <label>Male</label>
            </div>

            <div className="item__body">
              <div className="item__button" onClick={removePeopleMale}>
                <KeyboardArrowLeft fontSize="inherit" />
              </div>

              <label>{male}</label>

              <div className="item__button" onClick={addPeopleMale}>
                <KeyboardArrowRight fontSize="inherit" />
              </div>
            </div>
          </div>

          <div className="people__item">
            <div className="item__icon">
              <label>Female</label>
            </div>
            <div className="item__body">
              <div className="item__body">
                <div className="item__button" onClick={removePeopleFemale}>
                  <KeyboardArrowLeft fontSize="inherit" />
                </div>

                <label>{female}</label>

                <div className="item__button" onClick={addPeopleFemale}>
                  <KeyboardArrowRight fontSize="inherit" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
