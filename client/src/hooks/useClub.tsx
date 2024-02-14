import { useEffect, useState } from 'react'
import clubsService from 'services/clubsService'
import { ClubProps } from 'types/club'

export default function useClub(name: string) {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<ClubProps | null>(null)

  const fetchData = async () => {
    const club = await clubsService.getByName(name)
    setData(club)
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return { data, loading }
}
