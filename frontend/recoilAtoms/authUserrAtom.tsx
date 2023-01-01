// global
import {atom} from 'recoil';
// types
import {AuthUser_authUser} from "../graphql/generated";


export const authUserAtom = atom<null | AuthUser_authUser>({
    key: 'authUserAtom',
    default: null
})
