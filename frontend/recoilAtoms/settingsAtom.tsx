import {atom, selector} from 'recoil'
// types
import {
  Settings_settings,
  Settings_settings_MainContentSettings, Settings_settings_MainUrlsSettings,
} from "../graphql/generated"


interface SettingsAtom {
  mainContent: Settings_settings_MainContentSettings | null,
  mainUrls: Settings_settings_MainUrlsSettings | null,
}


export const settingsAtom = atom<SettingsAtom>({
  key: 'settingsAtom',
  default:  {
    mainContent: null,
    mainUrls: null,
  }
})