import React, { Dispatch, SetStateAction, useEffect } from 'react'
import './sideNav.Module.scss'

interface sideNavProps {
  visibility: boolean
  setVisibility: Dispatch<SetStateAction<boolean>>
  children: React.ReactNode
}

export default function SideNav({
  visibility,
  setVisibility,
  children,
}: sideNavProps) {
  useEffect(() => {
    const body = document.querySelector('body')
    if (visibility) {
      body?.classList.add('no-scroll')
    } else {
      body?.classList.remove('no-scroll')
    }
  }, [visibility])

  return (
    <>
      <div className={`sideNav ` + (visibility ? 'sideNav__active' : '')}>
        {children}
      </div>
      {visibility && (
        <div
          className="sideNav__underlay"
          onClick={() => setVisibility(false)}
        ></div>
      )}
    </>
  )
}
