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

		const photographer = new Photographer(item);

		// gallery - Return array of medias, based on photographer id
		const gallery = data.media.filter((media) => media.photographerId == id);
		const portfolio = new Portfolio(photographer);

		// Scénario
		portfolio.hydrate(gallery);
		portfolio.displayMedias();
		portfolio.displayHeader();
		portfolio.displayTotalLikes();
		portfolio.updateTotalLikes();
		portfolio.listenForLikes();
		portfolio.listenForLikesKeyboard();
		portfolio.listenForDropdownOpening();
		portfolio.listenForSort();
		portfolio.listenForSlider();
		portfolio.listenForSliderKeyboard();

		// MODAL CONTACT

		const modalBtn = document.querySelector('.photographer-page__contact');
		const main = document.querySelector('.photographer-page');
		const modal = document.getElementById('contact__modal');
		const firstName = document.getElementById('firstname');
		const lastName = document.getElementById('lastname');
		const email = document.getElementById('email');
		const message = document.getElementById('message');
		const close = document.querySelector('.close');
		const focusableSelector = 'button, a, input, textarea';
		let focusables = [];

		// launch modal event
		modalBtn.addEventListener('click', launchModal);

		// launch modal form
		function launchModal() {
			modal.style.display = 'block';
			main.setAttribute('aria-hidden', 'true');
			modal.setAttribute('aria-hidden', 'false');
			modal.setAttribute('aria-modal', 'true');
			close.focus();
			focusables = Array.from(modal.querySelectorAll(focusableSelector));
			window.addEventListener('keydown', (e) => {
				if (e.key === 'Tab' && modal.style.display === 'block') {
					focusInModal(e);
				}
			});
		}

		function focusInModal(e) {
			e.preventDefault();
			let index = focusables.findIndex(
				(f) => f === modal.querySelector(':focus')
			);
			index++;
			if (index >= focusables.length) {
				index = 0;
			}
			focusables[index].focus();
		}

		// Listen to close modal
		close.addEventListener('click', closeModal);
		// Close modal when escape key is pressed
		document.addEventListener('keydown', (e) => {
			const keyCode = e.key;
			if (keyCode === 'Escape') {
				closeModal();
			}
		});

		// CLOSE MODAL
		function closeModal() {
			modal.style.display = 'none';
			main.setAttribute('aria-hidden', 'false');
			modal.setAttribute('aria-hidden', 'true');
		}

		const form = document.getElementById('contact__form');
		form.addEventListener('submit', (e) => {
			e.preventDefault();
			submitContactForm(e);
			document.forms['contact__form'].reset();
			closeModal();
		});

		// SUBMIT CONTACT
		function submitContactForm() {
			if (
				firstName.value != '' &&
				lastName.value != '' &&
				email.value != '' &&
				message.value != ''
			) {
				console.log(
					`${firstName.value} ${lastName.value} ${email.value} ${message.value}`
				);
			}
		}
	});
