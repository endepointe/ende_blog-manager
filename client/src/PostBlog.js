import "./PostBlog.css";

export default function PostBlog(props) {
	return (
		<form className="postBlog">
			<h3>Post blog</h3>
			<input 
				id="title"
				onChange={props.handleTitleChange}
				type="text" placeholder="Blog title" name="title"/>
			<textarea 
				id="content"
				onChange={props.handleContentChange}
				name="content" placeholder="Blog content"></textarea>
			{/* <button onClick={(e) => postBlog(e, title, content, clearFields)}>post blog</button> */}
			<button onClick={props.onClick}>post blog</button>
		</form>
	)
}