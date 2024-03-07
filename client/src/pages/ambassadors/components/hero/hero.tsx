import SectionTitle from 'components/ui/sectionTitle/sectionTitle'
import React from 'react'
import './hero.Module.scss'
import useAmbassadorsPage from 'hooks/useAmbassadorsPage'
import ContentfulRichText from 'components/ui/richTextBox/richTextBox'

export default function Hero() {
  const { data, loading } = useAmbassadorsPage()

  if (loading) return <></>

  return (
    <div className="ambassadors__hero">
      <div className="ambassadors__hero__container">
        <div>
          <SectionTitle
            title="Become one of the Out Of Office Ambassadors"
            subtitle={data?.subtitle}
          />
          <ContentfulRichText content={data?.description} />
        </div>
        <div
          className="ambassadors__hero__image"
          style={{ backgroundImage: `url(${data?.image})` }}
        />
      </div>
    </div>
  )
}
