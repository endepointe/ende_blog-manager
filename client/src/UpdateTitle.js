import './Update.css';
import {
  useLocation,
} from 'react-router-dom'
import {
  useEffect,
} from 'react';
export default function UpdateTitle(props) {
  const location = useLocation();
  const {data} = location.state;
  useEffect(() => {
    props.onChange(data.id);
  })
  
	return (
		<form className="updateBlog">
      <h3>Update blog {data.id} title</h3>
			<label htmlFor="changedTitle"></label>
			<input 
				id="changedTitle"
				onChange={props.handleTitleChange}
				type="text" placeholder="New Blog title" name="title"/>
      <button 
        className="update"
        onClick={props.onClick}>update title</button>
    </form>
	)
}