import Photo from './Photo.js';
import Video from './Video.js';

/**
 * Filter based on media type
 * @param {Array | Object} data
 * @param {Array | Object} photographer
 * @returns call constructor based on data.type
 */

class MediaFactory {
	constructor(data, photographer) {
		if (data.hasOwnProperty('image')) {
			return new Photo(data, photographer);
		} else if (data.hasOwnProperty('video')) {
			return new Video(data, photographer);
		} else {
			throw 'Unknown Media Type';
		}
	}
}

export default MediaFactory;
