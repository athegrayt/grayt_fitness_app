import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";
import * as journalEntryActions from "../../store/actions/index";
import JournalEntry from "../../components/JournalEntry/JournalEntry";
import Modal from "../../components/UI/Modal/Modal";
import NutritionSummary from "../../components/NutritionSummary/NutritionSummary";
import classes from "./JournalEntries.module.css";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import axios from "../../axios-journalEntries";

class JournalEntries extends Component {
  state = {
    showNutrition: false,
    entry: {},
    entryID: null,
  };

  componentDidMount() {
    this.props.onInitEntries(this.props.token, this.props.userId);
    this.props.onfetchInfo(this.props.token, this.props.userId);
  }

  deleteRequestHandler = (entryID) => {
    const todayYear = new Date().getFullYear();
    const todayMonth = new Date().getMonth();
    const todayDate = new Date().getDate();
    const curDayEntries = this.props.jrlEntry.filter((entry) => {
      return (
        new Date(entry.consumed_at.slice(0, 10)).getFullYear() === todayYear &&
        new Date(entry.consumed_at.slice(0, 10)).getMonth() === todayMonth &&
        new Date(entry.consumed_at.slice(0, 10)).getDate() + 1 === todayDate
      );
    });
   let newEntry = curDayEntries[entryID];
    entryID = newEntry.consumed_at;
    this.setState({ entry: newEntry, entryID: entryID, showNutrition: true });
  };

  closeModalHandler = () => {
    this.setState({ showNutrition: false });
  };

  render() {
    let entries = <Spinner />;
    if (this.props.jrlEntry) {
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
        entries = curDayEntries.map((entry, i) => {
          return (
            <JournalEntry
              key={entry.consumed_at}
              id={i}
              entry={entry}
              deleteRequestHandler={() => this.deleteRequestHandler(i)}
            />
          );
        });
      } else {
        entries = (
          <Fragment>
            <p>There's nothing like a fresh start!</p>
            <p>
              Make your first journal entry above to start tracking your diet!
            </p>
          </Fragment>
        );
      }
    }
    return (
      <div className={classes.JournalEntries}>
        <Modal
          show={this.state.showNutrition}
          modalClosed={this.closeModalHandler}
        >
          <NutritionSummary
            entry={this.state.entry}
            clicked={() => {
              this.props.onEntryDelete(
                this.props.token,
                this.props.userId,
                this.props.jrlEntry,
                this.state.entryID
              );
              this.closeModalHandler();
            }}
          />
        </Modal>
        {entries}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    jrlEntry: state.journalEntries.journalEntries,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onEntryDelete: (token, userId, curEntries, id) =>
      dispatch(journalEntryActions.dbUpdate(token, userId, curEntries, id)),
    onInitEntries: (token, userId) =>
      dispatch(journalEntryActions.initEntries(token, userId)),
    onfetchInfo: (token, userId) =>
      dispatch(journalEntryActions.fetchInfo(token, userId)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(JournalEntries, axios));
