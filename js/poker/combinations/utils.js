import { VALUES } from '../constants';


export function sortCards (cards) {
	return cards.slice(0)
		.sort((a, b) => VALUES[a.name] - VALUES[b]);
}
