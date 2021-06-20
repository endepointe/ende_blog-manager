import './Update.css';
export default function UpdateTitle(props) {
	return (
		<form className="updateBlog">
      <h3>Update blog title</h3>
      <label htmlFor="contentChange">Select blog to update:</label>
      <select
        id="contentChange"
        value={props.id}
        onChange={props.onChange}>
        <option value="--">--</option>
        {Object.keys(props.blogs).map((blog, i) => {
          return (
            <option 
              value={props.blogs[blog].id}
              key={i}>{props.blogs[blog].id}</option>
            )})
          }
      </select>
			<label htmlFor="changedContent"></label>
			<input 
				id="changedContent"
				onChange={props.handleContentChange}
				type="text" placeholder="New Blog content" name="content"/>
      <button 
        className="update"
        onClick={props.onClick}>update content</button>
    </form>
	)
}