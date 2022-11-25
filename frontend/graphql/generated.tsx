/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Page
// ====================================================

export interface Page_page_Page {
  __typename: "Page";
  id: string | null;
  url: string | null;
  pageType: string | null;
}

export interface Page_page_HomePage_faceBg {
  __typename: "ImageObjectType";
  title: string;
  file: string;
}

export interface Page_page_HomePage_headings {
  __typename: "FaceHeading";
  id: number;
  text: string;
  shortText: string;
  size: string;
}

export interface Page_page_HomePage_quote_authorPicture {
  __typename: "ImageObjectType";
  title: string;
  file: string;
}

export interface Page_page_HomePage_quote {
  __typename: "Quote";
  author: string;
  authorPicture: Page_page_HomePage_quote_authorPicture | null;
  authorOccupation: string | null;
  text: any;
}

export interface Page_page_HomePage {
  __typename: "HomePage";
  id: string | null;
  url: string | null;
  pageType: string | null;
  faceBg: Page_page_HomePage_faceBg | null;
  headings: Page_page_HomePage_headings[];
  quote: Page_page_HomePage_quote | null;
}

export type Page_page = Page_page_Page | Page_page_HomePage;

export interface Page {
  page: Page_page | null;
}

export interface PageVariables {
  url: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

//==============================================================
// END Enums and Input Objects
//==============================================================
