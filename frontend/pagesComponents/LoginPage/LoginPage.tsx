// global
import React from 'react';
// components
import PageLayout from "../../containers/PageLayout/PageLayout";
// styles and icons
import styles from './LoginPage.module.scss';
// types
import {Page_page_LoginPage} from "../../graphql/generated";
import {NavTab, NavTabLayout, NavTabLayoutProps, TabNav, TabNavContent} from "../../components/TabNav/TabNav";

interface SignInTabProps extends NavTabLayoutProps {
}

const NAV_TABS: NavTab[] = [
  {
    id: 0,
    title: 'Войти',
    component: SignInTab
  },
  {
    id: 1,
    title: 'Зарегистрироваться',
    component: SignUpTab
  }
]

function LoginPage(
  {isPhoneCodeEnabled, isPasswordEnabled, isGosUslugiEnabled}: Page_page_LoginPage) {
  const [ currentTabId, setCurrentTabId ] = React.useState<number>(0)
  
  return (
    <PageLayout className={styles.page}>
      <TabNav
        navTabs={NAV_TABS}
        currentTabId={currentTabId}
        setCurrentTabId={setCurrentTabId}
        className={styles.nav}
        listClassName={styles.nav__list}
      />
      <TabNavContent
        navTabs={NAV_TABS}
        currentTabId={currentTabId}
        className={styles.content}
      />
    </PageLayout>
  )
}

function SignInTab({isActive}: SignInTabProps) {
  const [ chosenSignInMethod, setChosenSignInMethod ] = React.useState<number | null>(null)
  
  return (
    <NavTabLayout className={`${styles.content__tab} ${styles.tab_signIn}`} isActive={isActive}>
      <SignInTabBody />
    </NavTabLayout>
  )
}

function SignInTabBody() {
  return (
    <div></div>
  )
}

function SignInMethodChooser() {
  return (
    <ul className={styles.tab}>
    
    </ul>
  )
}

function SignUpTab({isActive}: SignInTabProps) {
  const [ chosenSignUpMethod, setChosenSignUpMethod ] = React.useState<number | null>(null)
  
  return (
    <NavTabLayout className={`${styles.content__tab} ${styles.tab_signUp}`} isActive={isActive}>
      sign up
    </NavTabLayout>
  )
}

export default LoginPage