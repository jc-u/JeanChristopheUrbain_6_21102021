/**
 * @const params - Get params in URL
 */

function getFromUrl(key) {
	const params = new URLSearchParams(document.location.search.substring(1));
	return params.get(key);
}
