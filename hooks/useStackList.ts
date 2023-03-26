import axios from 'axios'
import React, { useState } from 'react'
import { AppEnvironment } from '../helpers/AppEnvironmentManager'
import safeConsole from '../helpers/safeConsole'

type QueryState = 'loading' | 'idle' | 'error'

export type StackVersion = {
  version: string
  description?: string
  stack_name: string
}

const useStackList = (IdToken: string) => {
  const [queryState, setQueryState] = useState<QueryState>('idle')
  const [stackList, setStackList] = useState<StackVersion[]>([])

  const query = async () => {
    try {
      setQueryState('loading')
      const resp = await axios.get(
        AppEnvironment.makeRestUrl('/stack/versions'),
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: IdToken,
          },
        },
      )
      setStackList(resp?.data || [])
      setQueryState('idle')
      return resp?.data || []
    } catch (e) {
      setQueryState('error')
      safeConsole()?.error(e)
    }
  }

  return {
    queryState,
    stackList,
    query,
  }
}

export default useStackList
