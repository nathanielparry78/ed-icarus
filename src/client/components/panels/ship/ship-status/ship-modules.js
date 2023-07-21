import HealthBar from 'components/HealthBar';
import styled from 'styled-components';

const Modules = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: .5rem;
  color: var(--color-primary);
  text-transform: uppercase;
`

const Module = styled.div`
  padding: 0.5rem 1rem;
  overflow: hidden;
  font-weight: bold;

  height: 100%;
  box-sizing: border-box;
  position: relative;
  background: var(--color-background-panel-translucent);
  text-shadow: var(--text-shadow);
  display: grid;
  grid-template-areas:
  "brief info info"
  "health health health"
  ;
  grid-template-columns: 5.5rem auto auto;
  grid-template-rows: max-content 10px;
  grid-column-gap: .5rem;
  box-shadow: 0 0 1.5rem 0.5rem rgba(var(--color-primary-dark-r),var(--color-primary-dark-g),var(--color-primary-dark-b),.3) inset;

  animation: fx-flash-in-animation .5s;
  animation-fill-mode: forwards;
  animation-delay: .05s;
`

const Brief = styled.div`
  height: 100%;
  width: 5.5rem;
  text-align: center;
  grid-area: brief;
  text-transform: uppercase;
`

const Icon = styled.div`
  font-size: 3.5rem;
  width: 5.5rem;
  padding-bottom: .5rem;
  background: var(--color-primary-dark);
`

const Size = styled.div`
  font-size: 1.25rem;
`

const Info = styled.div`
  grid-area: info;
  font-size: 1.5rem;

  & .text-muted {
    font-size: 1.25rem;
    opacity: 0.5 !important;
    text-shadow: none;
  }
 `

const HealthDisplay = styled.div`
  grid-area: health;
  width: 100%;
  height: 5px;
  position: relative;
  display: grid;
  grid-template-columns: 1fr 60px;
  font-size: 10px;
  grid-gap: .5rem;
  align-items: center;
`



export default function ShipModules ({ name, modules, selectedModule, setSelectedModule = () => {} }) {
  return (
    <>
      <div className='section-heading' style={{ margin: '1rem 0 .25rem 0' }}>
        <h4 className='section-heading__text'>{name}</h4>
      </div>
      {modules.length === 0 &&
        <p className='text-muted text-uppercase' style={{ margin: '1rem 0' }}>
          No {name.toLowerCase()} installed
        </p>}
      <Modules className='ship-panel_modules-table table--flex-inline table--interactive table--animated'>
          {modules.sort((a, b) => (b?.class ?? 0) - (a?.class ?? 0)).map(({
            name: moduleName,
            slot,
            size,
            class: moduleClass,
            rating,
            mount,
            slotName,
            engineering,
            power,
            mass,
            health
          }) => (
            <Module
              key={`${name}_${moduleName}_${slot}`}
              tabIndex='3'
              onFocus={() => setSelectedModule(module)}
              data-module-slot={slot}
              className={selectedModule?.slot === slot ? 'table__row--active' : null}
            >
              <Brief>
                <Icon>
                  <div>
                    {moduleClass && <>{moduleClass}{rating}</>}
                    {!moduleClass && <>?</>}
                  </div>
                  {size && <Size>{size}</Size>}
                </Icon>
              </Brief>
              <Info>
                <p>{mount} {moduleName}</p>
                <p className='text-muted'>{slotName}</p>
              </Info>
              <HealthBar value={health * 100}/>
              {/*
              {module?.power > 0 && <p><span className='text-muted'>Power</span> {power} MW</p>}
              {module?.mass > 0 && <p><span className='text-muted'>Mass</span> {mass} T</p>}
              */}
              {engineering &&
                <div className='ship-panel__engineering text-secondary'>
                  {[...Array(engineering.level)].map((j, i) =>
                    <i
                      key={`${moduleName}_${moduleName}_${slot}_engineering_${i}`}
                      className='icon icarus-terminal-engineering'
                    />
                  )}
                </div>}
            </Module>
            )
          )}
      </Modules>
    </>
  )
}
