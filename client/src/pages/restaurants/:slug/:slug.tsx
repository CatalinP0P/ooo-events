import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import ContentfulRichText from 'components/ui/richTextBox/richTextBox'
import './:slug.Module.scss'
import useRestaurant from 'hooks/useRestaurant'
import ReservationPopup from 'pages/clubs/:name/components/reservationPopup/reservationPopup'
import { RestaurantProps } from 'types/restaurant'
import Button from 'components/ui/button/button'
import SpecialRequestPopup from './components/specialRequestPopup/specialRequestPopup'

export default function RestaurantsSlug() {
  const { slug } = useParams()
  const restaurant = useRestaurant(slug as string)
  const [visibility, setVisibility] = useState(false)
  const [specialVisibility, setSpecialVisibility] = useState(false)

  return (
    <>
      <div className="restaurantsSlug">
        <div className="restaurantsSlug__header">
          <div className="header__container">
            <div
              className="header__image"
              style={{ backgroundImage: `url(${restaurant.data?.image})` }}
            ></div>
            <div className="header__body">
              <div className="body__header">
                <h3 className="header__title">{restaurant.data?.name}</h3>
                <div className="header__item">
                  <label className="item__key">Location</label>
                  <label className="item__value">
                    {restaurant.data?.location}
                  </label>
                </div>

                <div className="header__item">
                  <label className="item__key">Address</label>
                  <label className="item__value">
                    {restaurant.data?.address}, {restaurant.data?.postcode}
                  </label>
                </div>

                <div className="header__item">
                  <label className="item__key">Open Hours</label>
                  <label className="item__value">
                    {restaurant.data?.openHour
                      ? restaurant.data?.openHour
                      : '??:??'}{' '}
                    -{' '}
                    {restaurant.data?.closeHour
                      ? restaurant.data?.closeHour
                      : '??:??'}
                  </label>
                </div>

                {restaurant.data?.menu != null && (
                  <label
                    className="item__file"
                    onClick={() => window.open(restaurant.data?.menu)}
                  >
                    Menu
                  </label>
                )}
              </div>
              <div className="header__footer">
                <Button
                  onClick={() => {
                    setSpecialVisibility(true)
                  }}
                >
                  Special Requests
                </Button>
                <Button onClick={() => setVisibility(true)}>
                  Book a Table
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="restaurantsSlug__body">
          <h4 className="restaurantsSlug__body__title">Description</h4>
          <div className="restaurantsSlug__body__text">
            <ContentfulRichText content={restaurant.data?.description} />
          </div>
        </div>
      </div>
      {!restaurant.loading && (
        <ReservationPopup
          club={restaurant.data as RestaurantProps}
          visibility={visibility}
          setVisibility={setVisibility}
        />
      )}
      {!restaurant.loading && (
        <SpecialRequestPopup
          visibile={specialVisibility}
          setVisible={setSpecialVisibility}
          restaurant={restaurant.data as RestaurantProps}
        />
      )}
    </>
  )
}
