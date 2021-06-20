import './App.css';
import './Nav.css';
import PostBlog from './PostBlog';
import GetBlog from './GetBlog';
import UpdateTitle from './UpdateTitle';
import UpdateContent from './UpdateContent';
import DeleteBlog from './DeleteBlog';
import AllBlogs from './AllBlogs';
import {fetcher} from './utils/fetcher';
import {getBlog} from './crud_helpers/getBlog';
import {postBlog} from './crud_helpers/postBlog';
import {deleteBlog} from './crud_helpers/deleteBlog';
import { 
  updateBlogTitle,
  updateBlogContent,
} from './crud_helpers/updateBlog';
import {useState, useEffect} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

// the blogs will need to be in html format.
function createMarkup(html) {
  return {__html: html};
}
// returns a sliced preview of content
function createShortenedMarkup(html) {
  let shortenedHtml = html.slice(0,400);
  return {__html: shortenedHtml};
}

function App() {
  const [id, setIdValue] = useState(0);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [blogs, setBlogs] = useState([]);
  const [blog, setBlog] = useState({});

  useEffect(() => {
    async function getBlogs(){
      try {
        let data = await fetcher('http://localhost:3001/api/get/all');
        console.log("getting all blogs ...\n");
        setBlogs(data.entries);
        return;
     } catch (err) {
        console.error(err); 
        return null;
      } finally {
        console.log('ok');
      }
    }
    getBlogs();
    // effect isn't dependent on blogs state
    // https://reactjs.org/link/hooks-data-fetching
  }, []); 
 
  const clearFields = () => {
    // document.getElementById('title').value = null;
    // document.getElementById('content').value = null;
    setTitle(null);
    setContent(null);
    // setBlog(null);
    window.location.reload();
  }
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  }
  const handleContentChange = (e) => {
    console.log(e.target.value);
    setContent(e.target.value);
  }
  const handleIdChange = (e) => {
    setIdValue(e.target.value);
  }
  const handleGetBlog = async (e) => {
    let res = await getBlog(e,id, clearFields);
    console.log(res)
    setBlog(res.entry);
  }

  return (
    <Router>  
      <div className="container">
        <aside className="aside">
          <nav className="nav">
            <ul className="nav-links">
              <li>
                <Link to="/post-blog">Post Blog</Link>
              </li>
              <li>
                <Link to="/update-title">Update Blog Title</Link>
              </li>
              <li>
                <Link to="/update-content">Update Blog Content</Link>
              </li>
              <li>
                <Link to="/get-blog">Get Blog</Link>
              </li>
              <li>
                <Link to="/delete-blog">Delete Blog</Link>
              </li>
              <li>
                <Link to="/all-blogs">View All Blogs</Link>
              </li>
            </ul>
          </nav>
          <hr/>
          <div className="">
            <h1>Blog Count: </h1>
            <small>{blogs?.length}</small>
          </div>
        </aside>

        <main className="main">
          <Switch>
            <Route path="/get-blog">
              <GetBlog 
                blogs={blogs}
                onChange={handleIdChange}
                onClick={handleGetBlog}/>
              <article className="blogData">
                {blog ? 
                  <div>
                    <h4>Blog ID: {blog.id}</h4>
                    <h4>Blog Title: {blog.title}</h4>
                    <h5>Posted: {new Date(blog.posted).toLocaleDateString()} {new Date(blog.posted).toLocaleTimeString()}</h5>
                    <h5>Modified: {new Date(blog.modified).toLocaleDateString()} {new Date(blog.modified).toLocaleTimeString()}</h5>
                    <div dangerouslySetInnerHTML={createMarkup(blog.content)}/>
                  </div>
                  : null}
              </article>
            </Route>

            <Route path="/update-title">
              <UpdateTitle 
                id={id.value}
                blogs={blogs}
                handleTitleChange={handleTitleChange}
                onChange={handleIdChange}
                onClick={(e) => updateBlogTitle(e,id,title,clearFields)}/>
            </Route>

            <Route path="/update-content">
              <UpdateContent 
                id={id.value}
                blogs={blogs}
                handleContentChange={handleContentChange}
                onChange={handleIdChange}
                onClick={(e) => updateBlogContent(e,id,content,clearFields)}/>
            </Route>

            <Route path="/post-blog">
              <PostBlog 
                onClick={(e) => postBlog(e,title,content,clearFields)}
                handleContentChange={handleContentChange}
                handleTitleChange={handleTitleChange} />
            </Route>

            <Route path="/delete-blog">
              <DeleteBlog 
                blogs={blogs}
                onChange={handleIdChange}
                onClick={(e) => deleteBlog(e,id,clearFields)}/>
            </Route>

            <Route path="/all-blogs">
              {blogs ? 
                <AllBlogs 
                  blogs={blogs}
                  createShortenedMarkup={createShortenedMarkup}/>
                : <p>no blogs in database</p> }
            </Route>
          </Switch>
        </main>
      </div>
      {/* end container */}
    </Router>
  );
}



export default App;
