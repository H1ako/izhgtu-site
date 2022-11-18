import {atom} from 'recoil'

export const searchWindowStateAtom = atom<boolean>({
  key: 'searchWindowState',
  default: false
})