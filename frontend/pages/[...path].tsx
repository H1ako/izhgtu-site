// global
import React from "react";
// recoil
import {useSetRecoilState} from "recoil";
import {loadingScreenAtom} from "../recoilAtoms/loadingAtom";
import {settingsAtom} from "../recoilAtoms/settingsAtom";
// extra
import client from "../apollo-client";
import LAZY_PAGES from "../pagesComponents";
import {PAGE_GETTER_QUERY} from "../graphql/queries/pageQueries";
import {SETTINGS_GETTER_QUERY} from "../graphql/queries/settingsQueries";
// types
import type {GetServerSidePropsContext} from "next";
import type {
    Page,
    Page_page,
    PageVariables,
    Settings, Settings_settings,
    Settings_settings_MainContentSettings
} from "../graphql/generated";


interface CurrentPageProps {
    componentName: string | null,
    componentProps: Page_page | null,
    settings: Settings_settings[] | null
}


export default function CurrentPage({ componentName, componentProps, settings }: CurrentPageProps) {
    const setSettings = useSetRecoilState(settingsAtom)
    const setIsLoading = useSetRecoilState(loadingScreenAtom)
    // @ts-ignore
    const Component = LAZY_PAGES[componentName]
    
    
    React.useEffect(() => {
        if (componentName !== null) {
            setIsLoading(false)
        }
    }, [componentName])
    
    React.useEffect(() => {
        const refactoredSettings = getRefactoredSettings(settings)
        if (refactoredSettings) {
            setSettings((prev) => ({...prev, ...refactoredSettings}))
        }
    }, [settings])
    
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

    const propsForCurrentPage: CurrentPageProps = {
        componentName,
        componentProps: page,
        settings
    }
    
    return {
        props: propsForCurrentPage
    }
}

const getPageData = async (resolvedUrl: string) => {
    const url = getUrlWithoutQuery(resolvedUrl)
    
    const {data} = await client.query<Page, PageVariables>({
        query: PAGE_GETTER_QUERY,
        variables: {url}
    })
    return data
}

const getUrlWithoutQuery = (url: string) => {
    const urlWithoutQuery = url.split('?')[0]
    
    return urlWithoutQuery
}


const getSettingByType = (settings: Settings_settings[], type: string) => {
    const setting = settings.find((setting) => setting.__typename === type) ?? null
    
    return setting
}


const getRefactoredSettings = (settings: Settings_settings[] | null) => {
    if (!settings) return null
    const mainContentSettings = getSettingByType(settings, 'MainContentSettings') as Settings_settings_MainContentSettings
    
    return {
        mainContent: mainContentSettings
    }
}

const getSettings = async () => {
    const {data} = await client.query<Settings>({
        query: SETTINGS_GETTER_QUERY
    })
    return data.settings
}

