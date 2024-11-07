import React, { HTMLAttributes } from 'react'
import './button.Module.scss'

export enum ButtonStyles {
  'Primary',
  'Tertiary',
}

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  buttonStyle?: ButtonStyles
  rounded?: boolean
  type?: 'button' | 'submit'
}

export default function Button({
  buttonStyle = ButtonStyles.Primary,
  children,
  rounded = true,
  type,
  ...otherProps
}: ButtonProps) {
  return (
    <button
      type={type || 'button'}
      className={`button ${
        rounded ? 'button__rounded' : ''
      } button__${ButtonStyles[buttonStyle].toLowerCase()}`}
      {...otherProps}
    >
      {children}
    </button>
  )
}
