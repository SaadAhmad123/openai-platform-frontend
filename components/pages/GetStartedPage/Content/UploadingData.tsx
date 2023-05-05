import React from 'react'
import { IContentComponent } from './types'
import { MainHeading, UL } from './common'
import { Text } from './common'
import Separator from '../../../Separator'
import CodeMirror from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { xcodeDark } from '@uiw/codemirror-theme-xcode'

function UploadingData({ link }: IContentComponent) {
  return (
    <>
      <div id={link} />
      <Separator padding={40} />
      <section>
        <MainHeading>Uploading Data</MainHeading>
        <Separator padding={8} />
        <Text>
          My goal with MakeGPT is to simplify the process of integrating and
          uploading data to the Stack, allowing you to make the most of your
          data in queries. In the future, I plan to develop native integrations,
          making it as easy as pressing a few buttons to start feeding data from
          your datasource to the Stack. For now, you can use the {'"'}Ingestion
          endpoint{'"'} to push data to the Stack by sending a POST request with
          the following payload:
        </Text>
        <Separator />
        <CodeMirror
          value={`
{
  uuid: string,
  urls: Array<string>,
  headings: Array<string>,
  paragraph: string,
  tokens: number,       // Optional, if you don't want the endpoint to calculate tokens, leave this empty for now
  embeddings: number[], // Optional, if you don't want the endpoint to calculate embeddings, leave this empty for now
}
                    `.trim()}
          height="160px"
          extensions={[javascript({ typescript: true })]}
          theme={xcodeDark}
          editable={false}
          className="mx-[-16px] w-screen sm:mx-[-32px] sm:w-screen  md:mx-0 md:w-[100%]"
        />
        <Separator />
        <Text>
          If you don{"'"}t provide tokens and embeddings, the endpoint will
          calculate them using your OpenAI configuration. The response will
          contain the following object:
        </Text>
        <Separator />
        <div>
          <CodeMirror
            value={`
{
  timeElapsedMS: {
    tokenizer: number,
    embedding_calculator: number,
    index_update: number,
    clean_up: number
  },
  tokens: number,   // Tokens represent the content size as seen by the LLM models
  embeddings: number[] // The system uses embeddings to fetch relevant context data for querying OpenAI LLMs
}
                    `.trim()}
            height="200px"
            extensions={[javascript({ typescript: true })]}
            theme={xcodeDark}
            editable={false}
            className="mx-[-16px] w-screen sm:mx-[-32px] sm:w-screen  md:mx-0 md:w-[100%]"
          />
        </div>
        <Separator />
        <Text>
          I highly recommend saving a copy of the data, particularly the tokens
          and embeddings, in your own system. Since calculating these values can
          be costly, storing them will not only help you manage expenses but
          also facilitate easy migration to a different Stack in the future.
        </Text>
      </section>
    </>
  )
}

export default UploadingData
