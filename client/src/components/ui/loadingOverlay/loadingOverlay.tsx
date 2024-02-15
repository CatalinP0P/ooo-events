import React from 'react'
import './loadingOverlay.Module.scss'

interface loadingOverlayProps {
  visible: boolean
}

export default function LoadingOverlay({ visible }: loadingOverlayProps) {
  return <>{visible && <div className="loadingOverlay"></div>}</>
}
