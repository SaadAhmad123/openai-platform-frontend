import React from 'react'
import RegistrationBox from './utils/RegistrationBox'
import Layout from '../../Layout'
import Separator from '../../Separator'
import { HomePageActionButton } from '../../Buttons'
import useSegment from '../../../hooks/useSegment'
import onMount from '../../../hooks/onMount'
import Link from 'next/link'

const WaitListBox = () => {
  const segment = useSegment()
  onMount(() => {
    segment()?.identify()
    segment()?.track('WaitList Form Viewed')
  })
  return (
    <Layout>
      <RegistrationBox heading="WaitList" error={''}>
        <p>
          Thank you for your interest in MakeGPT, currently in beta. Please
          register your interest in the Google Form below. Access will be
          granted on a rolling basis.
          <br />
          <br />
          If granted access, I will provide support in your exploration of
          MakeGPT{"'"}s potential.
          <br />
          <br />
          Thank you and have a great day!
        </p>
        <Separator padding={20} />
        <a
          href="https://forms.gle/NEKQTUw4pfW7M9Zz7"
          target="_blank"
          onClick={() => {
            segment()?.track('WaitList Form Click')
          }}
        >
          <HomePageActionButton text="Registration Form" />
        </a>
        <Separator padding={10} />
        <p className='text-sm'>
          Upon expressing your interest in registering, you kindly acknowledge and accept the <Link className='underline' href={"/terms-and-conditions"}>
            Terms and conditions
          </Link> associated with MakeGPT service.
        </p>
      </RegistrationBox>
    </Layout>
  )
}

export default WaitListBox
