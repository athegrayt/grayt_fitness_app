import React, { Component } from "react";
import { connect } from "react-redux";
import * as foodSearchActions from "../../store/actions/index";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Forms/Input/Input";
import { checkValidity } from "../../shared/utility";
import classes from "./FoodSearch.module.css";
import PropTypes from "prop-types";

class foodSearch extends Component {
	state = {
		foodSearch: {},
		errorMessage: null,
		orderForm: {
			food_name: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Ex. Chicken',
					readonly: null,
				},
				value: '',
				validation: {
					required: true,
				},
				valid: false,
				touched: false,
				errorName: 'food',
			},
			serving_qty: {
				elementType: 'input',
				elementConfig: {
					type: 'number',
          placeholder: '1',
          min: 1
				},
				value: '',
				validation: {
					required: true,
				},
				valid: false,
				touched: false,
				errorName: 'quantiy',
			},
			serving_unit: {
				elementType: 'select',
				elementConfig: {
					options: [{ value: '', displayValue: '' }],
				},
				value: 'fastest',
				validation: {},
				valid: true,
				errorName: 'unit',
			},
		},
		formIsValid: false,
		searching: true,
	};

	inputChangedHandler = (event, inputIdentifier) => {
		const updatedOrderForm = {
			...this.state.orderForm,
		};
		const updatedFormElement = {
			...updatedOrderForm[inputIdentifier],
		};
		updatedFormElement.value = event.target.value;
		updatedFormElement.valid = checkValidity(
			updatedFormElement.value,
			updatedFormElement.validation
		);
		updatedFormElement.touched = true;
		updatedOrderForm[inputIdentifier] = updatedFormElement;

		let formIsValid = true;
		for (let inputIdentifier in updatedOrderForm) {
			formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
		}

		this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
	};

	enterKeyHandler = (event) => {
		const code = event.keyCode || event.which;
		if (code === 13) {
			if (this.state.searching) {
				this.foodSearchHandler();
			} else {
				this.addEntryHandler();
			}
		}
	};

	addEntryHandler = () => {
		let updatedFoodSearch = { ...this.state.foodSearch };
		const { serving_qty } = updatedFoodSearch;
		for (let nutritionFact in updatedFoodSearch) {
			if (updatedFoodSearch[nutritionFact] === null) {
				updatedFoodSearch[nutritionFact] = 0;
			}
			if (Number.isFinite(updatedFoodSearch[nutritionFact])) {
				updatedFoodSearch[nutritionFact] = Math.round(
					updatedFoodSearch[nutritionFact] / serving_qty
				);
			}
		}
		updatedFoodSearch.serving_qty = +this.state.orderForm.serving_qty.value;
		const entry = {
			journalEntry: updatedFoodSearch,
			userId: this.props.userId,
		};
		const token = this.props.token;
		this.props.onaddEntry(entry, token);
		this.resetHandler();
	};

	foodSearchHandler = () => {
		const food = this.state.orderForm.food_name.value;
		if (food === null) {
			this.setState({ foodSearch: { invalid: true } });
			// alert('Please enter the type of food');
			return;
		} else {
			const endpointSelect = `https://trackapi.nutritionix.com/v2/natural/nutrients`;
			fetch(endpointSelect, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'x-app-id': '5876afdb',
					'x-app-key': process.env.REACT_APP_API_KEY2,
				},
				body: JSON.stringify({
					query: `${food.toLowerCase()}`,
					timezone: 'US/Eastern',
				}),
			})
				.then((res) => res.json())
				.then((data) => {
					if (data.message === "We couldn't match any of your foods") {
						this.setState({
							errorMessage:
								"Sadly we couldn't find your food. Please check spelling or try another food!",
						});
					}
					const nf = Object.keys(data.foods[0])
						.filter((key) => {
							return (
								key.match(/nf_*/) ||
								key.match(/serving*/) ||
								key.match(/consumed*/) ||
								key.match(/food*/)
							);
						})
						.reduce(
							(nfObject, curKey) => ({
								...nfObject,
								[curKey]: data.foods[0][curKey],
							}),
							{}
						);
					console.log(nf);
					nf.deleteRequest = false;
					nf.foodSelected = true;
					const updatedOrderForm = {
						...this.state.orderForm,
					};
					updatedOrderForm.serving_qty.value = nf.serving_qty;
					updatedOrderForm.serving_unit.value = nf.serving_unit;
					updatedOrderForm.serving_unit.elementConfig.options[0].value =
						nf.serving_unit;
					updatedOrderForm.food_name.elementConfig.readonly = 'readonly';
					updatedOrderForm.serving_unit.elementConfig.options[0].displayValue =
						nf.serving_unit;
					this.setState({
						foodSearch: nf,
						orderForm: updatedOrderForm,
						searching: false,
					});
				})
				.catch((error) => console.log(error));
		}
	};

	resetHandler = () => {
		const reset = {};
		const resetOrderForm = this.state.orderForm;
		resetOrderForm.food_name.value = '';
		resetOrderForm.food_name.elementConfig.readonly = null;
		this.setState({
			foodSearch: reset,
			orderForm: resetOrderForm,
			errorMessage: null,
			searching: true,
		});
	};

	render() {
		let foodSearch = null;
		const formElementsArray = [];
		for (let key in this.state.orderForm) {
			formElementsArray.push({
				id: key,
				config: this.state.orderForm[key],
			});
		}
		const foodSearchInputs = formElementsArray.map((formElement) => (
			<Input
				key={formElement.id}
				elementType={formElement.config.elementType}
				elementConfig={formElement.config.elementConfig}
				value={formElement.config.value}
				changed={(event) => this.inputChangedHandler(event, formElement.id)}
				pressed={(event) => this.enterKeyHandler(event)}
				invalid={!formElement.config.valid}
				shouldValidate={formElement.config.validation}
				touched={formElement.config.touched}
				valueType={formElement.config.errorName}
			/>
		));
		const foodSelect = foodSearchInputs.slice(0, 1);
		this.state.foodSearch.foodSelected
			? (foodSearch = (
					<div className={classes.FoodSearch}>
						{foodSearchInputs}
						<div className={classes.BTN}>
							<Button btnType='Danger' clicked={this.resetHandler}>
								CHANGE FOOD
							</Button>
							<Button btnType='Success' clicked={() => this.addEntryHandler()}>
								ADD ENTRY
							</Button>
						</div>
					</div>
			  ))
			: (foodSearch = (
					<div className={classes.FoodSearch}>
						{foodSelect}
						<p>{this.state.errorMessage}</p>
						<Button
							btnType='Success'
							clicked={this.foodSearchHandler}
							disabled={!this.state.formIsValid}>
							Next
						</Button>
					</div>
			  ));

		return foodSearch;
	}
}

foodSearch.propTypes = {
  foodSelected: PropTypes.bool,
  value: PropTypes.string,
  amount: PropTypes.number,
  unit: PropTypes.string,
  changed: PropTypes.func,
  clicked: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    userId: state.auth.userId,
    token: state.auth.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onaddEntry: (entry, token) =>
      dispatch(foodSearchActions.addEntry(entry, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(foodSearch);
