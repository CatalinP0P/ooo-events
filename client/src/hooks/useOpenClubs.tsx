import { useEffect, useState } from 'react'
import clubsService from 'services/clubsService'
import { ClubProps } from 'types/club'

export default function useOpenClubs() {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<ClubProps[]>([])

  const fetchData = async () => {
    const clubs = await clubsService.getOpenToday()

    setData(clubs)
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return { data, loading }
}
