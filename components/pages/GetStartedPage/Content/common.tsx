import React from 'react'
import Separator from '../../../Separator'

export const MainHeading: React.FC<{ children: string }> = ({ children }) => {
    return <h1 className="text-3xl">{children}</h1>
}

export const Text: React.FC<{ children: string }> = ({ children }) => {
    return <>
        <Separator />
        <p className="text-lg">{children}</p>
    </>
}