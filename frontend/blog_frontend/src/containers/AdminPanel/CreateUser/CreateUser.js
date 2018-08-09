import React, { Component } from "react";
import { connect } from "react-redux";

import cssClass from "./CreateUser.css";
import Input from "../../../components/UI/Input/Input";
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Aux from "../../../hoc/Aux/Aux";
import * as actions from "../../../store/actions/index";
import AxiosInstance from "../../../AxiosInstance";
import { checkValidity } from "../../../shared/checkValidity";

class CreateUser extends Component {
    state = {
        userCreationForm: null,
        isUserCreationFormValid: false
    };

    componentDidMount() {
        const config = {
            headers: {
                "Content-Type": "application/json",
                AUTHORIZATION: "JWT " + this.props.token
            }
        };
        AxiosInstance.get("/dashboard/user-status/", config)
            .then(response => {
                if (response.data.is_superuser) {
                    this.setState({
                        userCreationForm: {
                            username: {
                                elementType: "input",
                                elementConfig: {
                                    type: "text",
                                    placeholder: "Username"
                                },
                                value: "",
                                validation: {
                                    required: true,
                                    minLength: "5",
                                    maxLength: "20"
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
                                    minLength: 8
                                },
                                valid: false,
                                touched: false
                            },
                            email: {
                                elementType: "input",
                                elementConfig: {
                                    type: "email",
                                    placeholder: "email"
                                },
                                value: "",
                                validation: {
                                    required: true,
                                    isEmail: true
                                },
                                valid: false,
                                touched: false
                            },
                            first_name: {
                                elementType: "input",
                                elementConfig: {
                                    type: "text",
                                    placeholder: "First Name"
                                },
                                value: "",
                                validation: {
                                    required: true,
                                    minLength: 5,
                                    maxLength: 30
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
                                    minLength: 8,
                                    maxLength: 30
                                },
                                valid: false,
                                touched: false
                            },
                            is_active: {
                                elementType: "checkbox",
                                elementConfig: {
                                    type: "checkbox",
                                    label: "Active",
                                    name: "active"
                                },
                                value: false,
                                valid: true,
                                touched: false
                            }
                        }
                    });
                }
            })
            .catch(error => console.log(error.response.data));
    }

    inputChangedHandler = (event, inputIndentifier) => {
        const updatedUserCreationForm = {
            ...this.state.userCreationForm
        };
        const updatedFormElement = {
            ...this.state.userCreationForm[inputIndentifier]
        };
        if (inputIndentifier === "is_active") {
            updatedFormElement.value = !this.state.userCreationForm["is_active"]
                .value;
            updatedFormElement.touched = true;
        } else {
            updatedFormElement.value = event.target.value;
            updatedFormElement.valid = checkValidity(
                updatedFormElement.value,
                updatedFormElement.validation
            );
            updatedFormElement.touched = true;
        }
        updatedUserCreationForm[inputIndentifier] = updatedFormElement;
        let isFormValid = true;
        for (let inputIndentifier in updatedUserCreationForm) {
            isFormValid =
                updatedUserCreationForm[inputIndentifier].valid && isFormValid;
        }
        this.setState({
            userCreationForm: updatedUserCreationForm,
            isUserCreationFormValid: isFormValid
        });
    };

    onFormSubmitHandler = event => {
        event.preventDefault();
        let userData = {};
        for (let key in this.state.userCreationForm) {
            userData[key] = this.state.userCreationForm[key].value;
        }
        const config = {
            headers: {
                "Content-Type": "application/json",
                AUTHORIZATION: "JWT " + this.props.token
            }
        };
        this.props.onCreateUser(userData, config);
    };

    render() {
        let formElements = [];
        for (let key in this.state.userCreationForm) {
            formElements.push({
                id: key,
                config: this.state.userCreationForm[key]
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
                    Create A New User
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
                    <Button disabled={!this.state.isUserCreationFormValid}>
                        Submit
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
        token: state.auth.token,
        loading: state.admin.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onCreateUser: (data, config) =>
            dispatch(actions.adminCreateUser(data, config))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateUser);
