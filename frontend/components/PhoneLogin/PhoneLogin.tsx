// global
import React from "react";
import ReactCodeInput from "react-code-input";
import Cookies from "js-cookie";
// styles
import styles from "./PhoneLogin.module.scss";

interface PhoneLoginProps {
  className?: string,
  children?: React.ReactNode,
  onSend?: (phone: string) => void,
  onCodeSubmit?: (code: string) => void,
  onCheckSuccess?: () => void,
  type?: 'update' | 'login'
}

interface CodeCheckSuccessScreenProps {
  className?: string,
}

const URLS_FOR_CODE_VERIFY_BY_TYPE = {
  'update': '/api/auth/passwordless/update-mobile/',
  'login': '/api/auth/passwordless/login/',
}

function PhoneLogin({className, children, onSend, onCodeSubmit, onCheckSuccess, type='login'}: PhoneLoginProps) {
  const [ phone, setPhone ] = React.useState<string>('')
  const [ sessionToken, setSessionToken ] = React.useState<string | null>(null)
  const [ codeInputValue, setCodeInputValue ] = React.useState<string>('')
  const [ codeSent, setCodeSent ] = React.useState<boolean>(false)
  const [ codeCheckSent, setCodeCheckSent ] = React.useState<boolean>(false)
  const [ codeCheckSuccess, setCodeCheckSuccess ] = React.useState<boolean>(false)
  const [ error, setError ] = React.useState<string | null>(null)
  const codeInputRef = React.useRef<any>(null)
  
  const sendCode = () => {
    if (!phone) return
    
    fetch('/api/auth/passwordless/send-code/', {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      body: JSON.stringify({
        phone_number: getPhoneNumber()
      }),
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': Cookies.get('csrftoken') || ''
      }
    })
      .then(res => {
        if (res.status === 200) {
          res.json()
            .then(data => {
              setSessionToken(data.session_token ?? null)
            })
        }
      })
    
    onSend && onSend(phone)
    setCodeSent(true)
  }
  
  const getPhoneNumber = () => {
    return `+${phone}`
  }
  
  const sendCodeAgain = () => {
    if (codeCheckSent || codeCheckSuccess) return
    
    setSessionToken(null)
    sendCode()
  }

  const sendCodeToVerify = (code: string) => {
    const url = URLS_FOR_CODE_VERIFY_BY_TYPE[type]
    
    fetch(url, {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      body: JSON.stringify({
        phone_number: getPhoneNumber(),
        security_code: code,
        session_token: sessionToken
      }),
      headers: {
        mode: 'cors',
        'Content-Type': 'application/json',
        'X-CSRFToken': Cookies.get('csrftoken') || ''
      }
    })
      .then(res => {
        if (res.status === 200) {
          setCodeCheckSuccess(true)
          onCheckSuccess && onCheckSuccess()
        } else {
          setError(res.statusText)
          setCodeCheckSent(false)
        }
      })
      .catch(error => {
        setCodeCheckSent(false)
      })
  }
  
  const changeMobile = () => {
    setSessionToken(null)
    setError(null)
    setCodeCheckSent(false)
    setCodeSent(false)
    setCodeInputValue('')
  }
  
  React.useEffect(() => {
    console.log(codeInputValue.length !== 6 || codeCheckSent || codeCheckSuccess || !sessionToken)
    if (codeInputValue.length !== 6 || codeCheckSent || codeCheckSuccess || !sessionToken) return
    
    sendCodeToVerify(codeInputValue)
    setCodeCheckSent(true)
  }, [codeInputValue])
  
  if (codeCheckSuccess) {
    return <CodeCheckSuccessScreen className={className} />
  }
  
  return (
    <div className={`${styles.phoneLogin} ${className}`}>
      { codeSent ?
        <>
          <p className={styles.phoneLogin__infoHeading}>
            На ваш номер телефона был отправлен код подтверждения. Введите его в поле ниже.
          </p>
          <ReactCodeInput
            className={styles.phoneLogin__codeInput}
            ref={codeInputRef}
            forceUppercase
            name='sms-code-field'
            fields={6}
            type='text'
            value={codeInputValue}
            onChange={value => setCodeInputValue(value)}
            inputMode="full-width-latin"
          />
          { error &&
            <p className={styles.phoneLogin__error}>{error}</p>
          }
          <button onClick={sendCode} className={`${styles.phoneLogin__btn} ${styles.btn_accent}`}>Отправить повторно</button>
          <button onClick={changeMobile} className={`${styles.phoneLogin__btn} ${styles.btn_dark}`}>Изменить номер телефона</button>
        </>
        :
        <>
          <input
            className={styles.phoneLogin__input}
            type="tel"
            placeholder="Номер телефона"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          { error &&
            <p className={styles.phoneLogin__error}>{error}</p>
          }
          <button onClick={sendCode} className={`${styles.phoneLogin__btn} ${styles.btn_main}`}>Отправить код</button>
        </>
      }
      {children}
    </div>
  )
}

const CodeCheckSuccessScreen = ({className}: CodeCheckSuccessScreenProps) => {
  return (
    <div className={`${styles.phoneLogin} ${className}`}>
      <h1 className={styles.phoneLogin__statusMessage}>Код подтверждения успешно введен</h1>
    </div>
  )
}

export default PhoneLogin