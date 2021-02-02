import React, {Component} from 'react'
import {connect} from 'react-redux'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import axios from '../../../axios-journalEntries'
import JournalEntries from './JournalEntries/JournalEntries'
import FoodSearch from './FoodSearch/FoodSearch'
import NutritionSummary from '../../../components/NutritionSummary/NutritionSummary'
import Button from '../../../components/UI/Button/Button'
import Modal from '../../../components/UI/Modal/Modal'
import * as actions from '../../../store/actions'
import * as classes from './DailyJournal.module.css'
    
class DailyJournal extends Component {
	state = {
        page: null, 
		food: null, 
	};
    

    tabHandler = () => {
		this.props.setTabStatus(null);
		this.props.setMeal(null)
	};

	mealSelectHandler = (meal, page) => {
		this.setState({ page});
		this.props.setTabStatus(true);
		this.props.setMeal(meal)
	};
	render() {
        const {page} = this.state
        const {status} = this.props
		const cssClassesDailyJournal = [
			classes.dailyJournal,
			this.state.status ? classes.none : classes.block
		].join(' ');
		const btns = ['breakfast', 'lunch', 'dinner', 'snack'].map((meal) => {
			const upperCaseName = meal.charAt(0).toUpperCase() + meal.slice(1)
			return (
				<Button
					key={meal}
					type='text'
					btnType='Success'
					clicked={() => this.mealSelectHandler(meal, 'jrlEntry')}>
					{upperCaseName}
				</Button>
			);
        });
		return (
			<div>
				<div className={cssClassesDailyJournal}>
					<h3>Select to view of add</h3>
					<div className={classes.btns}>{btns}</div>
				</div>
				<Modal
					status={status}
					clicked={this.tabHandler}
					content={'dailyJournal'}>
					{page === 'jrlEntry' && (
						<JournalEntries
							setFood={(food) => this.setState({ food })}
							setPage={(page) => this.setState({ page })}
							closeTab={this.tabHandler}
						/>
					)}
					{page === 'foodSearch' && (
						<FoodSearch previousPage={(page) => this.setState({ page })} />
					)}
					{(page === 'nutriFacts') && (
						<NutritionSummary
							previousPage={(page) => this.setState({ page })}
						/>
					)}
				</Modal>
			</div>
		);
	}
};

const mapStateToProps = (state) => {
	return {
		breakdown: state.journalEntries.breakdown,
		status: state.tabBar.modalOpen,
		token: state.auth.token,
		userId: state.auth.userId,
	};
};

// const mapDispatchToProps = (dispatch) => {
// 	return {
// 		dbUpdate: (token, userId, curEntries, id) =>
// 			dispatch(journalEntryActions.dbUpdate(token, userId, curEntries, id)),
// 		onInitEntries: (token, userId) =>
// 			dispatch(journalEntryActions.initEntries(token, userId)),
// 		onfetchInfo: (token, userId) =>
// 			dispatch(journalEntryActions.fetchInfo(token, userId)),
// 	};
// };

export default connect(
	mapStateToProps,
	actions
)(withErrorHandler(DailyJournal, axios));