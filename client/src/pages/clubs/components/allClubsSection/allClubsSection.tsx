import React from 'react'
import SectionTitle from 'components/ui/sectionTitle/sectionTitle'
import useClubs from 'hooks/useClubs'
import { ClubProps } from 'types/club'
import ClubCard, { backgorundStyles } from '../clubCard'
import './allClubsSection.Module.scss'

export default function AllClubsSection() {
  const clubs = useClubs()

  return (
    <div className="allClubs">
      <SectionTitle title="All Clubs"></SectionTitle>
      <div className="allClubs__container">
        {clubs.data.map((club: ClubProps) => {
          return (
            <ClubCard
              key={club.name}
              background={backgorundStyles.dark}
              club={club}
            />
          )
        })}
      </div>
    </div>
  )
}
