import React, {Component} from 'react'
import {connect} from 'react-redux'
import classes from './Cockpit.module.css' 

    
class Cockpit extends Component {
	state = {
		date: null,
	};

	componentDidMount() {
		const d = new Date();
		const date = `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
		this.setState({ date: date });
	}

	render() {
		let calorieTotal = 0;
		let perOfGoal= 0
		let newCalGoal = 2000;
		if (this.props.goal) {
			newCalGoal = this.props.goal.calorieGoal;
		}

		if (this.props.jrlEntry.length) {
			calorieTotal = this.props.jrlEntry
				.map((entry) => {
					return entry.nf_calories;
				})
				.reduce((total, cur) => {
					return total + cur;
				});
			calorieTotal = Math.round(calorieTotal)	
			perOfGoal = Math.round(100 * (calorieTotal / newCalGoal));
		}
		return (
			<div className={classes.Cockpit}>
				<h1> {this.state.date}</h1>
				<h3>
					Calories: {calorieTotal}/{newCalGoal} (%{perOfGoal})
				</h3>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		jrlEntry: state.journalEntries.journalEntries,
		goal: state.userInfo.userInfo[0],
	};
}

export default connect(mapStateToProps)(Cockpit)