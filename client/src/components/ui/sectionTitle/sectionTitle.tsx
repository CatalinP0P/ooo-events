import React from 'react'
import './sectionTitle.Module.scss'

interface sectionTitleProps {
  title: string
  subtitle?: string
}

export default function SectionTitle({ title, subtitle }: sectionTitleProps) {
  return (
    <div className="sectionTitle">
      <label className="sectionTitle__title">{title}</label>
      {subtitle != null && (
        <h3 className="sectionTitle__subtitle">{subtitle}</h3>
      )}
    </div>
  )
}
