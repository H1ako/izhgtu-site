import {atom, selector} from 'recoil'
// types
import {
  Settings_settings,
  Settings_settings_MainContentSettings,
} from "../graphql/generated"


interface SettingsAtom {
  mainContent: Settings_settings_MainContentSettings | null
}


export const settingsAtom = atom<SettingsAtom>({
  key: 'settingsAtom',
  default:  {
    mainContent: null
  }
})