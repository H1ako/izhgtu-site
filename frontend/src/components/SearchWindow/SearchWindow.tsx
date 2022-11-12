// global
import React from 'react'
// recoil
import {useRecoilState} from "recoil";
import {searchWindowStateAtom} from "../../recoilAtoms/searchAtom";
// components
import ModalAreaLayout from "../../containers/ModalAreaLayout/ModalAreaLayout";
// styles and icons
import './SearchWindow.scss';

function SearchWindow() {
  const [ isActive, setIsActive ] = useRecoilState(searchWindowStateAtom)
  const [ query, setQuery ] = React.useState<string>('')

  const closeWindow = (e: React.KeyboardEvent) => {
    if (!isActive || e.key !== 'Escape') return

    setIsActive(false)
  }

  return (
    <ModalAreaLayout isActive={isActive} onKeyUp={closeWindow} onClose={() => setIsActive(false)}>
      <input
        autoFocus={true}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        type="search"
        className="search__input"
        placeholder="Введите запрос..."
      />
    </ModalAreaLayout>
  )
}

export default SearchWindow
