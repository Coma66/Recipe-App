import { GraphQLError } from 'graphql'
import { createUser, loginUser } from '../services/users.js'
import { createRecipe } from '../services/recipes.js'
import { updateRecipe } from '../services/recipes.js'
import { likeRecipe } from '../services/recipes.js'
export const mutationSchema = `#graphql
type Mutation {
signupUser(username: String!, password: String!): User
loginUser(username: String!, password: String!): String
createRecipe(title: String!, ingredients: String, image: String, likes: Int, tags:[String]): Recipe
updateRecipe(title: String!, ingredients: String, image: String, likes: Int, tags:[String]): Recipe
likeRecipe(id: String, likes: Int): Recipe
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
      { title, ingredients, image, likes = 0, tags },
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
      return await createRecipe(auth.sub, {
        title,
        ingredients,
        image,
        likes,
        tags,
      })
    },
    updateRecipe: async (
      parent,
      { title, ingredients, image, likes, tags },
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
      return await updateRecipe(auth.sub, {
        title,
        ingredients,
        image,
        likes,
        tags,
      })
    },
    likeRecipe: async (parent, { id, likes }, { auth }) => {
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
      return await likeRecipe(id, likes + 1)
    },
  },
}
