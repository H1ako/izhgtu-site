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
}

function PhoneLogin({className, children, onSend, onCodeSubmit}: PhoneLoginProps) {
  const [ codeSent, setCodeSent ] = React.useState<boolean>(false)
  const [ error, setError ] = React.useState<string | null>(null)
  const inputRef = React.useRef(null)
  const [ phone, setPhone ] = React.useState<string>('')
  
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
  
  const getMobile = () => {
    return `+${phone}`
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

export default PhoneLogin