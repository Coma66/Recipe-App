import { Recipe } from '../db/models/recipe.js'

export async function createRecipe({
  title,
  author,
  ingredients,
  image,
  tags,
}) {
  const recipe = new Recipe({ title, author, ingredients, image, tags })
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

export async function listRecipesByAuthor(author, options) {
  return await listRecipes({ author }, options)
}

export async function listRecipesByTag(tags, options) {
  return await listRecipes({ tags }, options)
}

export async function getRecipeById(recipeID) {
  return await Recipe.findById(recipeID)
}

export async function updateRecipe(
  recipeID,
  { title, author, ingredients, image, tags },
) {
  return await Recipe.findOneAndUpdate(
    { _id: recipeID },
    { $set: { title, author, ingredients, image, tags } },
    { new: true },
  )
}

export async function deleteRecipe(recipeID) {
  return await Recipe.deleteOne({ _id: recipeID })
}
