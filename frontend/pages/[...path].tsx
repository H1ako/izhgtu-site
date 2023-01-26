// global
import React from "react";
// recoil
import {useSetRecoilState} from "recoil";
import {loadingScreenAtom} from "../recoilAtoms/loadingAtom";
import {settingsAtom} from "../recoilAtoms/settingsAtom";
import {authUserAtom} from "../recoilAtoms/authUserrAtom";
// extra
import client from "../apollo-client";
import LAZY_PAGES from "../pagesComponents";
import {SETTINGS_GETTER_QUERY} from "../graphql/queries/settingsQueries";
import {PAGE_GETTER_QUERY} from "../graphql/queries/pageQueries";
import {AUTH_USER_GETTER_QUERY} from "../graphql/queries/userQueries";
// types
import type {GetServerSidePropsContext} from "next";
import type {
  AuthUser,
  AuthUser_authUser,
  Page,
  Page_page,
  PageVariables,
  Settings,
  Settings_settings,
  Settings_settings_MainContentSettings, Settings_settings_MainUrlsSettings
} from "../graphql/generated";

interface CurrentPageProps {
  componentName: string | null,
  componentProps: Page_page | null,
  settings: Settings_settings[] | null,
  authUser: AuthUser_authUser | null,
}

export default function CurrentPage({componentName, componentProps, settings, authUser}: CurrentPageProps) {
  const setSettings = useSetRecoilState(settingsAtom)
  const setIsLoading = useSetRecoilState(loadingScreenAtom)
  const setAuthUser = useSetRecoilState(authUserAtom)
  // @ts-ignore
  const Component = LAZY_PAGES[componentName]
  
  const setUser = (user: AuthUser_authUser | null) => {
    if (!authUser) return
    
    setAuthUser(authUser)
  }
  
  const updateSettings = () => {
    const refactoredSettings = getRefactoredSettings(settings)
    if (!refactoredSettings) return
    
    setSettings((prev) => ({...prev, ...refactoredSettings}))
  }
  
  React.useEffect(() => {
    if (!componentName === null) return
    
    setIsLoading(false)
  }, [componentName])
  
  React.useEffect(() => {
    updateSettings()
  }, [settings])
  
  React.useEffect(() => {
    setUser(authUser)
  }, [authUser])
  
  if (!Component) {
    return <h1>Component {componentName} not found</h1>
  }
  return <Component {...componentProps} />
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const pageData = await getPageData(context.resolvedUrl)
  const page = pageData.page
  const componentName = page?.pageType ?? null
  const settings = await getSettings()
  const authUser = await getAuthUser(context.req.headers.cookie)
  
  const propsForCurrentPage: CurrentPageProps = {
    componentName,
    componentProps: page,
    settings,
    authUser: authUser.authUser
  }
  
  return {
    props: propsForCurrentPage
  }
}

const getPageData = async (resolvedUrl: string) => {
  const url = getUrlWithoutQuery(resolvedUrl)
  
  const {data, errors} = await client.query<Page, PageVariables>({
    query: PAGE_GETTER_QUERY,
    variables: {url},
  })
  
  return data
}

const getUrlWithoutQuery = (url: string) => {
  const urlWithoutQuery = url.split('?')[0]
  
  return urlWithoutQuery
}

const getSettings = async () => {
  const {data, errors} = await client.query<Settings>({
    query: SETTINGS_GETTER_QUERY
  })
  
  return data.settings
}

const getSettingByType = (settings: Settings_settings[], type: string) => {
  const setting = settings.find((setting) => setting.__typename === type) ?? null
  
  return setting
}

const getRefactoredSettings = (settings: Settings_settings[] | null) => {
  if (!settings) return null
  
  const mainContentSettings = getSettingByType(settings, 'MainContentSettings') as Settings_settings_MainContentSettings
  const mainUrlsSettings = getSettingByType(settings, 'MainUrlsSettings') as Settings_settings_MainUrlsSettings
  
  return {
    mainContent: mainContentSettings,
    mainUrls: mainUrlsSettings
  }
}

const getAuthUser = async (cookie: string = '') => {
  const {data, errors} = await client.query<AuthUser>({
    query: AUTH_USER_GETTER_QUERY,
    context: {
      headers: {
        Cookie: cookie
      },
    }
  })
  
  return data
}
