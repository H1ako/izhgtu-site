// global
import React from 'react'
// styles and icons
import styles from './PageLayout.module.scss';

interface PageLayoutProps {
    children: React.ReactNode
}

function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className={styles.page}>
      {children}
    </div>
  )
}

export default PageLayout
