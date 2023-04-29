import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../../../AuthContext/Context'
import Layout from '../../Layout'
import Navbar from '../../Navbar'
import Separator from '../../Separator'
import { AuthContextType } from '../../../AuthContext/types'
import useFetchStack from './hooks/useFetchStack'
import LoadingScreen from '../../LoadingScreen'
import moment from 'moment'
import { HomePageActionButton } from '../../Buttons'
import useStackList from '../../../hooks/useStackList'
import axios, { AxiosError } from 'axios'
import { AppEnvironment } from '../../../helpers/AppEnvironmentManager'
import safeConsole from '../../../helpers/safeConsole'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faRedoAlt } from '@fortawesome/free-solid-svg-icons'
import Spinner from '../../Spinner'
import InfoTile from '../../InfoTile'
import CopyButton from './CopyButton'
import InfoPanelForStackV1 from './InformationPanels/InfoPanelForStackV1'
import InfoPanelForStackV1Pro from './InformationPanels/InfoPanelForStackV1Pro'
import usePromise from '../../../hooks/usePromise'
import SecretCreatorPanel from './SecretCreatorPanel'
import InfoPanelForStackX1 from './InformationPanels/InfoPanelForStackX1'
import InfoPanelForStackV2 from './InformationPanels/InfoPanelForStackV2'

const StackPage = () => {
  const { auth } = useContext<AuthContextType>(AuthContext)
  const router = useRouter()
  const { stack_uuid } = router.query
  const stack = useFetchStack((stack_uuid || '') as string, auth?.IdToken || '')
  const stackInfraList = useStackList(auth?.IdToken || '')
  const [enableVersionUpdate, setEnableVersionUpdate] = useState(false)
  const [error, setError] = useState<string | undefined>(undefined)
  const [loadingVersionUpdate, setLoadingVersionUpdate] = useState(false)
  const [loadingDeleteStack, setLoadingDeleteStack] = useState(false)

  useEffect(() => {
    stack.fetch()
    stackInfraList.query()
  }, [])

  const refreshStackInfo = usePromise(async () => {
    await stack.backgroundFetch()
  })

  useEffect(() => {
    if (!stackInfraList?.stackList?.length) return
    if (!stack?.stack) return
    const item = stackInfraList?.stackList.find(
      (item) => item.stack_name === stack.stack?.provisioning_stack,
    )
    setEnableVersionUpdate(
      item?.version !== stack.stack.provisioning_stack_version ||
        stack.stack.state?.includes('ERROR'),
    )
  }, [stackInfraList.stackList, stack.stack])

  const onClick = {
    versionUpdate: async () => {
      try {
        setError(undefined)
        setLoadingVersionUpdate(true)
        await axios.patch(
          AppEnvironment.makeRestUrl(`/stack/${stack?.stack?.stack_uuid}`),
          {},
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: auth?.IdToken || '',
            },
          },
        )
        await stack.fetch()
      } catch (e) {
        safeConsole()?.error(e as AxiosError)
        setError(
          ((e as AxiosError)?.response?.data as any)?.message ||
            JSON.stringify((e as AxiosError)?.response?.data),
        )
      } finally {
        setLoadingVersionUpdate(false)
      }
    },
    deleteStack: async () => {
      try {
        if (!confirm(`Do you want to delete the stack: ${stack?.stack?.name}?`))
          return
        setError(undefined)
        setLoadingDeleteStack(true)
        await axios.delete(
          AppEnvironment.makeRestUrl(`/stack/${stack?.stack?.stack_uuid}`),
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: auth?.IdToken || '',
            },
          },
        )
        await stack.fetch()
      } catch (e) {
        safeConsole()?.error(e as Error)
        setError(
          ((e as AxiosError)?.response?.data as any)?.message ||
            JSON.stringify((e as AxiosError)?.response?.data),
        )
      } finally {
        setLoadingDeleteStack(false)
      }
    },
  }

  if (stack.queryState === 'error')
    return (
      <Layout navbar={<Navbar />}>
        <Separator padding={30} />
        <div className="text-center">Error loading stack...</div>
      </Layout>
    )
  if (stack.queryState === 'loading' || !stack?.stack) return <LoadingScreen />
  return (
    <Layout navbar={<Navbar />}>
      <Separator padding={10} />
      <div className="flex items-center justify-end gap-4">
        <p className="text-sm">Click here to refresh</p>
        <HomePageActionButton
          text={refreshStackInfo.state === 'loading' ? 'Refreshing' : 'Refresh'}
          icon={
            refreshStackInfo.state === 'loading' ? (
              <Spinner />
            ) : (
              <FontAwesomeIcon icon={faRedoAlt} />
            )
          }
          onClick={() => refreshStackInfo.retry()}
        />
      </div>
      <Separator />
      <h1 className="text-lg border dark:border dark:border-gray-700 dark:bg-[#1B1E1F] bg-white px-4 py-2">
        Stack Panel
      </h1>
      {error && (
        <>
          <Separator padding={6} />
          <h1 className="text-lg bg-red-600 text-white px-4 py-2">{error}</h1>
        </>
      )}
      <Separator padding={6} />
      {stack.stack && (
        <>
          <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <InfoTile>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                Name
              </p>
              <p className="font-medium text-xl">{stack?.stack?.name}</p>
            </InfoTile>
            <InfoTile>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                Description
              </p>
              <p className="font-medium text-xl">{stack?.stack?.description}</p>
            </InfoTile>
            <InfoTile>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                Stack Infrastructure Version
              </p>
              <p className="font-medium text-xl">
                {stack?.stack?.provisioning_stack} (
                {stack?.stack?.provisioning_stack_version})
              </p>
            </InfoTile>
            <InfoTile>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                Status
              </p>
              <p
                className={`font-medium text-xl ${
                  stack?.stack?.state === 'AVAILABLE' ? 'text-green-600' : ''
                }`}
              >
                {stack?.stack?.state}
              </p>
              {stack?.stack?.state === 'PROVISIONING' ? (
                <>
                  <Separator />
                  <p>It take 5min on average to provision</p>
                </>
              ) : (
                <></>
              )}
              {stack?.stack?.state?.includes('ERROR') ? (
                <>
                  <Separator />
                  <p>
                    Oops, please retry by clicking the button {'"'}Redeploy{'"'}
                  </p>
                </>
              ) : (
                <></>
              )}
            </InfoTile>
            <InfoTile>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                UUID
              </p>
              <p className="font-medium text-xl">{stack?.stack?.stack_uuid}</p>
            </InfoTile>
            <InfoTile>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                Created At
              </p>
              <p className="font-medium text-xl">
                {moment
                  .utc(stack?.stack?.created_at || '')
                  .local()
                  .format('MMMM DD, YYYY @ hh:mm:ss A')}
              </p>
            </InfoTile>
            <InfoTile>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                Last Updated At
              </p>
              <p className="font-medium text-xl">
                {moment
                  .utc(stack?.stack?.updated_at || '')
                  .local()
                  .format('MMMM DD, YYYY @ hh:mm:ss A')}
              </p>
            </InfoTile>
            <InfoTile>
              <p>
                To test the links in Postman you need an API token. Copy it from
                down below
              </p>
              <Separator padding={8} />
              <CopyButton textToCopy={auth?.IdToken || ''} />
            </InfoTile>
          </div>
          <Separator padding={10} />
          <div className="flex gap-3 flex-wrap">
            {enableVersionUpdate && (
              <HomePageActionButton
                text={
                  stackInfraList?.stackList.find(
                    (item) =>
                      item.stack_name === stack.stack?.provisioning_stack,
                  )?.version !== stack.stack.provisioning_stack_version
                    ? 'Update Version'
                    : 'Redeploy'
                }
                icon={
                  loadingVersionUpdate ? (
                    <Spinner />
                  ) : (
                    <FontAwesomeIcon icon={faRedoAlt} />
                  )
                }
                onClick={() => onClick.versionUpdate()}
              />
            )}
            <HomePageActionButton
              onClick={() => onClick.deleteStack()}
              text="Delete"
              className="bg-red-500"
              icon={
                loadingDeleteStack ? (
                  <Spinner />
                ) : (
                  <FontAwesomeIcon icon={faTrashAlt} />
                )
              }
            />
          </div>
          <Separator padding={10} />
          <SecretCreatorPanel stack={stack?.stack} />
          <Separator padding={10} />
          <InfoPanelForStackV2 stack={stack?.stack} IdToken={auth?.IdToken} />
          <InfoPanelForStackX1 stack={stack?.stack} IdToken={auth?.IdToken} />
          <InfoPanelForStackV1 stack={stack?.stack} IdToken={auth?.IdToken} />
          <InfoPanelForStackV1Pro
            stack={stack?.stack}
            IdToken={auth?.IdToken}
          />
        </>
      )}
      <Separator padding={32} />
    </Layout>
  )
}

export default StackPage
