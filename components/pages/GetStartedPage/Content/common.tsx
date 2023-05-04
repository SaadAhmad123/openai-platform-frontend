import React from 'react'
import Separator from '../../../Separator'

export const MainHeading: React.FC<{ children: string }> = ({ children }) => {
    return <h1 className="text-3xl">{children}</h1>
}

export const Text: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <>
            <Separator />
            <p className="text-lg">{children}</p>
        </>
    )
}

export const UL: React.FC<{ items: React.ReactNode[] }> = ({ items }) => {
    return (
        <ul className='list-disc px-4'>
            {items.map((item, index) => (
                <li key={index}>{item}</li>
            ))}
        </ul>
    )
}
