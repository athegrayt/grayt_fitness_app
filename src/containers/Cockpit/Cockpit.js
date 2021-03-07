import React, { Component } from "react";
import { connect } from "react-redux";
import classes from "./Cockpit.module.css";

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
    let perOfGoal = 0;
    let newCalGoal = 2000;
    if (this.props.goal) {
      newCalGoal = this.props.goal.calorieGoal;
    }

    if (this.props.jrlEntry.length) {
      const todayYear = new Date().getFullYear();
      const todayMonth = new Date().getMonth();
      const todayDate = new Date().getDate();
      const curDayEntries = this.props.jrlEntry.filter((entry) => {
        return (
          new Date(entry.consumed_at.slice(0, 10)).getFullYear() ===
            todayYear &&
          new Date(entry.consumed_at.slice(0, 10)).getMonth() === todayMonth &&
          new Date(entry.consumed_at.slice(0, 10)).getDate() + 1 === todayDate
        );
      });
      if (curDayEntries.length) {
        calorieTotal = curDayEntries
          .map((entry) => {
            return entry.nf_calories;
          })
          .reduce((total, cur) => {
            return total + cur;
          });
      }
      calorieTotal = Math.round(calorieTotal);
      perOfGoal = Math.round(100 * (calorieTotal / newCalGoal));
    }
    return (
      <div className={classes.Cockpit}>
        <h1> {this.state.date}</h1>
        <h3>
          Calories: {calorieTotal}/{newCalGoal}{" "}
          <span className={perOfGoal > 100 ? classes.Over : null}>
            (%{perOfGoal})
          </span>
        </h3>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    jrlEntry: state.journalEntries.journalEntries,
    goal: state.userInfo.userInfo[0],
  };
};

export default connect(mapStateToProps)(Cockpit);
