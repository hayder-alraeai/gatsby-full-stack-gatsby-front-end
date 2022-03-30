import React from "react"
import { graphql } from "gatsby"
import styled from "styled-components"

const Wrapper = styled.div``

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
`
const SingleBeer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  border: 1px solid var(--grey);
  img {
    width: 200px;
    height: 200px;
  }
`

function Beers({ data }) {
  return (
    <Wrapper>
      <h2 className="center">
        We have {data.beers.nodes.length} beers available, dine in only!
      </h2>
      <Container>
        {data.beers.nodes.map(beer => {
          const stars = Math.round(beer.rating.average)
          return (
            <SingleBeer key={beer.id}>
              <img src={beer.image} alt={beer.name} />
              <h3>{beer.name}</h3>
              {beer.price}
              <p title={`${stars} out of 5 stars`}>
                {`⭐`.repeat(stars)}
                <span style={{ filter: `grayscale(100%)` }}>
                  {`⭐`.repeat(5 - stars)}
                </span>
                <span>({beer.rating.reviews})</span>
              </p>
            </SingleBeer>
          )
        })}
      </Container>
    </Wrapper>
  )
}

export default Beers

export const query = graphql`
  query {
    beers: allBeer {
      nodes {
        id
        name
        price
        image
        rating {
          reviews
          average
        }
      }
    }
  }
`
