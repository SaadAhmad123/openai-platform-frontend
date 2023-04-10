import React, { useContext, useEffect, useState } from 'react'
import Separator from '../../../../Separator'
import { HomePageActionButton } from '../../../../Buttons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faEdit } from '@fortawesome/free-solid-svg-icons'
import Spinner from '../../../../Spinner'
import InfoTile from '../../InfoTile'
import usePromise from '../../../../../hooks/usePromise'
import axios from 'axios'
import { AuthContextType } from '../../../../../AuthContext/types'
import AuthContext from '../../../../../AuthContext/Context'
import CodeMirror from '@uiw/react-codemirror'
import { json } from '@codemirror/lang-json'
import { xcodeDark } from '@uiw/codemirror-theme-xcode'

export interface IPromptEditor {
  getUrl: string
  postUrl: string
}

const PromptEditor = ({ getUrl, postUrl }: IPromptEditor) => {
  const { auth } = useContext<AuthContextType>(AuthContext)
  const [code, setCode] = useState<string>('')
  const getPrompt = usePromise(async () => {
    const resp = await axios.get(getUrl, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: auth?.IdToken || '',
      },
    })
    if (!resp.data.prompt.length) {
      return {
        prompt: [
          {
            id: 'default',
            pre_query: '',
            post_query: '',
            system: {
              role: 'system',
              content: 'You are a friendly chatbot',
            },
            post_chat_history: [
              {
                role: 'user',
                content: 'You are a friendly chatbot',
              },
            ],
            pre_chat_history: [
              {
                role: 'user',
                content: 'You are a friendly chatbot',
              },
            ],
          },
        ],
      }
    }
    return resp.data
  })

  const postPrompt = usePromise(async (jsonBody: string) => {
    await axios.post(postUrl, JSON.parse(jsonBody), {
      headers: {
        'Content-Type': 'application/json',
        Authorization: auth?.IdToken || '',
      },
    })
  })

  useEffect(() => {
    getPrompt.retry()
  }, [])
  useEffect(() => {
    setCode(JSON.stringify(getPrompt.data || {}, null, 2))
  }, [getPrompt.data])

  return (
    <InfoTile className="md:col-span-2 lg:col-span-4">
      {postPrompt.error && (
        <p className="bg-red-600 text-white p-3 mb-4">
          {postPrompt.error?.message}
        </p>
      )}
      <div className="flex items-center justify-start gap-3 text-lg ">
        {getPrompt.state === 'loading' ? (
          <Spinner tailwindBorderColor="border-orange-500" />
        ) : (
          <FontAwesomeIcon icon={faEdit} />
        )}
        <h1 className="font-bold">Prompts Editor</h1>
      </div>
      <Separator />
      <CodeMirror
        value={code}
        height="500px"
        extensions={[json()]}
        theme={xcodeDark}
        onChange={(e) => setCode(e)}
      />
      <Separator />
      <HomePageActionButton
        text="Update"
        icon={
          postPrompt?.state === 'loading' ? (
            <Spinner />
          ) : (
            <FontAwesomeIcon icon={faPlus} />
          )
        }
        onClick={() => {
          postPrompt.retry(code)
        }}
      />
    </InfoTile>
  )
}

export default PromptEditor
