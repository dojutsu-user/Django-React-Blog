import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import * as actions from "../../../store/actions/index";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Button from "../../../components/UI/Button/Button";
import Input from "../../../components/UI/Input/Input";
import Aux from "../../../hoc/Aux/Aux";
import cssClass from "./UserProfileEdit.css";
import {checkValidity} from "../../../shared/checkValidity";

class UserProfileEdit extends Component {
    state = {
        userProfileForm: {
            first_name: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "First Name"
                },
                value: this.props.userProfile.first_name,
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
                value: this.props.userProfile.last_name,
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 20
                },
                valid: true,
                touched: true
            },
            email: {
                elementType: "input",
                elementConfig: {
                    type: "email",
                    placeholder: "Email"
                },
                value: this.props.userProfile.email,
                validation: {
                    required: true,
                    isEmail: true
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
                value: this.props.userProfile.website,
                valid: true,
                touched: true
            },
            bio: {
                elementType: "textarea",
                elementConfig: {
                    type: "textarea",
                    placeholder: "Describe Yourself In Few Words"
                },
                value: this.props.userProfile.bio,
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
                value: this.props.userProfile.country,
                valid: true,
                touched: true
            },
            facebook_url: {
                elementType: "input",
                elementConfig: {
                    type: "url",
                    placeholder: "Facebook Account URL"
                },
                value: this.props.userProfile.facebook_url,
                valid: true,
                touched: true
            },
            twitter_handler: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Twitter Username (With @)"
                },
                value: this.props.userProfile.twitter_handler,
                valid: true,
                touched: true
            }
        },
        isProfileFormValid: true
    };

    inputChangedHandler = (event, inputIndentifier) => {
        const updatedUserProfileForm = {
            ...this.state.userProfileForm
        };
        const updatedFormElement = {
            ...this.state.userProfileForm[inputIndentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = checkValidity(
            updatedFormElement.value,
            updatedFormElement.validation
        );
        updatedFormElement.touched = true;
        updatedUserProfileForm[inputIndentifier] = updatedFormElement;
        let isFormValid = true;
        for (let inputIndentifier in updatedUserProfileForm) {
            isFormValid =
                updatedUserProfileForm[inputIndentifier].valid && isFormValid;
        }
        this.setState({
            userProfileForm: updatedUserProfileForm,
            isProfileFormValid: isFormValid
        });
    };

    onFormSubmitEventHandler = event => {
        event.preventDefault();
        let updatedProfile = {};
        for (let key in this.state.userProfileForm) {
            updatedProfile[key] = this.state.userProfileForm[key].value;
        }
        const config = {
            headers: {
                "Content-Type": "application/json",
                AUTHORIZATION: "JWT " + this.props.token
            }
        };
        this.props.onUserProfileEdit(updatedProfile, config);
    };

    render() {
        let formElements = [];
        for (let key in this.state.userProfileForm) {
            formElements.push({
                id: key,
                config: this.state.userProfileForm[key]
            });
        }

        let form = (
            <Aux>
                {!this.props.userProfile ? <Redirect to="/dashboard" /> : null}
                <h1
                    style={{
                        fontFamily: "Roboto, sans-serif",
                        fontWeight: "200"
                    }}
                >
                    Edit Your Profile
                </h1>
                <form onSubmit={this.onFormSubmitEventHandler}>
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
                    <Button disabled={!this.state.isProfileFormValid}>
                        Submit
                    </Button>
                </form>
            </Aux>
        );

        if (this.props.loading) {
            form = <Spinner />;
        }

        return <div className={cssClass.OuterWrapper}>{form}</div>;
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        userProfile: state.user.userProfile,
        loading: state.user.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onUserProfileView: config => dispatch(actions.userProfileView(config)),
        onUserProfileEdit: (updatedProfile, config) =>
            dispatch(actions.userProfileEdit(updatedProfile, config))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserProfileEdit);
