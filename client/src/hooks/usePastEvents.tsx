import { useEffect, useState } from 'react'
import pastEventsService from 'services/pastEventsService'
import { EventProps } from 'types/event'

export default function usePastEvents() {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<null | EventProps[]>(null)

  const fetchData = async () => {
    const pastEvents = await pastEventsService.getAll()
    setData(pastEvents)
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return { data, loading }
}
