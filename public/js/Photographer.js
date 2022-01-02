/**
 * Represents a photographer.
 * @constructor
 * @param {string} name - The name of a photographer.
 * @param {number} id - the id of a photographer
 * @param {string} city - the city of a photographer
 * @param {string} country - the country of a photographer
 * @param {string[]} tags - the tags of a photographer
 * @param {string} tagline - the tagline of a photographer
 * @param {number} price - the price of a photographer
 * @param {string} portrait - the portrait of a photographer
 */
class Photographer {
	constructor(data) {
		this.name = data.name;
		this.id = data.id;
		this.city = data.city;
		this.country = data.country;
		this.tags = data.tags;
		this.tagline = data.tagline;
		this.price = data.price;
		this.portrait = data.portrait;
	}

	/**
	 * Create photographer card
	 * @returns {string} - Return user card
	 */

	render() {
		return `

			<article class="sectionPhotographers__photographer">

					<div class="photographer">
					<a href="./photographer-page.html?id=${
						this.id
					}" aria-label="Aller sur la page de ${this.name}"  tabindex="0">
						<div class="photographer__photo">
							<img src="./assets/images/${this.portrait}" alt="Photographie de profil de ${
			this.name
		}">

						</div><h2>${this.name}</h2></a>
						<div class="photographer_location">
							<h3>${this.city}, ${this.country}</h3>
						</div>
						<div class="photorapher__tagline">
							<h4>${this.tagline}</h4>
						</div>
						<div class="photographer__price">
							<h5>${this.price}€/jour</h5>
						</div>

						<div class="photographer__hashtag">
							<ul class="filter">${this.tags
								.map(
									(tag) =>
										`<a href="#" tabindex="0" data-filter="${tag}" class="tag" >#${tag}</a>`
								)
								.join('')}</ul>
						</div>
					</div>

			</article>
		`;
	}

	/**
	 * Create photographer header on his page
	 * @returns {string} Return user header
	 */

	renderHeader() {
		return `
		<div class="photographer-page__header__container">
			<h2 class="photographer-page__header__container__title">${this.name}</h2>
			<h3 class="photographer-page__header__container__location">${this.city}, ${
			this.country
		}</h3>
			<h4 class="photographer-page__header__container__tagline">${this.tagline}</h4>
			<ul class="photographer-page__header__container__hashtag">${this.tags
				.map(
					(tag) =>
						`<li class="photographer-page__header__container__tags"><a href="./index.html?tag=${tag}">#${tag}</a></li>`
				)
				.join(' ')}</ul>
		</div>
		<button class="photographer-page__contact" tabindex="0" aria-label="Contacter le photographe ${
			this.name
		}">Contactez-moi</button>
		<div class="photographer-page__photo">
			<img src="./assets/images/${this.portrait}" alt="Photo de profil de ${
			this.name
		}"
		</div>`;
	}
}

export default Photographer;
