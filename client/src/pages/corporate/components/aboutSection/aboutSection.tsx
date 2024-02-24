import SectionTitle from 'components/ui/sectionTitle/sectionTitle'
import React from 'react'
import './aboutSection.Module.scss'
import useCorporatePage from 'hooks/useCorporatePage'
import ContentfulRichText from 'components/ui/richTextBox/richTextBox'

export default function AboutSection() {
  const { data, loading } = useCorporatePage()

  if (loading) return <></>

  return (
    <div className="aboutSection">
      <SectionTitle title="About" subtitle={data?.aboutSubtitle} />

      <div className="aboutSection__body">
        <ContentfulRichText content={data?.aboutDescription} />
      </div>
    </div>
  )
}
