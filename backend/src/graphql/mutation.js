import { GraphQLError } from 'graphql'
import { createUser, loginUser } from '../services/users.js'
import { createRecipe } from '../services/recipes.js'
export const mutationSchema = `#graphql
type Mutation {
signupUser(username: String!, password: String!): User
loginUser(username: String!, password: String!): String
createRecipe(title: String!, ingredients: String, image: String, tags:[String]): Recipe
}
`
export const mutationResolver = {
  Mutation: {
    signupUser: async (parent, { username, password }) => {
      return await createUser({ username, password })
    },
    loginUser: async (parent, { username, password }) => {
      return await loginUser({ username, password })
    },
    createRecipe: async (
      parent,
      { title, ingredients, image, tags },
      { auth },
    ) => {
      if (!auth) {
        throw new GraphQLError(
          'You need to be authenticated to perform this action.',
          {
            extensions: {
              code: 'UNAUTHORIZED',
            },
          },
        )
      }
      return await createRecipe(auth.sub, { title, ingredients, image, tags })
    },
  },
}
