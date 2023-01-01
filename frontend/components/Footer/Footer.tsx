// global
import React from 'react'
import Link from "next/link";
import {useRecoilValue} from "recoil";
// recoil
import {settingsAtom} from "../../recoilAtoms/settingsAtom";
// components
import ContactForm from "../forms/ContactForm/ContactForm";
import SocialList from "../SocialList/SocialList";
import InnerBlockHeading from "../InnerBlockHeading/InnerBlockHeading";
// styles and icons
import styles from './Footer.module.scss';
// types
import {Settings_settings_MainContentSettings_footer_menu} from "../../graphql/generated";

interface FooterNavProps {
  menu: (Settings_settings_MainContentSettings_footer_menu | null)[]
}

function Footer() {
  const {mainContent} = useRecoilValue(settingsAtom)
  
  return (
      <footer className={styles.mainFooter}>
        <InnerBlockHeading className={styles.mainFooter__heading}>
          {mainContent?.shortOrgName ?? 'ИЖГТУ'}
        </InnerBlockHeading>
        <div className={styles.mainFooter__content}>
          <div className={styles.content__leftSide}>
            { mainContent?.footer?.menu ?
              <FooterNav menu={mainContent.footer.menu} />
              : null
            }
            { mainContent?.footer?.socials.length ?
              <SocialList socials={mainContent.footer.socials} />
              : null
            }
          </div>
          { mainContent?.footer?.showContactForm ?
            <ContactForm />
            : null
          }
        </div>
        <div className={styles.mainFooter__rights} dangerouslySetInnerHTML={{__html: mainContent?.footer?.rightDescription}} />
        <h5 className={styles.mainFooter__siteDeveloper}>
          developed by sobolev nikita
        </h5>
      </footer>
  )
}

function FooterNav({menu}: FooterNavProps) {
  return (
    <nav className={styles.leftSide__usefulLinks}>
      <ul className={styles.usefulLinks__list}>
        {menu.map((link) => {
          if (!link) return <></>
          else if (link.__typename === 'FooterMenuLinkUrl') {
            return (
              <li key={`footer-link-${link.id ?? link.name}`}>
                <Link className={styles.list__link} href={link.url}>{link.name}</Link>
              </li>
            )
          }
          else if (link.__typename === 'FooterMenuLinkPage') {
            return (
              <li key={`footer-link-${link.id ?? link.name}`}>
                <Link className={styles.list__link} href={link.page.url ?? ''}>{link.name}</Link>
              </li>
            )
          }
        })}
      </ul>
    </nav>
  )
}

export default Footer
