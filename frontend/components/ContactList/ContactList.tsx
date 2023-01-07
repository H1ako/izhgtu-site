// global
import React from 'react'
// styles and icons
import styles from './ContactList.module.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars} from "@fortawesome/free-solid-svg-icons";


interface Contact {
  __typename?: "Contact",
  id: number,
  type: string,
  address: string,
  name: string,
}
interface ContactListProps {
  className?: string,
  contacts: Contact[]
}

function ContactList({contacts, className=''}: ContactListProps) {
  return (
    <ul className={`${styles.contactList} ${className}`}>
      { contacts.map((contact) => (
        <li key={`contact-${contact.id}`} className={styles.contactList__contact}>
          { contact.type === 'email' ?
            <a href={`mailto:${contact.address}`} className={styles.contact__text}>
              {contact.address}
            </a>
          : contact.type === 'phone' ?
            <a href={`tel:${contact.address}`} className={styles.contact__text}>
              +{contact.address}
            </a>
          :
            <a rel="noreferrer" target="_blank" href={contact.address} className={styles.contact__text}>
              {contact.name}
            </a>
          }
        </li>
      ))}
    </ul>
  )
}

export default ContactList
