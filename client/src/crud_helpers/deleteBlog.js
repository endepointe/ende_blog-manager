/**
 * 
 * @param {event} e event
 * @param {int} id blog to delete
 * @param {function} clearFields clears fields
 */
export async function deleteBlog(e,id,clearFields) {
	e.preventDefault();
	try {
		let res = await fetch('http://localhost:3001/api/delete/blog', 
			{
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(
				  {
						id: id
				  }),
			});
			let data = res.json();
			console.log("deleted data: ",data)
	} catch (err) {
		console.error(err);
	} finally {
		clearFields();
	}
}