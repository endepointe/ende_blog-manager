/**
 * @param {event} e event
 * @param {int} id blog id to update
 * @param {string} title new blog title 
 * @param {function} clearFields clears the updated fields
 */
export async function updateBlogTitle(e,id, title, clearFields) {
	e.preventDefault();
	console.log(e)
	try {
		let res = await fetch('http://localhost:3001/api/put/title', 
			{
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(
				  {
						id: id,
				    title: title,
				    modified: new Date().toISOString(),
				  }),
			});
			let data = res.json();
			console.log("updated data", data)
	} catch (err) {
		console.error(err);
	} finally {
		clearFields();
	}
}

/**
 * @param {event} e event 
 * @param {*} id blog id to update
 * @param {*} content new content to insert 
 * @param {*} clearFields clears the updated fields
 */
export async function updateBlogContent(e, id, content, clearFields) {
	console.log(content)
	e.preventDefault();
  try {
    let res = await fetch('http://localhost:3001/api/put/content', 
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          {
            id: id,
            content: content,
 						modified: new Date().toISOString()
          }),
      });
      let data = res.json();
      console.log("updated data: ",data)
  } catch (err) {
    console.error(err);
  } finally {
		clearFields();
  }
}
