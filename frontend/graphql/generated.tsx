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
  url: string;
}

export interface Page_page_HomePage_headings {
  __typename: "FaceHeading";
  id: number;
  text: string;
  shortText: string;
  size: string;
}

export interface Page_page_HomePage_moreInfoCarousel_BlockQuoteBlock {
  __typename: "BlockQuoteBlock" | "BooleanBlock" | "CharBlock" | "ChoiceBlock" | "DateBlock" | "DateTimeBlock" | "DecimalBlock" | "DocumentChooserBlock" | "EmailBlock" | "EmbedBlock" | "FloatBlock" | "ImageChooserBlock" | "IntegerBlock" | "ListBlock" | "PageChooserBlock" | "RawHTMLBlock" | "RegexBlock" | "RichTextBlock" | "SnippetChooserBlock" | "StaticBlock" | "StreamBlock" | "StreamFieldBlock" | "StructBlock" | "TextBlock" | "TimeBlock" | "URLBlock";
}

export interface Page_page_HomePage_moreInfoCarousel_VideoBlock_video {
  __typename: "MediaObjectType";
  title: string;
  url: string;
  thumbnail: string;
}

export interface Page_page_HomePage_moreInfoCarousel_VideoBlock {
  __typename: "VideoBlock";
  id: string | null;
  video: Page_page_HomePage_moreInfoCarousel_VideoBlock_video;
}

export interface Page_page_HomePage_moreInfoCarousel_PictureBlock_picture {
  __typename: "ImageObjectType";
  title: string;
  url: string;
}

export interface Page_page_HomePage_moreInfoCarousel_PictureBlock {
  __typename: "PictureBlock";
  id: string | null;
  link: string | null;
  picture: Page_page_HomePage_moreInfoCarousel_PictureBlock_picture;
}

export type Page_page_HomePage_moreInfoCarousel = Page_page_HomePage_moreInfoCarousel_BlockQuoteBlock | Page_page_HomePage_moreInfoCarousel_VideoBlock | Page_page_HomePage_moreInfoCarousel_PictureBlock;

export interface Page_page_HomePage_quote_authorPicture {
  __typename: "ImageObjectType";
  title: string;
  url: string;
}

export interface Page_page_HomePage_quote {
  __typename: "Quote";
  title: string;
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
  faceBg: Page_page_HomePage_faceBg;
  headings: Page_page_HomePage_headings[];
  moreInfoCarousel: (Page_page_HomePage_moreInfoCarousel | null)[] | null;
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
