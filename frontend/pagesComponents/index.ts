import dynamic from "next/dynamic";

const LAZY_PAGES = {
  'HomePage': dynamic(() => import('./HomePage/HomePage')),
  'BlogPostPage': dynamic(() => import('./BlogPostPage/BlogPostPage')),
}

export default LAZY_PAGES