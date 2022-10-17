// global
import React from 'react'
// styles and icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import './Search.scss';
// components
import ModalAreaLayout from "../../containers/ModalAreaLayout/ModalAreaLayout";

function Search() {
  const [ isActive, setIsActive ] = React.useState<boolean>(false)
  const [ query, setQuery ] = React.useState<string>('')

  const closeWindow = (e: React.KeyboardEvent) => {
    if (!isActive || e.key !== 'Escape') return

    setIsActive(false)
  }

  return (
    <div className="search" onKeyUp={closeWindow}>
      <button className="search__btn" onClick={() => setIsActive(state => !state)}>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
        Поиск
      </button>
      { isActive &&
        <ModalAreaLayout onClose={() => setIsActive(false)}>
          <input
            autoFocus={true}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="search"
            className="search__input"
            placeholder="Введите запрос..."
          />
        </ModalAreaLayout>
      }
    </div>
  )
}

export default Search
