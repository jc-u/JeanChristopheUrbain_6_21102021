import Media from './Media.js';

/**
 * Video media constructor
 * @param {Array | Object} data
 * @param {Array | Object} photographer
 * @param {string} src the source of media
 */

class Video extends Media {
	constructor(data, photographer) {
		super(data, photographer);
		this.src = data.video;
	}

	/**
	 * Create HTML video element
	 * @returns {HTMLelement}
	 */

	render() {
		return `
			<figure class="photographer-page__gallery__card">
      <video controls tabindex="0" class="photographer-page__gallery__media" data-id="${
				this.id
			}">
      	 <source src="./assets/medias/${this.photographer.id}/${this.src}"/>
				 <track default
           kind="captions"
           srclang="fr"
           />
      </video>
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
		<figure class="photographer-page__gallery__card">
		<video controls tabindex="0" class="photographer-page__gallery__media" data-id="${this.id}">
			 <source src="./assets/medias/${this.photographer.id}/${this.src}"/>
		</video>
		<footer class="photographer-page__gallery__media__footer">
			<figcaption class="photographer-page__gallery__media__footer__figcaption">${this.title}</figcaption>
			</footer>
		</figure>
	`;
	}
}

export default Video;
