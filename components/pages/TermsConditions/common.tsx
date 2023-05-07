import React from 'react'
import Separator from '../../Separator'
import CodeMirror from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { xcodeDark } from '@uiw/codemirror-theme-xcode'

export const MainHeading: React.FC<{ children: string }> = ({ children }) => {
  return <h1 className="text-3xl font-medium">{children}</h1>
}

export const Text: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <Separator />
      <p className="text-lg">{children}</p>
    </>
  )
}

export const UL: React.FC<{ items: (() => JSX.Element)[] }> = ({ items }) => {
  return (
    <ul className="list-disc px-4">
      {items.map((Item, index) => (
        <li key={index}>
          <Item />
        </li>
      ))}
    </ul>
  )
}

export const JSCode: React.FC<{ code: string; height?: string }> = ({
  code,
  height = '160px',
}) => (
  <CodeMirror
    value={code}
    height={height}
    extensions={[javascript({ typescript: true })]}
    theme={xcodeDark}
    editable={false}
    className="mx-[-16px] w-screen sm:mx-[-32px] sm:w-screen  md:mx-0 md:w-[100%]"
  />
)
