import { useState, useEffect, useMemo } from 'react'
import Layout from 'components/layout'
import { useSocket, eventListener, sendEvent } from 'lib/socket';
import Blueprint from './blueprint';
import styled from 'styled-components';
import * as scan from '../../../../resources/images/radar.svg';
import * as targetIcon from '../../../../resources/icons/hpt-fixed.svg';
import { getCrimes } from 'components/combat/bountyInfo';
import PieChart from 'components/pie-chart';
import HealthBar from 'components/HealthBar';

const Wrapper = styled.section`
  padding: 0 1rem 2rem;
  color: var(--color-primary);
  text-shadow: var(--text-shadow);
  text-transform: uppercase;
`

const Head = styled.section`
  display: grid;
  grid-template-columns: 25% 50% 25%;
  grid-template-areas: "pilot status bounty";
  justify-content: space-between;
`

const PilotBlock = styled.div`
  grid-area: pilot;
`

const Name = styled.div`
  font-size: 1.25rem;
`
const Fact = styled.div`
  font-size: .75rem;
`
const Rank = styled.div`
  font-size: 1rem;
`
const Status = styled.div`
  font-size: 3rem;
  text-align: center;
  grid-area: status;

  ${({isWanted}) => isWanted && `
    color: var(--color-danger);
  `}
`
const Boun = styled.div`
    font-size: 2rem;
    text-align: right;
    grid-area: bounty;
`
const Label = styled.div`
  font-size: 1rem;
`

const ShipBlock = styled.div`
  padding: 2rem;
  /* height: calc(100vh - 150px); */
  display: grid;
  grid-template-columns: 40% 60%;
  justify-content: space-around;

  & svg {
    height: auto;
    width: 100%;
  }
`

const Details = styled.div`
  display: flex;
  flex-direction: column;
`

const ChartBlock = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const SubSystemBlock = styled.div`
  display: grid;
  grid-template-columns: 50px auto;
  grid-gap: 1rem;

  & svg {
    height: 50px;
    width: 50px;
  }
`

const StyledHealthBar = styled(HealthBar)`
  height: 20px;
`

const Scanning = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
  animation: fadeInOut 1.5s linear infinite;

  @keyframes fadeInOut {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
`

const ScanIcon = styled.img`
  height: 50px;
`

export default function TargetShip () {
  const { connected, active, ready } = useSocket()
  const [componentReady, setComponentReady] = useState(false)
  const [target, setTarget] = useState({})

  useEffect(async () => {
    if (!connected) return
    setComponentReady(false)

    const newLogEntries = await sendEvent('getLogEntries', { count: 100 })
    if (Array.isArray(newLogEntries) && newLogEntries.length > 0) {
      const mostRecent = newLogEntries[0];

      if (mostRecent.event === "ShipTargeted") {
        const crimes = getCrimes(mostRecent.PilotName_Localised);
        let recent = {crimes, ...mostRecent};
        console.log(recent)
        setTarget(recent)
      }
    }
    setComponentReady(true)
  }, [connected])

  useEffect(() => {
    if (componentReady) {
      eventListener('newLogEvent', async (newTarget) => {
        const crimes = getCrimes(newTarget.PilotName_Localised);
        newTarget = {crimes, ...newTarget};
        console.log(newTarget)
        setTarget(prevState => [newTarget, ...prevState])
      })
    }
}, [componentReady])

  const {
    TargetLocked = '',
    Ship = '',
    Ship_Localised = '',
    ScanStage = '',
    PilotName_Localised = '',
    PilotRank = '',
    ShieldHealth = '',
    HullHealth = '',
    Faction = '',
    LegalStatus = '',
    Bounty = '',
    Subsystem_Localised = '',
    SubsystemHealth = '',
    crimes = [],
    className
  } = target;

  console.log(targetIcon)

  return (
    <Layout className={className} connected={connected} active={active} ready={ready && componentReady}>
      {Ship ?
        <Wrapper>
          <Head>
            <PilotBlock>
              <Name>{PilotName_Localised}</Name>
              <Rank>{PilotRank}</Rank>
              <Fact>{Faction}</Fact>
            </PilotBlock>
            <Status isWanted={LegalStatus !== "Clean"}>{LegalStatus}</Status>
            {Bounty &&
              <Boun>
                {Bounty}
                <Label>Bounty</Label>
              </Boun>
            }
          </Head>
          <hr />

          <ShipBlock>
            <Details>
              <ChartBlock>
                <PieChart
                  value={ShieldHealth.toFixed(2)}
                  color={"secondary"}
                  title={"Shields"}
                />
                <PieChart
                  value={HullHealth.toFixed(2)}
                  color={"primary"}
                  title={"hull"}
                />
              </ChartBlock>

            {SubsystemHealth &&
              <SubSystemBlock>
                <svg height="50px" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><title>icon-hardpoint</title><path d="M200,93H176.4A76.83,76.83,0,0,0,107,23.6V0H93V23.6A76.83,76.83,0,0,0,23.6,93H0v14H23.6A76.83,76.83,0,0,0,93,176.4V200h14V176.4A76.83,76.83,0,0,0,176.4,107H200Zm-93,62.26V135.52H93v19.74A55.8,55.8,0,0,1,44.74,107H64.48V93H44.74A55.8,55.8,0,0,1,93,44.74V64.48h14V44.74A55.8,55.8,0,0,1,155.26,93H135.52v14h19.74A55.8,55.8,0,0,1,107,155.26Z"/></svg>
                <div>
                  {Subsystem_Localised}
                  <StyledHealthBar
                    value={SubsystemHealth.toFixed(2)}
                  />
                </div>
              </SubSystemBlock>
            }

              {crimes &&
                <>
                  <p>Wanted For:</p>
                  {crimes.map(item =>
                    <li key={item}>{item}</li>
                  )}
                </>
              }
            </Details>
            <Blueprint ship={Ship} localized={Ship_Localised}/>
          </ShipBlock>
          {ScanStage < 4 &&
            <Scanning>
              <ScanIcon src={scan.default.src}></ScanIcon>Scanning...
            </Scanning>
          }
        </Wrapper>
      :
        <h1>No target found</h1>
      }
    </Layout>
  )
}
