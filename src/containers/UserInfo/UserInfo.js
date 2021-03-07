import React, { Component, Fragment } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as userInfoActions from "../../store/actions/index";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import classes from "./UserInfo.module.css";
import axios from "../../axios-journalEntries";
import Input from "../../components/UI/Forms/Input/Input";
import { checkValidity } from "../../shared/utility";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

class UserInfo extends Component {
  state = {
    userInfo: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your E-mail",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      appUseReason: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "lose", displayValue: "Lose Weight" },
            { value: "maintain", displayValue: "Maintain Weight" },
            { value: "gain", displayValue: "Gain Weight" },
          ],
        },
        value: "lose",
        prompt: "What is your main reason for wanting to track your calories",
        validation: {},
        valid: true,
      },
      currentWeight: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Ex. 180",
        },
        value: "",
        validation: {
          required: true,
          isNumeric: true,
        },
        valid: false,
        prompt: "What is your current weight in lbs?",
        touched: false,
      },
      calorieGoal: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Ex. 2000",
        },
        value: "",
        validation: {
          required: true,
          isNumeric: true,
        },
        valid: false,
        prompt: "What is your goal daily calorie limit?",
        touched: false,
        // elementType: 'select',
        // elementConfig: {
        // 	options: [
        // 		{ value: 'yes', displayValue: 'Yes' },
        // 		{ value: 'no', displayValue: 'No' },
        // 	],
        // },
        // value: 'Yes',
        // prompt: 'Do you already have an idea of your daily calorie amount?',
        // validation: {},
        // valid: true,
      },
    },
    formIsValid: false,
    loading: false,
  };

  componentDidMount() {
    let oldUserData = { ...this.state.userInfo };
    for (let formElementIdentifier in this.props.info[0]) {
      if (
        formElementIdentifier !== "userId" &&
        formElementIdentifier !== "date"
      ) {
        const updatedUserInfo = {
          ...this.state.userInfo,
        };
        const updatedFormElement = {
          ...updatedUserInfo[formElementIdentifier],
        };
        updatedFormElement.value = this.props.info[0][formElementIdentifier];
        oldUserData[formElementIdentifier] = updatedFormElement;
      }
    }
    this.setState({ userInfo: oldUserData });
  }

  infoHandler = (event) => {
    event.preventDefault();
    this.props.onSetCalGoal(this.state.userInfo.calorieGoal.value);
    this.setState({ loading: true });
    const userInfo = {};
    for (let formElementIdentifier in this.state.userInfo) {
      userInfo[formElementIdentifier] = this.state.userInfo[
        formElementIdentifier
      ].value;
    }
    userInfo.userId = this.props.userId;
    userInfo.date = new Date();
    this.props.onSetInfo(userInfo, this.props.token, "/food-journal");
    // axios
    // 	.put('/dataInfo/.json', formData)
    // 	.then((response) => {
    // 		this.setState({ loading: false });
    // 		this.props.history.push('/food-journal');
    // 	})
    // 	.catch((error) => {
    // 		this.setState({ loading: false });
    // 	});
  };
  inputChangedHandler = (event, inputIdentifier) => {
    const updatedUserInfo = {
      ...this.state.userInfo,
    };
    const updatedFormElement = {
      ...updatedUserInfo[inputIdentifier],
    };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    updatedUserInfo[inputIdentifier] = updatedFormElement;

    let formIsValid = true;
    for (let inputIdentifier in updatedUserInfo) {
      formIsValid = updatedUserInfo[inputIdentifier].valid && formIsValid;
    }

    this.setState({ userInfo: updatedUserInfo, formIsValid: formIsValid });
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.userInfo) {
      formElementsArray.push({
        id: key,
        config: this.state.userInfo[key],
      });
    }
    let form = (
      <form onSubmit={this.infoHandler}>
        <h4>Enter your Account Information</h4>
        {formElementsArray.map((formElement, i) => (
          <Fragment>
            <p key={i}>{formElement.config.prompt}</p>
            <Input
              key={formElement.id}
              elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value}
              changed={(event) =>
                this.inputChangedHandler(event, formElement.id)
              }
              invalid={!formElement.config.valid}
              shouldValidate={formElement.config.validation}
              touched={formElement.config.touched}
              valueType={formElement.id}
            />
          </Fragment>
        ))}
        <Button
          btnType="Success"
          disabled={!this.state.formIsValid}
          clicked={this.infoHandler}
        >
          SAVE
        </Button>
      </form>
    );
    if (this.props.load && !this.props.fetched) {
      form = (
        <Fragment>
          <h4>We are searching for your information...</h4>
          <Spinner />
        </Fragment>
      );
    }
    let redirect = null;
    if (this.props.path) {
      redirect = <Redirect to={this.props.path} />;
      this.props.onRedirectPath(null);
    }
    return (
      <div className={classes.UserInfo}>
        {redirect}
        {form}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    load: state.userInfo.loading,
    path: state.userInfo.path,
    info: state.userInfo.userInfo,
    fetched: state.userInfo.fetched,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSetInfo: (userInfo, token, path) =>
      dispatch(userInfoActions.setInfo(userInfo, token, path)),
    onRedirectPath: (path) =>
      dispatch(userInfoActions.setAuthRedirectPath(path)),
    onSetCalGoal: (calGoal) => dispatch(userInfoActions.setCalGoal(calGoal)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(UserInfo, axios));
