module.exports = {
  client: {
    tagName: 'gql',
    includes: ['src/**/*.gql'],
    addTypename: false,
    service: {
      name: 'Admin',
      localSchemaFile: `${__dirname}/graphql/schema.graphql`
    }
  }
}
