export default function Feature({ image, alt, title, children }) {
  return (
    <article className="feature-item">
      <img src={image} alt={alt} className="feature-icon" width="100" height="100" />
      <h3 className="feature-item-title">{title}</h3>
      <p>{children}</p>
    </article>
  )
}
