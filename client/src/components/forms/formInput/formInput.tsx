import React, { InputHTMLAttributes } from 'react'
import './formInput.Module.scss'

interface formInputProps extends InputHTMLAttributes<HTMLInputElement> {
  title?: string
}

export default function FormInput({ title, ...otherProps }: formInputProps) {
  return (
    <div className="formInput">
      {title && <label className="formInput__title">{title}</label>}
      <input className="formInput__input" {...otherProps} />
    </div>
  )
}
