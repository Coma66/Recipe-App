import PropTypes from 'prop-types'
import { User } from './User.jsx'

export function Recipe({ title, author, ingredients, image }) {
  return (
    <article>
      <h2>{title}</h2>
      {author && (
        <em>
          Written by <User id={author} />
        </em>
      )}{' '}
      <div>
        <br />
        <img src={image} style={{ width: '15%', height: '10%' }} alt='' />
      </div>
      <h3>Ingredients</h3>
      <div>{ingredients}</div>{' '}
    </article>
  )
}
Recipe.propTypes = {
  title: PropTypes.string.isRequired,
  ingredients: PropTypes.string,
  author: PropTypes.string,
  image: PropTypes.string,
}
