import { atom } from 'recoil'

export const loadingScreenAtom = atom<boolean>({
  key: 'loadingScreenAtom',
  default: true,
})