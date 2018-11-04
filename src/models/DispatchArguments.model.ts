import { IHero } from './Hero.model';

export default interface IExtraDispatchArguments {
	id?: number;
	searchText?: string;
	offset?: number;
	character?: IHero;
}