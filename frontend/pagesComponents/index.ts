import dynamic from "next/dynamic";

const LAZY_PAGES = {
  'HomePage': dynamic(() => import('./HomePage/HomePage')),
}

export default LAZY_PAGES