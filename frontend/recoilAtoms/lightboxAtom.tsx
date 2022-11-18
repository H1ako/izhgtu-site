import { atom } from 'recoil'

export const lightboxImageSrcAtom = atom<string>({
  key: 'lightboxImageSrc',
  default: '',
})