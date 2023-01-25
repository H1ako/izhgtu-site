// global
import React from "react";
import ReactCodeInput from "react-code-input";
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
  const phoneInputRef = React.useRef<HTMLInputElement>(null)
  
  const sendCode = () => {
    if (!phoneInputRef.current) return
    
    onSend && onSend(phoneInputRef.current.value)
    setCodeSent(true)
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
        </>
        :
        <>
          <input
            className={styles.phoneLogin__input}
            type="tel"
            ref={phoneInputRef}
            placeholder="Номер телефона"
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