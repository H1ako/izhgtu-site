import dynamic from "next/dynamic";

const LAZY_PAGES = {
  'HomePage': dynamic(() => import('./HomePage')),
  'InfoPage': dynamic(() => import('./InfoPage'))
}

export default LAZY_PAGES