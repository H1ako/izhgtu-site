import {IconName} from "@fortawesome/free-solid-svg-icons";

declare global {
  export interface CategoryLink {
    id: IdType,
    name: string,
    description: string,
    image?: string,
    icon?: IconName,
    href: string
  }
  
  export interface LinkCategory {
    id: IdType,
    name: string,
    links: CategoryLink[]
  }
}