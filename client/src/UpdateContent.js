import './Update.css';
import {
  useLocation,
} from 'react-router-dom';
import {
  useEffect
} from 'react';

export default function UpdateTitle(props) {
  const location = useLocation();
  const {data} = location.state;
  useEffect(() => {
    props.onChange(data.id);
  })
	const setHeight = (e) => {
		e.target.style.height = '';
		e.target.style.height = `${e.target.scrollHeight}px`;
		console.log(e.target.scrollHeight);
	}
	return (
		<form className="updateBlog">
      <h3>Update blog title</h3>
			<label htmlFor="changedContent"></label>
			<textarea 
				id="changedContent"
				onChange={props.handleContentChange}
				onInput={setHeight}
				name="content" placeholder="New Blog content"></textarea>
      <button 
        className="update"
        onClick={props.onClick}>update content</button>
    </form>
	)
}