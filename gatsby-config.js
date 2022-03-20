/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

module.exports = {
  siteMetadata: {
    title: `Slicks slices`,
    siteUrl: `https://gatsby.pizza`,
    description: `The best pizza place in Hamilton!`,
  },
  /* Your site config here */
  plugins: [
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-source-sanity`,
      options: {
        projectId: `vg1t0tmt`,
        dataset: `production`,
        // a token with read permissions is required
        // if you have a private dataset
        token: `skN2CHa8PHYMt5PzhTy7XUe57XQl7mD31SRre3YCMa2u7JKzBAvkNZ6bxUfyw8q7TGiB9er50XzroL23x2lVU7uVMHFdEm0sviWoK4rFQkUVrfg4AYDyWYDkMPX6OdwbqFlUVRQHNy49iKPLgQTt7VllrNTIaXIZc05Z9weUKqH44mXKLRQr`,
        watchMode: true,
        // If the Sanity GraphQL API was deployed using `--tag <name>`,
        // use `graphqlTag` to specify the tag name. Defaults to `default`.
        apiVersion: "2021-08-31",
      },
    },
  ],
}
