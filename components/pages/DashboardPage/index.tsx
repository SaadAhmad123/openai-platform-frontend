import React, { useState, useContext, useEffect } from 'react'
import Layout from '../../Layout'
import Navbar from '../../Navbar'
import Separator from '../../Separator'
import CreateStackButton from './CreateStackButton'
import CreateStackModal from './CreateStackModal'
import AuthContext from '../../../AuthContext/Context'
import { AuthContextType } from '../../../AuthContext/types'
import axios from 'axios'
import { AppEnvironment } from '../../../helpers/AppEnvironmentManager'
import useFetchUserStackList from './hooks/useFetchUserStackList'
import StackTileContainer from './utils/StackTile/Container'
import moment from 'moment'
import Link from 'next/link'
import delay from '../../../helpers/delay'
import usePromise from '../../../hooks/usePromise'
import { HomePageActionButton } from '../../Buttons'
import Spinner from '../../Spinner'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRedoAlt } from '@fortawesome/free-solid-svg-icons'

const DashboardPage = () => {
  const { auth } = useContext<AuthContextType>(AuthContext)
  const [openCreateStackModal, setOpenCreateStackModal] = useState(false)
  const fetchUserStackList = useFetchUserStackList(auth?.IdToken || '')
  const toggleCreateStackModal = () => {
    setOpenCreateStackModal(!openCreateStackModal)
  }

  const createStack = async (values: { [p: string]: any }) => {
    if (!values.stacks) {
      throw new Error("Please select a 'stack'")
    }
    await axios.post(
      AppEnvironment.makeRestUrl('/stack'),
      {
        ...values,
        provisioning_stack: values.stacks,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: auth?.IdToken || '',
        },
      },
    )
    setOpenCreateStackModal(!openCreateStackModal)
    if (fetchUserStackList.queryState === 'loading') return
    fetchUserStackList.query()
  }

  useEffect(() => {
    if (fetchUserStackList.queryState === 'loading') return
    fetchUserStackList.query()
  }, [])


  const userStackListRefresh = usePromise(async () => {
    await fetchUserStackList.backgroundFetch()
  })

  return (
    <>
      <Layout navbar={<Navbar />}>
        <Separator padding={10} />
        {fetchUserStackList.queryState !== 'loading' ? (
          <>
            <div className="flex items-center justify-end gap-4">
              <p className="text-sm">Click here to refresh</p>
              <HomePageActionButton text={userStackListRefresh.state === "loading" ? "Refreshing" : "Refresh"} icon={userStackListRefresh.state === "loading" ? <Spinner /> : <FontAwesomeIcon icon={faRedoAlt} />} onClick={() => userStackListRefresh.retry()} />
            </div>
            <Separator />
            A <strong>Stack</strong> refers to a self-contained entity that provides the capability to intake data and facilitate seamless integration with <strong>ChatGPT</strong>.
            <Separator />
            <Separator />
            <div className="flex gap-4 flex-wrap">
              <CreateStackButton onClick={toggleCreateStackModal} />
              {fetchUserStackList.stackList.map((item, index) => (
                <Link key={index} href={`/stacks/${item.stack_uuid}`}>
                  <StackTileContainer>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                      {moment(item.created_at).format('DD.MM.YYYY')}
                    </p>
                    <h3 className="font-medium text-xl">{item.name}</h3>
                    <Separator />
                    <div className='flex'>
                      <p className="bg-servian-orange text-sm px-2 py-1 text-white">{item?.state}</p>
                    </div>
                    <Separator padding={8} />
                    <h3 className="text-gray-500 hidden sm:block">
                      {(item.description || '').slice(0, 150)}
                      {(item.description || '').length > 150 && '...'}
                    </h3>
                    <h3 className="text-gray-500 block sm:hidden">
                      {(item.description || '').slice(0, 50)}
                      {(item.description || '').length > 50 && '...'}
                    </h3>

                  </StackTileContainer>
                </Link>
              ))}
            </div>
          </>
        ) : (
          <>Loading...</>
        )}
      </Layout>
      <CreateStackModal
        show={openCreateStackModal}
        onToggle={toggleCreateStackModal}
        onSubmit={createStack}
      />
    </>
  )
}

export default DashboardPage
