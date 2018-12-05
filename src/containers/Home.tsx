import * as React from 'react';
import { connect } from 'react-redux';
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { History } from 'history';

import * as actions from '../store/actions/actions';

import { Button, Grid, Card, Image } from 'semantic-ui-react';
import Loading from '../components/Loading/Loading';
import { map } from 'lodash';

import { IHero } from '../models/Hero.model';
import IStoreState from '../models/StoreState.model';
import IExtraDispatchArguments from '../models/DispatchArguments.model';


interface IProps {
    heroes: IHero[];
	loading: boolean;
	history: History;
	offset: number;
    previewHero(character: IHero): void;
    getHeroes(offset: number): Promise<IHero[]>;
    onAddToFavourites(id: number): void;
    onRemoveFromFavourites(id: number): void;
}

/**
 * Home component is the main component,
 * it holds the initially loaded cards with heroes
 * and displays them nicely.
 * 
 * Props:
 * @prop {array} heroes - list of heroes fetched from the API
 * @prop {boolean} loading - true or false depending on the loading state
 * @prop {History} history - the router history.
 * @prop {number} offset - defines the next chunk of data the component has to load (used for the infinite scroll)
 * @prop {function} previewHero - gets one @param {character} and redirects to hero details page
 * @prop {function} getHeroes - gets one @param {offset} redux action that fetches 10 heroes depending on offset
 * @prop {function} onAddToFavourites - gets one @param {id}, redux action that adds selected hero to favourites collection
 * @prop {function} onRemoveFromFavourites - gets one @param {id}, redux action that removes selected hero from favourites collection
 */

class Home extends React.Component<IProps, {}> {
    public previewDetails = (character: IHero) => {
		this.props.previewHero(character);
		this.props.history.push({
			pathname: '/details'
		});
    };
    
    public componentDidMount() {
		window.addEventListener('scroll', this.handleScroll);
		if (this.props.heroes.length > 0) {
            return;
        }
		this.props.getHeroes(this.props.offset);
	}

	public handleScroll = () => {
		if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
			if (this.props.loading) {
                return;
            }
			this.props.getHeroes(this.props.offset);
		}
	};

	public componentWillUnmount() {
		window.removeEventListener('scroll', this.handleScroll);
	}

	public createAddToFavouritesHandler = (id: number) => () => this.props.onAddToFavourites(id);

    public render() {
        return (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
				<h2 style={{ margin: '50px 0' }}>Marvel Characters</h2>
				<Grid
					columns={4}
					doubling={true}
					stackable={true}
				>
					{map(this.props.heroes, character => (
						<Grid.Column
							stretched={true}
							key={character.id}
						>
							<Card raised={true} fluid={true}>
								<Image
									src={
										character.thumbnail.path +
										'.' +
										character.thumbnail.extension
									}
								/>
								<Card.Content>
									<Card.Header>{character.name}</Card.Header>
									<Card.Description>
										{character.description}
									</Card.Description>
								</Card.Content>
								<Card.Content extra={true}>
									<Button
										style={{ fontSize: '10px' }}
										onClick={this.previewDetails.bind(this, character)}>
										DETAILS
									</Button>
									{character.favourite ? (
										<Button
											color="red"
											floated="right"
											style={{ fontSize: '10px' }}
											onClick={this.props.onRemoveFromFavourites.bind(this, character.id)}>
											REMOVE FAVOURITE
										</Button>
									) : (
										<Button
											color="blue"
											floated="right"
											style={{ fontSize: '10px' }}
											onClick={this.createAddToFavouritesHandler(character.id)}>
											ADD TO FAVOURITES
										</Button>
									)}
								</Card.Content>
							</Card>
						</Grid.Column>
					))}
				</Grid>
				{this.props.loading ? <Loading /> : null}
			</div>
        );
    }
}

const mapStateToProps = (state: IStoreState) => {
    return {
        heroes: state.heroes,
        offset: state.offset,
        heroesCount: state.heroesCount,
        loading: state.loading
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<IStoreState, IExtraDispatchArguments, AnyAction>) => {
    return {
		onAddToFavourites: (id: number) => dispatch(actions.addToFavourites(id)),
		onRemoveFromFavourites: (id: number) =>
			dispatch(actions.removeFromFavourites(id)),
		getHeroes: (offset: number) => dispatch(actions.getHeroes(offset)),
		previewHero: (character: IHero) => dispatch(actions.getCurrentHero(character))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);