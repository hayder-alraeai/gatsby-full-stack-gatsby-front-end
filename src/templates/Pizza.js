import React from "react"
import { graphql } from "gatsby"
import { GatsbyImage as Img, getImage } from "gatsby-plugin-image"
import styled from "styled-components"

const PizzaGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 2rem;
`

function SinglePizza({ data }) {
  const image = getImage(data.pizza.image.asset)
  return (
    <PizzaGrid>
      <Img image={image} alt={data.pizza.name} />
      <div>
        <h2 className="mark">{data.pizza.name}</h2>
        <ul>
          {data.pizza.toppings.map(t => (
            <li>{t ? t.name : "undefined"}</li>
          ))}
        </ul>
      </div>
    </PizzaGrid>
  )
}

export default SinglePizza

export const query = graphql`
  query ($slug: String!) {
    pizza: sanityPizza(slug: { current: { eq: $slug } }) {
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
`
