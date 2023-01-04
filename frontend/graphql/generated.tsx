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

export interface Page_page_HomePage_lastNews_post {
  __typename: "Page" | "HomePage" | "BlogPostIndexPage" | "BlogPostPage";
  url: string | null;
}

export interface Page_page_HomePage_lastNews_picture {
  __typename: "ImageObjectType";
  url: string;
  title: string;
}

export interface Page_page_HomePage_lastNews {
  __typename: "News";
  id: number;
  title: string;
  createdAt: string;
  post: Page_page_HomePage_lastNews_post | null;
  picture: Page_page_HomePage_lastNews_picture | null;
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
  __typename: "BlockQuoteBlock" | "BooleanBlock" | "CharBlock" | "ChoiceBlock" | "DateBlock" | "DateTimeBlock" | "DecimalBlock" | "DocumentChooserBlock" | "EmailBlock" | "EmbedBlock" | "FloatBlock" | "FooterMenuLinkPage" | "FooterMenuLinkUrl" | "ImageChooserBlock" | "IntegerBlock" | "ListBlock" | "PageChooserBlock" | "RawHTMLBlock" | "RegexBlock" | "RichTextBlock" | "SnippetChooserBlock" | "StaticBlock" | "StreamBlock" | "StreamFieldBlock" | "StructBlock" | "TextBlock" | "TimeBlock" | "URLBlock";
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
  lastNews: Page_page_HomePage_lastNews[];
  faceBg: Page_page_HomePage_faceBg;
  headings: Page_page_HomePage_headings[];
  moreInfoCarousel: (Page_page_HomePage_moreInfoCarousel | null)[] | null;
  quote: Page_page_HomePage_quote | null;
}

export interface Page_page_BlogPostPage_postPicture {
  __typename: "ImageObjectType";
  title: string;
  url: string;
}

export interface Page_page_BlogPostPage_postAuthor {
  __typename: "User";
  id: number;
  fullName: string;
  pictureUrl: string | null;
}

export interface Page_page_BlogPostPage_postTags {
  __typename: "TagObjectType";
  id: string;
  name: string;
}

export interface Page_page_BlogPostPage_postCategory {
  __typename: "BlogPostCategory";
  name: string;
  slug: string;
}

export interface Page_page_BlogPostPage {
  __typename: "BlogPostPage";
  id: string | null;
  url: string | null;
  pageType: string | null;
  postPicture: Page_page_BlogPostPage_postPicture | null;
  postAuthor: Page_page_BlogPostPage_postAuthor | null;
  postTags: (Page_page_BlogPostPage_postTags | null)[] | null;
  postCategory: Page_page_BlogPostPage_postCategory | null;
  postBody: any | null;
  postTitle: string;
}

export interface Page_page_BlogPostIndexPage_facePicture {
  __typename: "ImageObjectType";
  url: string;
  title: string;
}

export interface Page_page_BlogPostIndexPage_filters_values {
  __typename: "FilterValueType";
  name: string;
  value: string;
}

export interface Page_page_BlogPostIndexPage_filters {
  __typename: "FilterType";
  type: FilterTypeType;
  name: string;
  slug: string;
  values: Page_page_BlogPostIndexPage_filters_values[];
}

export interface Page_page_BlogPostIndexPage {
  __typename: "BlogPostIndexPage";
  id: string | null;
  url: string | null;
  pageType: string | null;
  faceTitle: string | null;
  facePicture: Page_page_BlogPostIndexPage_facePicture | null;
  filters: Page_page_BlogPostIndexPage_filters[];
}

export type Page_page = Page_page_Page | Page_page_HomePage | Page_page_BlogPostPage | Page_page_BlogPostIndexPage;

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

// ====================================================
// GraphQL query operation: BlogPosts
// ====================================================

export interface BlogPosts_blogPosts_items_postPicture {
  __typename: "ImageObjectType";
  url: string;
  title: string;
}

export interface BlogPosts_blogPosts_items_postTags {
  __typename: "TagObjectType";
  id: string;
  name: string;
}

export interface BlogPosts_blogPosts_items_postCategory {
  __typename: "BlogPostCategory";
  id: string | null;
  name: string;
}

export interface BlogPosts_blogPosts_items {
  __typename: "BlogPostPage";
  id: string | null;
  url: string;
  postPicture: BlogPosts_blogPosts_items_postPicture | null;
  postTitle: string;
  postTags: (BlogPosts_blogPosts_items_postTags | null)[] | null;
  firstPublishedAt: any | null;
  postCategory: BlogPosts_blogPosts_items_postCategory | null;
}

export interface BlogPosts_blogPosts_pagination {
  __typename: "PaginationType";
  count: any;
  totalPages: any;
  perPage: any;
  prevPage: any | null;
  nextPage: any | null;
  total: any;
  currentPage: any;
}

export interface BlogPosts_blogPosts {
  __typename: "BlogPostPagePaginatedType";
  items: BlogPosts_blogPosts_items[] | null;
  pagination: BlogPosts_blogPosts_pagination | null;
}

export interface BlogPosts {
  blogPosts: BlogPosts_blogPosts | null;
}

export interface BlogPostsVariables {
  perPage?: any | null;
  page?: any | null;
  tags?: string[] | null;
  categories?: number[] | null;
  authors?: number[] | null;
  searchQuery?: string | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Settings
// ====================================================

export interface Settings_settings_SocialSettings {
  __typename: "SocialSettings";
}

export interface Settings_settings_MainContentSettings_logo {
  __typename: "SvgTyped";
  url: string;
  title: string;
}

export interface Settings_settings_MainContentSettings_header_menu_linksGroups_page {
  __typename: "Page" | "HomePage" | "BlogPostIndexPage" | "BlogPostPage";
  url: string | null;
}

export interface Settings_settings_MainContentSettings_header_menu_linksGroups_linksGroups_page {
  __typename: "Page" | "HomePage" | "BlogPostIndexPage" | "BlogPostPage";
  url: string | null;
}

export interface Settings_settings_MainContentSettings_header_menu_linksGroups_linksGroups_linksGroups_page {
  __typename: "Page" | "HomePage" | "BlogPostIndexPage" | "BlogPostPage";
  url: string | null;
}

export interface Settings_settings_MainContentSettings_header_menu_linksGroups_linksGroups_linksGroups {
  __typename: "MenuItemLink";
  url: string | null;
  name: string;
  page: Settings_settings_MainContentSettings_header_menu_linksGroups_linksGroups_linksGroups_page | null;
  openInNewTab: boolean | null;
}

export interface Settings_settings_MainContentSettings_header_menu_linksGroups_linksGroups {
  __typename: "MenuItemLinkGroup";
  url: string | null;
  name: string;
  page: Settings_settings_MainContentSettings_header_menu_linksGroups_linksGroups_page | null;
  openInNewTab: boolean | null;
  linksGroups: Settings_settings_MainContentSettings_header_menu_linksGroups_linksGroups_linksGroups[] | null;
}

export interface Settings_settings_MainContentSettings_header_menu_linksGroups {
  __typename: "MenuItem";
  url: string | null;
  name: string;
  page: Settings_settings_MainContentSettings_header_menu_linksGroups_page | null;
  openInNewTab: boolean | null;
  linksGroups: Settings_settings_MainContentSettings_header_menu_linksGroups_linksGroups[] | null;
}

export interface Settings_settings_MainContentSettings_header_menu {
  __typename: "Menu";
  id: string | null;
  title: string;
  linksGroups: Settings_settings_MainContentSettings_header_menu_linksGroups[];
}

export interface Settings_settings_MainContentSettings_header_locations {
  __typename: "Location";
  id: number;
  name: string;
  address: string;
  description: string | null;
}

export interface Settings_settings_MainContentSettings_header_contacts {
  __typename: "Contact";
  id: number;
  name: string;
  address: string;
  type: string;
}

export interface Settings_settings_MainContentSettings_header_socials_icon {
  __typename: "SvgTyped";
  url: string;
  title: string;
}

export interface Settings_settings_MainContentSettings_header_socials {
  __typename: "Social";
  id: number;
  name: string;
  url: string;
  icon: Settings_settings_MainContentSettings_header_socials_icon | null;
}

export interface Settings_settings_MainContentSettings_header {
  __typename: "Header";
  name: string;
  menu: Settings_settings_MainContentSettings_header_menu | null;
  showLastNewsMarquee: boolean;
  locations: Settings_settings_MainContentSettings_header_locations[];
  contacts: Settings_settings_MainContentSettings_header_contacts[];
  socials: Settings_settings_MainContentSettings_header_socials[];
}

export interface Settings_settings_MainContentSettings_footer_socials_icon {
  __typename: "SvgTyped";
  url: string;
  title: string;
}

export interface Settings_settings_MainContentSettings_footer_socials {
  __typename: "Social";
  id: number;
  name: string;
  url: string;
  icon: Settings_settings_MainContentSettings_footer_socials_icon | null;
}

export interface Settings_settings_MainContentSettings_footer_menu_BlockQuoteBlock {
  __typename: "BlockQuoteBlock" | "BooleanBlock" | "CharBlock" | "ChoiceBlock" | "DateBlock" | "DateTimeBlock" | "DecimalBlock" | "DocumentChooserBlock" | "EmailBlock" | "EmbedBlock" | "FloatBlock" | "ImageChooserBlock" | "IntegerBlock" | "ListBlock" | "PageChooserBlock" | "PictureBlock" | "RawHTMLBlock" | "RegexBlock" | "RichTextBlock" | "SnippetChooserBlock" | "StaticBlock" | "StreamBlock" | "StreamFieldBlock" | "StructBlock" | "TextBlock" | "TimeBlock" | "URLBlock" | "VideoBlock";
}

export interface Settings_settings_MainContentSettings_footer_menu_FooterMenuLinkUrl {
  __typename: "FooterMenuLinkUrl";
  id: string | null;
  name: string;
  url: string;
}

export interface Settings_settings_MainContentSettings_footer_menu_FooterMenuLinkPage_page {
  __typename: "Page" | "HomePage" | "BlogPostIndexPage" | "BlogPostPage";
  url: string | null;
}

export interface Settings_settings_MainContentSettings_footer_menu_FooterMenuLinkPage {
  __typename: "FooterMenuLinkPage";
  id: string | null;
  name: string;
  page: Settings_settings_MainContentSettings_footer_menu_FooterMenuLinkPage_page;
}

export type Settings_settings_MainContentSettings_footer_menu = Settings_settings_MainContentSettings_footer_menu_BlockQuoteBlock | Settings_settings_MainContentSettings_footer_menu_FooterMenuLinkUrl | Settings_settings_MainContentSettings_footer_menu_FooterMenuLinkPage;

export interface Settings_settings_MainContentSettings_footer {
  __typename: "Footer";
  name: string;
  rightDescription: any | null;
  showContactForm: boolean;
  socials: Settings_settings_MainContentSettings_footer_socials[];
  menu: (Settings_settings_MainContentSettings_footer_menu | null)[] | null;
}

export interface Settings_settings_MainContentSettings {
  __typename: "MainContentSettings";
  yandexMapUrl: string | null;
  orgName: string | null;
  shortOrgName: string | null;
  logo: Settings_settings_MainContentSettings_logo | null;
  header: Settings_settings_MainContentSettings_header | null;
  footer: Settings_settings_MainContentSettings_footer | null;
}

export type Settings_settings = Settings_settings_SocialSettings | Settings_settings_MainContentSettings;

export interface Settings {
  settings: Settings_settings[];
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AuthUser
// ====================================================

export interface AuthUser_authUser_student_studentCard {
  __typename: "StudentCard";
  cardId: string;
}

export interface AuthUser_authUser_student_group_educationForm {
  __typename: "EducationForm";
  name: string;
}

export interface AuthUser_authUser_student_group_specialization_faculty_educationType {
  __typename: "EducationType";
  name: string;
}

export interface AuthUser_authUser_student_group_specialization_faculty {
  __typename: "Faculty";
  name: string;
  educationType: AuthUser_authUser_student_group_specialization_faculty_educationType | null;
}

export interface AuthUser_authUser_student_group_specialization {
  __typename: "Specialization";
  name: string;
  faculty: AuthUser_authUser_student_group_specialization_faculty | null;
}

export interface AuthUser_authUser_student_group_leader {
  __typename: "User";
  fullName: string;
  isTeacher: boolean;
}

export interface AuthUser_authUser_student_group_subjects {
  __typename: "Subject";
  id: string | null;
  name: string;
}

export interface AuthUser_authUser_student_group {
  __typename: "SpecializationGroup";
  name: string | null;
  year: number | null;
  educationForm: AuthUser_authUser_student_group_educationForm | null;
  specialization: AuthUser_authUser_student_group_specialization | null;
  leader: AuthUser_authUser_student_group_leader | null;
  subjects: AuthUser_authUser_student_group_subjects[];
}

export interface AuthUser_authUser_student {
  __typename: "Student";
  id: string | null;
  studentCard: AuthUser_authUser_student_studentCard;
  group: AuthUser_authUser_student_group;
}

export interface AuthUser_authUser_teacher_subjects {
  __typename: "Subject";
  id: string | null;
  name: string;
}

export interface AuthUser_authUser_teacher_groups {
  __typename: "SpecializationGroup";
  id: string | null;
  name: string | null;
}

export interface AuthUser_authUser_teacher {
  __typename: "Teacher";
  subjects: AuthUser_authUser_teacher_subjects[];
  groups: AuthUser_authUser_teacher_groups[];
}

export interface AuthUser_authUser_entrant {
  __typename: "Entrant";
  id: string | null;
}

export interface AuthUser_authUser_tags {
  __typename: "UserTag";
  id: string | null;
  name: string;
  description: any | null;
}

export interface AuthUser_authUser {
  __typename: "UserType";
  id: string;
  fullName: string;
  email: string;
  phone: string | null;
  isEntrant: boolean;
  isStudent: boolean;
  isTeacher: boolean;
  pictureUrl: string | null;
  bgPictureUrl: string | null;
  student: AuthUser_authUser_student | null;
  teacher: AuthUser_authUser_teacher | null;
  entrant: AuthUser_authUser_entrant | null;
  tags: AuthUser_authUser_tags[];
}

export interface AuthUser {
  authUser: AuthUser_authUser | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum FilterTypeType {
  CHECKBOX = "CHECKBOX",
  DATE = "DATE",
}

//==============================================================
// END Enums and Input Objects
//==============================================================
