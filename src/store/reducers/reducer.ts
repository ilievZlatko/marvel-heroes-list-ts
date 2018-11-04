import * as actionTypes from '../actions/actionTypes';
import { map, filter } from 'lodash';
import IState from '../../models/StoreState.model';

const initialState: IState = {
    character: {},
    favourites: [],
    heroes: [],
    loading: false,
    offset: 0
}

const reducer = (state = initialState, action: any) => {
    switch (action.type) {
        case actionTypes.MAP_HEROES:
            return {
                ...state,
                heroes: [...state.heroes, ...action.heroes]
            };
        case actionTypes.LOADING_HEROES:
			return {
				...state,
				loading: action.loading
			};

		case actionTypes.EDIT_OFFSET:
			return {
				...state,
				offset: action.offset
			};

		case actionTypes.ADD_TO_FAVOURITES: {
			const newHeroes = map(
                state.heroes,
				hero => hero.id === action.id ? { ...hero, favourite: true } : hero
			);

			return {
				...state,
				heroes: newHeroes,
				favourites: filter(newHeroes, ['favourite', true])
			};
		}

		case actionTypes.REMOVE_FROM_FAVOURITES: {
			const newHeroes = map(
                state.heroes,
				hero => hero.id === action.id ? { ...hero, favourite: false } : hero
			);
			return {
				...state,
				heroes: newHeroes,
				favourites: filter(newHeroes, ['favourite', true])
			};
		}

		case actionTypes.FILTER_FAVOURITES: {
            const newFilteredFavourites = 
                filter(state.heroes, ['favourite', true])
				.filter(
					favourite =>
						favourite.name
							.toLowerCase()
							.includes(action.searchText.toLowerCase()) ||
						favourite.description
							.toLowerCase()
							.includes(action.searchText.toLowerCase())
				);
			return {
				...state,
				favourites: newFilteredFavourites
			};
		}

		case actionTypes.GET_CURRENT_HERO:
			return {
				...state,
				character: action.character
            };
            
        default:
            return state;
    }
}

export default reducer;