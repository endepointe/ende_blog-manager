export default function GetBlog(props) {
	return (
  	<form className="getBlog">
      <h3>Get a blog</h3>
      <label htmlFor="getId">Select blog to view:</label>
      <select
        id="getId"
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
      <button onClick={props.onClick}>get blog</button>
    </form>
	)
}