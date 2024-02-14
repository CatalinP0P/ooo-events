import { useEffect, useState } from 'react'
import restaurantsService from 'services/restaurantsService'
import { RestaurantProps } from 'types/restaurant'

export default function useRestaurants() {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<RestaurantProps[]>([])

  const fetchData = async () => {
    const restaurants = await restaurantsService.getAll()
    setData(restaurants)
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return { data, loading }
}
