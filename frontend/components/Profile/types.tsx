// types
import {
  AuthUser_authUser,
  AuthUser_authUser_profile_contacts,
  Settings_settings_MainUrlsSettings
} from "../../graphql/generated";
import {FC} from "react";

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
  mainUrls: Settings_settings_MainUrlsSettings | null,
}

export interface ProfileBodyRightSideProps {
  user: AuthUser_authUser | null,
}

export interface ProfileBodyContentProps {
  currentTabId: number,
  user: AuthUser_authUser | null
}

export interface NavTabLayoutProps {
  children: React.ReactNode,
  className?: string,
  isActive: boolean,
}

export interface NavTabProps {
  user: AuthUser_authUser | null,
  isActive: boolean,
}

export interface InfoTabMainInfoPanelProps {
  user: AuthUser_authUser | null,
}

export interface InfoTabAboutPanelProps {
  about?: string | null,
}

export interface InfoTabContactsPanelProps {
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