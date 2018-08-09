import React, { Component } from "react";
import { connect } from "react-redux";

import cssClass from "./EditUser.css";
import AxiosInstance from "../../../AxiosInstance";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Button from "../../../components/UI/Button/Button";
import Input from "../../../components/UI/Input/Input";
import Aux from "../../../hoc/Aux/Aux";
import * as actions from "../../../store/actions/index";
import { checkValidity } from "../../../shared/checkValidity";

class EditUser extends Component {
    state = {
        editUserForm: null,
        isUserEditFormValid: true
    };

    componentWillMount() {
        const config = {
            headers: {
                "Content-Type": "application/json",
                AUTHORIZATION: "JWT " + this.props.token
            },
            params: {
                pk: this.props.match.params.pk
            }
        };
        AxiosInstance.get("/admin-panel/users/detail/", config)
            .then(response => {
                this.setState({
                    editUserForm: {
                        username: {
                            elementType: "input",
                            elementConfig: {
                                type: "text",
                                placeholder: "Username",
                                readOnly: true
                            },
                            value: response.data.username,
                            valid: true,
                            touched: true
                        },
                        password: {
                            elementType: "input",
                            elementConfig: {
                                type: "text",
                                placeholder: "Password",
                                readOnly: true
                            },
                            value: response.data.password,
                            valid: true,
                            touched: true
                        },
                        email: {
                            elementType: "input",
                            elementConfig: {
                                type: "email",
                                placeholder: "Email"
                            },
                            value: response.data.email,
                            validation: {
                                required: true,
                                isEmail: true
                            },
                            valid: true,
                            touched: true
                        },
                        first_name: {
                            elementType: "input",
                            elementConfig: {
                                type: "text",
                                placeholder: "First Name"
                            },
                            value: response.data.first_name,
                            validation: {
                                required: true,
                                minLength: 5,
                                maxLength: 20
                            },
                            valid: true,
                            touched: true
                        },
                        last_name: {
                            elementType: "input",
                            elementConfig: {
                                type: "text",
                                placeholder: "Last Name"
                            },
                            value: response.data.last_name,
                            validation: {
                                required: true,
                                minLength: 5,
                                maxLength: 20
                            },
                            valid: true,
                            touched: true
                        },
                        website: {
                            elementType: "input",
                            elementConfig: {
                                type: "url",
                                placeholder: "Your Website (If Any)"
                            },
                            value: response.data.website,
                            valid: true,
                            touched: true
                        },
                        bio: {
                            elementType: "textarea",
                            elementConfig: {
                                type: "textarea",
                                placeholder: "Describe Yourself In Few Words"
                            },
                            value: response.data.bio,
                            validation: {
                                required: true,
                                maxLength: 100,
                                minLength: 10
                            },
                            valid: true,
                            touched: true
                        },
                        country: {
                            elementType: "input",
                            elementConfig: {
                                type: "text",
                                placeholder: "Country"
                            },
                            value: response.data.country,
                            valid: true,
                            touched: true
                        },
                        facebook_url: {
                            elementType: "input",
                            elementConfig: {
                                type: "url",
                                placeholder: "Facebook Account URL"
                            },
                            value: response.data.facebook_url,
                            valid: true,
                            touched: true
                        },
                        twitter_handler: {
                            elementType: "input",
                            elementConfig: {
                                type: "text",
                                placeholder: "Twitter Username (With @)"
                            },
                            value: response.data.twitter_handler,
                            valid: true,
                            touched: true
                        },
                        is_active: {
                            elementType: "checkbox",
                            elementConfig: {
                                type: "checkbox",
                                label: "Active",
                                name: "active",
                                checked: response.data.is_active ? true : false
                            },
                            value: response.data.is_active ? true : false,
                            valid: true,
                            touched: false
                        },
                        is_staff: {
                            elementType: "checkbox",
                            elementConfig: {
                                type: "checkbox",
                                label: "Staff",
                                name: "staff",
                                checked: response.data.is_staff ? true : false
                            },
                            value: response.data.is_staff ? true : false,
                            valid: true,
                            touched: false
                        },
                        is_superuser: {
                            elementType: "checkbox",
                            elementConfig: {
                                type: "checkbox",
                                label: "Superuser",
                                name: "superuser",
                                checked: response.data.is_superuser
                                    ? true
                                    : false
                            },
                            value: response.data.is_superuser ? true : false,
                            valid: true,
                            touched: false
                        }
                    }
                });
            })
            .catch(error => {
                alert("Something Went Wrong");
            });
    }

    inputChangedHandler = (event, inputIndentifier) => {
        const updatedEditUserForm = {
            ...this.state.editUserForm
        };
        const updatedFormElement = {
            ...updatedEditUserForm[inputIndentifier]
        };
        if (
            inputIndentifier === "is_active" ||
            inputIndentifier === "is_staff" ||
            inputIndentifier === "is_superuser"
        ) {
            updatedFormElement.value = !this.state.editUserForm[
                inputIndentifier
            ].value;
            updatedFormElement.elementConfig.checked = updatedFormElement.value;
            updatedFormElement.touched = true;
        } else {
            updatedFormElement.value = event.target.value;
            updatedFormElement.valid = checkValidity(
                updatedFormElement.value,
                updatedFormElement.validation
            );
            updatedFormElement.touched = true;
        }
        updatedEditUserForm[inputIndentifier] = updatedFormElement;
        let isFormValid = true;
        for (let inputIndentifier in updatedEditUserForm) {
            isFormValid =
                updatedEditUserForm[inputIndentifier].valid && isFormValid;
        }
        this.setState({
            editUserForm: updatedEditUserForm,
            isUserEditFormValid: isFormValid
        });
    };

    onFormSubmitEventHandler = event => {
        event.preventDefault();
        let updatedForm = {};
        for (let key in this.state.editUserForm) {
            updatedForm[key] = this.state.editUserForm[key].value;
        }
        const config = {
            headers: {
                "Content-Type": "application/json",
                AUTHORIZATION: "JWT " + this.props.token
            },
            data: {
                pk: this.props.match.params.pk,
                ...updatedForm
            }
        };
        this.props.onAdminEditUser(config);
    };

    render() {
        let formElements = [];
        for (let key in this.state.editUserForm) {
            formElements.push({
                id: key,
                config: this.state.editUserForm[key]
            });
        }

        let form = <Spinner />;
        if (this.state.editUserForm) {
            form = (
                <Aux>
                    <h1
                        style={{
                            fontFamily: "Roboto, sans-serif",
                            fontWeight: "200"
                        }}
                    >
                        Edit User
                    </h1>
                    <form onSubmit={this.onFormSubmitEventHandler}>
                        {formElements.map(formElement => (
                            <Input
                                key={formElement.id}
                                elementType={formElement.config.elementType}
                                elementConfig={formElement.config.elementConfig}
                                value={formElement.config.value}
                                changed={event =>
                                    this.inputChangedHandler(
                                        event,
                                        formElement.id
                                    )
                                }
                                invalid={!formElement.config.valid}
                                shouldValidate={formElement.config.validation}
                                touched={formElement.config.touched}
                            />
                        ))}
                        <Button disabled={!this.state.isUserEditFormValid}>
                            Submit
                        </Button>
                    </form>
                </Aux>
            );
        }
        return this.props.loading ? (
            <Spinner />
        ) : (
            <div className={cssClass.OuterWrapper}>{form}</div>
        );
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        loading: state.user.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAdminEditUser: config => dispatch(actions.adminEditUser(config))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditUser);
