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
    const resp = await axios.post(
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

  return (
    <>
      <Layout navbar={<Navbar />}>
        <Separator padding={10} />
        {fetchUserStackList.queryState !== 'loading' ? (
          <div className="flex gap-4 flex-wrap">
            <CreateStackButton onClick={toggleCreateStackModal} />
            {fetchUserStackList.stackList.map((item, index) => (
              <Link key={index} href={`/stacks/${item.stack_uuid}`}>
                <StackTileContainer>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                    {moment(item.created_at).format('DD.MM.YYYY')}
                  </p>
                  <h3 className="font-medium text-xl">{item.name}</h3>
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
