import React from 'react'

interface IStackTileContainer {
  children: React.ReactNode
  onClick?: () => void
  className?: string
}

const StackTileContainer = ({
  children,
  onClick,
  className,
}: IStackTileContainer) => {
  return (
    <div
      onClick={onClick}
      tabIndex={0}
      className={`cursor-pointer border dark:border dark:border-gray-700 dark:bg-[#1B1E1F] bg-white px-4 py-3 flex-shrink-0 h-[200px] w-full sm:h-[256px] sm:w-[256px] ${className}`}
    >
      {children}
    </div>
  )
}

export default StackTileContainer
