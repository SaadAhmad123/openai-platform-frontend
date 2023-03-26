import React, { useState } from 'react'
import { RegistrationSecondaryButton } from '../../Buttons'
import safeConsole from '../../../helpers/safeConsole'

interface ICopyButton {
  textToCopy: string
}

const CopyButton = ({ textToCopy }: ICopyButton) => {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      if (copied) {
        setCopied(false)
        return
      }
      setCopied(false)
      await navigator?.clipboard?.writeText(textToCopy)
      setCopied(true)
    } catch (e) {
      safeConsole()?.error(e as Error)
      setCopied(false)
    }
  }

  return (
    <RegistrationSecondaryButton
      text={copied ? 'Copied' : 'Copy'}
      className="rounded-full px-4 mb-3 sm:my-0 bg-gray-100 dark:bg-servian-black"
      onClick={() => {
        copy()
      }}
    />
  )
}

export default CopyButton
