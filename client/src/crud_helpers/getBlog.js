import {fetcher} from '../utils/fetcher';

/**
 * 
 * @param {event} e event
 * @param {int} id blog id
 * @param {function} clearFields clears fields
 */
export async function getBlog(e, id) {
	e.preventDefault();
	try {
		// let res = await fetch('http://localhost:3001/api/get/one', {
		// 	method: "POST",
		// 	headers: {
		// 		'Content-Type': 'application/json',
		// 	},
		// 	body: JSON.stringify({
		// 		id: id
		// 	})
		// });
		let url = new URL('http://localhost:3001/api/get/one');
		let	params = {
					id: id
				}
		Object.keys(params).forEach(key => 
			url.searchParams.append(key, params[key]))
		let res = await fetcher(url);
		return res;
	} catch (e) {
		console.error(e);
	} finally {
		// clearFields();
		console.log('up to you what to do here, if anything')
	}
}