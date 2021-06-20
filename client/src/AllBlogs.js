export default function AllBlogs(props) {
	return (
   <article className="allBlogs">
      {Object.keys(props.blogs).map((blog, i) => {
        return (
          <section key={i}>
            <h4>Blog ID: {props.blogs[blog].id}</h4>
            <h4>Blog Title: {props.blogs[blog].title}</h4>
            <h5>Posted: {new Date(props.blogs[blog].posted).toLocaleDateString()} {new Date(props.blogs[blog].posted).toLocaleTimeString()}</h5>
            <h5>Modified: {new Date(props.blogs[blog].modified).toLocaleDateString()} {new Date(props.blogs[blog].modified).toLocaleTimeString()}</h5>
            <div dangerouslySetInnerHTML={props.createShortenedMarkup(props.blogs[blog].content)}/>
          </section>
        )
      })}
    </article>
	)
}