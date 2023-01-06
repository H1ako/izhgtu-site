// global
import {useRecoilValue} from "recoil";
// recoil
import {settingsAtom} from "../../recoilAtoms/settingsAtom";
// components
import UrlSvg from "../UrlSvg/UrlSvg";
// styles and icons
import styles from './AppLogo.module.scss';

interface AppLogoProps {
  className?: string
}

function AppLogo({className=''}: AppLogoProps) {
  const { mainContent }  = useRecoilValue(settingsAtom)
  
  // render a svg with src mainContent?.logo?.url
  return (
    <UrlSvg
      className={`${styles.appLogo} ${className}`}
      url={mainContent?.logo?.fullUrl ?? ''}
      alt="ИжГТУ"
    />
  )
}

export default AppLogo
