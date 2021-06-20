// import "./PostBlog.css";

export default function PostBlog(props) {
	const setHeight = (e) => {
		e.target.style.height = '';
		e.target.style.height = `${e.target.scrollHeight}px`;
		console.log(e.target.scrollHeight);
	}
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
				onInput={setHeight}
				name="content" placeholder="Blog content"></textarea>
			<button onClick={props.onClick}>post blog</button>
		</form>
	)
}