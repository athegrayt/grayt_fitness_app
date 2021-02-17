import React, {useReducer, useState} from 'react'
import axios from 'axios';
import dailyJournalReducer from './daily-journal-reducer'
import * as firebase from '../dataBase/fireBase';
import DailyJournalContext from './daily-journal-context'
import {
	AUTH_SUCCESS,
	SET_BREAKDOWN,
	AUTH_START,
	AUTH_FAIL,
	AUTH_LOGOUT,
	SET_MODAL_STATUS,
} from '../store/actions/actionTypes';

const GlobalState = (props)=>{
    const breakfast= {
        name: 'breakfast', 
        entries:[]
    }
    const lunch = {
			name: 'lunch',
			entries: [],
		};
    const dinner = {
			name: 'dinner',
			entries: [],
		};
    const snack = {
			name: 'snack',
			entries: [],
		};
	const token = null
	const userId = null
    const nutritionBreakdown = false 
	const modal = false
	const loading = false   
    const error = false
    const [dailyJournalState, dispatch] = useReducer(dailyJournalReducer, {
			breakfast,
			lunch,
			dinner,
			snack,
			nutritionBreakdown,
			token,
			userId,
			modal,
			loading,
			error,
		});
 
 const setEntries = async (token, userId, meal) => {
     const curDate = new Date().toISOString().slice(0, 10);
     let meals = meal ?[`${meal}`] : ['breakfast', 'lunch', 'dinner', 'snack'];

	try {
		meals.forEach(async (meal) => {
			const mealEntries = await firebase.getEntry(meal, curDate, userId);
            return dispatch({type: `SET_${meal.toUpperCase()}`,
		mealEntries});
		});
	} catch (err) {
		console.log(err);
	}
};

const auth = (email, password, isSignup) => {
		dispatch({type: AUTH_START});
		const authData = {
			email,
			password,
			returnSecureToken: true,
		};
		let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_API_KEY3}`;
		if (isSignup === false) {
			url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_API_KEY3}`;
		}
		axios
			.post(url, authData)
			.then((response) => {
				const expirationDate = new Date(
					new Date().getTime() + response.data.expiresIn * 1000
				);
				localStorage.setItem('token', response.data.idToken);
				localStorage.setItem('expirationDate', expirationDate);
				localStorage.setItem('userId', response.data.localId);
				dispatch({type: AUTH_SUCCESS,token: response.data.idToken, userId: response.data.localId, });
				checkAuthTimeout(response.data.expiresIn);
			})
			.catch((err) => {
				console.log(err);
				dispatch({type: AUTH_FAIL,error:err.response.data});
			});
};
const authCheckState = () => {
		const token = localStorage.getItem('token');
		if (!token) {
			logout();
		} else {
			const expirationDate = new Date(localStorage.getItem('expirationDate'));
			if (expirationDate <= new Date()) {
				logout();
			} else {
				const userId = localStorage.getItem('userId');
				dispatch({type: AUTH_SUCCESS,token, userId});
				checkAuthTimeout(
						(expirationDate.getTime() - new Date().getTime()) / 1000
					)
			}
		}
	
};

const logout = () => {
	localStorage.removeItem('token');
	localStorage.removeItem('expirationDate');
	localStorage.removeItem('userId');
	dispatch({
		type: AUTH_LOGOUT,
	})
};
const checkAuthTimeout = (expirationTime) => {
		setTimeout(() => {
			logout()
		}, expirationTime * 1000);
};



const setNutritionBreakdown = (nutritionBreakdown) => {
	dispatch({type: SET_BREAKDOWN, nutritionBreakdown});
};
const setModalStatus = (status) => {
	dispatch({type: SET_MODAL_STATUS, status});
};

// console.log({
// 	breakfast: dailyJournalState.breakfast,
// 	lunch: dailyJournalState.lunch,
// 	dinner: dailyJournalState.dinner,
// 	snack: dailyJournalState.snack,
//     nutritionBreakdown:dailyJournalState.nutritionBreakdown,
// 	setEntries,
// 	setNutritionBreakdown,
// });
return (
	<DailyJournalContext.Provider
		value={{
			breakfast: dailyJournalState.breakfast,
			lunch: dailyJournalState.lunch,
			dinner: dailyJournalState.dinner,
			snack: dailyJournalState.snack,
			nutritionBreakdown: dailyJournalState.nutritionBreakdown,
			token: dailyJournalState.token,
			userId: dailyJournalState.userId,
			modal: dailyJournalState.modal,
			setEntries,
			setNutritionBreakdown,
			auth,
			authCheckState,
			setModalStatus,
		}}>
		{props.children}
	</DailyJournalContext.Provider>
);
}

export default GlobalState