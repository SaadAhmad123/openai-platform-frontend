import React, { useRef, useState } from 'react'
import Modal from 'react-modal'
import ReactPlayer from 'react-player/youtube'
import { createIconButton } from './Buttons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

interface Props {
    videoUrl: string
    isOpen: boolean
    onClose: () => void
}

const YoutubeVideoModal: React.FC<Props> = ({ videoUrl, isOpen, onClose }) => {

    const CloseButton = createIconButton(`
        flex items-center justify-center h-12 w-12 fixed right-4 md:right-6 
        lg:right-8 top-4 md:top-6 lg:top-8 hover:bg-[#1B1E1F] transition
        duration-200 shadow-lg bg-red-600 text-servian-white
    `)

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            style={{
                overlay: { zIndex: 1000 },
                content: {
                    background: 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                },
            }}
        >
            <div>
                <ReactPlayer url={videoUrl} controls={true} />
            </div>
            <div>
                <CloseButton icon={<FontAwesomeIcon icon={faTimes} size={'lg'} />}
                    onClick={onClose}
                    text={'Close'} />
            </div>

        </Modal>
    )
}

export default YoutubeVideoModal
