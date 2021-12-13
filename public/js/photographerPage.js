import Portfolio from './Portfolio.js';
import Photographer from './Photographer.js';

/**
 * @const id - Get id in params URL
 */
const id = getFromUrl('id');
/**
 * Fetch photographers data
 */
fetch('./data/FishEyeData.json')
	.then((res) => res.json())
	.then((data) => {
		const item = data.photographers.find((item) => item.id == id);

		let photographer = new Photographer(item);

		// gallery - Return array of medias, based on photographer id
		const gallery = data.media.filter((media) => media.photographerId == id);
		let portfolio = new Portfolio(photographer);

		// Scénario
		portfolio.hydrate(gallery);
		portfolio.displayMedias();
		portfolio.displayHeader();
		portfolio.listenForLikes();
		portfolio.displayTotalLikes();
		portfolio.listenForDropdownOpening();
		portfolio.listenForSort();

		// MODAL

		const modalBtn = document.querySelector('.photographer-page__contact');
		const modal = document.getElementById('contact__modal');

		// launch modal event
		modalBtn.addEventListener('click', launchModal);

		// launch modal form
		function launchModal() {
			modal.style.display = 'block';
		}

		// close modal
		const close = document.querySelector('.fa-times');
		close.addEventListener('click', closeModal);

		function closeModal() {
			modal.style.display = 'none';
		}
	});
