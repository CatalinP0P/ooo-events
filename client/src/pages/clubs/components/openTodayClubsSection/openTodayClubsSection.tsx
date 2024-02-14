import React, { useEffect } from 'react'
import SectionTitle from 'components/ui/sectionTitle/sectionTitle'
import useOpenClubs from 'hooks/useOpenClubs'
import { ClubProps } from 'types/club'
import ClubCard from '../clubCard'
import './openTodayClubsSection.Module.scss'

export default function OpenTodayClubsSection() {
  const openClubs = useOpenClubs()

  useEffect(() => {
    if (openClubs.loading) return

    console.log(openClubs.data)
  }, [openClubs.loading])

  return (
    <div className="todayClubs">
      <SectionTitle
        title="Open Today"
        subtitle="Dress To Impress"
      ></SectionTitle>
      <div className="todayClubs__container">
        {openClubs.data.map((club: ClubProps) => {
          return <ClubCard key={club.name} club={club} />
        })}
      </div>
    </div>
  )
}
