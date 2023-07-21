import { useEffect, useState } from 'react'
import { UNKNOWN_VALUE } from '../../../../shared/consts'
import ShipModulesOld from 'components/panels/ship/ship-status/ship-modules-old'

export default function ShipStatusPanel ({ ship, selectedModule, setSelectedModule, cmdrStatus, toggleSwitches, toggleSwitch }) {
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

  const [hardpoints, setHardpoints] = useState([]);
  const [optInternals, setOptInternals] = useState([]);
  const [coreInternals, setCoreInternals] = useState([]);
  const [utilityMounts, setUtilityMounts] = useState([]);

  useEffect(() => {
    const mods = Object.values(ship.modules);
    const hardpoints = mods.filter(module =>
      ['huge', 'large', 'medium', 'small'].includes(module?.size))

    const optional = mods.filter(({internal, core, slot}) => {
      if (!internal || core || slot === 'CodexScanner') return false
      return true
    })

    const core = mods.filter(module => {
      if (!module.core && !ship.armour.includes(module.name)) return false
      return true
    })

    const utils = mods.filter(module => ['tiny'].includes(module?.size))

    setHardpoints(hardpoints)
    setOptInternals(optional)
    setCoreInternals(core)
    setUtilityMounts(utils)
  }, [ship])

  return (
    <>
      <div className={`ship-panel__modules scrollable ${selectedModule ? 'ship-panel__modules--module-inspector' : ''}`}>
        <h2>Ship Internals</h2>
        <h3 className='text-primary'>
          Modules &amp; Engineering Upgrades
        </h3>
        <ShipModulesOld
          name='Hardpoints'
          modules={hardpoints}
          selectedModule={selectedModule}
          setSelectedModule={setSelectedModule}
        />
        <ShipModulesOld
          name='Core Internals'
          modules={coreInternals}
          selectedModule={selectedModule}
          setSelectedModule={setSelectedModule}
        />
        <ShipModulesOld
          name='Optional Internals'
          modules={optInternals}
          selectedModule={selectedModule}
          setSelectedModule={setSelectedModule}
        />
        <ShipModulesOld
          name='Utility Mounts'
          modules={utilityMounts}
          selectedModule={selectedModule}
          setSelectedModule={setSelectedModule}
        />
      </div>
    </>
  )
}
