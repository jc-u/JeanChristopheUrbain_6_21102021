import Photographer from './Photographer.js';

/**
 * Fetch photographers data
 */
fetch('./data/FishEyeData.json')
	.then((res) => res.json())
	.then((data) => {
		const list = new List();

		/**
		 * Update and create photographer section with photographers cards
		 */

		data.photographers.forEach((photographer) => {
			const photographerCard = new Photographer(photographer);
			list.add(photographerCard);
		});

		list.filtered = list.all;

		// Scenario
		list.collectTags();
		list.build();

		// if a tag is in the URL it is added in the selection and filter
		if (getFromUrl('tag')) {
			const tag = getFromUrl('tag');
			list.selection.add(tag);
			document
				.querySelector(`.tag[data-filter="${tag}"]`)
				.classList.add('active');
			list.filter();
			list.build();
		}
	});

// SCROLL BUTTON

function scroll() {
	window.addEventListener('scroll', () => {
		const button = document.getElementById('photographers__container');
		const y = window.scrollY;

		if (y >= 50) {
			button.style.opacity = '1';
			button.style.transition = '300ms';
		} else {
			button.style.opacity = '0';
			button.style.transition = '300ms';
		}
	});
}

scroll();
