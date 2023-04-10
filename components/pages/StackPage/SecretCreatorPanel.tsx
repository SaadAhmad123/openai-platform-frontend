import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import React, { useContext, useState } from 'react'
import AuthContext from '../../../AuthContext/Context'
import { AuthContextType } from '../../../AuthContext/types'
import { AppEnvironment } from '../../../helpers/AppEnvironmentManager'
import usePromise from '../../../hooks/usePromise'
import { HomePageActionButton } from '../../Buttons'
import Separator from '../../Separator'
import Spinner from '../../Spinner'
import { StackItem } from '../../types'
import Form from '../../utils/Form'
import InfoTile from './InfoTile'

interface ISecretCreatorPanel {
  stack?: StackItem
}

const SecretCreatorPanel = ({ stack }: ISecretCreatorPanel) => {
  const { auth } = useContext<AuthContextType>(AuthContext)
  const [updateAccessKeyError, setUpdateAccessKeyError] = useState<
    Error | undefined
  >()
  const [updateSecretKeyError, setUpdateSecretKeyError] = useState<
    Error | undefined
  >()

  const createSecret = async (secretName: string, secretValue: string) => {
    await axios.post(
      AppEnvironment.makeRestUrl('/secret'),
      {
        secret_id: secretName,
        secret_value: secretValue,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: auth?.IdToken || '',
        },
      },
    )
  }

  if (!stack) return <></>
  if (!stack.provisioning_stack?.includes('stack_x')) return <></>
  if (!stack.state.includes('ERROR')) return <></>
  return (
    <>
      <p>Please make sure you have provided the correct AWS credentials</p>
      <Separator padding={8} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InfoTile>
          {updateAccessKeyError && (
            <>
              <h1 className="text-lg bg-red-600 text-white px-4 py-2">
                {updateAccessKeyError.message}
              </h1>
              <Separator />
            </>
          )}
          <Form
            formValues={{}}
            inputs={[
              {
                type: 'password',
                label: 'AWS Access Key',
                key: 'aws_access_key',
              },
            ]}
            handleSubmit={async (values: { [p: string]: any }) => {
              setUpdateAccessKeyError(undefined)
              await createSecret(
                `${stack?.stack_uuid}-access`,
                values?.aws_access_key || '',
              ).catch((e) => setUpdateAccessKeyError(e as Error))
            }}
            SubmitButton={({ loading }) => (
              <div className="flex-1">
                <HomePageActionButton
                  text="Update"
                  icon={
                    loading ? <Spinner /> : <FontAwesomeIcon icon={faPlus} />
                  }
                />
              </div>
            )}
          />
        </InfoTile>
        <InfoTile>
          {updateSecretKeyError && (
            <>
              <h1 className="text-lg bg-red-600 text-white px-4 py-2">
                {updateSecretKeyError.message}
              </h1>
              <Separator />
            </>
          )}
          <Form
            formValues={{}}
            inputs={[
              {
                type: 'password',
                label: 'AWS Secret Key',
                key: 'aws_secret_key',
              },
            ]}
            handleSubmit={async (values: { [p: string]: any }) => {
              setUpdateSecretKeyError(undefined)
              await createSecret(
                `${stack?.stack_uuid}-secret`,
                values?.aws_secret_key || '',
              ).catch((e) => setUpdateSecretKeyError(e as Error))
            }}
            SubmitButton={({ loading }) => (
              <div className="flex-1">
                <HomePageActionButton
                  text="Update"
                  icon={
                    loading ? <Spinner /> : <FontAwesomeIcon icon={faPlus} />
                  }
                />
              </div>
            )}
          />
        </InfoTile>
      </div>
    </>
  )
}

export default SecretCreatorPanel
