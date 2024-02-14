import React, { TextareaHTMLAttributes } from 'react'
import './formTextArea.Module.scss'

interface formTextAreaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  title?: string
}

export default function FormTextArea({
  title,
  ...otherProps
}: formTextAreaProps) {
  return (
    <div className="formTextArea">
      {title && <label className="formTextArea__title">{title}</label>}
      <textarea className="formTextArea__input" {...otherProps} />
    </div>
  )
}
