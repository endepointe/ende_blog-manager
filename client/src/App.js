import './App.css';
import {fetcher} from './utils/fetcher';
import {getBlog} from './crud_helpers/getBlog';
import {postBlog} from './crud_helpers/postBlog';
import {deleteBlog} from './crud_helpers/deleteBlog';
import { 
  updateBlogTitle,
  updateBlogContent,
} from './crud_helpers/updateBlog';
import {useState, useEffect} from 'react';

// const fetcher = (url) => fetch(url).then(res => res.json());

// function closure () {
//   var info = 'use this closure when needed';
//   function displayInfo() {
//     console.log(info);
//   }
//   displayInfo();
// }

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
    <div className="container">
      <aside className="aside">
        <h1>Blogs</h1>
        <span>Count: {blogs?.length}</span>
        <ul>
          {Object.keys(blogs).map((blog, i) => {
            return (
              <li key={i}>{blogs[blog].id} {blogs[blog].title}</li>
            )
          })}
        </ul>
      </aside>

      <main className="main">
        <form>
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

        <div>
          <h3>Update blog title</h3>
          <label htmlFor="blog-id">Select blog to update:</label>
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
        </div>

        <div>
          <h3>Update blog content</h3>
          <label htmlFor="blog-id">Select blog to update:</label>
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
        </div>

        <div>
          <h3>Get a blog</h3>
          <label htmlFor="blog-id">Select blog to view:</label>
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
          <button onClick={(e) => handleGetBlog(e)}>get blog</button>
        </div>


        <div>
          <h3>Delete blog</h3>
          <label htmlFor="blog-id">Select blog to delete:</label>
          <select onChange={handleIdChange}>
            <option value="--">--</option>
            {Object.keys(blogs).map((blog, i) => {
              return (
                  <option key={i}>{blogs[blog].id}</option>
                )
              })}
          </select>
          <button onClick={(e) => deleteBlog(e,id,clearFields)}>delete blog</button>
        </div>

        
        <article>
          {blog ? <div dangerouslySetInnerHTML={createMarkup(blog.content)}/> : null}
        </article>
      </main>
    </div>
    //end container
  );
}

function createMarkup(html) {
  return {__html: html};
}

export default App;
