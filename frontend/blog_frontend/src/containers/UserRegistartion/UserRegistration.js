import React, { Component } from "react";
import { connect } from "react-redux";

import cssClass from "./UserRegistration.css";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import Aux from "../../hoc/Aux/Aux";
import * as actions from "../../store/actions/index";
import { checkValidity } from "../../shared/checkValidity";

class UserRegistration extends Component {
    state = {
        userRegistrationForm: {
            first_name: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "First Name"
                },
                value: "",
                validation: {
                    required: true,
                    minLength: 2,
                    maxLength: 20
                },
                valid: false,
                touched: false
            },
            last_name: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Last Name"
                },
                value: "",
                validation: {
                    required: true,
                    minLength: 2,
                    maxLength: 20
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: "input",
                elementConfig: {
                    type: "email",
                    placeholder: "Email"
                },
                validation: {
                    required: true,
                    isEmail: true
                },
                value: "",
                valid: true,
                touched: true
            },
            username: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Username"
                },
                value: "",
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 20
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: "input",
                elementConfig: {
                    type: "password",
                    placeholder: "Password"
                },
                value: "",
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 20
                },
                valid: false,
                touched: false
            },
            password1: {
                elementType: "input",
                elementConfig: {
                    type: "password",
                    placeholder: "Confirm Password"
                },
                value: "",
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            }
        },
        isUserRegistrationFormValid: false
    };

    inputChangedHandler = (event, inputIndentifier) => {
        const updatedUserCreationForm = {
            ...this.state.userRegistrationForm
        };
        const updatedFormElement = {
            ...this.state.userRegistrationForm[inputIndentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = checkValidity(
            updatedFormElement.value,
            updatedFormElement.validation,
            inputIndentifier,
            this.state.userRegistrationForm.password.value
        );
        updatedFormElement.touched = true;
        updatedUserCreationForm[inputIndentifier] = updatedFormElement;
        let isFormValid = true;
        for (let inputIndentifier in updatedUserCreationForm) {
            isFormValid =
                updatedUserCreationForm[inputIndentifier].valid && isFormValid;
        }
        this.setState({
            userRegistrationForm: updatedUserCreationForm,
            isUserRegistrationFormValid: isFormValid
        });
    };

    onFormSubmitHandler = event => {
        event.preventDefault();
        let registrationData = {};
        for (let key in this.state.userRegistrationForm) {
            registrationData[key] = this.state.userRegistrationForm[key].value;
        }
        this.props.onUserRegistration(
            registrationData,
            this.props.history.push
        );
    };

    render() {
        let formElements = [];
        for (let key in this.state.userRegistrationForm) {
            formElements.push({
                id: key,
                config: this.state.userRegistrationForm[key]
            });
        }

        let form = (
            <Aux>
                <h1
                    style={{
                        fontFamily: "Roboto, sans-serif",
                        fontWeight: "200"
                    }}
                >
                    Register
                </h1>
                <form onSubmit={this.onFormSubmitHandler}>
                    {formElements.map(formElement => (
                        <Input
                            key={formElement.id}
                            elementType={formElement.config.elementType}
                            elementConfig={formElement.config.elementConfig}
                            value={formElement.config.value}
                            changed={event =>
                                this.inputChangedHandler(event, formElement.id)
                            }
                            invalid={!formElement.config.valid}
                            shouldValidate={formElement.config.validation}
                            touched={formElement.config.touched}
                        />
                    ))}
                    <Button disabled={!this.state.isUserRegistrationFormValid}>
                        Sign Up
                    </Button>
                </form>
            </Aux>
        );

        return (
            <Aux>
                <div>
                    {this.props.loading ? (
                        <Spinner />
                    ) : (
                        <div className={cssClass.OuterWrapper}>{form}</div>
                    )}
                </div>
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onUserRegistration: (data, moveToLoginPage) =>
            dispatch(actions.userRegistration(data, moveToLoginPage))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserRegistration);
