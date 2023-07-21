import * as blueprints from '../../../../resources/images/blueprints/blueprints'
import styled from 'styled-components';

const SVG = styled.div`
  --outline: white;
  --backcolor: white;
  --a: gray;
  --show-hooks: 1;
  --show-all-hooks: 0;
  color:  var(--color-primary);
  text-shadow: var(--text-shadow);

  & svg {
    stroke: var(--color-primary);
    text-shadow: var(--text-shadow);
  }
`

const Name = styled.h3`
  padding: 1rem 0;
  color: var(--color-primary);
  text-shadow: var(--text-shadow);
  text-align: center;
`

export default function Blueprint ({ship, localized}) {

  const getBlueprint = () => {
    return {__html: blueprints[ship]}
  }

  return (
    <div>
      <Name>{localized}</Name>
      <SVG dangerouslySetInnerHTML={getBlueprint()}></SVG>
    </div>
  )
}
