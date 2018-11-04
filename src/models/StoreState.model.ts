import { IHero } from './Hero.model';

export default interface IStoreState {
    heroes: IHero[];
    favourites: IHero[];
    character: object;
    offset: number;
    loading: boolean;
    heroesCount?: number;
}