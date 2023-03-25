import React, { useContext, useEffect, useState } from 'react'
import Modal from '../../Modal'
import AuthContext from '../../../AuthContext/Context'
import { AuthContextType } from '../../../AuthContext/types'
import useStackList from '../../../hooks/useStackList'
import {
  HomePageActionButton,
  SuppressedHomePageActionButton,
} from '../../Buttons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faPlus } from '@fortawesome/free-solid-svg-icons'
import Form, { FormInputItem } from '../../utils/Form'
import Separator from '../../Separator'
import Spinner from '../../Spinner'

interface ICreateStackModal {
  show: boolean
  onToggle: () => void
  onSubmit: (values: { [p: string]: any }) => Promise<void>
}

const CreateStackModal = ({ show, onToggle, onSubmit }: ICreateStackModal) => {
  const { auth } = useContext<AuthContextType>(AuthContext)
  const {
    stackList,
    query: queryStackList,
    queryState: queryStackListState,
  } = useStackList(auth?.IdToken || '')

  const [error, setError] = useState('')
  const handleSubmit = async (values: { [p: string]: any }) => {
    try {
      setError('')
      await onSubmit(values)
    } catch (e) {
      setError(
        // @ts-ignore
        (e as AxiosError)?.response?.data?.error?.error ||
          (e as Error)?.message ||
          'Error occurred',
      )
    }
  }

  const inputs: FormInputItem[] = [
    { label: 'Stack Name', type: 'text', key: 'name' },
    { label: 'Description', type: 'textarea', key: 'description' },
    {
      label: 'Stacks',
      type: 'select',
      key: 'stacks',
      list: stackList.map((item) => ({
        label: `${item.stack_name} (${item.version})`,
        value: item.stack_name,
      })),
    },
  ].map((item) => ({ isRequired: true, ...item }))

  useEffect(() => {
    if (queryStackListState === 'loading') return
    queryStackList()
  }, [])

  return (
    <Modal show={show} onClickBackground={onToggle}>
      <SuppressedHomePageActionButton
        className="bg-gray-100 text-servian-black hover:bg-gray-200"
        text={'Back'}
        icon={<FontAwesomeIcon icon={faArrowLeft} />}
        onClick={onToggle}
      />
      <Separator padding={16} />
      <h1 className="text-2xl sm:text-4xl font-bold dark:text-servian-white">
        Create New Stack
      </h1>
      <div className="max-w-[400px] mt-4">
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {show && (
          <Form
            formValues={{}}
            inputs={inputs}
            handleSubmit={handleSubmit}
            SubmitButton={({ loading }) => (
              <div className="w-full">
                {loading && (
                  <HomePageActionButton text="Creating..." icon={<Spinner />} />
                )}
                {!loading && (
                  <HomePageActionButton
                    text="Create"
                    icon={<FontAwesomeIcon icon={faPlus} />}
                  />
                )}
              </div>
            )}
          />
        )}
      </div>
    </Modal>
  )
}

export default CreateStackModal
