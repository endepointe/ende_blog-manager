export default function DeleteBlog(props) {
	return (
		<form className="deleteBlog">
			<h3>Delete blog</h3>
			<label htmlFor="blogDelete">Select blog to delete:</label>
			<select 
				id="blogDelete"
				onChange={props.onChange}>
				<option value="--">--</option>
				{Object.keys(props.blogs).map((blog, i) => {
					return (
							<option key={i}>{props.blogs[blog].id}</option>
						)
					})}
			</select>
			<button onClick={props.onClick}>delete blog</button>
		</form>
	)
}