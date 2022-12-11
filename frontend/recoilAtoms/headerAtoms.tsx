import {atom} from 'recoil';

export const headerActiveStateAtom = atom({
  key: 'headerActiveStateAtom',
  default: false,
})

export const headerMarqueeActiveStateAtom = atom({
  key: 'headerMarqueeActiveStateAtom',
  default: true,
})
