import React from 'react'
import classes from './JournalEntry.module.css'
import PropTypes from 'prop-types'

const JournalEntry = (props) => {
  // const deleteRequestHandler = () => {
  //   const updatedJournalEntry = this.state.journalEntries
  //   if (updatedJournalEntry[entryID]) {
  //     updatedJournalEntry[entryID].deleteRequest = !this.state.journalEntries[
  //       entryID
  //     ].deleteRequest
  //     this.setState({
  //       journalEntries: updatedJournalEntry,
  //     })
  //   }
  // }

  let deleteBtn = null
  props.deleteRequest
    ? (deleteBtn = (
        <button type='button' onClick={props.deleteHandler}>
          X
        </button>
      ))
    : (deleteBtn = null)

  return (
    <div
      id={props.id}
      className={classes.JournalEntry}
      onClick={props.deleteRequestHandler}>
      <p>{props.time}</p>
      <p>{props.description}</p>
      <p>cal: {props.calories}</p>
      {deleteBtn}
    </div>
  )
}

JournalEntry.propTypes = {
  deleteRequest: PropTypes.bool,
  deleteRequestHandler: PropTypes.func,
  deleteHandler: PropTypes.func,
  time: PropTypes.string,
  description: PropTypes.string,
  calories: PropTypes.number,
  id: PropTypes.number,
}

export default JournalEntry
