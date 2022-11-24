// global
import {useEffect} from "react";
import type {GetServerSidePropsContext} from "next";
// recoil
import {useSetRecoilState} from "recoil";
import {loadingScreenAtom} from "../recoilAtoms/loadingAtom";
// extra
import client from "../apollo-client";
import LAZY_PAGES from "../pagesComponents";
import {PAGE_GETTER_QUERY} from "../graphql/queries/pageQueries";
// types
import {Page, Page_page, PageVariables} from "../graphql/generated";


interface CurrentPageProps {
    componentName: string | null,
    componentProps: Page_page | null
}

export default function CurrentPage({ componentName, componentProps }: CurrentPageProps) {
    const setIsLoading = useSetRecoilState(loadingScreenAtom)
    
    // @ts-ignore
    const Component = LAZY_PAGES[componentName];
    
    useEffect(() => {
        if (componentName !== null) {
            setIsLoading(false)
        }
    }, [componentName])
    
    if (!Component) {
        return <h1>Component {componentName} not found</h1>;
    }
    return <Component {...componentProps} />;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const url = context.resolvedUrl.split('?')[0]
    const queryData = await client.query<Page, PageVariables>({
      query: PAGE_GETTER_QUERY,
        variables: {
            url
        },
    })
    const pageData = queryData.data.page
    const componentName = pageData?.pageType ?? null

    const propsForCurrentPage: CurrentPageProps = {
        componentName,
        componentProps: pageData
    }
    
    return {
        props: propsForCurrentPage
    }
}