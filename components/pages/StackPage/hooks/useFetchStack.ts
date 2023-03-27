import axios from 'axios'
import { useEffect, useState } from 'react'
import { AppEnvironment } from '../../../../helpers/AppEnvironmentManager'
import safeConsole from '../../../../helpers/safeConsole'
import { StackItem } from '../../../types'

type QueryState = 'loading' | 'idle' | 'error'

export default function useFetchStack(stack_uuid: string, IdToken: string) {
  const [queryState, setQueryState] = useState<QueryState>('idle')
  const [stack, setStack] = useState<StackItem | undefined>(undefined)

  const fetch = async () => {
    try {
      setQueryState("loading")
      const resp = await axios.get(
        AppEnvironment.makeRestUrl(`/stack/${stack_uuid}`),
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: IdToken,
          },
        },
      )
      if (!resp?.data) {
        throw new Error('No stack')
      }
      setStack(resp?.data as StackItem)
      setQueryState('idle')
    } catch (e) {
      safeConsole()?.error(e as Error)
      setQueryState('error')
    }
  }

  const backgroundFetch = async () => {
    try {
      const resp = await axios.get(
        AppEnvironment.makeRestUrl(`/stack/${stack_uuid}`),
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: IdToken,
          },
        },
      )
      if (!resp?.data) {
        throw new Error('No stack')
      }
      setStack(resp?.data as StackItem)
    } catch (e) {
      safeConsole()?.error(e as Error)
    }
  }

  return {
    fetch,
    stack,
    queryState,
    backgroundFetch,
  }
}
