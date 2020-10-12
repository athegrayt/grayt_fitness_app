import React from 'react'
import JournalEntry from './JournalEntry/JournalEntry'
import classes from './JournalEntries.module.css'
	
	

const JournalEntries = (props) =>{
   const journalEntryList = props.journalEntries

	   const entries = journalEntryList.map((entry, i) => {   
		return (
			<JournalEntry
				key={entry.time}
				id={i}
				time={entry.time}
				description={entry.description}
				calories={entry.calories}
				deleteHandler={()=>props.deleteHandler(i)}
				deleteRequestHandler={()=>props.deleteRequestHandler(i)}
				deleteRequest={entry.deleteRequest}
			/>
		);
		   });
	return(
		<div className={classes.JournalEntries}>
			{entries}
		</div>
	)
   
    
};
export default JournalEntries;