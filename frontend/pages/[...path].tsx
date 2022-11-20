import type {GetServerSidePropsContext} from "next";
import LAZY_PAGES from "../pagesComponents";
import client from "../apollo-client";
import gql from "graphql-tag";
import {useSetRecoilState} from "recoil";
import {loadingScreenAtom} from "../recoilAtoms/loadingAtom";
import {useEffect} from "react";

interface CurrentPageProps {
    componentName: string,
    componentProps: any
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
    
    // useEffect(() => {
    //
    // }, [componentProps])
    
    if (!Component) {
        return <h1>Component {componentName} not found</h1>;
    }
    return <Component {...componentProps} />;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const url = context.req.url
    const pageData = await client.query({
      query: gql`
        query Page($url: String!) {
            page (urlPath: $url) {
                id
                url
                pageType
            }
        }
      `,
        variables: {
            url
        }
    })
    const componentName = pageData?.data?.page?.pageType ?? null

    const propsForCurrentPage: CurrentPageProps = {
        componentName,
        componentProps: pageData?.data?.page ?? null
    }
    
    return {
        props: propsForCurrentPage
    }
}