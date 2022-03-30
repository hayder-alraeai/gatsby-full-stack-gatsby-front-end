import { graphql, Link } from "gatsby"
import React from "react"
import { GatsbyImage as Img, getImage } from "gatsby-plugin-image"
import styled from "styled-components"

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
`

const Wrapper = styled.div`
  width: 250px;
  img {
    width: 250px;
  }
  a {
    text-decoration: none;
  }
  h2 {
    text-align: center;
    transform: rotate(-2deg);
    font-size: 4rem;
    margin-bottom: -2rem;
    position: relative;
    z-index: 2;
  }
  p {
    background-color: var(--yellow);
    transform: rotate(2deg);
    padding: 5px;
    font-size: 15px;
    margin: 2rem;
    margin-top: -4rem;
    position: relative;
    z-index: 2;
  }
`

function SliceMastersList({ data }) {
  return (
    <Container>
      <p>Page: {process.env.GATSBY_PAGE_SIZE}</p>
      {data.sliceMasters.nodes.map(person => {
        const img = getImage(person.image.asset)
        return (
          <Wrapper>
            <Link to={`/slice-masters/${person.slug.current}`}>
              <h2>
                <span className="mark">{person.person}</span>
              </h2>
            </Link>
            <Img image={img} alt={img.name} />
            <p>{person.description}</p>
          </Wrapper>
        )
      })}
    </Container>
  )
}
function SliceMasters({ data }) {
  return <SliceMastersList data={data} />
}

export default SliceMasters

export const query = graphql`
  query {
    sliceMasters: allSanityPerson {
      totalCount
      nodes {
        person
        description
        id
        slug {
          current
        }
        image {
          asset {
            gatsbyImageData(width: 400, height: 500)
          }
        }
      }
    }
  }
`
