// types
import {
  AuthUser_authUser,
  AuthUser_authUser_profile_contacts,
  Settings_settings_MainUrlsSettings
} from "../../graphql/generated";
import {FC, SetStateAction} from "react";

export interface ProfileProps {
  className?: string
}

export interface ToggleButtonProps {
  user: AuthUser_authUser | null,
  toggle?: () => void
}

export interface ProfileHeaderProps {
  user: AuthUser_authUser | null,
}

export interface ProfileBodyProps {
  user: AuthUser_authUser | null,
}

export interface ProfileBodyLeftSideProps {
  user: AuthUser_authUser | null,
  tabsData: TabsData,
}

export interface ProfileBodyRightSideProps {
  user: AuthUser_authUser | null,
  setTabsData: React.Dispatch<React.SetStateAction<TabsData>>
}

export interface ProfileBodyContentProps {
  currentTabId: number,
  user: AuthUser_authUser | null,
  setTabsData: React.Dispatch<React.SetStateAction<TabsData>>
}

export interface NavTabLayoutProps {
  children: React.ReactNode,
  className?: string,
  isActive: boolean,
}

export interface NavTabProps {
  user: AuthUser_authUser | null,
  isActive: boolean,
  setTabsData: React.Dispatch<React.SetStateAction<TabsData>>
}

interface TabPanelProps {
  setTabsData: React.Dispatch<React.SetStateAction<TabsData>>
}

export interface InfoTabMainInfoPanelProps {
  user: AuthUser_authUser | null,
}

export interface InfoTabAboutPanelProps extends TabPanelProps {
  about?: string | null,
}

export interface InfoTabContactsPanelProps extends TabPanelProps {
  initialContacts?: AuthUser_authUser_profile_contacts[] | null,
  user: AuthUser_authUser | null,
}

export interface InfoTabContactsContactProps {
  value: string,
  title: string,
  id: IdType,
  remove: (id: IdType) => void,
}

export interface SettingsTabPasswordPanelProps {
  passwordRef?: React.RefObject<HTMLDivElement>
}

export interface SettingsTabAuthContactsPanelProps {
  contactsRef?: React.RefObject<HTMLDivElement>
}

export interface ProfileAchievementProps {
  id: IdType,
  title: string,
  description: string | null,
  icon: any,
  showInProfile: boolean,
}

export interface ProfileUserCardProps {
  name: string,
  email: string,
  phone?: string | null,
  picture?: string | null,
  roles?: string[] | null,
  profileUrl: string,
}

export interface TabsData {
  getAchievements?: () => IdType[],
  getAbout?: () => string | null,
  getContacts?: () => InfoTabContactsContact[],
  getAuthContacts?: () => SettingsAuthContact[],
  getPasswords?: () => SettingsPassword[],
}

export interface SettingsAuthContact {
  name: string,
  value: string,
}

export interface SettingsPassword {
  name: string,
  value: string,
}

export interface NavTab {
  id: number,
  title: string,
  component: FC<NavTabProps>
}

export interface ActiveTabWidthAndLeft {
  width: number,
  left: number
}

export interface InfoTabContactsContact {
  id: IdType,
  title: string,
  value: string,
  __typename?: "UserContact"
}