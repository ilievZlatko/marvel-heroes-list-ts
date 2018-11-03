import * as actionTypes from './actionTypes';
import { IHero } from '../../models/Hero.model';

export const mapHeroes = (heroes: IHero[]) => {
	return {
        heroes,
		type: actionTypes.MAP_HEROES
	};
};
