import React, { useContext, useEffect, useState } from 'react'
import Separator from '../../../Separator'
import { HomePageActionButton } from '../../../Buttons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faTrashAlt,
    faPlus,
    faDownload,
    faEdit,
} from '@fortawesome/free-solid-svg-icons'
import Spinner from '../../../Spinner'
import InfoTile from '../InfoTile'
import CopyButton from '../CopyButton'
import safeConsole from '../../../../helpers/safeConsole'
import { StackItem } from '../../../types'
import usePromise from '../../../../hooks/usePromise'
import axios, { AxiosError } from 'axios'
import Form from '../../../utils/Form'
import { AuthContextType } from '../../../../AuthContext/types'
import AuthContext from '../../../../AuthContext/Context'
import CodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';
import { python } from '@codemirror/lang-python'
import { xcodeDark } from "@uiw/codemirror-theme-xcode"

interface InfoPanelForStackV1 {
    stack?: StackItem
    IdToken?: string
}

function addWidgetToPage(socket: string, name: string, prompt_id: string, srcUrl = "https://open-ai-client.saad-ahmad.com/dist") {
    const rootSelectorClass = '____open_ai_client_chat_bot_saad'
    const rootDiv = document.createElement('div')
    rootDiv.classList.add(rootSelectorClass)
    rootDiv.classList.add('open_ai_chat_bot_root_container')
    rootDiv.setAttribute("socket", socket)
    rootDiv.setAttribute("name", name)
    rootDiv.setAttribute("prompt_type", prompt_id)
    document.body.appendChild(rootDiv)


    // Create a script tag and add it to the page
    const scriptTag = document.createElement("script");
    scriptTag.src = srcUrl + "/index.js";
    document.body.appendChild(scriptTag);

    // Create a link tag for the stylesheet and add it to the page
    const linkTag = document.createElement("link");
    linkTag.rel = "stylesheet";
    linkTag.href = srcUrl + "/index.css";
    document.head.appendChild(linkTag);
}

const widgetCode = (socket: string, name: string, prompt_id: string) => `
function addWidgetToPage(socket, name, prompt_id, srcUrl = "https://open-ai-client.saad-ahmad.com/dist") {
    const rootSelectorClass = '____open_ai_client_chat_bot_saad'
    const rootDiv = document.createElement('div')
    rootDiv.classList.add(rootSelectorClass)
    rootDiv.classList.add('open_ai_chat_bot_root_container')
    rootDiv.setAttribute("socket", socket)
    rootDiv.setAttribute("name", name)
    rootDiv.setAttribute("prompt_type", prompt_id)
    document.body.appendChild(rootDiv)

    // Create a script tag and add it to the page
    const scriptTag = document.createElement("script");
    scriptTag.src = srcUrl + "/index.js";
    document.body.appendChild(scriptTag);

    // Create a link tag for the stylesheet and add it to the page
    const linkTag = document.createElement("link");
    linkTag.rel = "stylesheet";
    linkTag.href = srcUrl + "/index.css";
    document.head.appendChild(linkTag);
}
addWidgetToPage("${socket}", "${name}", "${prompt_id}")
`

const ingestionCode = (ingestionUrl: string) => (
    `import pandas as pd
import requests
import json

url = "${ingestionUrl}"
df = pd.read_csv('data.csv')

# Get count of rows
num_rows = len(df)

for index, row in df.iterrows():
    # Print value of "url" column for current row
    data = {
        'urls': [row['url']],
        'headings': [row['page headings']],
        'paragraph': row["paragraph"]
    }
    #print(json.dumps(data))
    response = requests.post(url, json=data)
    print(f"{index}/{num_rows}:{index/num_rows*100}% -- data synced -- {str(response.content)}")`
)

export interface IPromptEditor {
    getUrl: string,
    postUrl: string,
}

const PromptEditor = ({ getUrl, postUrl }: IPromptEditor) => {
    const { auth } = useContext<AuthContextType>(AuthContext)
    const [code, setCode] = useState<string>("")
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
                        id: "default",
                        pre_query: "",
                        post_query: "",
                        system: {
                            role: "system",
                            content: "You are a friendly chatbot"
                        },
                        post_chat_history: [
                            {
                                role: "user",
                                content: "You are a friendly chatbot"
                            }
                        ],
                        pre_chat_history: [
                            {
                                role: "user",
                                content: "You are a friendly chatbot"
                            }
                        ]
                    }
                ]
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

    useEffect(() => { getPrompt.retry() }, [])
    useEffect(() => {
        setCode(JSON.stringify(getPrompt.data || {}, null, 2))
    }, [getPrompt.data])

    return <InfoTile className="md:col-span-2 lg:col-span-4">
        <div className="flex items-center justify-start gap-3 text-lg ">
            {
                getPrompt.state === "loading" ? <Spinner tailwindBorderColor="border-orange-500" /> : <FontAwesomeIcon icon={faEdit} />
            }
            <h1 className='font-bold'>Prompts Editor</h1>
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
        <HomePageActionButton text="Update" icon={
            postPrompt?.state === "loading" ? <Spinner /> : <FontAwesomeIcon icon={faPlus} />
        }
            onClick={() => { postPrompt.retry(code) }}
        />
    </InfoTile>
}



const InfoPanelForStackV1 = ({ stack, IdToken }: InfoPanelForStackV1) => {
    let stackContent: any = undefined
    let ingestionUrl: string = ''
    let downloadIngestionUrl: string = ''
    let deleteIngestedUrl: string = ''
    let updateOpenAIKeyUrl: string = ''
    let clientWebSocketUrl: string = ''
    let clientWebAppLink: string = ''
    let promptGetUrl: string = ''
    let promptPostUrl: string = ''

    try {
        const _stackContent = JSON.parse(stack?.stack_content || '{}')
        stackContent = _stackContent.content
        ingestionUrl = stackContent?.find(
            (item: any) => item.ExportName === `${stack?.stack_uuid}-ingest--post-noauth`,
        )?.OutputValue
        deleteIngestedUrl = stackContent?.find(
            (item: any) => item.ExportName === `${stack?.stack_uuid}-ingest--delete-auth`,
        )?.OutputValue
        updateOpenAIKeyUrl = stackContent?.find(
            (item: any) => item.ExportName === `${stack?.stack_uuid}-open-ai-key-update--post-auth`,
        )?.OutputValue
        clientWebSocketUrl = stackContent?.find(
            (item: any) => item.ExportName === `${stack?.stack_uuid}-websocket-noauth`,
        )?.OutputValue
        downloadIngestionUrl = stackContent?.find(
            (item: any) => item.ExportName === `${stack?.stack_uuid}-ingest--get-auth`,
        )?.OutputValue
        promptGetUrl = stackContent?.find(
            (item: any) => item.ExportName === `${stack?.stack_uuid}-prompt--get-auth`,
        )?.OutputValue
        promptPostUrl = stackContent?.find(
            (item: any) => item.ExportName === `${stack?.stack_uuid}-prompt--post-auth`,
        )?.OutputValue
        clientWebAppLink = `https://mgpt-client.saad-ahmad.com/?socket=${clientWebSocketUrl}&name=${stack?.name || "unknown"}&prompt_type=default`
    } catch (e) {
        safeConsole()?.error(e)
    }

    const deleteIngestedData = usePromise(async () => {
        return await axios.delete(deleteIngestedUrl, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: IdToken || '',
            },
        })
    })

    const handleIngestedDataDownload = usePromise(async () => {
        const url = downloadIngestionUrl;
        const resp = await axios.get(url, {
            headers: {
                "Content-Type": "application/json",
                Authorization: IdToken || '',
            },
        })
        const downloadResp = await axios.get(resp.data.url, { responseType: "blob" })
        const link = document.createElement("a")
        link.href = window.URL.createObjectURL(new Blob([downloadResp.data]))
        link.setAttribute('download', `index-${Date.now()}.json`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    })

    const updateOpenAiKey = usePromise(async (secretKey: string) => {
        return await axios.post(
            updateOpenAIKeyUrl,
            {
                secretValue: secretKey,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: IdToken || '',
                },
            },
        )
    })

    if (!stack) return <></>
    if (stack?.state !== 'AVAILABLE') return <></>
    if (stack?.provisioning_stack !== "stack_v1") return <></>
    return (
        <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            <InfoTile>
                <p>
                    Accelerate your experimentation! Try your <strong>{stack?.name} GPT</strong> instantly with our client app.
                </p>
                <Separator padding={8} />
                <a href={clientWebAppLink} target={"_blank"}>
                    <HomePageActionButton text={`Try ${stack?.name} GPT now!`} />
                </a>
            </InfoTile>
            <InfoTile>
                <p>
                    Try <strong>{stack?.name} GPT</strong> instantly with our embeddable chatbot app.
                </p>
                <Separator padding={8} />
                <HomePageActionButton text={`Try ${stack?.name} GPT chatbot!`} onClick={() => addWidgetToPage(clientWebSocketUrl, stack?.name || "", "default")} />
            </InfoTile>
            <InfoTile>
                <p>
                    Try <strong>{stack?.name} GPT</strong> embeddable chatbot in your code. Paste it in your code/ console.
                </p>
                <Separator padding={8} />
                <CopyButton textToCopy={widgetCode(clientWebSocketUrl, stack?.name || "", "default")} />
            </InfoTile>
            <InfoTile className="md:col-span-2 lg:col-span-4">
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                    Ingestion URL
                </p>
                <Separator padding={1} />
                <p className="font-medium text-sm w-full bg-servian-light-gray dark:bg-servian-black p-2">
                    {ingestionUrl}
                </p>
                <Separator />
                <CopyButton textToCopy={ingestionUrl || ''} />
                <Separator padding={8} />
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                    The URL provided allows you to send POST requests to submit data
                    consisting of three fields - an array of strings for URLs, an array of
                    strings for headings, and a string for the paragraph. The data will be
                    sent in JSON format in the request body. For example,
                </p>
                <Separator padding={3} />
                <CodeMirror
                    value={ingestionCode(ingestionUrl)}
                    height="200px"
                    extensions={[python()]}
                    theme={xcodeDark}
                    editable={false}
                />
                <Separator padding={8} />
                <div className="flex items-center gap-4">
                    <HomePageActionButton
                        onClick={() => {
                            if (
                                !window.confirm(
                                    `Are you sure you want to delete the ingested data`,
                                )
                            )
                                return
                            deleteIngestedData.retry()
                        }}
                        text={deleteIngestedData?.error?.message || 'Delete'}
                        icon={
                            deleteIngestedData.state === 'loading' ? (
                                <Spinner />
                            ) : (
                                <FontAwesomeIcon icon={faTrashAlt} />
                            )
                        }
                    />
                    <HomePageActionButton
                        onClick={() => {
                            handleIngestedDataDownload.retry()
                        }}
                        text={handleIngestedDataDownload?.error?.message || 'Download'}
                        icon={
                            handleIngestedDataDownload.state === 'loading' ? (
                                <Spinner />
                            ) : (
                                <FontAwesomeIcon icon={faDownload} />
                            )
                        }
                    />
                </div>

                <Separator padding={4} />
            </InfoTile>
            <InfoTile className="lg:col-span-2">
                {updateOpenAiKey.error?.message && (
                    <>
                        <h1 className="text-lg bg-red-600 text-white px-4 py-2">
                            {((updateOpenAiKey.error as AxiosError)?.response?.data as any)
                                ?.message ||
                                JSON.stringify(
                                    (updateOpenAiKey.error as AxiosError)?.response?.data,
                                )}
                        </h1>
                        <Separator />
                    </>
                )}
                <Form
                    inputs={[
                        {
                            label: 'Open AI Token',
                            type: 'password',
                            key: 'secret-key',
                            isRequired: true,
                        },
                    ]}
                    handleSubmit={async (values: { [p: string]: any }) => {
                        await updateOpenAiKey.retry(values?.['secret-key'] || '')
                    }}
                    SubmitButton={({ loading }) => (
                        <div className="flex-1">
                            <HomePageActionButton
                                text="Update"
                                icon={loading ? <Spinner /> : <FontAwesomeIcon icon={faPlus} />}
                            />
                        </div>
                    )}
                />
            </InfoTile>
            <InfoTile className="lg:col-span-2">
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                    Client Websocket Url
                </p>
                <Separator padding={1} />
                <p className="font-medium text-sm w-full bg-servian-light-gray dark:bg-servian-black p-2">
                    {clientWebSocketUrl}
                </p>
                <Separator />
                <CopyButton textToCopy={clientWebSocketUrl || ''} />
                <Separator padding={8} />
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                    Use this websocket urls to interact with ChatGPT integration
                </p>
            </InfoTile>
            <PromptEditor getUrl={promptGetUrl} postUrl={promptPostUrl} />
        </div>
    )
}

export default InfoPanelForStackV1
