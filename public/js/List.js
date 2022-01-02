/**
 * Represents a photographer.
 * @constructor
 * @param {array} all - list all photographers
 * @param {array} filtered - list filtered tags
 * @param {string} tags - list tags
 * @param {string} selection - list of selected tags
 */

class List {
	constructor() {
		this.all = [];
		this.filtered = [];
		this.tags = new Set();
		this.selection = new Set();
	}

	// Adds all the photographers in array
	add(photographerCard) {
		this.all.push(photographerCard);
	}

	build() {
		this.displayPhotographers();
		this.displayTags();
		this.listenForFilter();
	}

	// Display of photographers cards
	displayPhotographers() {
		let html = '';

		this.filtered.forEach((photographerCard) => {
			html += photographerCard.render();
		});

		document.getElementById('photographers').innerHTML = html;
	}

	// Collect all tags in array
	collectTags() {
		this.all.forEach((photographerCard) => {
			photographerCard.tags.forEach((tag) => {
				this.tags.add(tag);
			});
		});
	}

	// Display tags in the menu
	displayTags() {
		let html = '';

		this.tags.forEach((tag) => {
			html += `<a href="#" tabindex="0" data-filter="${tag}"  aria-label="Trier les photographes par le tag ${tag}" class="tag ${
				this.selection.has(tag) ? 'active' : ''
			}">#${tag}</a>`;
		});

		document.getElementById('tags').innerHTML = html;
	}

	// Listen to the event when click on a filter and display the photographers of the requested filter

	listenForFilter() {
		document.querySelectorAll('.tag').forEach((button) => {
			button.addEventListener('click', () => {
				const tag = button.getAttribute('data-filter');

				if (this.selection.has(tag)) {
					this.selection.delete(tag);
					button.classList.remove('active');
				} else {
					this.selection.add(tag);
					button.classList.add('active');
				}

				// Condition to display all photographers if there is no selected tag
				if (this.selection.size === 0) {
					this.filtered = this.all;
				} else {
					this.filter();
				}
				this.build();
			});
		});
	}

	// Filters the photographers according to the selected tag
	filter() {
		this.filtered = this.all.filter((photographerCard) => {
			let isSelected = false;

			this.selection.forEach((tag) => {
				if (photographerCard.tags.includes(tag)) {
					isSelected = true;
				}
			});
			return isSelected;
		});
	}
}
