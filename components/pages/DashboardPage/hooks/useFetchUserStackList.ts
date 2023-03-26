import axios from 'axios'
import { useState } from 'react'
import { AppEnvironment } from '../../../../helpers/AppEnvironmentManager'
import safeConsole from '../../../../helpers/safeConsole'
import { StackItem } from '../../../types'

type QueryState = 'loading' | 'idle' | 'error'

export default function useFetchUserStackList(IdToken: string) {
  const [queryState, setQueryState] = useState<QueryState>('idle')
  const [stackList, setStackList] = useState<StackItem[]>([])

  const query = async () => {
    try {
      setQueryState('loading')
      const resp = await axios.get(
        AppEnvironment.makeRestUrl('/stack?limit=100'),
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: IdToken,
          },
        },
      )
      setStackList(resp?.data?.stacks || [])
      setQueryState('idle')
      return resp?.data?.stacks || []
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
