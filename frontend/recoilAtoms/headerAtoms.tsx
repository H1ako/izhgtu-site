import {atom} from 'recoil';

export const headerActiveStateAtom = atom({
  key: 'headerActiveStateAtom',
  default: true,
})

export const headerBlockStateAtom = atom({
  key: 'headerBlockStateAtom',
  default: false,
})
