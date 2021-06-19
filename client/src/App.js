import './App.css';
import {postBlog} from './crud_helpers/postBlog';
import { 
  updateBlogTitle,
  updateBlogContent,
} from './crud_helpers/updateBlog';
import {useState, useEffect} from 'react';
const fetcher = (url) => fetch(url).then(res => res.json());

function closure () {
  var info = 'use this closure when needed';
  function displayInfo() {
    console.log(info);
  }
  displayInfo();
}

function App() {
  const [id, setId] = useState(0);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    async function getBlogs(){
      try {
        let data = await fetcher('http://localhost:3001/api/get/all');
        console.log("getting all blogs ...\n");
        setBlogs(data.entries);
      } catch (err) {
        console.error(err); 
        return null;
      } finally {
        closure();
      }
    }
    getBlogs();
    document.getElementById('titleChange').value = 1;
    document.getElementById('contentChange').value = 1;
    // effect isn't dependent on blogs state
    // https://reactjs.org/link/hooks-data-fetching
  }, []); 
 
  const clearFields = () => {
    document.getElementById('title').value = null;
    document.getElementById('content').value = null;
    setTitle(null);
    setContent(null);
    window.location.reload();
  }

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  }
  const handleContentChange = (e) => {
    setContent(e.target.value);
  }
  const handleIdChange = (e) => {
    console.log('id change')
    setId(e.target.value);
  }

  const deleteBlog = async () => {
    try {
      let res = await fetch('http://localhost:3001/api/delete/blog', 
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          // body: JSON.stringify(
          //   {
          //     title: title,
          //     date: new Date().toISOString(),
          //     content: content
          //   }),
        });
        let data = res.json();
        console.log("deleted data: ",data)
    } catch (err) {
      console.error(err);
    } finally {
      console.log("hes' not ok");
    }
  }

  return (
    <div className="container">
      <aside className="aside">
        <h1>Blogs</h1>
        <span>Count: {blogs?.length}</span>
        <ul>
          {Object.keys(blogs).map((blog, i) => {
            return (
              <li key={i}>{blogs[blog].title}</li>
            )
          })}
        </ul>
      </aside>

      <main className="main">
        <form>
          <input 
            id="title"
            onChange={handleTitleChange}
            type="text" placeholder="Blog title" name="title"/>
          <textarea 
            id="content"
            onChange={handleContentChange}
            name="content" placeholder="Blog content"></textarea>
          {/* <button onClick={postBlog}>post blog</button> */}
          <button onClick={(e) => postBlog(e, title, content, clearFields)}>post blog</button>
        </form>

        <div>
          <h3>Update blog title</h3>
          <label htmlFor="blog-id">Select blog to update:</label>
          <select
            value='1'
            id="titleChange"
            onChange={handleIdChange}>
            {Object.keys(blogs).map((blog, i) => {
              return (
                <option 
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
            onChange={updateBlogContent}>
            {Object.keys(blogs).map((blog, i) => {
              return (
                <option key={i}>{blogs[blog].id}</option>
              )})
            }
          </select>
          <button onClick={(e) => updateBlogContent(e,1,content,clearFields)}>update blog content</button>
        </div>

        <div>
          <h3>Delete blog</h3>
          <label htmlFor="blog-id">Select blog to delete:</label>
          <select>
            {Object.keys(blogs).map((blog, i) => {
              return (
                  <option key={i}>{blogs[blog].id}</option>
                )
              })}
          </select>
          <button onClick={deleteBlog}>delete blogs</button>
        </div>
      </main>
    </div>
    //end container
  );
}

export default App;
