import {useState} from 'react';
const fetcher = (url) => fetch(url).then(res => res.json());

function App() {
  const [title, setTitle] = useState('');
  const [blogData, setData] = useState({});

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
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
    let date = Date.now();
    let content = document.getElementById('content').value;
    setData({
      title: title,
      date:date,
      content:content
    })
    console.log(blogData);
    try {
      let res = await fetch('http://localhost:3001/api/post/create', 
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(blogData)
        });
      let data = await res.json(); 
      console.log(data);
    } catch (err) {
      console.error(err); 
    } finally {
      console.log('ok')
    }
  }
  return (
    <div>
      <h1>Blog title: {title}</h1>
      <form>
        <input 
          type="text" placeholder="Blog title" 
          onChange={handleTitleChange}
          name="title"/>
        <textarea name="content" placeholder="Blog content"
          id="content"></textarea>
        <button onClick={postBlog}>post blog</button>
      </form>
      <button onClick={getAllBlogs}>get all blogs</button>
    </div>
  );
}

export default App;
