import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Input from "../../components/UI/Input/Input";
import cssClass from "./Login.css";
import * as actions from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";
import Aux from "../../hoc/Aux/Aux";
import Button from "../../components/UI/Button/Button";

class Login extends Component {
    state = {
        loginForm: {
            username: {
                elementType: "input",
                elementConfig: {
                    type: "input",
                    placeholder: "Username"
                },
                value: ""
            },
            password: {
                elementType: "input",
                elementConfig: {
                    type: "password",
                    placeholder: "Password"
                },
                value: ""
            }
        }
    };

    loginHandler = event => {
        event.preventDefault();
        const loginCredentials = {
            username: this.state.loginForm.username.value,
            password: this.state.loginForm.password.value
        };
        this.props.onAuthLogin(loginCredentials);
    };

    inputChangedHandler(event, inputIdentifier) {
        const updatedLoginForm = {
            ...this.state.loginForm,
            [inputIdentifier]: {
                ...this.state.loginForm[inputIdentifier],
                value: event.target.value
            }
        };
        this.setState({ loginForm: updatedLoginForm });
    }

    render() {
        let formElements = [];
        for (let key in this.state.loginForm) {
            formElements.push({
                id: key,
                config: this.state.loginForm[key]
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
                    Login
                </h1>
                <form onSubmit={this.loginHandler}>
                    {formElements.map(formElement => (
                        <Input
                            key={formElement.id}
                            elementType={formElement.config.elementType}
                            elementConfig={formElement.config.elementConfig}
                            value={formElement.config.value}
                            changed={event =>
                                this.inputChangedHandler(event, formElement.id)
                            }
                        />
                    ))}
                    <Button>Login</Button>
                </form>
            </Aux>
        );

        return (
            <Aux>
                {this.props.isAuth ? (
                    <Redirect to={this.props.loginRedirectURL} />
                ) : null}
                <div>
                    {this.props.isAuth ? (
                        <Redirect to={this.props.loginRedirectURL} />
                    ) : null}
                    {this.props.loading ? (
                        <Spinner />
                    ) : (
                        <div className={cssClass.Container}>{form}</div>
                    )}
                </div>
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        isAuth: state.auth.token !== null,
        loginRedirectURL: state.auth.loginRedirectURL
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuthLogin: loginCredentials =>
            dispatch(actions.authLogin(loginCredentials))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);
