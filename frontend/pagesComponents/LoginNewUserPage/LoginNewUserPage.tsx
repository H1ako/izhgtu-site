// global
import React from "react";
import {useRecoilValue} from "recoil";
// recoil
import {authUserAtom} from "../../recoilAtoms/authUserrAtom";
// components
import PageLayout from "../../containers/PageLayout/PageLayout";
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
  canGoNext: boolean,
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
    title: 'Профиль',
    canBeSkipped: false,
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
    <SettingsStep
      user={user}
      isFirstStep={isFirstStep}
      isLastStep={isLastStep}
      nextStep={nextStep}
      prevStep={prevStep}
      canBeSkipped={canStepBeSkipped}
      title={stepTitle}
    />
  )
}

function SettingsStepLayout(
  {isFirstStep, isLastStep, prevStep, nextStep, canGoNext, canBeSkipped, title, children, className=''}: SettingsStepLayoutProps) {
  return (
    <div className={`${styles.pageBody__step} ${className}`}>
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
  const getCanGoNext = (): boolean => {
    return true
  }
  
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
      main info page
    </SettingsStepLayout>
  )
}

function ProfileSettingsStep(
  {user, isFirstStep, isLastStep, prevStep, nextStep, canBeSkipped, title}: SettingsStepProps) {
  const getCanGoNext = (): boolean => {
    return true
  }
  
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
      profile page
    </SettingsStepLayout>
  )
}

export default LoginNewUserPage