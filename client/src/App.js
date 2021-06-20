import './App.css';
import './Nav.css';
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
    document.getElementById('title').value = null;
    document.getElementById('content').value = null;
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
    console.log('id change')
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
            </ul>
          </nav>
          <hr/>
          <div className="">
            <h1>Blogs</h1>
            <small>Count: {blogs?.length}</small>
            <ul className="">
              {Object.keys(blogs).map((blog, i) => {
                return (
                  <li key={i}>{blogs[blog].id} {blogs[blog].title}</li>
                )
              })}
            </ul>
          </div>
        </aside>

        <main className="main">
          <Switch>
            <Route path="/get-blog">
              <form className="getBlog">
                <h3>Get a blog</h3>
                <label htmlFor="getId">Select blog to view:</label>
                <select
                  id="getId"
                  onChange={handleIdChange}>
                  <option value="--">--</option>
                  {Object.keys(blogs).map((blog, i) => {
                    return (
                      <option 
                        value={blogs[blog].id}
                        key={i}>{blogs[blog].id}</option>
                    )})
                  }
                </select>
                <button onClick={(e) => handleGetBlog(e)}>get blog</button>
              </form>
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
              <form className="updateBlog">
                <h3>Update blog title</h3>
                <label htmlFor="titleChange">Select blog to update:</label>
                <select
                  id="titleChange"
                  value={id.value}
                  onChange={handleIdChange}>
                  <option value="--">--</option>
                  {Object.keys(blogs).map((blog, i) => {
                    return (
                      <option 
                        value={blogs[blog].id}
                        key={i}>{blogs[blog].id}</option>
                    )})
                  }
                </select>
                <button onClick={(e) => updateBlogTitle(e,id,title,clearFields)}>update blog title</button>
              </form>
            </Route>

            <Route path="/update-content">
              <form className="updateBlog">
                <h3>Update blog content</h3>
                <label htmlFor="contentChange">Select blog to update:</label>
                <select
                  id="contentChange"
                  onChange={handleIdChange}>
                  <option value="--">--</option>
                  {Object.keys(blogs).map((blog, i) => {
                    return (
                      <option 
                        value={blogs[blog].id}
                        key={i}>{blogs[blog].id}</option>
                    )})
                  }
                </select>
                <button onClick={(e) => updateBlogContent(e,id,content,clearFields)}>update blog content</button>
              </form>
            </Route>

            <Route path="/post-blog">
              <form className="postBlog">
                <h3>Post blog</h3>
                <input 
                  id="title"
                  onChange={handleTitleChange}
                  type="text" placeholder="Blog title" name="title"/>
                <textarea 
                  id="content"
                  onChange={handleContentChange}
                  name="content" placeholder="Blog content"></textarea>
                <button onClick={(e) => postBlog(e, title, content, clearFields)}>post blog</button>
              </form>
            </Route>

            <Route path="delete-blog">
              <form className="deleteBlog">
                <h3>Delete blog</h3>
                <label htmlFor="blogDelete">Select blog to delete:</label>
                <select 
                  id="blogDelete"
                  onChange={handleIdChange}>
                  <option value="--">--</option>
                  {Object.keys(blogs).map((blog, i) => {
                    return (
                        <option key={i}>{blogs[blog].id}</option>
                      )
                    })}
                </select>
                <button onClick={(e) => deleteBlog(e,id,clearFields)}>delete blog</button>
              </form>
            </Route>
          </Switch>
        </main>
      </div>
      {/* end container */}
    </Router>
  );
}



export default App;
