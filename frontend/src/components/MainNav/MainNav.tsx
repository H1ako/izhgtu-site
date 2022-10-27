// global
import React from 'react'
// styles and icons
import './MainNav.scss';
// components
import LinkGroup from "../LinkGroup/LinkGroup";

function MainNav() {
  const links: LinkCategory[] = [
    {
      id: 1,
      "name": "Университет",
      "links": [
        {
          id: 0,
          "href": "/union",
          "name": "Учебный Совет",
          "description": "Можно найти информацию об участниках совета и их контактах"
        },
        {
          id: 1,
          "href": "/union1",
          "name": "Учебный Совет1",
          "description": "1Можно найти информацию об участниках совета и их контактах"
        }
      ]
    },
    {
      id: 2,
      "name": "О Студентах",
      "links": [
        {
          id: 0,
          "href": "/union",
          "name": "Учебный Совет",
          "description": "Можно найти информацию об участниках совета и их контактах"
        },
        {
          id: 1,
          "href": "/union1",
          "name": "Учебный Совет1",
          "description": "1Можно найти информацию об участниках совета и их контактах"
        }
      ]
    },
    {
      id: 3,
      "name": "Образование",
      "links": [
        {
          id: 0,
          "href": "/union",
          "name": "Учебный Совет",
          "description": "Можно найти информацию об участниках совета и их контактах"
        },
        {
          id: 1,
          "href": "/union1",
          "name": "Учебный Совет1",
          "description": "1Можно найти информацию об участниках совета и их контактах"
        }
      ]
    },
    {
      id: 4,
      "name": "Наука",
      "links": [
        {
          id: 0,
          "href": "/union",
          "name": "Учебный Совет",
          "description": "Можно найти информацию об участниках совета и их контактах"
        },
        {
          id: 1,
          "href": "/union1",
          "name": "Учебный Совет1",
          "description": "1Можно найти информацию об участниках совета и их контактах"
        }
      ]
    },
    {
      id: 5,
      "name": "Международная Деятельность",
      "links": [
        {
          id: 0,
          "href": "/union",
          "name": "Учебный Совет",
          "description": "Можно найти информацию об участниках совета и их контактах"
        },
        {
          id: 1,
          "href": "/union1",
          "name": "Учебный Совет1",
          "description": "1Можно найти информацию об участниках совета и их контактах"
        }
      ]
    }
  ]
  
  return (
    <nav aria-label="main nav" className="main-nav">
      <ul className="main-nav__link-groups">
        { links.map(linkGroup => (
          <LinkGroup
            key={`link-group-${linkGroup.id}`}
            id={linkGroup.id}
            name={linkGroup.name}
            links={linkGroup.links}
          />
        ))}
      </ul>
    </nav>
  )
}

export default MainNav
