import './DeleteBlog.css';

function Alert(props) {
	console.log(props)
	return (
		<div className="alert" >
			<p>Are you sure?</p>
			<button className="danger"
				onClick={props.onClick}>confirm delete blog</button>
		</div>
	)
}
export default function DeleteBlog(props) {
	const showAlert = (e) => {
		e.preventDefault();
		console.log("show: ", props.show)
		console.log(document.getElementById('firstDanger').classList);
		document.getElementById('firstDanger').classList.toggle('disabled');
		props.stateChange(true)
	}
	return (
		<>
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
			
			<button 
				id="firstDanger"
				className="danger"
				disabled={props.show}
				onClick={showAlert}>{!props.show ? 'delete blog' : 'disabled' }</button>
		</form>
		{props.show ? <Alert onClick={props.onClick}/> : null }
		</>
	)
}