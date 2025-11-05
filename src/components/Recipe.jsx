import PropTypes from 'prop-types'
import { User } from './User.jsx'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext.jsx'
import slug from 'slug'
import { LIKE_RECIPE, GET_RECIPES } from '../api/graphql/recipes.js'
import { useMutation as useGraphQLMutation } from '@apollo/client/react/index.js'

export function Recipe({
  title,
  author,
  ingredients,
  image,
  likes,
  id,
  fullRecipe = true,
}) {
  const [token] = useAuth()
  const [likeRecipe] = useGraphQLMutation(LIKE_RECIPE, {
    variables: { id, likes },
    context: { headers: { Authorization: `Bearer ${token}` } },
    refetchQueries: [GET_RECIPES],
  })

  if (!token)
    return (
      <article>
        {fullRecipe ? (
          <h3>{title}</h3>
        ) : (
          <Link to={`/recipes/${id}/${slug(title)}`}>
            <h3>{title}</h3>
          </Link>
        )}
        {<div>Likes: {likes}</div>}
        {fullRecipe && <div>{ingredients}</div>}
        {fullRecipe && (
          <img src={image} style={{ width: '15%', height: '10%' }} alt='' />
        )}
        {author && (
          <em>
            {fullRecipe && <br />}
            Written by <User {...author} />
          </em>
        )}
        <br />
        <div>Please log in to like recipes.</div>
      </article>
    )
  return (
    <article>
      {fullRecipe ? (
        <h3>{title}</h3>
      ) : (
        <Link to={`/recipes/${id}/${slug(title)}`}>
          <h3>{title}</h3>
        </Link>
      )}
      {<div>Likes: {likes}</div>}
      {fullRecipe && <div>{ingredients}</div>}
      {fullRecipe && (
        <img src={image} style={{ width: '15%', height: '10%' }} alt='' />
      )}
      {author && (
        <em>
          {fullRecipe && <br />}
          Written by <User {...author} />
        </em>
      )}
      <br />
      <button onClick={likeRecipe}>Like This Recipe</button>
    </article>
  )
}
Recipe.propTypes = {
  title: PropTypes.string.isRequired,
  ingredients: PropTypes.string,
  author: PropTypes.shape(User.propTypes),
  image: PropTypes.string,
  likes: PropTypes.number,
  id: PropTypes.string.isRequired,
  fullRecipe: PropTypes.bool,
}

/* <img src={image} style={{ width: '15%', height: '10%' }} alt='' /> */
