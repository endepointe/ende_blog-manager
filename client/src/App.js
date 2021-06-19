import {useState} from 'react';
const fetcher = (url) => fetch(url).then(res => res.json());

function App() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

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
      console.log(data);
    } catch (err) {
      console.error(err); 
    } finally {
      console.log('ok')
    }
  }
  const postBlog = async (e) => {
    e.preventDefault();
    console.log(title, content);
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
      <button onClick={getAllBlogs}>get all blogs</button>
    </div>
  );
}

export default App;
