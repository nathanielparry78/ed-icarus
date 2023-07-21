import styled from "styled-components"

const HealthDisplay = styled.div`
  grid-area: health;
  width: 100%;
  height: 100%;
  position: relative;
  display: grid;
  grid-template-columns: 1fr 60px;
  grid-gap: .5rem;
  align-items: center;
`

const Bar = styled.span`
  height: 100%;
  width: 100%;
  background: var(--color-background-panel-translucent);
  position: relative;
  /* padding: 0 0.5rem; */

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
    background: var(--darkreader-text--color-primary, rgb(255,165,29));

    ${({value}) => value && `width: ${value}%`}
  }
`

export default function HealthBar({value, className}) {
  return (
    <HealthDisplay className={className} >
      <Bar value={value}/>
      {value}%
    </HealthDisplay>
  )
}