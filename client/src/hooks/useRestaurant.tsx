import { useEffect, useState } from 'react'
import restaurantsService from 'services/restaurantsService'
import { RestaurantProps } from 'types/restaurant'

export default function useRestaurant(slug: string) {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<null | RestaurantProps>(null)

  const fetchData = async () => {
    const restaurant = await restaurantsService.getBySlug(slug)
    setData(restaurant)
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return { data, loading }
}
