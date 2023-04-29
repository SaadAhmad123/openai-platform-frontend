import React, { useEffect, useState } from 'react'
import usePromise from '../../../../../hooks/usePromise'
import axios, { AxiosError } from 'axios'
import InfoTile from '../../../../InfoTile'
import Select from 'react-select'
import Separator from '../../../../Separator'
import Form from '../../../../utils/Form'
import { HomePageActionButton } from '../../../../Buttons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import Spinner from '../../../../Spinner'
import safeConsole from '../../../../../helpers/safeConsole'

interface IConfigPanel {
  title: string
  fetchConfigUrl?: string
  existingConfig?: string
  IdToken?: string
  className?: string
}

type ConfigInputType = {
  type: string
  key: string
  label: string
  default?: string
  description?: string
}

const ConfigPanel = ({
  title,
  fetchConfigUrl,
  IdToken,
  className,
  existingConfig,
}: IConfigPanel) => {
  const [configInputs, setConfigInputs] = useState<ConfigInputType[]>([])
  const [configType, setConfigType] = useState<string | undefined>()
  const [submitError, setSubmitError] = useState<string | undefined>()
  const configData = usePromise(async () => {
    try {
      if (!fetchConfigUrl || !IdToken) return undefined
      const resp = await axios.post(
        fetchConfigUrl,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: IdToken || '',
          },
        },
      )
    } catch (e) {
      return (
        ((e as AxiosError)?.response?.data as any)?.expected_template ||
        ((e as AxiosError)?.response?.data as any)?.expectedRequestBody
      )
    }
  })

  useEffect(() => {
    configData.retry()
  }, [])

  const handleSubmit = async (values: { [p: string]: any }) => {
    try {
      setSubmitError(undefined)
      const vals = {
        type: configType,
        ...values,
      }
      console.log(vals)
      await axios.post(fetchConfigUrl || '', vals, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: IdToken || '',
        },
      })
    } catch (e) {
      safeConsole()?.error(e)
      setSubmitError((e as Error)?.message)
    }
  }

  const handleInputChange = (name: string, value: any) => {
    setConfigInputs(
      (configData?.data?.[value]?.inputs || []) as ConfigInputType[],
    )
    setConfigType(value)
  }

  return (
    <InfoTile className={className}>
      {submitError && (
        <p className="bg-red-600 text-white p-3 mb-4">{submitError}</p>
      )}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-1 font-bold">
          {title}
        </p>
        {existingConfig && (
          <p className="text-sm text-white bg-servian-orange px-4 py-1 uppercase">
            {existingConfig}
          </p>
        )}
      </div>
      <Separator />
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Provider</p>
      <Select
        onChange={(newValue) => {
          handleInputChange('type', newValue?.value || '')
        }}
        options={[
          { value: '', label: '- none -' },
          ...Object.keys(configData.data || {}).map((item) => ({
            value: item,
            label: item,
          })),
        ]}
        className="text-black"
      />
      {configInputs.length ? (
        <>
          <Separator padding={8} />
          <Form
            inputs={configInputs.map((item) => ({
              label: item.label,
              key: item.key,
              type: item.type,
              isRequired: true,
            }))}
            handleSubmit={handleSubmit}
            SubmitButton={({ loading }) => (
              <>
                <div className="flex-1">
                  <HomePageActionButton
                    text="Submit"
                    icon={
                      loading ? <Spinner /> : <FontAwesomeIcon icon={faPlus} />
                    }
                  />
                </div>
              </>
            )}
            formValues={Object.assign(
              {},
              ...configInputs.map((item) => ({
                [item.key]: item.default || '',
              })),
            )}
          />
          <Separator padding={8} />
        </>
      ) : (
        <></>
      )}
      <Separator padding={12} />
    </InfoTile>
  )
}

export default ConfigPanel
