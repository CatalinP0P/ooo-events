import { useEffect, useState } from 'react'
import eventsService from 'services/eventsService'
import { EventProps } from 'types/event'

export default function useUpcomingEvents() {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<null | EventProps[]>()

  const fetchData = async () => {
    const events = await eventsService.getUpcoming()

    setData(events)
    setLoading(false)

    console.log(events)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return { data, loading }
}
