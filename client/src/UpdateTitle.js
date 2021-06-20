import './Update.css';
export default function UpdateTitle(props) {
	return (
		<form className="updateBlog">
      <h3>Update blog title</h3>

      <label htmlFor="titleChange">Select blog to update:</label>
      <select
        id="titleChange"
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