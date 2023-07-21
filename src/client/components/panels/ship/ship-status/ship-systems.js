import { useEffect, useState } from 'react'
import styled from 'styled-components'

const ModuleList = styled.div`
  padding-bottom: 1rem;
`;

const ModRow = styled.div`
  /* color: var(--color-info); */
  display: grid;
  grid-template-columns: 40% 30% 3rem;
  padding: .5rem 1rem;
  column-gap: 1rem;
  text-transform: uppercase;
  text-shadow: var(--text-shadow);

  margin-top: 0.3rem;
  color: var(--color-primary);
  background: var(--color-background-panel-translucent);

  animation: fx-fade-in-animation .5s;
  animation-fill-mode: forwards;
  animation-delay: ${({index}) => index > -1 &&
    `${0.25 + (index * 0.025)}s`
  };
  opacity: 0;

${({isOn}) => !isOn && `
    color: grey;
  `}

  ${({head}) => head && `
    background: var(--color-primary-dark);
    margin: 1.5rem 0 0;
  `}

  &:hover {
    background: var(--color-primary-dark);
  }

`;

const SectionHead = styled.div`
  margin-bottom: 1rem;

  & h3 {
    width: 100%;
    margin: 1rem 0px 0.25rem;
    color: var(--color-primary);
    text-shadow: var(--text-shadow);
    display: inline-block;
    position: relative;
    top: 0.1rem;
    margin-bottom: 0.25rem;
    font-size: 1.5rem;
    line-height: 2rem;
    border-bottom: 0.2rem solid var(--color-primary);
  }
`

const HealthBar = styled.span`
  height: 100%;
  width: 80%;
  background: var(--color-background-panel-translucent);
  position: relative;
  padding: 0 0.5rem;

  ${({isOn}) => !isOn && `
    color: grey;
  `}

  & span {
    z-index: 1;
    position: absolute;
    ${({value}) => value && `left: calc(${value}% + .25rem)`}
  }

  &:before {
    position: absolute;
    content: '';
    left: 0;
    top: 0;
    height: 100%;
    background: rgb(255,165,29);
    box-shadow: var(--text-shadow);

    ${({value}) => value && `width: ${value}%;`}
    ${({isOn}) => !isOn && `opacity: 0.25;`}
  }
`


const Module = ({class: moduleClass, rating, name, on, size, health, isFocused, index}) => (
  <ModRow
    isOn={on}
    onFocus={() => isFocused(module)}
    index={index}
  >
    <span >{moduleClass}{rating} {name}</span>
    <HealthBar
      isOn={on}
      value={health * 100}
    >
      <span>{health * 100}%</span>
    </HealthBar>
    <span style={{textAlign: 'center'}}>{size?.slice(0,1)}</span>
  </ModRow>
)

const Section = ({heading, modules}) => {
return (
  <SectionHead key={heading.slice(0, 4)}>
    <h3>{heading}</h3>
    {modules?.map((item, i) => (
      <Module key={item.slot} {...item} index={i}/>
    ))}
  </SectionHead>
)}

export default function ShipSystems ({ship = {}, ship: {modules = []}}) {
  const [hardpoints, setHardpoints] = useState([]);
  const [optInternals, setOptInternals] = useState([]);
  const [coreInternals, setCoreInternals] = useState([]);
  const [utilityMounts, setUtilityMounts] = useState([]);

  useEffect(() => {
    const mods = Object.values(modules);
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
  }, [modules])

  return (
    <div>
        {modules &&
          <div>
            <ModuleList>
              <ModRow head={true}>
                <span>Name</span>
                <span>Health</span>
                <span>Size</span>
              </ModRow>
              <Section
                heading='Hardpoints'
                modules={hardpoints}
              />
              <Section
                heading='Core Internals'
                modules={coreInternals}
              />
              <Section
                heading='Optional Internals'
                modules={optInternals}
              />
              <Section
                heading='Utility Mounts'
                modules={utilityMounts}
              />
            </ModuleList>
          </div>
        }
    </div>
  )
}