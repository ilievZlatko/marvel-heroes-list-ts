import * as actionTypes from './actionTypes';
import axios from 'axios';
import * as CryptoJS from 'crypto-js';
import { IHero } from '../../models/Hero.model';
import urls from '../../urls';
import * as marvelVariables from '../../utils/marvelVariables';
import { assign } from 'lodash';

const ts = new Date().getTime();

const hash = CryptoJS.MD5(
	ts + marvelVariables.PRIVATE_KEY + marvelVariables.PUBLIC_KEY
).toString();

const mapNewHeroes = (heroes: IHero[]) => {
	return heroes.map(h => assign({}, h, { favorite: false }));
};

const editOffset = (offset: number) => {
	return {
		type: actionTypes.EDIT_OFFSET,
		offset: offset + 10
	};
};

const loadingHeroes = (loading: boolean) => {
	return {
		type: actionTypes.LOADING_HEROES,
		loading
	};
};

export const mapHeroes = (heroes: IHero[]) => {
	return {
        heroes,
		type: actionTypes.MAP_HEROES
	};
};

export const addToFavourites = (id: number) => {
	return {
		type: actionTypes.ADD_TO_FAVOURITES,
		id
	};
};

export const removeFromFavourites = (id: number) => {
	return {
		type: actionTypes.REMOVE_FROM_FAVOURITES,
		id
	};
};

export const getHeroes = (offset: number) => {
	return (dispatch: any) => {
		dispatch(loadingHeroes(true));
		axios
			.get(urls.getHeroes, {
				params: {
					ts,
					apikey: marvelVariables.PUBLIC_KEY,
					hash,
					offset,
					limit: 10
				}
			})
			.then((response: any) => {
				const heroes = mapNewHeroes(response.data.data.results);
				dispatch(editOffset(response.data.data.offset));
				dispatch(mapHeroes(heroes));
				dispatch(loadingHeroes(false));
			})
			.catch((error: any) => {
				dispatch(loadingHeroes(false));
				throw new Error(error);
			});
	};
};

export const getCurrentHero = (character: IHero) => {
	return {
		type: actionTypes.GET_CURRENT_HERO,
		character
	};
};