import {IconName} from "@fortawesome/free-solid-svg-icons";

declare global {
  interface BasePageProps {
    id: IdType,
    pageType: string,
    url: string
  }
  
  interface CategoryLink {
    id: IdType,
    name: string,
    description: string,
    image?: string,
    icon?: IconName,
    href: string
  }
  
  interface LinkCategory {
    id: IdType,
    name: string,
    links: CategoryLink[]
  }
  
  interface Model {
    id: IdType,
    createdAt: string,
    updatedAt: string
  }
  
  interface Subject {
    name: string
  }
  
  interface EducationType extends Model{
    name: string,
    faculties: Faculty[],
  }
  
  interface Faculty extends Model {
    name: string,
    educationType: EducationType,
    specializations: Specialization[],
  }
  
  interface Specialization extends Model {
    name: string,
    faculty: Faculty,
    groups: SpecializationGroup[],
  }
  
  interface SpecializationGroup extends Model {
    name: string,
    specialization: Specialization,
    teachers: Teacher[],
    students: Student[],
    subjects: Subject[]
  }
  
  interface Achievement extends Model {
    name: string,
    reason: string,
  }
  
  interface UserTag extends Model {
    users: User[],
    name: string,
    description: string | null
  }
  
  interface UserDocument extends Model {
    user: User,
    name: string,
    file: string,
    fileType: string,
  }
  
  interface User extends Model {
    firstName: string,
    lastName: string,
    patronymic: string,
    fullName: string,
    picture: string,
    bgPicture: string,
    phone: string,
    email: string,
    isStaff: boolean,
    isSuperuser: boolean,
    achievements: Achievement[],
    documents: UserDocument[],
    tags: UserTag[]
  }
  
  interface Student extends User {
    group: SpecializationGroup[],
    specialization: Specialization,
  }
  
  interface Teacher extends User {
    groups: SpecializationGroup[],
    subjects: Subject[]
  }
  
  interface Entrant extends User {
    applications: AdmissionApplication[]
  }
  
  interface AdmissionApplication extends Model {
    entrant: Entrant,
    specialization: Specialization,
  }
  
  interface Post extends Model {
    author: User,
    link: string,
  }
  
  interface DateEvent extends Model {
    name: string,
    description: string,
    picture: string,
    date: string,
    post: Post | null,
  }
  
  interface News {
    id: IdType,
    title: string,
    picture: string | null,
    date: string,
    postLink: string | null,
  }
}