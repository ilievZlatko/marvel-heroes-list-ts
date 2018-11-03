import * as React from 'react';
import { connect } from 'react-redux';
import { History } from 'history';
import { Search, Button, Grid, Card, Image } from 'semantic-ui-react';
import './Favourites.scss';
import * as actions from '../store/actions/actions';
import { IHero } from '../models/Hero.model';

interface IProps {
    history: History;
    favourites: IHero[];
    onRemoveFromFavourites(id: number): void;
    previewHero(character: IHero): void;
    onFilterFavourites(value: string): void;
}

class Favourites extends React.Component<IProps> {
	public previewDetails = (character: IHero) => {
		this.props.previewHero(character);
		this.props.history.push({
			pathname: '/details'
		});
    };

	public render() {
		return (
			<React.Fragment>
				<div
					style={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center'
					}}>
					<h2 style={{ margin: '50px 0' }}>
						Your Favourite Marvel Characters
					</h2>
					<Search
						className="SearchField"
						placeholder="Filter by name or description"
						onSearchChange={e => this.props.onFilterFavourites(e.target.value)}
						showNoResults={false}
					/>
				</div>
				<div style={{ display: 'flex', flexDirection: 'column' }}>
					<Grid columns={4}>
						{this.props.favourites.map((character: IHero) => (
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
											onClick={() =>
												this.previewDetails(character)
											}>
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

const mapStateToProps = (state: any) => {
	return {
		favourites: state.favourites
	};
};

const mapDispatchToProps = (dispatch: any) => {
	return {
		onRemoveFromFavourites: (id: number) =>
			dispatch(actions.removeFromFavourites(id)),
		onFilterFavourites: (searchText: string) =>
			dispatch({ type: 'FILTER_FAVOURITES', searchText }),
		previewHero: (character: IHero) => dispatch(actions.getCurrentHero(character))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Favourites);