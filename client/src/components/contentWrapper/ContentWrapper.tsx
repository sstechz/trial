import React, { ReactNode } from 'react'
import "./ContentWrapper.scss";

const ContentWrapper = ({children}: {children : ReactNode}) => {
  return (
    <div className="contentWrapper">{children}</div>
  )
}

export default ContentWrapper