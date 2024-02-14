import React from 'react'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

//eslint-disable-next-line
const ContentfulRichText = ({ content }: { content: any }) => {
  return <>{content && documentToReactComponents(content)}</>
}

export default ContentfulRichText
