//import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext.jsx'
import { useMutation as useGraphQLMutation } from '@apollo/client/react/index.js'
import {
  CREATE_RECIPE,
  GET_RECIPES,
  GET_RECIPES_BY_AUTHOR,
} from '../api/graphql/recipes.js'
import { Link } from 'react-router-dom'
import slug from 'slug'
import { useSocket } from '../contexts/SocketIOContext.jsx'
import { Popup } from './Popup.jsx'

export function CreateRecipe() {
  const { socket } = useSocket()
  const [title, setTitle] = useState('')
  const [ingredients, setIngredients] = useState('')
  const [image, setImage] = useState('')
  const [popupState, setPopupState] = useState(false)
  const [popupTitle, setPopupTitle] = useState('')
  const [popupLink, setPopupLink] = useState('')
  const [token] = useAuth()

  const [createRecipe, { loading, data }] = useGraphQLMutation(CREATE_RECIPE, {
    variables: { title, ingredients, image },
    context: { headers: { Authorization: `Bearer ${token}` } },
    refetchQueries: [GET_RECIPES, GET_RECIPES_BY_AUTHOR],
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    const recipeData = await createRecipe()
    if (recipeData) {
      socket.emit('newRecipe', recipeData)
    }
  }
  if (socket) {
    socket.on('popup', (recipeData) => {
      setPopupTitle(recipeData.data.createRecipe.title)
      setPopupLink(
        `/recipes/${recipeData.data.createRecipe.id}/${slug(
          recipeData.data.createRecipe.title,
        )}`,
      )
      setPopupState(true)
    })
  }

  if (!token) return <div>Please log in to create new recipes.</div>
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='create-title'>Title: </label>
        <input
          type='text'
          name='create-title'
          id='create-title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <br />
      <textarea
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
      />
      <br />
      <br />
      <div>
        <label htmlFor='create-image'>Image URL: </label>
        <input
          type='text'
          name='create-image'
          id='create-image'
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
      </div>
      <br />
      <input
        type='submit'
        value={loading ? 'Creating...' : 'Create'}
        disabled={!title || loading}
      />
      {data?.createRecipe ? (
        <>
          <br />
          Recipe{' '}
          <Link
            to={`/recipes/${data.createRecipe.id}/${slug(
              data.createRecipe.title,
            )}`}
          >
            {data.createRecipe.title}
          </Link>{' '}
          created successfully!
        </>
      ) : null}
      <br />
      <br />
      {popupState && <Popup title={popupTitle} link={popupLink} />}
    </form>
  )
}
