import React from 'react'

interface IInfoTile {
  children: React.ReactNode
  onClick?: () => void
  className?: string
}

const InfoTile = ({ children, onClick, className }: IInfoTile) => {
  return (
    <div
      onClick={onClick}
      tabIndex={onClick ? 0 : undefined}
      className={`${
        onClick ? 'cursor-pointer' : ''
      } border dark:border dark:border-gray-700 dark:bg-[#1B1E1F] bg-white px-4 py-3 ${className} border-l-8 dark:border-l-8 overflow-x-auto`}
    >
      {children}
    </div>
  )
}

export default InfoTile
