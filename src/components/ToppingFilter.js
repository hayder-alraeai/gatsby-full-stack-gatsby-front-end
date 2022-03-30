import React from "react"
import { graphql, useStaticQuery } from "gatsby"

function ToppingFilter() {
  const { toppings, pizzas } = useStaticQuery(graphql`
    query {
      toppings: allSanityTopping {
        nodes {
          name
          id
          vegetarian
        }
      }
      pizzas: allSanityPizza {
        nodes {
          toppings {
            id
            name
          }
        }
      }
    }
  `)

  // const countPizzasWithToppings = pizzas.nodes.toppings.map(topping =>
  //   console.log(topping)
  // )
  console.log(toppings)
  return <div>ToppingFilter</div>
}

export default ToppingFilter
