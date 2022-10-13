// global
import React from 'react'
// styles and icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import './Search.scss';

function Search() {
  const [ isActive, setIsActive ] = React.useState<boolean>(false)
  const [ query, setQuery ] = React.useState<string>('')

  return (
      <div className="search">
        <button className="search__btn" onClick={() => setIsActive(state => !state)}>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
          Search
        </button>
        { isActive &&
          <div className="search__area" onKeyUp={console.log}>
            <input
                autoFocus={true}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                type="search"
                className="area__input"
                placeholder="Введите запрос..."
            />
          </div>
        }
      </div>
  )
}

export default Search
