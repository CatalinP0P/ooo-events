import { KeyboardArrowUp } from '@mui/icons-material'
import React, { Dispatch, SetStateAction, useState } from 'react'
import './formSelect.Module.scss'

interface formSelectProps {
  title?: string
  options?: string[]
  value?: string
  setValue: Dispatch<SetStateAction<string>>
}

export default function FormSelect({
  title,
  options,
  value,
  setValue,
}: formSelectProps) {
  const [visibility, setVisibility] = useState(false)

  return (
    <>
      <div className="formSelect__container">
        {title != null && <label className="formSelect__title">{title}</label>}
        <div onClick={() => setVisibility(!visibility)} className="select__are">
          <div className={`formSelect ${visibility ? 'active' : ''}`}>
            <label>{value}</label>
            <div className="formSelect__icon ">
              <KeyboardArrowUp fontSize="inherit" />
            </div>
            <div
              className={`formSelect__options ${visibility ? 'active' : ''}`}
            >
              {options?.map((option: string) => {
                return (
                  <label
                    onClick={() => {
                      setValue(option)
                      setVisibility(false)
                    }}
                    key={option}
                  >
                    {option}
                  </label>
                )
              })}
            </div>
          </div>
        </div>

        {visibility && (
          <div
            className="formSelect__overlay"
            onClick={() => setVisibility(false)}
          />
        )}
      </div>
    </>
  )
}
