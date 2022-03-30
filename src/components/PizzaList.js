import { Link } from "gatsby"
import React from "react"
import { GatsbyImage as Img, getImage } from "gatsby-plugin-image"
import styled from "styled-components"

const PizzasStyle = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 4rem;
  grid-auto-rows: auto auto 500px;
`
const SinglePizzaStyle = styled.div`
  display: grid;
  grid-auto-rows: auto auto 500px;
  gap: 1rem;
  h2,
  a,
  p {
    margin: 0;
  }
`

function SinglePizza({ pizza }) {
  const image = getImage(pizza.image.asset)
  return (
    <SinglePizzaStyle>
      <Link to={`/pizzas/${pizza.slug.current}`}>
        <h2>
          <span className="mark">{pizza.name}</span>
        </h2>
      </Link>
      <p>{pizza.toppings.map(t => (t ? t.name : "undefined")).join(", ")}</p>
      <Img image={image} alt={pizza.name} />
    </SinglePizzaStyle>
  )
}
function PizzaList({ pizzas }) {
  return (
    <PizzasStyle>
      {pizzas.map(p => (
        <SinglePizza key={p.id} pizza={p} />
      ))}
    </PizzasStyle>
  )
}

export default PizzaList
