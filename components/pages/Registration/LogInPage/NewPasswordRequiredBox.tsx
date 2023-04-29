import React from 'react'
import RegistrationBox from '../utils/RegistrationBox'
import Form from '../../../utils/Form'
import { FullWidthButton } from '../../../Buttons'
import Separator from '../../../Separator'
import Spinner from '../../../Spinner'

interface INewPasswordRequiredBox {
  error: string
  handleSubmit: (value: { [p: string]: any }) => Promise<void>
  onClickReset: () => void
  loading?: boolean
  show: boolean
}

const NewPasswordRequiredBox = ({
  error,
  handleSubmit,
  onClickReset,
  loading,
  show,
}: INewPasswordRequiredBox) => {
  if (!show) return <></>
  const inputs = [
    { label: 'Password', type: 'password', key: 'password' },
    { label: 'Confirm Password', type: 'password', key: 'confirmPassword' },
  ].map((item) => ({ ...item, isRequired: true }))
  return (
    <RegistrationBox heading={'Change Password'} error={error}>
      <>
        <p className={'text-gray-400'}>
          Welcome to MakeGPT, please change your password to continue.
        </p>
        <Separator />
        <Form
          inputs={inputs}
          handleSubmit={handleSubmit}
          SubmitButton={() => {
            if (loading) {
              return (
                <FullWidthButton
                  icon={<Spinner />}
                  text={'Loading...'}
                  type={'button'}
                />
              )
            }
            return <FullWidthButton text={'Update Password'} type={'submit'} />
          }}
        />
        <Separator padding={6} />
      </>
    </RegistrationBox>
  )
}

export default NewPasswordRequiredBox
