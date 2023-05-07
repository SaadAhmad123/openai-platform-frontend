import React from 'react'
import { IContentComponent } from './types'
import { JSCode, MainHeading } from './common'
import { Text } from './common'
import Separator from '../../../Separator'

function StackUsage({ link }: IContentComponent) {
  return (
    <>
      <div id={link} />
      <Separator padding={40} />
      <section>
        <MainHeading>How do I use stack?</MainHeading>
        <Separator padding={8} />
        <Text>
          Each stack enables you to connect with your ChatGPT integration
          through a WebSocket endpoint, with some stacks also providing a REST
          endpoint. To test your integration, every stack offers a client
          application. By clicking its link, the client will open and establish
          a connection with your stack via the WebSocket.{' '}
          <strong>
            The request body which is expected by the socket is as following
          </strong>
        </Text>
        <Separator />
        <JSCode
          height="300px"
          code={JSON.stringify(
            {
              type: 'object',
              properties: {
                query: { type: 'string' },
                temperature: { type: 'float', default: 0.7 },
                max_response_tokens: { type: 'int', default: 500 },
                external_context: { type: 'string', default: ' ' },
                vector_records_to_fetch: { type: 'int', default: 10 },
                just_build_context: { type: 'bool', default: false },
                max_context_tokens: { type: 'int', default: 2500 },
                chat_history: {
                  type: 'array',
                  default: [],
                  items: {
                    type: 'object',
                    properties: {
                      type: { type: 'string' },
                      content: { type: 'string' },
                    },
                  },
                },
                client_src: { type: 'string', default: 'web' },
                frequency_penalty: { type: 'float', default: 0 },
                presence_penalty: { type: 'float', default: 0 },
                prompt_id: { type: 'string', default: 'default' },
                user_id: { type: 'string', default: undefined },
                __debug: { type: 'boolean', default: false },
              },
            },
            null,
            2,
          )}
        />
        <Separator />
        <Text>
          You can also test the WebSocket using Postman or incorporate the
          provided link into your backend or frontend applications. For
          integrations with Twilio and similar services that require a REST API
          endpoint, certain stacks offer the needed REST endpoints to facilitate
          these connections.{' '}
          <strong>The POST endpoint expects the following request body.</strong>
        </Text>
        <Separator />
        <JSCode
          height="300px"
          code={JSON.stringify(
            {
              type: 'object',
              properties: {
                query: { type: 'string' },
                temperature: { type: 'float', default: 0.7 },
                max_response_tokens: { type: 'int', default: 500 },
                external_context: { type: 'string', default: ' ' },
                vector_records_to_fetch: { type: 'int', default: 10 },
                just_build_context: { type: 'bool', default: false },
                max_context_tokens: { type: 'int', default: 2500 },
                chat_history: {
                  type: 'array',
                  default: [],
                  items: {
                    type: 'object',
                    properties: {
                      type: { type: 'string' },
                      content: { type: 'string' },
                    },
                  },
                },
                client_src: { type: 'string', default: 'web' },
                frequency_penalty: { type: 'float', default: 0 },
                presence_penalty: { type: 'float', default: 0 },
                prompt_id: { type: 'string', default: 'default' },
                user_id: { type: 'string', default: undefined },
                __debug: { type: 'boolean', default: false },
                chat_to_continue: {
                  type: 'array',
                  default: [],
                  items: {
                    type: 'object',
                    properties: {
                      role: { type: 'string' },
                      content: { type: 'string' },
                    },
                  },
                },
              },
            },
            null,
            2,
          )}
        />
      </section>
    </>
  )
}

export default StackUsage
