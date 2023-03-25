import React from 'react'
import Separator from '../../Separator'
import StackTileContainer from './utils/StackTile/Container'

interface ICreateStackButton {
  onClick?: () => void
}

const CreateStackButton = ({ onClick }: ICreateStackButton) => (
  <StackTileContainer
    onClick={onClick}
    className="text-center transition-all duration-200 flex items-center justify-center hover:bg-servian-orange hover:text-white dark:hover:bg-servian-orange dark:hover:text-white"
  >
    <div>
      <p className="text-6xl">+</p>
      <Separator />
      <p className="text-xl">Create a stack</p>
    </div>
  </StackTileContainer>
)

export default CreateStackButton
