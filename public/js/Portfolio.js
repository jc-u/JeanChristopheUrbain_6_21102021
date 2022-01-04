import MediaFactory from './MediaFactory.js';

const focusableSelector = 'button';
let focusables = [];

/**
 * Represents a photographer's portfolio .
 * @constructor
 * @param {array} all - list all medias
 * @param {array} filtered - list filtered medias
 * @param {string} photographer - photographer
 */

class Portfolio {
	constructor(photographer) {
		this.all = [];
		this.filtered = [];
		this.photographer = photographer;
		this.currentIndex = 0;
	}

	// Display all medias of a photographer
	displayMedias() {
		let html = '';
		this.filtered.forEach((media) => {
			html += media.render();
		});

		document.getElementById('gallery').innerHTML = html;
	}

	// Display the header of the photographer's page
	displayHeader() {
		document.querySelector('.photographer-page__header').innerHTML +=
			this.photographer.renderHeader();
	}

	/**
	 * Create total Likes section with function totalLikes
	 * @returns {string} Return user total likes
	 */
	displayTotalLikes() {
		document.querySelector('.photographer-page__footer-section').innerHTML = `
		<section class="photographer-page__footer">
				<aside class="photographer-page__footer__aside" tabindex="0">
					<p class="photographer-page__footer__aside__total-likes" tabindex="0">0</p>
					<i class="fas fa-heart"></i>
				</aside>
				<p class="photographer-page__footer__price" tabindex="0">${this.photographer.price}€/jour</p>
		</section>
		`;
	}

	/**
	 * Update media gallery
	 * @param {Array} gallery
	 */
	hydrate(gallery) {
		gallery.forEach((item) => {
			const media = new MediaFactory(item, this.photographer);
			this.all.push(media);
		});
		this.filtered = this.all;
	}

	// Click on the dropdown menu to make it appear or disappear and replace the select text when choosing

	listenForDropdownOpening() {
		const dropDown = document.getElementById('select__link');
		const menu = document.querySelector('.filterMenu');
		let text = '';

		dropDown.addEventListener('click', () => {
			if (menu.style.display === 'none') {
				menu.style.display = 'block';
				document.querySelectorAll('.tri').forEach((button) => {
					button.addEventListener('click', () => {
						text = button.textContent;
						menu.style.display = 'none';
						dropDown.innerHTML = `<span class="select__link__content">${text}<i class="fas fa-chevron-down"</span>`;
					});
				});
			} else {
				menu.style.display = 'none';
			}
		});

		document.querySelector('body').addEventListener('keyup', (e) => {
			e.preventDefault();
			const keyCode = e.key;
			if (keyCode === 'Escape') {
				menu.style.display = 'none';
			}
		});
	}

	// Listen on each like button and see if it was liked or not with the toggleLikes function in the Media.js file

	listenForLikes() {
		document.querySelectorAll('.likeButton').forEach((button) => {
			button.addEventListener('click', (e) => {
				const photoId = e.target.getAttribute('data-media-id');
				const media = this.all.find((media) => media.id == photoId);
				media.toggleLikes();
				console.log(media);
				this.updateTotalLikes();
			});
		});
	}

	listenForLikesKeyboard() {
		document.querySelectorAll('.likeButton').forEach((button) => {
			button.addEventListener('keydown', (e) => {
				const keyCode = e.key;
				if (keyCode === 'Enter') {
					const photoId = e.target.getAttribute('data-media-id');
					const media = this.all.find((media) => media.id == photoId);
					this.updateTotalLikes();
				}
			});
		});
	}

	// Listening according to the choice of sorting

	listenForSort() {
		document.querySelectorAll('.tri').forEach((button) => {
			button.addEventListener('click', (e) => {
				const ordre = e.target.getAttribute('id');
				if (ordre === null) {
					document.querySelector('.filterMenu').style.display = 'none';
				} else {
					this.filtered = this.sorting(ordre);
					this.displayMedias();
					this.listenForLikes();
					this.listenForSlider();
				}
			});

			button.addEventListener('keydown', (e) => {
				const keyCode = e.key;
				if (keyCode === 'Enter') {
					const ordre = e.target.getAttribute('id');
					this.filtered = this.sorting(ordre);
					this.displayMedias();
					this.listenForLikes();
					this.listenForSlider();
				}
			});
		});
	}

	// Sorting function

	sorting(ordre) {
		if (ordre === 'popularity') {
			return this.sortByPopularity();
		}
		if (ordre === 'title') {
			return this.sortByTitle();
		}
		if (ordre === 'date') {
			return this.sortByDate();
		}
	}

	sortByPopularity() {
		return this.all.sort((a, b) => {
			if (a.likes < b.likes) {
				return 1;
			} else if (a.likes > b.likes) {
				return -1;
			} else {
				return 0;
			}
		});
	}
	sortByTitle() {
		return this.all.sort((a, b) => {
			if (a.title > b.title) {
				return 1;
			} else if (a.title < b.title) {
				return -1;
			} else {
				return 0;
			}
		});
	}

	sortByDate() {
		return this.all.sort((a, b) => {
			if (a.date > b.date) {
				return 1;
			} else if (a.date < b.date) {
				return -1;
			} else {
				return 0;
			}
		});
	}

	updateTotalLikes() {
		let count = 0;
		this.all.forEach((media) => {
			count += media.likes;
		});
		document.querySelector(
			'.photographer-page__footer__aside__total-likes'
		).innerText = count;
	}

	// SLIDER

	listenForSlider() {
		document
			.querySelectorAll('.photographer-page__gallery__media')
			.forEach((media) => {
				media.addEventListener('click', (e) => {
					e.preventDefault();
					const id = e.target.getAttribute('data-id');
					this.currentIndex = this.filtered.findIndex(
						(media) => media.id == id
					);
					this.startSlider();
				});
			});
	}

	listenForSliderKeyboard() {
		document
			.querySelectorAll('.photographer-page__gallery__media')
			.forEach((media) => {
				media.addEventListener('keydown', (e) => {
					const keyCode = e.key;
					if (keyCode === 'Enter') {
						e.preventDefault();
						const id = e.target.getAttribute('data-id');
						this.currentIndex = this.filtered.findIndex(
							(media) => media.id == id
						);
						this.startSlider();
					}
				});
			});
	}

	// CLOSE SLIDER

	closeSlide() {
		document.getElementById('slider__modal').style.display = 'none';
		document.querySelector('.photographer-page__gallery__media').focus();
	}

	// NEXT SLIDE

	nextSlide() {
		if (this.currentIndex === this.filtered.length - 1) {
			this.currentIndex = 0;
		} else {
			this.currentIndex++;
		}
		this.showSlide();
	}

	// Listen to click slider

	onClickSlider() {
		document.querySelector('.slider__next').addEventListener('click', () => {
			this.nextSlide();
		});

		document
			.querySelector('.slider__previous')
			.addEventListener('click', () => {
				this.previousSlide();
			});

		document.querySelector('.slider__close').addEventListener('click', () => {
			this.closeSlide();
		});
	}

	// Listen to keyboard slider

	onKeySlider() {
		document.addEventListener('keydown', (e) => {
			const keyCode = e.key;
			if (keyCode === 'ArrowRight') {
				this.nextSlide();
			}
		});
		document.addEventListener('keydown', (e) => {
			const keyCode = e.key;
			if (keyCode === 'ArrowLeft') {
				this.previousSlide();
			}
		});
		document.addEventListener('keydown', (e) => {
			const keyCode = e.key;
			if (keyCode === 'Escape') {
				this.closeSlide();
			}
		});

		document
			.querySelector('.slider__close')
			.addEventListener('keydown', (e) => {
				const keyCode = e.key;
				if (keyCode === 'Enter') {
					this.closeSlide();
				}
			});
	}

	// PREVIOUS SLIDE

	previousSlide() {
		if (this.currentIndex === 0) {
			this.currentIndex = this.filtered.length - 1;
		} else {
			this.currentIndex--;
		}
		this.showSlide();
	}

	// SHOW THE SLIDE TO THE MEDIA

	showSlide() {
		document.querySelector('.slider__container').innerHTML =
			this.filtered[this.currentIndex].showInSlider();
	}

	// START SLIDER
	startSlider() {
		document.getElementById('slider__modal').style.display = 'block';
		document
			.getElementById('slider__modal')
			.setAttribute('aria-hidden', 'false');
		document
			.querySelector('.photographer-page')
			.setAttribute('aria-hidden', 'true');

		this.showSlide();
		document.querySelector('.slider__close').focus();
		this.onClickSlider();
		this.onKeySlider();

		focusables = Array.from(
			document
				.getElementById('slider__modal')
				.querySelectorAll(focusableSelector)
		);
		window.addEventListener('keydown', (e) => {
			if (
				e.key === 'Tab' &&
				document.getElementById('slider__modal').style.display === 'block'
			) {
				this.focusInModal(e);
			}
		});
	}

	focusInModal(e) {
		e.preventDefault();
		let index = focusables.findIndex(
			(f) =>
				f === document.getElementById('slider__modal').querySelector(':focus')
		);
		index++;
		if (index >= focusables.length) {
			index = 0;
		}
		focusables[index].focus();
	}
}

export default Portfolio;
