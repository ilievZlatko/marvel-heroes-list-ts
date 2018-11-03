import { IHero } from '../../models/Hero.model';
import * as actionTypes from '../actions/actionTypes';

interface IState {
    heroes: IHero[];
    favourites: IHero[];
    character: object;
    offset: number;
    loading: boolean;
}

const initialState: IState = {
    character: {},
    favourites: [],
    heroes: [],
    loading: false,
    offset: 0,
}

const reducer = (state = initialState, action: any) => {
    switch (action.type) {
        case actionTypes.MAP_HEROES:
            return {
                ...state,
                heroes: [...state.heroes, ...action.heroes]
            };
        default:
            return state;
    }
}

export default reducer;