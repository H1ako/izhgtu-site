// global
import React from "react";
import {useRecoilValue} from "recoil";
// recoil
import {authUserAtom} from "../../recoilAtoms/authUserrAtom";
// components
import PageLayout from "../../containers/PageLayout/PageLayout";
import PictureUpload from "../../components/PictureUpload/PictureUpload";
import PhoneLogin from "../../components/PhoneLogin/PhoneLogin";
// styles and icons
import styles from './LoginNewUserPage.module.scss';
// types
import {AuthUser_authUser} from "../../graphql/generated";

interface SettingsStepLayoutProps {
  children: React.ReactNode,
  className?: string,
  isFirstStep: () => boolean,
  isLastStep: () => boolean,
  nextStep: () => void,
  prevStep: () => void,
  canBeSkipped: boolean,
  canGoNext?: boolean,
  title?: string
}

interface SettingsStepProps {
  nextStep: () => void,
  prevStep: () => void,
  isLastStep: () => boolean,
  isFirstStep: () => boolean,
  user: AuthUser_authUser | null,
  canBeSkipped: boolean,
  title: string,
}

interface SettingsStep {
  id: number,
  title: string,
  component: React.ComponentType<SettingsStepProps>,
  canBeSkipped: boolean,
}

const SETTINGS_STEPS: SettingsStep[] = [
  {
    id: 0,
    title: 'Основная информация',
    canBeSkipped: false,
    component: MainInfoSettingsStep,
  },
  {
    id: 1,
    title: 'Номер телефона',
    canBeSkipped: true,
    component: PhoneSettingsStep,
  },
  {
    id: 2,
    title: 'Профиль',
    canBeSkipped: true,
    component: ProfileSettingsStep,
  },
]

function LoginNewUserPage() {
  return (
    <PageLayout className={styles.page}>
      <PageBody />
    </PageLayout>
  )
}

function PageBody() {
  const user = useRecoilValue(authUserAtom)
  const [ step, setStep ] = React.useState<number>(0)
  
  const nextStep = (): void => {
    setStep(prevPage => {
      console.log(getNewStep(prevPage + 1))
      return getNewStep(prevPage + 1)
    })
  }
  
  const getNewStep = (page: number): number => {
    return Math.min(Math.max(page, 0), SETTINGS_STEPS.length - 1)
  }
  
  const prevStep = (): void => {
    setStep(prevPage => {
      return getNewStep(prevPage - 1)
    })
  }
  
  const isLastStep = (): boolean => {
    return step === SETTINGS_STEPS.length - 1
  }
  
  const isFirstStep = (): boolean => {
    return step === 0
  }
  
  const currentStep = SETTINGS_STEPS.find(s => s.id === step)
  if (!currentStep) return (
    <div>WRONG STEP</div>
  )
  
  const SettingsStep = currentStep.component
  const canStepBeSkipped = currentStep.canBeSkipped
  const stepTitle = currentStep.title
  
  return (
    <div className={styles.page__body}>
      <SettingsStep
        user={user}
        isFirstStep={isFirstStep}
        isLastStep={isLastStep}
        nextStep={nextStep}
        prevStep={prevStep}
        canBeSkipped={canStepBeSkipped}
        title={stepTitle}
      />
    </div>
  )
}

function SettingsStepLayout(
  {isFirstStep, isLastStep, prevStep, nextStep, canGoNext=true, canBeSkipped, title, children, className=''}: SettingsStepLayoutProps) {
  return (
    <div className={`${styles.body__step} ${className}`}>
      <h1 className={styles.step__title}>{title}</h1>
      {children}
      <div className={styles.step__buttons}>
        <button
          className={styles.buttons__btn}
          onClick={prevStep}
          disabled={isFirstStep()}
        >
          Назад
        </button>
        <button
          className={styles.buttons__btn}
          onClick={nextStep}
          disabled={isLastStep() || (!canBeSkipped && !canGoNext)}
        >
          Далее
        </button>
      </div>
    </div>
  )
}

function MainInfoSettingsStep(
  {user, isFirstStep, isLastStep, prevStep, nextStep, canBeSkipped, title}: SettingsStepProps) {
  const [ canGoNext, setCanGoNext ] = React.useState<boolean>(false)
  const firstNameRef = React.useRef<HTMLInputElement>(null)
  const lastNameRef = React.useRef<HTMLInputElement>(null)
  const patronymicRef = React.useRef<HTMLInputElement>(null)
  const birthDateRef = React.useRef<HTMLInputElement>(null)
  
  const getCanGoNext = (): boolean => {
    const firstNameInput = firstNameRef.current
    const lastNameInput = lastNameRef.current
    const patronymicInput = patronymicRef.current
    const birthDateInput = birthDateRef.current
    if (!firstNameInput || !lastNameInput || !patronymicInput || !birthDateInput) return false
    
    return !!firstNameInput.value && !!lastNameInput.value && !!patronymicInput.value && !!birthDateInput.value
  }
  
  React.useEffect(() => {
    setCanGoNext(getCanGoNext())
  }, [])
  
  return (
    <SettingsStepLayout
      isFirstStep={isFirstStep}
      isLastStep={isLastStep}
      prevStep={prevStep}
      nextStep={nextStep}
      canGoNext={getCanGoNext()}
      canBeSkipped={canBeSkipped}
      title={title}
    >
      <input
        type="text"
        placeholder="Имя"
        defaultValue={user?.profile?.firstName ?? ''}
        required
        ref={firstNameRef}
      />
      <input
        type="text"
        placeholder="Фамилия"
        required
        defaultValue={user?.profile?.lastName ?? ''}
        ref={lastNameRef}
      />
      <input
        type="text"
        placeholder="Отчество"
        required
        defaultValue={user?.profile?.patronymic ?? ''}
        ref={patronymicRef}
      />
      <input
        type="date"
        placeholder="Дата рождения"
        required
        defaultValue={user?.profile?.birthDate ?? ''}
        ref={birthDateRef}
      />
  
    </SettingsStepLayout>
  )
}

function PhoneSettingsStep(
  {user, isFirstStep, isLastStep, prevStep, nextStep, canBeSkipped, title}: SettingsStepProps) {
  const [ result, setResult ] = React.useState<null | any>(null)
  
  return (
    <SettingsStepLayout
      isFirstStep={isFirstStep}
      isLastStep={isLastStep}
      prevStep={prevStep}
      nextStep={nextStep}
      canBeSkipped={canBeSkipped}
      title={title}
    >
      { result === null ?
        <PhoneLogin />
        :
        result.status === 'success' ?
          <>
            Телефон успешно добавлен
          </>
        :
          <>
            Ошибка при добавлении телефона
            <button onClick={() => setResult(null)} className={styles.step__btn}>Попробовать Ещё Раз</button>
          </>
      }
      
    </SettingsStepLayout>
  )
}

function ProfileSettingsStep(
  {user, isFirstStep, isLastStep, prevStep, nextStep, canBeSkipped, title}: SettingsStepProps) {
  const [ avatar, setAvatar ] = React.useState<File | null>(null)
  const [ bgPicture, setBgPicture ] = React.useState<File | null>(null)
  
  return (
    <SettingsStepLayout
      isFirstStep={isFirstStep}
      isLastStep={isLastStep}
      prevStep={prevStep}
      nextStep={nextStep}
      canBeSkipped={canBeSkipped}
      title={title}
      className={styles.step__profile}
    >
      <PictureUpload
        className={styles.step__avatar}
        picture={avatar}
        setPicture={setAvatar}
        defaultPictureUrl={user?.profile?.pictureUrl}
      />
      <PictureUpload
        className={styles.step__bgPicture}
        picture={bgPicture}
        setPicture={setBgPicture}
        defaultPictureUrl={user?.profile?.bgPictureUrl}
      />
    </SettingsStepLayout>
  )
}

export default LoginNewUserPage