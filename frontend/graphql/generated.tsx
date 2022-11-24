/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Page
// ====================================================

export interface Page_page_Page {
  __typename: "Page" | "TestPage";
  id: string | null;
  url: string | null;
  pageType: string | null;
}

export interface Page_page_HomePage_faceBg {
  __typename: "ImageObjectType";
  title: string;
  file: string;
}

export interface Page_page_HomePage_faceBody_BlockQuoteBlock {
  __typename: "BlockQuoteBlock" | "BooleanBlock" | "CharBlock" | "ChoiceBlock" | "DateBlock" | "DateTimeBlock" | "DecimalBlock" | "DocumentChooserBlock" | "EmailBlock" | "EmbedBlock" | "FloatBlock" | "ImageChooserBlock" | "IntegerBlock" | "ListBlock" | "PageChooserBlock" | "RawHTMLBlock" | "RegexBlock" | "RichTextBlock" | "SnippetChooserBlock" | "StaticBlock" | "StreamBlock" | "StreamFieldBlock" | "StructBlock" | "TextBlock" | "TimeBlock" | "URLBlock";
}

export interface Page_page_HomePage_faceBody_TextWithShortVariantBlock {
  __typename: "TextWithShortVariantBlock";
  blockType: string;
  text: string | null;
  shortText: string | null;
  size: string | null;
}

export type Page_page_HomePage_faceBody = Page_page_HomePage_faceBody_BlockQuoteBlock | Page_page_HomePage_faceBody_TextWithShortVariantBlock;

export interface Page_page_HomePage_quote_authorPicture {
  __typename: "ImageObjectType";
  title: string;
  file: string;
}

export interface Page_page_HomePage_quote {
  __typename: "Quote";
  id: string | null;
  author: string | null;
  authorPicture: Page_page_HomePage_quote_authorPicture | null;
  authorOccupation: string | null;
  text: any | null;
}

export interface Page_page_HomePage {
  __typename: "HomePage";
  id: string | null;
  url: string | null;
  pageType: string | null;
  faceBg: Page_page_HomePage_faceBg | null;
  faceBody: (Page_page_HomePage_faceBody | null)[] | null;
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
