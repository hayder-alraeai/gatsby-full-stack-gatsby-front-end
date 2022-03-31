import React from "react"
import { graphql } from "gatsby"
import PizzaList from "../components/PizzaList"
import ToppingFilter from "../components/ToppingFilter"
import { Helmet } from "react-helmet"

function Pizzas({ data }) {
  return (
    <>
      <Helmet>
        <title>Pizzas</title>
      </Helmet>
      <ToppingFilter />
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
        image {
          asset {
            gatsbyImageData(width: 400)
          }
        }
      }
    }
  }
`
