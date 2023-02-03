// global
import React, {useEffect} from "react";
import Slider from "react-slick";
import {useRecoilValue} from "recoil";
// recoil
import {authUserAtom} from "../../recoilAtoms/authUserrAtom";
// components
import PageLayout from "../../containers/PageLayout/PageLayout";
import PictureUpload, {UploadPictureType} from "../../components/PictureUpload/PictureUpload";
import PhoneLogin from "../../components/PhoneLogin/PhoneLogin";
import InputWithHeading from "../../components/InputWithHeading/InputWithHeading";
// styles and icons
import styles from './LoginNewUserPage.module.scss';
// types
import {AuthUser_authUser, Page_page_LoginNewUserPage} from "../../graphql/generated";
import Cookies from "js-cookie";

type MoveStepType = (() => void) | undefined

interface SettingsStepLayoutProps {
  children: React.ReactNode,
  className?: string,
  isFirstStep: () => boolean,
  isLastStep: () => boolean,
  nextStep: MoveStepType,
  prevStep: MoveStepType,
  canBeSkipped: boolean,
  canGoNext?: boolean,
  title?: string
}

interface SettingsStepProps {
  nextStep: MoveStepType,
  prevStep: MoveStepType,
  isLastStep: () => boolean,
  isFirstStep: () => boolean,
  user: AuthUser_authUser | null,
  canBeSkipped: boolean,
  title: string,
  updateData: (data: any) => void,
}

interface StepsNavProps {
  step: number,
  setStep: React.Dispatch<React.SetStateAction<number>>,
}

interface PageStepsProps {
  newUserUrl: string,
  step: number,
  setStep: React.Dispatch<React.SetStateAction<number>>,
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

function LoginNewUserPage({newUserUrl}: Page_page_LoginNewUserPage) {
  const [ step, setStep ] = React.useState<number>(0)
  
  return (
    <PageLayout className={styles.page}>
      {/*<StepsNav step={step} setStep={setStep} />*/}
      <PageSteps
        newUserUrl={newUserUrl}
        step={step}
        setStep={setStep}
      />
    </PageLayout>
  )
}

function StepsNav({step, setStep}: StepsNavProps) {
  return (
    <nav className={styles.body__stepsNav}>
      <ul className={styles.stepsNav__list}>
        {SETTINGS_STEPS.map((step, stepIndex) => (
          <li key={step.id} className={styles.list__item}>
            <button className={styles.item__btn} onClick={() => setStep(stepIndex)}>
              <span className={styles.btn__circle} />
              <h4></h4>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}

function PageSteps({step, setStep, newUserUrl}: PageStepsProps) {
  const user = useRecoilValue(authUserAtom)
  const [ sliderRef, setSliderRef ] = React.useState<Slider | null>(null)
  const [ data, setData ] = React.useState<any>({})
  
  const updateData = (newData: any) => {
    setData((prevData: any) => ({
      ...prevData,
      ...newData
    }))
  }
  
  const isLastStep = (): boolean => {
    return step === SETTINGS_STEPS.length - 1
  }
  
  const isFirstStep = (): boolean => {
    return step === 0
  }
  
  const getFormattedFormData = () => {
    const formattedData = new FormData()
    
    Object.keys(data).forEach(key => {
      formattedData.append(key, data[key])
    })
    
    return formattedData
  }
  
  const goToNextStep = () => {
    if (sliderRef) {
      sliderRef.slickNext()
    }
    
    if (!isLastStep()) return
    
    console.log('data', data)
    fetch(newUserUrl, {
      method: 'POST',
      body: getFormattedFormData(),
      redirect: 'follow',
      headers: {
        mode: 'cors',
        credentials: 'include',
        'X-CSRFToken': Cookies.get('csrftoken') ?? '',
      }
    })
      .then(console.log)
      // .then(res => res.json())
      // .then(res => {
        // nextjs redirect to res.redirect
        // if (res.ok) {
        //
        // }
        
      // })
      .catch(err => console.log('err', err))
  }
  
  return (
    <Slider
      dots={false}
      ref={setSliderRef}
      infinite={false}
      speed={150}
      slidesToShow={1}
      slidesToScroll={1}
      arrows={false}
      initialSlide={step}
      className={styles.body__steps}
      afterChange={setStep}
      variableWidth={true}
      swipe={false}
    >
      { SETTINGS_STEPS.map((stepItem, stepIndex) => (
        React.createElement(stepItem.component, {
          key: stepItem.id,
          user: user,
          isFirstStep: isFirstStep,
          isLastStep: isLastStep,
          nextStep: goToNextStep,
          prevStep: sliderRef?.slickPrev ?? undefined,
          canBeSkipped: stepItem.canBeSkipped,
          title: stepItem.title,
          updateData: updateData
        })
      ))}
      <FinalSettingsStep />
    </Slider>
  )
}

function SettingsStepLayout({
  isFirstStep,
  isLastStep,
  prevStep,
  nextStep,
  canBeSkipped,
  title,
  children,
  canGoNext=true,
  className='',
}: SettingsStepLayoutProps) {
  const getNextBtnText = (): string => {
    return isLastStep() ? 'Готово' : 'Далее'
  }
  
  return (
    <div className={`${styles.steps__step} ${className}`}>
      <h1 className={styles.step__title}>{title}</h1>
      <div className={styles.step__content}>
        {children}
      </div>
      <div className={styles.step__btns}>
        <button
          className={styles.btns__btn}
          onClick={prevStep}
          disabled={isFirstStep()}
        >
          Назад
        </button>
        <button
          className={styles.btns__btn}
          onClick={nextStep}
          disabled={(!canBeSkipped && !canGoNext)}
        >
          {getNextBtnText()}
        </button>
      </div>
    </div>
  )
}

function MainInfoSettingsStep(
  {user, isFirstStep, isLastStep, prevStep, nextStep, canBeSkipped, title, updateData}: SettingsStepProps) {
  const [ canGoNext, setCanGoNext ] = React.useState<boolean>(false)
  const [ firstName, setFirstName ] = React.useState<string | null>(null)
  const [ lastName, setLastName ] = React.useState<string | null>(null)
  const [ patronymic, setPatronymic ] = React.useState<string | null>(null)
  const [ birthDate, setBirthDate ] = React.useState<string | null>(null)
  
  const updateFirstName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    
    updateData({
      firstName: newValue
    })
    
    setFirstName(newValue)
  }
  
  const updateLastName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    
    updateData({
      lastName: newValue
    })
    
    setLastName(newValue)
  }
  
  const updatePatronymic = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    
    updateData({
      patronymic: newValue
    })
    
    setPatronymic(newValue)
  }
  
  const updateBirthDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    
    updateData({
      birthDate: newValue
    })
    
    setBirthDate(newValue)
  }
  
  const updateCanGoNext = () => {
    setCanGoNext(getCanGoNext())
  }
  
  const getCanGoNext = (): boolean => {
    return !!firstName && !!lastName && !!patronymic && !!birthDate
  }
  
  const updateDataFromUser = () => {
    if (!user || !user.profile) return
    
    const firstName = user.profile.firstName
    const lastName = user.profile.lastName
    const patronymic = user.profile.patronymic
    const birthDate = user.profile.birthDate
    
    setFirstName(firstName)
    setLastName(lastName)
    setPatronymic(patronymic)
    setBirthDate(birthDate)
    
    updateData({
      firstName,
      lastName,
      patronymic,
      birthDate
    })
  }
  
  React.useEffect(() => {
    updateCanGoNext()
  }, [firstName, lastName, patronymic, birthDate])
  
  React.useEffect(() => {
    updateDataFromUser()
  }, [user])
  
  return (
    <SettingsStepLayout
      className={styles.step_mainInfo}
      isFirstStep={isFirstStep}
      isLastStep={isLastStep}
      prevStep={prevStep}
      nextStep={nextStep}
      canGoNext={getCanGoNext()}
      canBeSkipped={canBeSkipped}
      title={title}
    >
      <InputWithHeading
        className={styles.step__input}
        heading="Имя"
        placeholder="Введите имя"
        required={true}
        onChange={updateFirstName}
        value={firstName}
        type="text"
      />
      <InputWithHeading
        className={styles.step__input}
        heading="Фамилия"
        placeholder="Введите фамилию"
        required={true}
        onChange={updateLastName}
        value={lastName}
        type="text"
      />
      <InputWithHeading
        className={styles.step__input}
        heading="Отчество"
        placeholder="Введите отчество"
        required={true}
        onChange={updatePatronymic}
        value={patronymic}
        type="text"
      />
      <InputWithHeading
        className={styles.step__input}
        heading="Дата рождения"
        placeholder="Введите дату рождения"
        required={true}
        onChange={updateBirthDate}
        value={birthDate}
        type="date"
      />
    </SettingsStepLayout>
  )
}

function PhoneSettingsStep(
  {user, isFirstStep, isLastStep, prevStep, nextStep, canBeSkipped, title, updateData}: SettingsStepProps) {
  const [ result, setResult ] = React.useState<null | any>(null)
  
  return (
    <SettingsStepLayout
      className={styles.step_phone}
      isFirstStep={isFirstStep}
      isLastStep={isLastStep}
      prevStep={prevStep}
      nextStep={nextStep}
      canBeSkipped={canBeSkipped}
      title={title}
    >
      { result === null ?
        <PhoneLogin
          className={styles.step__phoneLogin}
        />
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
  {user, isFirstStep, isLastStep, prevStep, nextStep, canBeSkipped, title, updateData}: SettingsStepProps) {
  const [ avatar, setAvatar ] = React.useState<UploadPictureType>(null)
  
  const updateAvatar = () => {
    updateData({
      picture: avatar,
    })
  }
  
  React.useEffect(() => {
    updateAvatar()
  }, [avatar])
  
  return (
    <SettingsStepLayout
      isFirstStep={isFirstStep}
      isLastStep={isLastStep}
      prevStep={prevStep}
      nextStep={nextStep}
      canBeSkipped={canBeSkipped}
      title={title}
      className={styles.step_profile}
    >
      <PictureUpload
        className={styles.step__avatar}
        imageClassName={styles.avatar__image}
        contentClassName={styles.avatar__content}
        picture={avatar}
        setPicture={setAvatar}
        defaultPictureUrl={user?.profile?.pictureUrl}
        title="Аватарка"
      />
    </SettingsStepLayout>
  )
}

function FinalSettingsStep() {
  return (
    <div className={`${styles.steps__step} ${styles.step_final}`}>
      <h1 className={styles.step__done}>ВСЕ ГОТОВО</h1>
      <h2 className={styles.step__redirecting}>ПЕРЕНАПРАВЛЯЕМ ТЕБЯ НА ГЛАВНУЮ СТРАНИЦУ</h2>
    </div>
  )
}

export default LoginNewUserPage