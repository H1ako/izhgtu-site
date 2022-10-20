// styles and icons
import './AppLogo.scss';
import logo from '../../static/svg/istu-logo.svg'

interface Props {
  className?: string
}

function AppLogo({className=''}: Props) {
  return (
    <img
      className={`app-logo ${className}`}
      src={logo}
      alt="ИжГТУ"
    />
  )
}

export default AppLogo
