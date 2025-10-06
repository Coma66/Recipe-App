import { initDatabase } from './db/init.js'
import { Recipe } from './db/models/recipe.js'
import dotenv from 'dotenv'

dotenv.config()
await initDatabase()
const recipe = new Recipe({
  title: 'Hello from the inside!',
  author: 'Another Person',
  ingredients:
    'This recipe is also stored in a MongoDB database using Mongoose.',
  tags: ['other'],
})
await recipe.save()
const recipes = await Recipe.find()
console.log(recipes)
