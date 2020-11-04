import * as actionTypes from './actions'

const initialState = {
	foodSearch: {
		consumed_at: '2020-10-21T18:36:03+00:00',
		deleteRequest: false,
		foodSelected: true,
		food_name: 'beef',
		nf_calories: 247.35,
		nf_cholesterol: 73.95,
		nf_dietary_fiber: 0,
		nf_p: 176.8,
		nf_potassium: 271.15,
		nf_protein: 22.46,
		nf_saturated_fat: 6.6,
		nf_sodium: 53.55,
		nf_sugars: 0,
		nf_total_carbohydrate: 0,
		nf_total_fat: 16.75,
		serving_qty: 3,
		serving_unit: 'oz',
		serving_weight_grams: 85,
	},
	journalEntries: [
		{
			consumed_at: '2020-10-21T18:36:03+00:00',
			deleteRequest: false,
			foodSelected: true,
			food_name: 'beef',
			nf_calories: 247.35,
			nf_cholesterol: 73.95,
			nf_dietary_fiber: 0,
			nf_p: 176.8,
			nf_potassium: 271.15,
			nf_protein: 22.46,
			nf_saturated_fat: 6.6,
			nf_sodium: 53.55,
			nf_sugars: 0,
			nf_total_carbohydrate: 0,
			nf_total_fat: 16.75,
			serving_qty: 3,
			serving_unit: 'oz',
			serving_weight_grams: 85,
		},
	],
};
    
const reducer = (state=initialState, action) =>{
   switch(action.type){
       case actionTypes.ADD_ENTRY:
           return{
               ...state.journalEntries.concat(state.foodSearch)
           }
        case actionTypes.FOOD_SEARCH:
            return{
                ...state,
                foodSearch:{
                    ...state.foodSearch,
                    consumed_at: '2020-10-21T18:36:03+00:00',
                    deleteRequest: false,
                    foodSelected: true,
                    food_name: 'beef',
                    nf_calories: 247.35,
                    nf_cholesterol: 73.95,
                    nf_dietary_fiber: 0,
                    nf_p: 176.8,
                    nf_potassium: 271.15,
                    nf_protein: 22.46,
                    nf_saturated_fat: 6.6,
                    nf_sodium: 53.55,
                    nf_sugars: 0,
                    nf_total_carbohydrate: 0,
                    nf_total_fat: 16.75,
                    serving_qty: 3,
                    serving_unit: 'oz',
                    serving_weight_grams: 85,
                } 
            }
        default:
            return state
   }
    
};
export default reducer;