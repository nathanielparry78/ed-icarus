import styled from "styled-components";

const Block = styled.div`
  --color: ${({color}) => color && `var(--color-${color})` };
  --color-background: ${({color}) => color && `var(--color-${color}-dark)` };

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-shadow: var(--text-shadow);
  color: var(--color);
`

const Pie = styled.div`
  @property --p{
    syntax: '<number>';
    inherits: true;
    initial-value: 0;
  }

  --p: 20;
  --b: 15px;

  width: 100%;
  min-width: 150px;
  aspect-ratio: 1;
  position: relative;
  display: inline-grid;
  margin: 5px;
  place-content: center;
  font-size: 25px;
  font-weight: bold;
  animation: animate 1s .5s both;
  background-size: 0 0,auto;

  @keyframes animate {
    from{--p:0}
  }

  &:after {
    content: "";
    position: absolute;
    border-radius: 50%;
    inset: 0;
    background: conic-gradient(var(--color) calc(var(--p)*1%), #0000 0);
    mask:radial-gradient(farthest-side, #0000 calc(99% - var(--b)), #000 calc(100% - var(--b)));
  }

  &:before {
    content: "";
    position: absolute;
    border-radius: 50%;
    inset: 0;
    background: var(--color-background);
    mask:radial-gradient(farthest-side, #0000 calc(99% - var(--b)), #000 calc(100% - var(--b)));
  }
`

const Title = styled.h4`
  margin: 1rem 0;
`


export default function PieChart( { value, color, title } ) {
  return (
    <Block color={color}>
      <Pie style={{ "--p": `${value}`}}>{value}%</Pie>
      <Title>{title}</Title>
    </Block>
  )
}