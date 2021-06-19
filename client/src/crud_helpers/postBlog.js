// https://jsdoc.app/
/**
 * @param {event} e event
 * @param {string} title blog title
 * @param {string} content blog content
 * @param {function} fn passed function
 */
export async function postBlog(e,title,content,clearFields) {
	console.log('posting blog');
	console.log(e)
	e.preventDefault();
	try {
		let res = await fetch('http://localhost:3001/api/post/create', 
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(
					{
						title: title,
						posted: new Date().toISOString(),
						content: content
					}),
			});
		let data = await res.json(); 
		console.log(data);
	} catch (err) {
		console.error(err); 
	} finally {
		clearFields();
	}
}