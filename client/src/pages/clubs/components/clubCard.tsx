import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ClubProps } from 'types/club'
import './clubCard.Module.scss'
import { LocationCity, LocationOn, QueryBuilder } from '@mui/icons-material'

export enum backgorundStyles {
  'light',
  'dark',
}

interface clubCardProps {
  club: ClubProps
  background?: backgorundStyles
}

export default function ClubCard({
  club,
  background = backgorundStyles.light,
}: clubCardProps) {
  const navigate = useNavigate()

  return (
    <div
      className={'clubCard clubCard__' + backgorundStyles[background]}
      onClick={() => navigate('/clubs/' + club.name)}
    >
      <div
        className="clubCard__image"
        style={{ backgroundImage: `url(${club.image})` }}
      ></div>
      <h3 className="clubCard__name">{club.name}</h3>
      <div className="clubCard__body">
        {' '}
        <div className="body__item">
          <label className="item__key">
            <LocationCity fontSize="inherit" />
          </label>
          <label className="item__value">{club.location}</label>
        </div>
        <div className="body__item">
          <label className="item__key">
            <LocationOn fontSize="inherit" />
          </label>
          <label className="item__value">
            {club.address}, {club.postcode}
          </label>
        </div>
        <div className="body__item">
          <label className="item__key">
            <QueryBuilder fontSize="inherit" />
          </label>
          <label className="item__value">
            {club.openHour || '??:??'} - {club.closeHour || '??:??'}
          </label>
        </div>
      </div>
    </div>
  )
}
