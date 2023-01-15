// global
import React from 'react'
// styles and icons
import styles from './PageLayout.module.scss';

interface PageLayoutProps {
  children: React.ReactNode,
  className?: string,
}

function PageLayout({children, className}: PageLayoutProps) {
  return (
    <div className={`${styles.page} ${className}`}>
      {children}
    </div>
  )
}

export default PageLayout
