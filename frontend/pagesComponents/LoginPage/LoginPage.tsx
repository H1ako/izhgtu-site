// global
import React from 'react';
// components
import PageLayout from "../../containers/PageLayout/PageLayout";
// styles and icons
import styles from './LoginPage.module.scss';
// types
import {
  Page_page_LoginPage,
  Page_page_LoginPage_signInMethods, Page_page_LoginPage_signUpSocialMethods,
} from "../../graphql/generated";
import {NavTab, NavTabLayout, NavTabLayoutProps, TabNav, TabNavContent} from "../../components/TabNav/TabNav";
import Link from "next/link";
import ReactCodeInput from "react-code-input";
import PhoneLogin from "../../components/PhoneLogin/PhoneLogin";
import Cookies from "js-cookie";

type SignMethodsType = Page_page_LoginPage_signInMethods[] | Page_page_LoginPage_signUpSocialMethods[]

interface NavTabProps extends NavTabLayoutProps {
  signInMethods: Page_page_LoginPage_signInMethods[],
  signUpMethods: Page_page_LoginPage_signUpSocialMethods[],
}

interface TabBodyProps {
  methods: SignMethodsType
}

interface MethodChooserProps {
  methods: SignMethodsType,
  setMethod: React.Dispatch<React.SetStateAction<string | null>>
}

interface SignInLayoutProps {
  children: React.ReactNode,
  setMethod: React.Dispatch<React.SetStateAction<string | null>>,
  heading?: string,
}

interface SignInMethodProps {
  setMethod: React.Dispatch<React.SetStateAction<string | null>>,
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

const SIGN_IN_METHODS_COMPONENTS = {
  'loginAndPassword': PasswordSignIn,
  'phoneCode': PhoneSignIn,
}

function LoginPage({signInMethods, signUpSocialMethods}: Page_page_LoginPage) {
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
        tabProps={{
          signInMethods,
          signUpMethods: signUpSocialMethods
        }}
      />
    </PageLayout>
  )
}

function SignInTab({isActive, signInMethods}: NavTabProps) {
  return (
    <NavTabLayout className={`${styles.content__tab} ${styles.tab_signIn}`} isActive={isActive}>
      <SignInTabBody methods={signInMethods} />
    </NavTabLayout>
  )
}

function SignInTabBody({methods}: TabBodyProps) {
  const [ chosenSignInMethod, setChosenSignInMethod ] = React.useState<string | null>(null)
  
  if (chosenSignInMethod === null) {
    return (
      <SignInMethodChooser methods={methods} setMethod={setChosenSignInMethod} />
    )
  }
  
  // @ts-ignore
  const Component = SIGN_IN_METHODS_COMPONENTS[chosenSignInMethod]
  if (!Component) return null
  
  return <Component setMethod={setChosenSignInMethod} />
}

function SignInMethodChooser({methods, setMethod}: MethodChooserProps) {
  return (
    <div className={styles.tab__body}>
      <ul className={styles.body__methodChooser}>
        {methods.map(method => (
          <li key={method.name} className={styles.methodChooser__item}>
            { method.url === null ?
              <button onClick={() => setMethod(method.name)} className={styles.item__button}>
                Через {method.label}
              </button>
              :
              <Link href={method.url} className={styles.item__button}>
                Через {method.label}
              </Link>
            }
          </li>
        ))}
      </ul>
    </div>
  )
}

function SignInLayout({children, setMethod, heading}: SignInLayoutProps) {
  const backToMethods = () => setMethod(null)
  
  return (
    <div className={styles.tab__body}>
      <h1 className={styles.body__methodHeading}>{heading}</h1>
      {children}
      <button className={styles.body__btnUnnoticeable} onClick={backToMethods}>Вернуться к методам входа</button>
    </div>
  )
}

function PasswordSignIn({setMethod}: SignInMethodProps) {
  const usernameInputRef = React.useRef<HTMLInputElement>(null)
  const passwordInputRef = React.useRef<HTMLInputElement>(null)
  const [ error, setError ] = React.useState<string | null>(null)
  
  const signIn = () => {
    const username = getUsername()
    const password = getPassword()
    if (!username || !password) return
    
    const data = new FormData()
    data.append('username', username)
    data.append('password', password)
    
    fetch('/api/auth/password/login/', {
      method: 'POST',
      body: data,
      credentials: 'include',
      mode: 'cors',
      headers: {
        'X-CSRFToken': Cookies.get('csrftoken') || ''
      }
    })
  }
  
  const getUsername = () => {
    const input = usernameInputRef.current
    
    if (!input || !input.value) return null
    
    return input.value
  }
  
  const getPassword = () => {
    const input = passwordInputRef.current
    
    if (!input || !input.value) return null
    
    return input.value
  }
  
  return (
    <SignInLayout
      heading="Войти через логин и пароль"
      setMethod={setMethod}
    >
      <input
        className={styles.body__input}
        type="text"
        ref={usernameInputRef}
        placeholder="Номер телефона \ Почта \ Номер Студенческого"
      />
      <input
        className={styles.body__input}
        type="tel"
        ref={passwordInputRef}
        placeholder="Пароль"
      />
      { error &&
        <p className={styles.body__error}>{error}</p>
      }
      <button onClick={signIn} className={`${styles.body__btn} ${styles.btn_marginTop}`}>Войти</button>
    </SignInLayout>
  )
}

function PhoneSignIn({setMethod}: SignInMethodProps) {
  return (
    <SignInLayout
      heading="Войти через код из СМС"
      setMethod={setMethod}
    >
      <PhoneLogin
        className={styles.body__phoneSignIn}
        // onCodeSubmit={signIn}
      />
    </SignInLayout>
  )
}

function SignUpTab({isActive, signUpMethods}: NavTabProps) {
  return (
    <NavTabLayout className={`${styles.content__tab} ${styles.tab_signUp}`} isActive={isActive}>
      <SignUpTabBody methods={signUpMethods} />
    </NavTabLayout>
  )
}

function SignUpTabBody({methods}: TabBodyProps) {
  const [ chosenSignUpSocial, setChosenSignUpSocial ] = React.useState<string | null>(null)
  
  return (
    <div className={styles.tab__body}>
      <SignUpSocialMethods methods={methods} setMethod={setChosenSignUpSocial} />
    </div>
  )
}

function SignUpForm() {
  return (
    <div className={styles.tab__body}>
      sign up form
    </div>
  )
}

function SignUpSocialMethods({methods, setMethod}: MethodChooserProps) {
  return (
    <div className={styles.tab__body}>
      <ul className={styles.body__methodChooser}>
        {methods.map(method => (
          <li key={method.name} className={styles.methodChooser__item}>
            <Link href={`${method.url}` ?? ''} className={styles.item__button}>
              Через {method.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default LoginPage