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
  onCheckSuccess?: (token: string) => void,
}

interface CodeCheckSuccessScreenProps {
  className?: string,
}

function PhoneLogin({className, children, onSend, onCodeSubmit, onCheckSuccess}: PhoneLoginProps) {
  const [ codeSent, setCodeSent ] = React.useState<boolean>(false)
  const [ codeCheckSent, setCodeCheckSent ] = React.useState<boolean>(false)
  const [ error, setError ] = React.useState<string | null>(null)
  const inputRef = React.useRef<any>(null)
  const [ phone, setPhone ] = React.useState<string>('')
  const [ codeInputValue, setCodeInputValue ] = React.useState<string>('')
  const [ codeCheckSuccess, setCodeCheckSuccess ] = React.useState<boolean>(false)
  
  const sendCode = () => {
    fetch('/api/auth/passwordless/mobile', {
      method: 'POST',
      body: JSON.stringify({
        mobile: getMobile()
      }),
      headers: {
        mode: 'cors',
        'Content-Type': 'application/json',
        'X-CSRFToken': Cookies.get('csrftoken') || ''
      }
    })
    
    onSend && onSend(phone)
    setCodeSent(true)
  }
  
  const sendCodeAgain = () => {
    if (codeCheckSent || codeCheckSuccess) return
    
    sendCode()
  }
  
  const getMobile = () => {
    return `+${phone}`
  }
  
  const sendCodeForCheck = (code: string) => {
    fetch('/api/auth/passwordless/token/', {
      method: 'POST',
      body: JSON.stringify({
        mobile: getMobile(),
        token: code
      }),
      headers: {
        mode: 'cors',
        'Content-Type': 'application/json',
        'X-CSRFToken': Cookies.get('csrftoken') || ''
      }
    })
      .then(res => {
        if (res.status === 200) {
          const data = res.json()
            .then(data => {
              const token = data.token
          
              setCodeCheckSuccess(true)
              onCheckSuccess && onCheckSuccess(token)
            })
        } else {
          setError(res.statusText)
          setCodeCheckSent(false)
        }
      })
  }
  
  React.useEffect(() => {
    if (codeInputValue.length !== 6 || codeCheckSent || codeCheckSuccess) return
    
    sendCodeForCheck(codeInputValue)
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
            ref={inputRef}
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
          <button onClick={() => setCodeSent(false)} className={`${styles.phoneLogin__btn} ${styles.btn_dark}`}>Изменить номер телефона</button>
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