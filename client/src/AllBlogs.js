import './AllBlogs.css';
import checkDates from './utils/check-dates';
import {
  Link
} from 'react-router-dom';

export default function AllBlogs(props) {
	return (
    <div className="allBlogs">
      <h3>All Blogs</h3>
      {props.blogs.length > 0 ? 
      <article >
          {Object.keys(props.blogs).map((blog, i) => {
            return (
              <section key={i}>
                <h4>Blog ID: <span>{props.blogs[blog].id}</span></h4>
                <h5>Blog Title: <span>{props.blogs[blog].title}</span></h5>
                <h6>Posted:{' '} 
                  <span>
                    {new Date(props.blogs[blog].posted).toLocaleDateString()} {new Date(props.blogs[blog].posted).toLocaleTimeString()}
                  </span>
                </h6>
                <h6>Modified:{' '}
                  {checkDates(
                      new Date(props.blogs[blog].posted).toLocaleDateString(),
                      new Date(props.blogs[blog].modified).toLocaleDateString()
                  ) > 0 ?
                    <span>
                      {new Date(props.blogs[blog].modified).toLocaleDateString()} {new Date(props.blogs[blog].modified).toLocaleTimeString()}
                    </span>
                  : null }
                </h6>
                <div dangerouslySetInnerHTML={props.createShortenedMarkup(props.blogs[blog].content)}/>
                <p>{}</p>
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
      : <p className="noblogs">No blogs in database</p>}
    </div>
	)
}