import { useState, useEffect } from 'react'
import { useSocket, sendEvent, eventListener } from 'lib/socket'
import { ShipPanelNavItems } from 'lib/navigation-items'
import { eliteDateTime } from 'lib/format'
import Layout from 'components/layout'
import Panel from 'components/panel'
import CopyOnClick from 'components/copy-on-click'

export default function ShipCargoPage () {
  const { connected, active, ready } = useSocket()
  const [ship, setShip] = useState()
  const [cargo, setCargo] = useState(null)

  useEffect(async () => {
    if (!connected) return
    const newShip = await sendEvent('getShip')
    setShip(newShip)
    setCargo(newShip?.cargo?.inventory ?? [])
  }, [connected, ready])

  useEffect(() => eventListener('gameStateChange', async () => {
    const newShip = await sendEvent('getShip')
    setShip(newShip)
    setCargo(newShip?.cargo?.inventory ?? [])
  }), [])

  useEffect(() => eventListener('newLogEntry', async () => {
    const newShip = await sendEvent('getShip')
    setShip(newShip)
    setCargo(newShip?.cargo?.inventory ?? [])
  }), [])

  return (
    <Layout connected={connected} active={active} ready={ready}>
      <Panel layout='full-width' scrollable navigation={ShipPanelNavItems('Cargo')}>
        {ship &&
          <>
            <h2>Cargo Manifest</h2>
            <h4 className='text-primary' style={{overflow: 'auto'}}>
              <progress
                style={{marginTop: '.5rem', height: '1.2rem', display: 'inline-block', width: '12rem', float: 'left'}}
                value={ship.cargo.count}
                max={ship.cargo.capacity}
                className='float-left'
                />
              <span className='float-left' style={{display: 'inline-block', padding: '.25rem .5rem'}}>
                {ship.cargo.count}/{ship.cargo.capacity} T
                {ship.cargo.count > 0 && ship.cargo.count < ship.cargo.capacity && <span className='text-muted'> ({ship.cargo.capacity - ship.cargo.count} free)</span>}
              </span>
            </h4>
            <hr style={{ margin: '.5rem 0 0 0' }} />
            {ship && cargo && cargo.length === 0 && <p className='text-primary text-uppercase'>Cargo hold is empty</p>}
            {cargo && cargo.length > 0 &&
              <table className='table--animated fx-fade-in'>
                <thead>
                  <tr>
                    <th style={{ width: '3rem' }} className='text-right'>#</th>
                    <th>Cargo</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {cargo.map((item, i) =>
                    <tr key={`${ship.name}_cargo_${i}_${item.name}`}>
                      <td style={{ width: '3rem' }} className='text-right'>{item.count}</td>
                      <td><CopyOnClick>{item.name}</CopyOnClick></td>
                      <td>
                        <span className='text-muted'>{item.description}</span>
                        {item.mission !== false && <span className='text-secondary'> Mission</span>}
                        {item.stolen !== false && <span className='text-danger'> Stolen</span>}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>}
              <hr className='small'/>
              {(!ship.onBoard) &&
              <p className='text-muted text-primary text-center' style={{ margin: '1rem 0' }}>
                Cargo manifest as of {eliteDateTime(ship?.timestamp)}
              </p>}
          </>}
      </Panel>
    </Layout>
  )
}
