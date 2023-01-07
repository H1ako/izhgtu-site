import {atom} from 'recoil';

export const headerActiveStateAtom = atom<boolean>({
  key: 'headerActiveStateAtom',
  default: true,
})

export const headerActiveHeaderWindowStateAtom = atom<null | IdType>({
  key: 'headerActiveHeaderWindowStateAtom',
  default: null,
})