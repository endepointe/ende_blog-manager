import './App.css';
import Nav from './Nav';
import PostBlog from './PostBlog';
import GetBlog from './GetBlog';
import UpdateTitle from './UpdateTitle';
import UpdateContent from './UpdateContent';
import DeleteBlog from './DeleteBlog';
import AllBlogs from './AllBlogs';
import ViewBlog from './ViewBlog';
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
} from 'react-router-dom';
// const marked = require('marked')
import marked from 'marked';
marked.setOptions({
  breaks: true,
})
// the blogs will need to be in html format when returned
// https://github.com/markedjs/marked/issues/190#issuecomment-8653033170
function createMarkup(html) {
  let markdown = `${html}`;
  markdown = markdown.replace(/\n(?=\n)/g, "<br/><br/>\n\n");
  let md = marked(markdown);
  return {__html: md};
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
  const [deleteButton, showDeleteButton] = useState(false);

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
    setTitle(null);
    setContent(null);
    setBlog(null);
    showDeleteButton(false);
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
          <Nav/>
          <hr/>
          <div className="">
            <h1>Blog Count: </h1>
            <small>{blogs?.length}</small>
          </div>
        </aside>

        <main className="main">
          <Switch>
            <Route exact path="/">
              <PostBlog 
                onClick={(e) => postBlog(e,title,content,clearFields)}
                handleContentChange={handleContentChange}
                handleTitleChange={handleTitleChange} />
            </Route>

            <Route path="/get-blog">
              <GetBlog 
                blogs={blogs}
                onChange={handleIdChange}
                onClick={handleGetBlog}/>
              <article className="blogData">
                {blog ? 
                  <section>
                    <h4>Blog ID: {blog.id}</h4>
                    <h5>Blog Title: {blog.title}</h5>
                    <h5>Posted: {new Date(blog.posted).toLocaleDateString()} {new Date(blog.posted).toLocaleTimeString()}</h5>
                    <h6>Modified: {new Date(blog.modified).toLocaleDateString()} {new Date(blog.modified).toLocaleTimeString()}</h6>
                    <div dangerouslySetInnerHTML={createMarkup(blog.content)}/>
                  </section>
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

            <Route path="/delete-blog">
              <DeleteBlog 
                blogs={blogs}
                show={deleteButton}
                stateChange={showDeleteButton}
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

            <Route path="/view-blog">
              <ViewBlog
                createMarkup={createMarkup}/>
            </Route>
          </Switch>
        </main>
      </div>
      {/* end container */}
    </Router>
  );
}

export default App;