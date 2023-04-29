import React, { useEffect } from 'react'
import { StackItem } from '../../../../types'
import safeConsole from '../../../../../helpers/safeConsole'
import InfoTile from '../../../../InfoTile'
import Separator from '../../../../Separator'
import CopyButton from '../../CopyButton'
import usePromise from '../../../../../hooks/usePromise'
import axios, { Axios, AxiosError } from 'axios'
import ConfigPanel from './ConfigPanel'
import PromptEditor from './PromptEditor'
import RestrictRestApi from './RestrictRestApi'
import { HomePageActionButton } from '../../../../Buttons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRedoAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import Spinner from '../../../../Spinner'

interface IInfoPanelForStackV2 {
  stack?: StackItem
  IdToken?: string
}

const getStackValue = (stack: any, itemName: string) => {
  try {
    const _stackContent = JSON.parse(stack?.stack_content || '{}')
    let stackContent = _stackContent.content as any
    return stackContent?.find(
      (item: any) => item.ExportName === `${stack?.stack_uuid}${itemName}`,
    )?.OutputValue
  } catch (e) {
    safeConsole()?.error(e)
    return undefined
  }
}

const InfoPanelForStackV2 = ({ stack, IdToken }: IInfoPanelForStackV2) => {
  const ingestUrlNoAuthPost = getStackValue(stack, '-ingest--post-noauth')
  const vectorDbConfigUpdateAuthPost = getStackValue(
    stack,
    '-vector-db-config-update--post-auth',
  )
  const indexCreatorAuthPost = getStackValue(
    stack,
    '-index-creator-cron--post-auth',
  )
  const promptGetAuthGet = getStackValue(stack, '-prompt-get--get-auth')
  const restrictRestApiAuthPost = getStackValue(
    stack,
    '-restrict-rest-api--post-auth',
  )
  const deleteIndexAuthDelete = getStackValue(
    stack,
    '-delete-index--delete-auth',
  )
  const promptUpdateAuthPost = getStackValue(stack, '-prompt-update--post-auth')
  const configStatusAuthGet = getStackValue(stack, '-config-status--get-auth')
  const openAiConfigUpdateAuthPost = getStackValue(
    stack,
    '-open-ai-config-update--post-auth',
  )
  const openAiHttpPostNoAuth = getStackValue(stack, '-openai-http--post-noauth')
  const openAiWebsocketNoAuth = getStackValue(
    stack,
    '-openai--websocket-noauth',
  )
  const clientWebAppLink = `https://mgpt-client.saad-ahmad.com/?socket=${openAiWebsocketNoAuth}&name=${
    stack?.name || 'unknown'
  }&prompt_type=default`
  const indexCleanerPostAuth = getStackValue(
    stack,
    '-index-cleaner-cron--post-auth',
  )

  const cleanIndex = usePromise(async () => {
    try {
      const resp = await axios.post(
        indexCleanerPostAuth,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: IdToken || '',
          },
        },
      )
      return resp?.data?.type
    } catch (e) {
      safeConsole()?.error(e)
      return undefined
    }
  })

  const getCurrentOpenAiConfigStatus = usePromise(async () => {
    try {
      const resp = await axios.get(`${configStatusAuthGet}/openai`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: IdToken || '',
        },
      })
      return resp?.data?.type
    } catch (e) {
      safeConsole()?.error(e)
      return undefined
    }
  })

  const getCurrentVectorDBConfigStatus = usePromise(async () => {
    try {
      const resp = await axios.get(`${configStatusAuthGet}/vectordb`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: IdToken || '',
        },
      })
      return resp?.data?.type
    } catch (e) {
      safeConsole()?.error(e)
      return undefined
    }
  })

  const createIndex = usePromise(async () => {
    try {
      await axios.post(indexCreatorAuthPost, undefined, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: IdToken || '',
        },
      })
    } catch (e) {
      safeConsole()?.error(e)
    }
    return undefined
  })

  const deleteIndex = usePromise(async () => {
    try {
      if (!window?.confirm('Are you sure you want to delete the index?')) return
      await axios.delete(deleteIndexAuthDelete, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: IdToken || '',
        },
      })
    } catch (e) {
      safeConsole()?.error(e)
    }
    return undefined
  })

  const refresh = () => {
    getCurrentOpenAiConfigStatus.retry()
    getCurrentVectorDBConfigStatus.retry()
  }

  useEffect(() => {
    if (!stack) return
    if (stack?.state !== 'AVAILABLE') return
    if (stack?.provisioning_stack !== 'stack_v2') return
    refresh()
  }, [])

  if (!stack) return <></>
  if (stack?.state !== 'AVAILABLE') return <></>
  if (stack?.provisioning_stack !== 'stack_v2') return <></>

  return (
    <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      <InfoTile>
        <p>
          Accelerate your experimentation! Try your{' '}
          <strong>{stack?.name} GPT</strong> instantly with our client app.
        </p>
        <Separator padding={8} />
        <a href={clientWebAppLink} target={'_blank'}>
          <HomePageActionButton text={`Try ${stack?.name} GPT now!`} />
        </a>
      </InfoTile>
      <div>
        <InfoTile>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-1 font-bold">
            Ingestion URL (ingest)
          </p>
          <p>
            Send an empy POST request via Postman to see the expected request
            data
          </p>
          <Separator />
          <p className="font-medium text-sm w-full bg-servian-light-gray dark:bg-servian-black p-2">
            {ingestUrlNoAuthPost}
          </p>
          <Separator />
          <CopyButton textToCopy={ingestUrlNoAuthPost || ''} />
        </InfoTile>
      </div>
      <InfoTile>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-1 font-bold">
          OpenAI Url HTTP (POST)
        </p>
        <p>Send a http request to this endpoint</p>
        <Separator />
        <p className="font-medium text-sm w-full bg-servian-light-gray dark:bg-servian-black p-2">
          {openAiHttpPostNoAuth}
        </p>
        <Separator />
        <CopyButton textToCopy={openAiHttpPostNoAuth || ''} />
      </InfoTile>
      <InfoTile>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-1 font-bold">
          Update Index
        </p>
        <p>
          The index gets updated every 6 hours. However, you can manually update
          the index as well
        </p>
        <Separator />
        <Separator />
        <HomePageActionButton
          text="Update"
          onClick={() => {
            createIndex.retry()
          }}
          icon={
            createIndex.state === 'loading' ? (
              <Spinner />
            ) : (
              <FontAwesomeIcon icon={faRedoAlt} />
            )
          }
        />
      </InfoTile>
      <InfoTile>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-1 font-bold">
          Delete Index
        </p>
        <p>You can manully clean this index</p>
        <Separator />
        <Separator />
        <HomePageActionButton
          text="Clean Index"
          onClick={() => {
            cleanIndex.retry()
          }}
          icon={
            cleanIndex.state === 'loading' ? (
              <Spinner />
            ) : (
              <FontAwesomeIcon icon={faTrashAlt} />
            )
          }
        />
      </InfoTile>
      <div>
        <ConfigPanel
          existingConfig={getCurrentOpenAiConfigStatus.data}
          fetchConfigUrl={openAiConfigUpdateAuthPost}
          IdToken={IdToken}
          title={'GPT Model Config'}
        />
      </div>
      <div>
        <ConfigPanel
          existingConfig={getCurrentVectorDBConfigStatus.data}
          fetchConfigUrl={vectorDbConfigUpdateAuthPost}
          IdToken={IdToken}
          title={'Vector Database Config'}
        />
      </div>
      <div>
        <RestrictRestApi
          fetchConfigUrl={restrictRestApiAuthPost}
          IdToken={IdToken}
          title={'Restrict Rest API'}
        />
      </div>
      <PromptEditor getUrl={promptGetAuthGet} postUrl={promptUpdateAuthPost} />
    </div>
  )
}

export default InfoPanelForStackV2
