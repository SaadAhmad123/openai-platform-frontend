import { useRouter } from 'next/router'
import React from 'react'

const Logo = () => {
  const router = useRouter()
  return (
    <div className="flex items-center gap-2">
      <h1
        className="font-bold sm:text-xl m-0 p-0 cursor-pointer"
        onClick={() => router.push('/')}
      >
        MakeGPT
      </h1>
      <h6 className="bg-servian-orange text-servian-white px-2 py-1 text-xs">
        Developer Preview
      </h6>
    </div>
  )
}

export default Logo
