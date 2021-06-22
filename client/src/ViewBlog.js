import "./ViewBlog.css";
import checkDates from './utils/check-dates';
import {
  useLocation,
  Link
} from 'react-router-dom';

export default function ViewBlog(props) {
  const location = useLocation();
  const {data} = location.state;
	return (
    <article className="viewBlog">
      <h3>View Blog</h3>
      <section>
        <h4>Blog ID: <span>{data.id}</span></h4>
        <h5>Blog Title: <span>{data.title}</span></h5>
        <h6>Posted: <span>{new Date(data.posted).toLocaleDateString()} {new Date(data.posted).toLocaleTimeString()}</span></h6>
        <h6>Modified:{' '}
          {checkDates(
            new Date(data.posted).toLocaleDateString(),
            new Date(data.modified).toLocaleDateString()
          ) > 0 ?
          <span>
            {new Date(data.modified).toLocaleDateString()} {new Date(data.modified).toLocaleTimeString()}
                    </span>
                  : null }
                </h6>
        <div className="updateBlogLinks">
          <Link
            className="updateTitleLink"
            to={{
              pathname:"/update-title",
              state: {data: data}
            }}><span>Update title</span></Link>
          <Link
            className="updateContentLink"
            to={{
              pathname:"/update-content",
              state: {data: data}
            }}><span>Update content</span></Link>
        </div>
        <div 
          className="returnedMarkdown"
          dangerouslySetInnerHTML={props.createMarkup(data.content)}/>
      </section>
    </article>
	)
}