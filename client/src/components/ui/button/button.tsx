import React, { HTMLAttributes } from 'react'
import './button.Module.scss'

export enum ButtonStyles {
  'Primary',
  'Tertiary',
}

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  buttonStyle?: ButtonStyles
  rounded?: boolean
}

export default function Button({
  buttonStyle = ButtonStyles.Primary,
  children,
  rounded = true,
  ...otherProps
}: ButtonProps) {
  return (
    <button
      className={`button ${
        rounded ? 'button__rounded' : ''
      } button__${ButtonStyles[buttonStyle].toLowerCase()}`}
      {...otherProps}
    >
      {children}
    </button>
  )
}
