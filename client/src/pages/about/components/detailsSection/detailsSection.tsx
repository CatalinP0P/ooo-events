import React from 'react'
import './detailsSection.Module.scss'
import SectionTitle from 'components/ui/sectionTitle/sectionTitle'
import useAboutPage from 'hooks/useAboutPage'
import ContentfulRichText from 'components/ui/richTextBox/richTextBox'

export default function DetailsSection() {
  const { data, loading } = useAboutPage()
  if (loading) return <></>

  console.log(data)

  return (
    <div className="details">
      <SectionTitle title="Details" subtitle={data?.detailsSubtitle} />
      <div className="details__container">
        <ContentfulRichText content={data?.detailsText} />
      </div>
    </div>
  )
}
