import PropTypes from 'prop-types'
import { User } from './User.jsx'
import { Link } from 'react-router-dom'
import slug from 'slug'

export function Recipe({
  title,
  author,
  ingredients,
  image,
  id,
  fullRecipe = true,
}) {
  return (
    <article>
      {fullRecipe ? (
        <h3>{title}</h3>
      ) : (
        <Link to={`/recipes/${id}/${slug(title)}`}>
          <h3>{title}</h3>
        </Link>
      )}
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
    </article>
  )
}
Recipe.propTypes = {
  title: PropTypes.string.isRequired,
  ingredients: PropTypes.string,
  author: PropTypes.shape(User.propTypes),
  image: PropTypes.string,
  id: PropTypes.string.isRequired,
  fullRecipe: PropTypes.bool,
}

/* <img src={image} style={{ width: '15%', height: '10%' }} alt='' /> */
