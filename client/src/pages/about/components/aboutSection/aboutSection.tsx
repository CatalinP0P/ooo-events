import React from 'react'
import './aboutSection.Module.scss'
import useAboutPage from 'hooks/useAboutPage'
import ContentfulRichText from 'components/ui/richTextBox/richTextBox'

export default function AboutSection() {
  const { data, loading } = useAboutPage()

  if (loading) return <></>

  return (
    <div className="aboutSection">
      <div>
        <div className="aboutSection__container">
          <div className="aboutSection__body">
            <h3 className="aboutSection__title">{data?.aboutTitle}</h3>
            <label className="aboutSection__text">
              {<ContentfulRichText content={data?.aboutDescription} />}
            </label>
          </div>
          <div
            className="aboutSection__image"
            style={{ backgroundImage: `url(${data?.aboutImage})` }}
          ></div>
        </div>
      </div>
    </div>
  )
}
