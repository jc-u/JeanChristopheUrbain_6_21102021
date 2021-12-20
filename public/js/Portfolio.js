import MediaFactory from './MediaFactory.js';

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
				<aside class="photographer-page__footer__aside">
					<p class="photographer-page__footer__aside__total-likes" aria-label="Nombre total de likes tabindes="6"></p>
					<i class="fas fa-heart" aria-hidden="true"></i>
				</aside>
				<p class="photographer-page__footer__price" tabindex="7" aria-label="Tarif du photographe ${this.photographer.price} euro par jour">${this.photographer.price}€/jour</p>
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

	// Listen on each like button and see if it was liked or not with the toggleLikes function in the Media.js file

	listenForLikes() {
		document.querySelectorAll('.likeButton').forEach((button) => {
			button.addEventListener('click', (e) => {
				let photoId = e.target.getAttribute('data-media-id');
				let media = this.all.find((media) => media.id == photoId);
				media.toggleLikes();
				this.updateTotalLikes();
			});
		});
	}

	// Click on the dropdown menu to make it appear or disappear and replace the select text when choosing

	listenForDropdownOpening() {
		const dropDown = document.getElementById('select__link');
		const menu = document.querySelector('.filterMenu');
		const item = document.querySelector('.select__link__content');
		let text = '';

		dropDown.addEventListener('click', function () {
			if (menu.style.display == 'none') {
				menu.style.display = 'block';
				document.querySelectorAll('.tri').forEach((button) => {
					button.addEventListener('click', (e) => {
						text = button.textContent;
						menu.style.display = 'none';
						dropDown.innerHTML = `<span class="select__link__content">${text}<i class="fas fa-chevron-down"</span>`;
					});
				});
			} else {
				menu.style.display = 'none';
			}
		});
	}

	// Listening according to the choice of sorting

	listenForSort() {
		document.querySelectorAll('.tri').forEach((button) => {
			button.addEventListener('click', (e) => {
				let ordre = e.target.getAttribute('id');
				this.filtered = this.sorting(ordre);
				this.displayMedias();
				this.listenForLikes();
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
}

export default Portfolio;
