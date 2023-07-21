import { useState, useEffect } from 'react'
import animateTableEffect from 'lib/animate-table-effect'
import Layout from 'components/layout'
import Panel from 'components/panel'
import LogListPanel from 'components/panels/log/log-list-panel'
import LogInspectorPanel from 'components/panels/log/log-inspector-panel'
import { useSocket, eventListener, sendEvent } from 'lib/socket'
import { LogNavItems } from 'lib/navigation-items'


export default function LogPage () {
  const { connected, active, ready } = useSocket()
  const [componentReady, setComponentReady] = useState(false)
  const [logEntries, setLogEntries] = useState([])
  const [selectedLogEntry, setSelectedLogEntry] = useState()

  useEffect(animateTableEffect)

  useEffect(async () => {
    if (!connected) return
    setComponentReady(false)
    const newLogEntries = await sendEvent('getLogEntries', { count: 100 })
    if (Array.isArray(newLogEntries) && newLogEntries.length > 0) {
      setLogEntries(newLogEntries)
      // Only select a log entry if one isn't set already
      setSelectedLogEntry(prevState => prevState || newLogEntries[0])
    }
    setComponentReady(true)
  }, [connected, ready])

  useEffect(() => eventListener('newLogEntry', async (newLogEntry) => {
    setLogEntries(prevState => [newLogEntry, ...prevState])
    // If no log row is currently selected (focus is not on a table row) then
    // display the most recent log - otherwise leaves it displaying whatever is
    // currently selected.
    if (document.activeElement.tagName !== 'TR') {
      setSelectedLogEntry(newLogEntry)
    }
  }), [])

  return (
    <Layout connected={connected} active={active} ready={ready && componentReady}>
        <Panel layout='left-half' scrollable navigation={LogNavItems('Missions')}>
        <LogListPanel logEntries={logEntries} setSelectedLogEntry={setSelectedLogEntry} />
        {ready && logEntries.length === 0 && <p style={{ margin: '2rem 0' }} className='text-center text-muted'>No recent log entries</p>}
      </Panel>
      <Panel layout='right-half' scrollable>
        <LogInspectorPanel logEntry={selectedLogEntry} />
      </Panel>
    </Layout>
  )
}
