import React, { useEffect } from 'react'
import SectionTitle from 'components/ui/sectionTitle/sectionTitle'
import './allRestaurantsSection.Module.scss'
import useRestaurants from 'hooks/useRestaurants'
import RestaurantCard from '../restaurantCard/restaurantCard'
import { RestaurantProps } from 'types/restaurant'

export default function AllRestaurantsSection() {
  const restaurants = useRestaurants()

  useEffect(() => {
    if (restaurants.loading) return

    console.log(restaurants.data)
  }, [restaurants.loading])

  return (
    <div className="allRestaurants">
      <SectionTitle
        title="All Restaurants"
        subtitle="Where Flavor Meets Elegance: A Culinary Journey for Every Palate"
      />
      <div className="allRestaurants__container">
        {restaurants.data.map((restaurant: RestaurantProps) => {
          return (
            <RestaurantCard key={restaurant.slug} restaurant={restaurant} />
          )
        })}
      </div>
    </div>
  )
}
