import React from 'react'
import Separator from '../../../Separator'
import moment from 'moment'
import { HomePageActionButton } from '../../../Buttons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faTrashAlt,
    faRedoAlt,
    faPlus,
    faDownload,
} from '@fortawesome/free-solid-svg-icons'
import Spinner from '../../../Spinner'
import { CopyBlock, dracula } from 'react-code-blocks'
import InfoTile from '../InfoTile'
import CopyButton from '../CopyButton'
import safeConsole from '../../../../helpers/safeConsole'
import { StackItem } from '../../../types'
import usePromise from '../../../../hooks/usePromise'
import axios, { AxiosError } from 'axios'
import { AppEnvironment } from '../../../../helpers/AppEnvironmentManager'
import Form from '../../../utils/Form'

interface InfoPanelForStackV1 {
    stack?: StackItem
    IdToken?: string
}

const InfoPanelForStackV1 = ({ stack, IdToken }: InfoPanelForStackV1) => {
    if (!stack) return <></>
    if (stack?.state !== 'AVAILABLE') return <></>
    let stackContent: any = undefined
    let ingestionUrl: string = ''
    let downloadIngestionUrl: string = ''
    let deleteIngestedUrl: string = ''
    let updateOpenAIKeyUrl: string = ''
    let clientWebSocketUrl: string = ''
    try {
        const _stackContent = JSON.parse(stack?.stack_content || '{}')
        stackContent = _stackContent.content
        ingestionUrl = stackContent?.find(
            (item: any) => item.ExportName === 'ingest--post-noauth',
        )?.OutputValue
        deleteIngestedUrl = stackContent?.find(
            (item: any) => item.ExportName === 'ingest--delete-auth',
        )?.OutputValue
        updateOpenAIKeyUrl = stackContent?.find(
            (item: any) => item.ExportName === 'open-ai-key-update--post-auth',
        )?.OutputValue
        clientWebSocketUrl = stackContent?.find(
            (item: any) => item.ExportName === 'websocket-noauth',
        )?.OutputValue
        downloadIngestionUrl = stackContent?.find(
            (item: any) => item.ExportName === "ingest--get-auth",
        )?.OutputValue

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

    return (
        <div className="grid gap-3 grid-cols-1 md:grid-cols-2">
            <InfoTile className="col-span-2">
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
                    sent in JSON format in the request body.
                </p>
                <Separator padding={3} />
                <CopyBlock
                    text={`
                    import requests
                    import json

                    url = '${ingestionUrl}'
                    data = {
                        'url': ['https://www.example.com', 'https://www.google.com'],
                        'headings': ['Example website', 'Google'],
                        'paragraph': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
                    }
                    headers = {'Content-type': 'application/json'}
                    response = requests.post(url, data=json.dumps(data), headers=headers)
                    print(response.status_code)  # check the status code of the response
                    print(response.json())  # display the response data as JSON
                    `
                        .trim()
                        .split('\n')
                        .map((item) => item.trim())
                        .join('\n')}
                    language={'python'}
                    theme={dracula}
                    codeblock
                    showLineNumbers={true}
                    wrapLines
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
            <InfoTile>
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
            <InfoTile>
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
        </div>
    )
}

export default InfoPanelForStackV1
