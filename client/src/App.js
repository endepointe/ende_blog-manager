import {useState, useEffect} from 'react';
const fetcher = (url) => fetch(url).then(res => res.json());

function App() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [allBlogs, setAllBlogs] = useState([]);

  const clearFields = () => {
    document.getElementById('title').value = null;
    document.getElementById('content').value = null;
    setTitle(null);
    setContent(null);
  }

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  }
  const handleContentChange = (e) => {
    setContent(e.target.value);
  }

  const getAllBlogs = async () => {
    try {
      let data = await fetcher('http://localhost:3001/api/get/all');
      console.log("getting all blogs ...\n");
      setAllBlogs(data)
    } catch (err) {
      console.error(err); 
    } finally {
      console.log(allBlogs)
    }
  }
  const postBlog = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch('http://localhost:3001/api/post/create', 
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(
            {
              title: title,
              date: new Date().toISOString(),
              content: content
            }),
        });
      let data = await res.json(); 
      console.log(data);
    } catch (err) {
      console.error(err); 
    } finally {
      clearFields();
    }
  }
  const updateBlogTitle = async () => {
    try {
      let res = await fetch('http://localhost:3001/api/put/title', 
        {
          method: 'PUT',
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
        console.log("updated data: ",data)
    } catch (err) {
      console.error(err);
    } finally {
      console.log("hes' ok");
    }
  }
  const updateBlogContent = async () => {
    try {
      let res = await fetch('http://localhost:3001/api/put/content', 
        {
          method: 'PUT',
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
        console.log("updated data: ",data)
    } catch (err) {
      console.error(err);
    } finally {
      console.log("hes' ok");
    }
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
    <div>
      <h1>Blog title: {title}</h1>

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
        <button onClick={postBlog}>post blog</button>
      </form>

 
      <form>
        <h1>Update blog</h1>
        <input 
          id="title"
          onChange={handleTitleChange}
          type="text" placeholder="Blog title" name="title"/>
        <textarea 
          id="content"
          onChange={handleContentChange}
          name="content" placeholder="Blog content"></textarea>
        {/* <button onClick={postBlog}>post blog</button> */}
        <button onClick={postBlog}>post blog</button>
      </form>

      <button onClick={updateBlogTitle}>update blog title</button>
      <button onClick={updateBlogContent}>update blog content</button>
      <button onClick={deleteBlog}>delete blogs</button>
      <button onClick={getAllBlogs}>get all blogs</button>

    </div>
  );
}

export default App;
