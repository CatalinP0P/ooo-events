import React, { Dispatch, SetStateAction, useEffect } from 'react'
import './popup.Module.scss'

interface popupProps {
  children: React.ReactNode
  visibility: boolean
  setVisibility: Dispatch<SetStateAction<boolean>>
}

export default function Popup({
  children,
  visibility,
  setVisibility,
}: popupProps) {
  useEffect(() => {
    const body = document.querySelector('body')
    if (visibility) body?.classList.add('disable-scroll')
    else body?.classList.remove('disable-scroll')
  }, [visibility])

  return (
    <>
      {visibility && <div className={'popup'}>{children}</div>}
      {visibility && (
        <div className="popup__overlay" onClick={() => setVisibility(false)} />
      )}
    </>
  )
}
