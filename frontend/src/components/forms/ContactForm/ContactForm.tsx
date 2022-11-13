// global
import React from 'react'
// styles and icons
import './ContactForm.scss';

function ContactForm() {
  const [ sender, setSender ] = React.useState<string>('')
  const [ senderFeedback, setSenderFeedback ] = React.useState<string>('')
  const [ theme, setTheme ] = React.useState<string>('')
  const [ message, setMessage ] = React.useState<string>('')
  
  const sendLetter = () => {
  
  }
  
  return (
    <form className="contact-form">
      <h1 className="contact-form__heading">Связаться с нами</h1>
      <input
        type="text"
        className="contact-form__input"
        name="sender"
        placeholder="Отправитель"
        value={sender}
        onChange={(e) => setSender(e.target.value)}
      />
      <input
        type="text"
        className="contact-form__input"
        name="sender-feedback"
        placeholder="почта/телефон для ответа"
        value={senderFeedback}
        onChange={(e) => setSenderFeedback(e.target.value)}
      />
      <input
        type="text"
        className="contact-form__input"
        name="theme"
        placeholder="Тема"
        value={theme}
        onChange={(e) => setTheme(e.target.value)}
      />
      <textarea
        className="contact-form__message"
        name="message"
        placeholder="сообщение"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button className="contact-form__submit" onClick={sendLetter}>Отправить</button>
    </form>
  )
}

export default ContactForm
