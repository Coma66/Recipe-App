import { Recipe } from '../db/models/recipe.js'
import { User } from '../db/models/user.js'

export async function createRecipe(
  userId,
  { title, ingredients, image, tags },
) {
  const recipe = new Recipe({ title, author: userId, ingredients, image, tags })
  return await recipe.save()
}

async function listRecipes(
  query = {},
  { sortBy = 'createdAt', sortOrder = 'descending' } = {},
) {
  return await Recipe.find(query).sort({ [sortBy]: sortOrder })
}

export async function listAllRecipes(options) {
  return await listRecipes({}, options)
}

export async function listRecipesByAuthor(authorUsername, options) {
  const user = await User.findOne({ username: authorUsername })
  if (!user) return []
  return await listRecipes({ author: user._id }, options)
}

export async function listRecipesByTag(tags, options) {
  return await listRecipes({ tags }, options)
}

export async function getRecipeById(recipeID) {
  return await Recipe.findById(recipeID)
}

export async function updateRecipe(
  userId,
  recipeID,
  { title, ingredients, image, tags },
) {
  return await Recipe.findOneAndUpdate(
    { _id: recipeID, author: userId },
    { $set: { title, ingredients, image, tags } },
    { new: true },
  )
}

export async function deleteRecipe(userId, recipeID) {
  return await Recipe.deleteOne({ _id: recipeID, author: userId })
}
