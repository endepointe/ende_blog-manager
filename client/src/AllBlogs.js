import './AllBlogs.css';
import {
  Link
} from 'react-router-dom';
export default function AllBlogs(props) {
	return (
    <div className="allBlogs">
      <h3>All Blogs</h3>
      <article >
          {Object.keys(props.blogs).map((blog, i) => {
            return (
              <section key={i}>
                <h4>Blog ID: <span>{props.blogs[blog].id}</span></h4>
                <h5>Blog Title: <span>{props.blogs[blog].title}</span></h5>
                <h6>Posted: <span>{new Date(props.blogs[blog].posted).toLocaleDateString()} {new Date(props.blogs[blog].posted).toLocaleTimeString()}</span></h6>
                <h6>Modified: <span>{new Date(props.blogs[blog].modified).toLocaleDateString()} {new Date(props.blogs[blog].modified).toLocaleTimeString()}</span></h6>
                <div dangerouslySetInnerHTML={props.createShortenedMarkup(props.blogs[blog].content)}/>
                <Link
                  className="viewBlogLink"
                  to={{
                    pathname:"/view-blog",
                    state: {data: props.blogs[blog]}
                  }}><span>Read more</span></Link>
              </section>
            )
          })}
        </article>
    </div>
	)
}