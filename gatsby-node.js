const path = require(`path`)
const fetch = require("node-fetch")

exports.createSchemaCustomization = ({ actions, schema }) => {
  const { createTypes } = actions

  const typeDefs = [
    schema.buildObjectType({
      name: "rating",
      fields: {
        average: {
          type: "Float",
          resolve(parent) {
            return parent.average || 0.0
          },
        },
        reviews: {
          type: "Float",
          resolve(parent) {
            return parent.reviews || 0.0
          },
        },
      },
      interfaces: ["Node"],
      extensions: {
        infer: true,
      },
    }),
    schema.buildObjectType({
      name: "beer",
      fields: {
        id: {
          type: "ID!",
        },
        name: {
          type: "String!",
        },
        image: {
          type: "String!",
        },
        rating: "rating",
        price: {
          type: "String!",
        },
      },
      interfaces: ["Node"],
      extensions: {
        infer: false,
      },
    }),
  ]
  createTypes(typeDefs)
  console.log("create beer type")
}

exports.sourceNodes = async ({
  actions,
  createNodeId,
  createContentDigest,
}) => {
  const { createNode } = actions

  const res = await fetch(`https://api.sampleapis.com/beers/ale`)
  const beers = await res.json()
  beers.forEach(beer => {
    beer = {
      ...beer,
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Gull_portrait_ca_usa.jpg/600px-Gull_portrait_ca_usa.jpg",
    }
    const stringifiedBeer = JSON.stringify(beer)
    const nodeMeta = {
      id: createNodeId(`beer-${beer.name}`),
      parent: null,
      internal: {
        type: `beer`,
        mediaType: `text/html`,
        content: stringifiedBeer,
        contentDigest: createContentDigest(beer),
      },
    }
    createNode({ ...beer, ...nodeMeta })
    console.log("create node " + beer.name)
  })
}

async function createSliceMastersPages({ graphql, actions }) {
  const { createPage } = actions
  const personTemplate = path.resolve("./src/templates/Person.js")
  const { data } = await graphql(`
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
  `)
  data.sliceMasters.nodes.forEach(person => {
    createPage({
      path: `/slice-masters/${person.slug.current}`,
      component: personTemplate,
      context: {
        person,
      },
    })
  })
}

async function createPizzasPages({ graphql, actions }) {
  const { createPage } = actions
  const pizzaTemplate = path.resolve("./src/templates/Pizza.js")
  const result = await graphql(`
    query {
      pizzas: allSanityPizza {
        nodes {
          name
          id
          slug {
            current
          }
        }
      }
    }
  `)

  result.data.pizzas.nodes.forEach(edge => {
    createPage({
      path: `/pizzas/${edge.slug.current}`,
      component: pizzaTemplate,
      context: {
        slug: edge.slug.current,
      },
    })
  })
}

exports.createPages = async ({ graphql, actions }) => {
  await Promise.all([
    createSliceMastersPages({ graphql, actions }),
    createPizzasPages({ graphql, actions }),
  ])
}
