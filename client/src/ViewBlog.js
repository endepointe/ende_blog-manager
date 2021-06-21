import "./ViewBlog.css";
import {
  useLocation,
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
        <h6>Modified: <span>{new Date(data.modified).toLocaleDateString()} {new Date(data.modified).toLocaleTimeString()}</span></h6>
        <div 
          className="returnedMarkdown"
          dangerouslySetInnerHTML={props.createMarkup(data.content)}/>
      </section>
    </article>
	)
}