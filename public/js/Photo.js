import Media from './Media.js';

/**
 * Photography media constructor
 * @param {Array | Object} data
 * @param {Array | Object} photographer
 * @param {string} src the source of media
 */
class Photo extends Media {
	constructor(data, photographer) {
		super(data, photographer);
		this.src = data.image;
	}

	/**
	 * Create HTML photography element
	 * @returns {HTMLelement}
	 */
	render() {
		return `
		<figure class="photographer-page__gallery__card" aria-label="${this.title}">
			<img class="photographer-page__gallery__media" tabindex="0" src="./assets/medias/${
				this.photographer.id
			}/${this.src}" alt="${this.alt}" data-id="${this.id}"/>
			<footer class="photographer-page__gallery__media__footer">
				<figcaption class="photographer-page__gallery__media__footer__figcaption">${
					this.title
				}</figcaption>
				<div class="photographer-page__gallery__media__footer__like-section">
					<p class="photographer-page__gallery__media__footer__like-section-counter" data-media-id="${
						this.id
					}">${this.likes}</p>
						${this.renderLikeButton()}
				</div>
			</footer>
		</figure>
		`;
	}

	/**
	 * Create HTML slider element
	 * @returns {HTMLelement}
	 */

	showInSlider() {
		return `
		<figure class="photographer-page__gallery__card" aria-label="${this.title}">
			<img class="photographer-page__gallery__media" tabindex="0" src="./assets/medias/${this.photographer.id}/${this.src}" alt="${this.alt}" data-id="${this.id}"/>
			<footer class="photographer-page__gallery__media__footer">
				<figcaption class="photographer-page__gallery__media__footer__figcaption">${this.title}</figcaption>
			</footer>
		</figure>
		`;
	}
}

export default Photo;
