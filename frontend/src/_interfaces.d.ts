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
  
  interface Subject {
    id: IdType,
    name: string
  }
  
  interface EducationType extends Model{
    id: IdType,
    name: string,
    faculties: Faculty[],
  }
  
  interface Faculty extends Model {
    id: IdType,
    name: string,
    educationType: EducationType,
    specializations: Specialization[],
  }
  
  interface Specialization extends Model {
    id: IdType,
    name: string,
    faculty: Faculty,
    groups: SpecializationGroup[],
  }
  
  interface SpecializationGroup extends Model {
    id: IdType,
    name: string,
    specialization: Specialization,
    teachers: Teacher[],
    students: Student[],
    subjects: Subject[]
  }
  
  interface Achievement extends Model {
    id: IdType,
    name: string,
    reason: string,
  }
  
  interface UserTag extends Model {
    id: IdType,
    users: User[],
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
  
  interface Entrant extends Model {
    applications: AdmissionApplication[]
  }
  
  interface AdmissionApplication {
    id: IdType,
    entrant: Entrant,
    specialization: Specialization,
  }
  
  interface DateEventPost extends Model {
    id: IdType,
    author: User,
    dateEvent: DateEvent
  }
  
  interface DateEvent extends Model {
    id: IdType,
    name: string,
    description: string,
    picture: string,
    date: string,
    post: DateEventPost | null,
  }
}