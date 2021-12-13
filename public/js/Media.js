/**
 * Media constructor
 * @param {Array | Object} data
 * @param {Array | Object} photographer
 * @param {number} id - the media id
 * @param {string} description - the description of the media
 * @param {string} title - the title of the media
 * @param {number} likes - the number of media likes
 * @param {boolean} hasBeenLiked - the media has been liked

 */

class Media {
	constructor(data, photographer) {
		this.id = data.id;
		this.description = data.description;
		this.title = data.title;
		this.photographer = photographer;
		this.likes = data.likes;
		this.hasBeenLiked = false;
	}

	// Create like button with id media

	renderLikeButton() {
		return `
			<button class="photographer-page__gallery__media__footer__like-section-button">
				<i class="fas fa-heart likeButton" data-media-id="${this.id}"></i>
			</button>`;
	}

	// Increment or decrement the like button

	toggleLikes() {
		if (this.hasBeenLiked) {
			this.likes--;
			this.hasBeenLiked = false;
		} else {
			this.likes++;
			this.hasBeenLiked = true;
		}

		document.querySelector(
			`.photographer-page__gallery__media__footer__like-section-counter[data-media-id="${this.id}"]`
		).innerText = this.likes;
		this.updateLikes();
	}

	// Update Total Likes

	updateLikes() {
		const totalLikes = document.querySelectorAll(
			'.photographer-page__gallery__media__footer__like-section-counter'
		);
		let likeSum = 0;
		totalLikes.forEach(function (like) {
			let likeUnit = Number(like.textContent);
			likeSum += likeUnit;
		});
		document.querySelector(
			'.photographer-page__footer__aside__total-likes'
		).innerText = likeSum;
	}
}

export default Media;
