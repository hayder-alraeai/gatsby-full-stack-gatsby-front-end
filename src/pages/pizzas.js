import React from "react"
import { graphql } from "gatsby"
import PizzaList from "../components/PizzaList"

function Pizzas({ data }) {
  return (
    <>
      <PizzaList pizzas={data.pizzas.nodes} />
    </>
  )
}

export default Pizzas

export const query = graphql`
  query {
    pizzas: allSanityPizza {
      nodes {
        name
        id
        slug {
          current
        }
        toppings {
          id
          name
        }
      }
    }
  }
`
