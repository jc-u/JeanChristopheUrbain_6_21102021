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
	constructor(data, likes) {
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
				<a href="./photographer-page.html?id=${this.id}">
					<div class="photographer">
					<div class="photographer__photo">
						<img src="./assets/images/${this.portrait}" alt="Phtographie de profil de ${
			this.name
		}">
					</div>
					<div class="photographer__nom">
						<h2>${this.name}</h2>
					</div>
					 <div class="photographer_lieu">
						<h3>${this.city}, ${this.country}</h3>
					</div>
					<div class="photorapher__bio">
						<h4>${this.tagline}</h4>
					</div>
					<div class="photographer__prix">
						<h5>${this.price}€/jour</h5>
					</div>
					<div class="photographer__hashtag">
						<ul class="filter">${this.tags
							.map(
								(tag) =>
									`<a href="#"><li data-filter="${tag}" class="tag">#${tag}</li></a>`
							)
							.join('')}</ul>
					</div>
				</div>
			</article>
		</a>`;
	}

	/**
	 * Create photographer header on his page
	 * @returns {string} Return user header
	 */

	renderHeader() {
		return `
		<div class="photographer-page__header__contenu">
			<h2 class="photographer-page__header__contenu__titre">${this.name}</h2>
			<h3 class="photographer-page__header__contenu__lieu">${this.city}, ${
			this.country
		}</h3>
			<h4 class="photographer-page__header__contenu__bio">${this.tagline}</h4>
			<ul class="photographer-page__header__contenu__hashtag">${this.tags
				.map(
					(tag) =>
						`<li class="photographer-page__header__contenu__tags"><a href="./index.html?tag=${tag}">#${tag}</a></li>`
				)
				.join(' ')}</ul>
		</div>
	<button class="photographer-page__contact">Contactez-moi</button>
	<div class="photographer-page__photo">
		<img src="./assets/images/${this.portrait}"
	</div>
	</div>`;
	}

	/**
	 * Create total Likes section with function totalLikes
	 * @returns {string} Return user total likes
	 */

	renderTotalLikes() {
		return `
		<section class="photographer-page__footer">
				<aside class="photographer-page__footer__aside">
					<p class="photographer-page__footer__aside__total-likes" aria-label="Nombre total de j'aime ${this.totalLikes()}">${this.totalLikes()}</p>
					<i class="fas fa-heart" aria-hidden="true"></i>
				</aside>
				<p class="photographer-page__footer__price" tabindex="7" aria-label="Tarif du photographe ${
					this.price
				} euro par jour">${this.price}€/jour</p>
		</section>
		`;
	}

	// Calculate the total number of likes for each listen on a photographer's like

	totalLikes() {
		const totalLikes = document.querySelectorAll(
			'.photographer-page__gallery__media__footer__like-section-counter'
		);
		let likeSum = 0;
		totalLikes.forEach(function (like) {
			let likeUnit = Number(like.textContent);
			likeSum += likeUnit;
		});
		return likeSum;
	}
}

export default Photographer;
