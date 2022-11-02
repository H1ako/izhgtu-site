import {IconName} from "@fortawesome/free-solid-svg-icons";

declare global {
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
    createdAt: string,
    updatedAt: string
  }
  
  interface EducationType extends Model{
    id: IdType,
    name: string,
    teachers: User[],
    faculties: Faculty[],
    specializations: Specialization[],
    groups: SpecializationGroup[]
  }
  
  interface Faculty extends Model {
    id: IdType,
    name: string,
    specializations: Specialization[],
    teachers: User[]
  }
  
  interface Specialization extends Model {
    id: IdType,
    name: string,
    faculty: Faculty,
    groups: SpecializationGroup[],
    teachers: User[]
  }
  
  interface SpecializationGroup extends Model {
    id: IdType,
    name: string,
    specialization: Specialization,
    teachers: User[],
    students: User[]
  }
  
  interface Achievement extends Model {
    id: IdType,
    name: string,
    reason: string,
  }
  
  interface UserTag extends Model {
    id: IdType,
    name: string,
    description: string | null
  }
  
  interface UserDocument extends Model {
    id: IdType,
    user: User,
    name: string,
    file: string,
    fileType: string,
  }
  
  interface User extends Model {
    id: IdType,
    firstName: string,
    role: string,
    lastName: string,
    fullName: string,
    picture: string,
    bgPicture: string,
    phone: string,
    email: string,
    achievements: Achievement[],
    documents: UserDocument[],
    tags: UserTag[]
  }
  
  interface Student extends User {
    group: SpecializationGroup[],
    specialization: Specialization,
    faculty: Faculty,
    educationType: EducationType
  }
  
  interface Teacher extends User {
    groups: SpecializationGroup[],
    educationTypes: EducationType[],
    specializations: Specialization[]
    faculties: Faculty[]
  }
  
  interface Entrant extends Model {
    applications: AdmissionApplication[]
  }
  
  interface AdmissionApplication {
    id: IdType,
    user: User,
    specialization: Specialization,
  }
  
  interface DateEventPost extends Model {
    id: IdType,
    name: string,
    author: User,
    dateEventShort: DateEvent
  }
  
  interface DateEvent extends Model {
    id: IdType,
    date: string,
    post: DateEventPost | null,
    description: string,
    image: string,
  }
}