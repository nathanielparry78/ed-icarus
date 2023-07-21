import { UNKNOWN_VALUE } from '../../../../shared/consts'
import ShipSystems from 'components/panels/ship/ship-status/ship-systems'

export default function ShipSystemsPanel ({ ship }) {
  if (!ship) return null

  if (ship.type === UNKNOWN_VALUE && ship.name === UNKNOWN_VALUE && ship.ident === UNKNOWN_VALUE) {
    return (
      <div
        className='text-primary text-blink-slow text-center-both'
        style={{ zIndex: '30', pointerEvents: 'none' }}
      >
        <h2>No ship found</h2>
      </div>
    )
  }

  return (
    <>
      <div className={`ship-panel__modules scrollable`}>
        <h2>Ship Internals</h2>
        <h3 className='text-primary'>
          Modules List
        </h3>
        <ShipSystems
          ship={ship}
        />
      </div>
    </>
  )
}
