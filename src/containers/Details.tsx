import * as React from 'react';
import { connect } from 'react-redux';
import { History } from 'history';
import { Accordion, Card, Image, Icon, List, Grid } from 'semantic-ui-react';
import * as actionTypes from '../store/actions/actionTypes';
import { isEmpty, map } from 'lodash';
import { IHero } from '../models/Hero.model';

interface IState {
    activeIndex: number;
}

interface IProps {
    heroes: IHero[];
    history: History;
	character: IHero;
}

class Details extends React.Component<IProps, IState> {
	public state = {
		activeIndex: -1
	};

	public componentDidMount() {
		if (!this.props.heroes.length) {
			this.props.history.push('/');
			return;
		}
	}

	public handleClick = (e: any, titleProps: any) => {
		const { index } = titleProps;
		const { activeIndex } = this.state;
		const newIndex = activeIndex === index ? -1 : index;

		this.setState({ activeIndex: newIndex });
	};

	public render() {
		const { activeIndex } = this.state;

		return (
			<div style={{ display: 'flex', flexDirection: 'column' }}>
				{isEmpty(this.props.character) ||
				!this.props.heroes.length ? null : (
					<React.Fragment>
						<h2 style={{ margin: '50px 0' }}>
							{this.props.character.name}
						</h2>
						<Card
							raised={true}
							centered={true}
							style={{ marginBottom: '80px', width: '500px' }}>
							<Image
								src={
									this.props.character.thumbnail.path +
									'.' +
									this.props.character.thumbnail.extension
								}
							/>
							<Card.Content>
								<Card.Header>
									{this.props.character.name}
								</Card.Header>
								<Card.Description>
									{this.props.character.description}
								</Card.Description>
							</Card.Content>
							<Card.Content extra={true}>
								<Accordion>
									<Accordion.Title
										active={activeIndex === 0}
										index={0}
										onClick={this.handleClick}>
										<Icon name="dropdown" />
										Series with {this.props.character.name}:
									</Accordion.Title>
									<Accordion.Content
										active={activeIndex === 0}>
										<List>
											{map(this.props.character.series.items,
												(item: any, i: number) => (
													<List.Item
														key={`series-item-${i}`}
														icon="circle outline"
														content={item.name}
													/>
												)
											)}
										</List>
									</Accordion.Content>
								</Accordion>
							</Card.Content>
						</Card>
						<Grid columns={4}>
							{map(this.props.heroes, (character, i) => (
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
											<Accordion>
												<Accordion.Title
													active={
														activeIndex === i + 1
													}
													index={i + 1}
													onClick={this.handleClick}>
													<Icon name="dropdown" />
													Series with {
														character.name
													}:
												</Accordion.Title>
												<Accordion.Content
													active={
														activeIndex === i + 1
													}>
													<List>
														{map(character.series.items,
															(item, index) => (
																<List.Item
																	key={`series-item-${index}`}
																	icon="circle outline"
																	content={
																		item.name
																	}
																/>
															)
														)}
													</List>
												</Accordion.Content>
											</Accordion>
										</Card.Content>
									</Card>
								</Grid.Column>
							))}
						</Grid>
					</React.Fragment>
				)}
			</div>
		);
	}
}

const mapStateToProps = (state: any) => {
	return {
		heroes: state.heroes,
		character: state.character
	};
};

const mapDispatchToProps = (dispatch: any) => {
	return {
		onRemoveFromFavourites: (id: number) =>
			dispatch({ type: actionTypes.REMOVE_FROM_FAVOURITES, id })
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Details);