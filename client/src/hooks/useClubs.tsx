import { useEffect, useState } from 'react'
import clubsService from 'services/clubsService'
import { ClubProps } from 'types/club'

export default function useClubs() {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<ClubProps[]>([])

  const fetchData = async () => {
    const clubs = await clubsService.getAll()

    setData(clubs)
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return { data, loading }
}
