import PropTypes from 'prop-types'

export function Recipe({ title, author, ingredients, image }) {
  return (
    <article>
      <h2>{title}</h2>
      <div>
        <img src={image} style={{ width: '15%', height: '10%' }} alt='' />
      </div>
      <h3>Ingredients</h3>
      <div>{ingredients}</div>{' '}
      {author && (
        <em>
          <br /> Written by <strong>{author}</strong>{' '}
        </em>
      )}{' '}
    </article>
  )
}
Recipe.propTypes = {
  title: PropTypes.string.isRequired,
  ingredients: PropTypes.string,
  author: PropTypes.string,
  image: PropTypes.string,
}
