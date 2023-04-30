import React from 'react'

const Footer = () => {
  return (
    <div className="w-screen py-3 bg-gray-100 dark:bg-[#1B1E1F] shadow dark:shadow-none dark:border-b dark:border-gray-700 z-50">
      <div className="max-w-[1600px] w-screen mx-auto px-4 sm:px-8 flex items-center justify-between">
        <p className="italic">
          Developed by{' '}
          <a
            href="https://www.saad-ahmad.com/"
            target="_blank"
            className="hover:underline"
          >
            Saad Ahmad
          </a>
        </p>
      </div>
    </div>
  )
}

export default Footer
