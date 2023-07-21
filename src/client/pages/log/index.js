import Router from 'next/router'
import Layout from 'components/layout'
import Panel from 'components/panel'
import { useSocket } from 'lib/socket'


export default function LogPage () {
  const { connected, active } = useSocket()

  if (typeof window !== 'undefined') Router.push('/log/log')

  return (
    <Layout connected={connected} active={active}>
      <Panel layout='full-width' scrollable/>
    </Layout>
  )
}
