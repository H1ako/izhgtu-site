import dynamic from "next/dynamic";

const LAZY_PAGES = {
  'HomePage': dynamic(() => import('./HomePage/HomePage')),
  'BlogPostPage': dynamic(() => import('./BlogPostPage/BlogPostPage')),
  'BlogPostIndexPage': dynamic(() => import('./BlogPostIndexPage/BlogPostIndexPage')),
  'LoginPage': dynamic(() => import('./LoginPage/LoginPage')),
  'LoginNewUserPage': dynamic(() => import('./LoginNewUserPage/LoginNewUserPage')),
}

export default LAZY_PAGES