import * as React from 'react';
import { connect } from 'react-redux';
import { History } from 'history';
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";

import { Search, Button, Grid, Card, Image } from 'semantic-ui-react';
import './Favourites.scss';
import * as actions from '../store/actions/actions';
import { map } from 'lodash';

import { IHero } from '../models/Hero.model';
import IStoreState from '../models/StoreState.model';
import IExtraDispatchArguments from '../models/DispatchArguments.model';

interface IProps {
    history: History;
    favourites: IHero[];
    onRemoveFromFavourites(id: number): void;
    previewHero(character: IHero): void;
    onFilterFavourites(value: string): void;
}

/**
 * The favourites component
 * Displays all the favourite heroes
 * 
 * Props:
 * @prop {history} history - react router history
 * @prop {array} favourites - list of favourites heroes from redux store
 * @prop {function} onRemoveFromFavourites - gets one @param {id} redux action that removes selected hero from favourites collection
 * @prop {function} previewHero - gets one @param {character} the character that is passed as a prop to details page
 * @prop {function} onFilterFavourites - gets one @param {value} search in the list of favourites by character name or description
 */

class Favourites extends React.Component<IProps> {
	public previewDetails = (character: IHero) => {
		this.props.previewHero(character);
		this.props.history.push({
			pathname: '/details'
		});
	};
	
	public handleSearchChange = (e: React.FormEvent<EventTarget>): void => {
		const target = e.target as HTMLInputElement;
		this.props.onFilterFavourites(target.value);
	};

	public render() {
		return (
			<React.Fragment>
				<Grid
					columns={2}
					doubling={true}
					stackable={true}
					style={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
						marginBottom: '30px'
					}}
				>
					<h2 style={{ margin: '50px 0' }}>
						Your Favourite Marvel Characters
					</h2>
					<Search
						className="SearchField"
						placeholder="Filter by name or description"
						onSearchChange={(event) => this.handleSearchChange(event)}
						showNoResults={false}
					/>
				</Grid>
				<div style={{ display: 'flex', flexDirection: 'column' }}>
					<Grid
						columns={4}
						doubling={true}
						stackable={true}
					>
						{map(this.props.favourites, (character: IHero) => (
							<Grid.Column stretched={true} key={character.id}>
								<Card raised={true} fluid={true}>
									<Image
										src={
											character.thumbnail.path +
											'.' +
											character.thumbnail.extension
										}
									/>
									<Card.Content>
										<Card.Header>
											{character.name}
										</Card.Header>
										<Card.Description>
											{character.description}
										</Card.Description>
									</Card.Content>
									<Card.Content extra={true}>
										<Button
											style={{ fontSize: '10px' }}
											onClick={() => this.previewDetails(character)}>
											DETAILS
										</Button>
										<Button
											color="red"
											floated="right"
											style={{ fontSize: '10px' }}
											onClick={this.props.onRemoveFromFavourites.bind(this, character.id)
											}>
											REMOVE FAVOURITE
										</Button>
									</Card.Content>
								</Card>
							</Grid.Column>
						))}
					</Grid>
				</div>
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state: IStoreState) => {
	return {
		favourites: state.favourites
	};
};

const mapDispatchToProps = (dispatch: ThunkDispatch<IStoreState, IExtraDispatchArguments, AnyAction>) => {
	return {
		onRemoveFromFavourites: (id: number) =>
			dispatch(actions.removeFromFavourites(id)),
		onFilterFavourites: (searchText: string) =>
			dispatch({ type: 'FILTER_FAVOURITES', searchText }),
		previewHero: (character: IHero) => dispatch(actions.getCurrentHero(character))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Favourites);