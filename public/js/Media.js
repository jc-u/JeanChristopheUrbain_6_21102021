/**
 * Media constructor
 * @param {Array | Object} data
 * @param {Array | Object} photographer
 * @param {number} id - the media id
 * @param {string} title - the title of the media
 * @param {number} likes - the number of media likes
 * @param {boolean} hasBeenLiked - the media has been liked

 */

class Media {
	constructor(data, photographer) {
		this.id = data.id;
		this.title = data.title;
		this.alt = data.alt;
		this.photographer = photographer;
		this.likes = data.likes;
		this.hasBeenLiked = false;
	}

	// Create like button with id media

	renderLikeButton() {
		return `
			<button class="photographer-page__gallery__media__footer__like-section-button likeButton" data-media-id="${this.id}" title="Like"  tabindex="0" aria-label="Ajouter un Like">
				<i aria-hidden class="fas fa-heart" data-media-id="${this.id}"></i>
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
	}
}

export default Media;
