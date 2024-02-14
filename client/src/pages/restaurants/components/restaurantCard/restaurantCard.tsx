import React from 'react'
import './restaurantCard.Module.scss'
import { useNavigate } from 'react-router-dom'
import { RestaurantProps } from 'types/restaurant'

interface restaurantCardProps {
  restaurant: RestaurantProps
}

export default function RestaurantCard({ restaurant }: restaurantCardProps) {
  const navigate = useNavigate()
  return (
    <div
      className="restaurantCard"
      onClick={() => navigate(`/restaurants/${restaurant.slug}`)}
    >
      <div
        className="restaurantCard__image"
        style={{ backgroundImage: `url(${restaurant.image})` }}
      />
      <h3 className="restaurantCard__name">{restaurant.name}</h3>
      <div className="restaurantCard__body">
        <div className="body__item">
          <label className="item__key">Location</label>
          <label className="item__value">{restaurant.location}</label>
        </div>

        <div className="body__item">
          <label className="item__key">Address</label>
          <label className="item__value">
            {restaurant.address}, {restaurant.postcode}
          </label>
        </div>

        <div className="body__item">
          <label className="item__key">Open Hours</label>
          <label className="item__value">
            {restaurant.openHour || '??:??'} - {restaurant.closeHour || '??:??'}
          </label>
        </div>
      </div>
    </div>
  )
}
