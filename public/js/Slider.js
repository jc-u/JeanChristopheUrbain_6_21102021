class Slider {
	constructor(url, gallery) {
		this.element = this.renderSlider();
		this.url = url;
		this.gallery = gallery;
		this.loadMedia(url);
		document.body.appendChild(this.element);
	}

	loadMedia(url) {
		if (url.endsWith('.mp4')) {
			const video = document.createElement('video');
			const container = this.element.querySelector('.slider__container');
			const legend = document.createElement('p');
			container.innerHTML = '';
			container.appendChild(video);
			video.setAttribute('controls', '');
			video.src = url;
			video.classList.add('slider__container__video');
		} else if (url.endsWith('.jpg')) {
			const image = document.createElement('img');
			const container = this.element.querySelector('.slider__container');
			const legend = document.createElement('p');
			container.innerHTML = '';
			container.appendChild(image);
			image.src = url;
			image.classList.add('slider__container__img');
		}
	}

	renderSlider() {
		const dom = document.createElement('div');
		dom.classList.add('slider');
		dom.innerHTML = `
			<button class="slider__close" aria-label="Fermer la visualisation du média">Fermer</button>
			<button class="slider__next" aria-label="Image suivante">Suivant</button>
			<button class="slider__previous" aria-label="Image précédente">Précédent</button>
			<div class="slider__container" role="dialog" aria-label="">
				<p class="slider__container__img-title"></p>
			</div>`;
		return dom;
	}
}
export default Slider;
