import React from 'react'
import Layout from '../components/Layout'
import Separator from '../components/Separator'
import UnAuthenticatedNavbar from '../components/UnAuthenticatedNavbar'

// eslint-disable-next-line react/display-name
export default function () {
  return (
    <Layout navbar={<UnAuthenticatedNavbar />}>
      <Separator padding={40} />
      <h1 className="text-4xl md:text-5xl font-medium md:mt-[48px]">
        MakeGPT Developer Preview
      </h1>
      <Separator padding={8} />
      <p className="text-normal md:text-2xl font-thin">
        Welcome to the MakeGPT Developer Preview! We{"'"}e excited to have you
        on board as we begin our journey to empower developers and organizations
        with the tools they need to harness the power of ChatGPT. In this
        Developer Preview, you{"'"}ll have access to the following:
      </p>

      <Separator padding={16} />
      <p>As part of the developer preview, you can expect the following:</p>
      <Separator padding={8} />
      <section>
        <h2 className="text-lg font-bold mb-1">
          Infrastructure and Software Stacks
        </h2>
        <ul className="list-disc px-4">
          <li>
            <strong>4 Available Infrastructure + Software Stacks:</strong>{' '}
            Provision and build on these stacks to create your custom MakeGPT
            instance, tailored to your specific requirements.
          </li>
        </ul>
      </section>

      <Separator padding={8} />
      <section>
        <h2 className="text-lg font-bold mb-1">UI for Testing Chatbots</h2>
        <ul className="list-disc px-4">
          <li>
            <strong>Chatbot Testing UI:</strong> Test your chatbots using our
            user-friendly interface, which allows you to evaluate your chatbot
            {"'"}s performance and fine-tune its responses.
          </li>
        </ul>
      </section>

      <Separator padding={8} />
      <section>
        <h2 className="text-lg font-bold mb-1">Comprehensive Documentation</h2>
        <ul className="list-disc px-4">
          <li>
            <strong>Detailed Documentation:</strong> Learn how to make the most
            of MakeGPT with our in-depth documentation, which covers everything
            from setting up your infrastructure to integrating your data with
            ChatGPT.
          </li>
        </ul>
      </section>

      <Separator padding={8} />
      <p className="text-normal md:text-2xl font-thin">
        Keep in mind that this is just a preview of what{"'"}s to come. In the
        final product, you can expect:
      </p>
      <Separator padding={8} />
      <section>
        <ul className="list-disc px-4">
          <li>
            <strong>Permission-Based User Access:</strong> Control access to
            your MakeGPT instance with granular permission settings, ensuring
            that only authorized users can access and modify your data and
            settings.
          </li>
          <li>
            <strong>Native Integrations:</strong> Seamlessly integrate MakeGPT
            with popular tools like Confluence, making it even easier to
            integrate ChatGPT into your existing workflows.
          </li>
        </ul>
      </section>
      <Separator padding={8} />
      <p>
        We{"'"}re looking forward to your valuable feedback during this
        Developer Preview. Your insights will help us shape the future of
        MakeGPT, ensuring that we deliver a product that truly meets the needs
        of our users. Together, we can revolutionize the way organizations and
        developers harness the power of AI and ChatGPT.
      </p>
      <br />
      <p>Happy experimenting!</p>
    </Layout>
  )
}
