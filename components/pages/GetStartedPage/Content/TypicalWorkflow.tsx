import React from 'react'
import { IContentComponent } from './types'
import { MainHeading, UL } from './common'
import { Text } from './common'
import Separator from '../../../Separator'

function TypicalWorkflow({ link }: IContentComponent) {
    return (
        <section id={link}>
            <MainHeading>Typical Workflow</MainHeading>
            <Separator padding={8} />
            <Text>
                MakeGPT streamlines the process of building OpenAI (LLM, ChatGPT) based
                applications by providing you with fully managed, production-grade
                software and infrastructure. This allows seamless integration of your
                data with ChatGPT, regardless of your specific use case.
            </Text>
            <Text>
                To get started with MakeGPT, follow the steps outlined in this typical
                workflow guide:
            </Text>
            <UL
                items={[
                    <Text>
                        <strong> Idea conception</strong>: Begin by conceptualizing the idea
                        you want to experiment with using OpenAI LLM models, such as
                        ChatGPT.Identify the data sources, such as blogs or documents, that
                        you want the AI to analyze, summarize, understand, and provide
                        recommendations based on.
                    </Text>,
                    <Text>
                        <strong> Sign up or log in</strong>: Visit MakeGPT and either create
                        an account or log in to your existing account.
                    </Text>,
                    <Text>
                        <strong> Access the dashboard</strong>: Once logged in, navigate to
                        the dashboard.
                    </Text>,
                    <Text>
                        <strong> Create a new stack</strong>: Click the {'"'}Create a stack
                        {'"'} button to open a panel where you can enter your stack{"'"}s
                        name, description, and type. Select the desired stack type from the
                        drop-down menu labeled {'"'}Stacks{'"'}.
                    </Text>,
                    <Text>
                        <strong> Choose a stack type</strong>: It is recommended to choose a{' '}
                        {'"'}stack_v...{'"'} type, as these stacks are provisioned within
                        the MakeGPT cloud.The {'"'}stack_x...{'"'} types, which are
                        provisioned on your AWS account, are currently in developer preview
                        and not as stable.
                    </Text>,
                    <Text>
                        <strong> Provision your stack</strong>: Click "Create" to begin
                        provisioning your stack.This process typically takes about 5
                        minutes.
                    </Text>,
                    <Text>
                        <strong> Configure your stack</strong>: Once your stack is
                        provisioned, configure it according to the stack - specific
                        documentation provided.
                    </Text>,
                    <Text>
                        <strong> Test your configuration</strong>: Click the {'"'}Try...
                        {'"'} button to access a client connected to your stack.If
                        configured correctly, you can start querying the system using the
                        barebones ChatGPT.
                    </Text>,
                    <Text>
                        <strong> Upload your data</strong>: Obtain the ingestion endpoint
                        and push your data to it using a script written in any language.The
                        expected request body format is provided in the stack - specific
                        documentation.
                    </Text>,
                    <Text>
                        <strong> Index your data</strong>: After uploading, your data will
                        be indexed, either automatically or manually if you choose to
                        trigger it.
                    </Text>,
                    <Text>
                        <strong> Use ChatGPT with your data</strong>: With the data indexed,
                        you can now use ChatGPT to analyze and provide insights based on
                        your specific data.
                    </Text>,
                    <Text>
                        <strong> Integrate with your application</strong>: Use the provided
                        client endpoint to query your version of ChatGPT and integrate its
                        capabilities into your application.
                    </Text>,
                ]}
            />
        </section>
    )
}

export default TypicalWorkflow
