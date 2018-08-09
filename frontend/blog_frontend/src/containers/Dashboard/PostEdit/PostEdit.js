import React, { Component } from "react";
import { connect } from "react-redux";

import cssClass from "./PostEdit.css";
import AxiosInstance from "../../../AxiosInstance";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Button from "../../../components/UI/Button/Button";
import Input from "../../../components/UI/Input/Input";
import Aux from "../../../hoc/Aux/Aux";
import * as actions from "../../../store/actions/index";
import { checkValidity } from "../../../shared/checkValidity";

class PostEdit extends Component {
    state = {
        postEditForm: null,
        isPostEditFormValid: true
    };

    componentWillMount() {
        AxiosInstance.get(
            "/posts/view/" + this.props.match.params.slug + "/"
        ).then(response => {
            this.setState({
                postEditForm: {
                    title: {
                        elementType: "input",
                        elementConfig: {
                            type: "input",
                            placeholder: "Title Of The Post"
                        },
                        value: response.data.title,
                        validation: {
                            required: true,
                            minLength: 0
                        },
                        valid: true,
                        touched: true
                    },
                    body: {
                        elementType: "textarea",
                        elementConfig: {
                            type: "textarea",
                            placeholder: "Body Of The Post"
                        },
                        value: response.data.body,
                        validation: {
                            required: true,
                            minLength: 0
                        },
                        valid: true,
                        touched: true
                    },
                    short_description: {
                        elementType: "input",
                        elementConfig: {
                            type: "input",
                            placeholder: "Short Description Of The Post"
                        },
                        value: response.data.short_description,
                        validation: {
                            required: true,
                            minLength: 0
                        },
                        valid: true,
                        touched: true
                    }
                }
            });
        });
    }

    inputChangedHandler = (event, inputIndentifier) => {
        const updatedPostEditForm = {
            ...this.state.postEditForm
        };
        const updatedFormElement = {
            ...updatedPostEditForm[inputIndentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = checkValidity(
            updatedFormElement.value,
            updatedFormElement.validation
        );
        updatedFormElement.touched = true;
        updatedPostEditForm[inputIndentifier] = updatedFormElement;
        let isFormValid = true;
        for (let inputIndentifier in updatedPostEditForm) {
            isFormValid =
                updatedPostEditForm[inputIndentifier].valid && isFormValid;
        }
        this.setState({
            postEditForm: updatedPostEditForm,
            isPostEditFormValid: isFormValid
        });
    };

    onFormSubmitEventHandler = event => {
        event.preventDefault();
        let updatedForm = {};
        for (let key in this.state.postEditForm) {
            updatedForm[key] = this.state.postEditForm[key].value;
        }
        updatedForm["slug"] = this.props.match.params.slug;
        const config = {
            headers: {
                "Content-Type": "application/json",
                AUTHORIZATION: "JWT " + this.props.token
            }
        };
        this.props.onUserPostEdit(updatedForm, config);
    };

    render() {
        let formElements = [];
        for (let key in this.state.postEditForm) {
            formElements.push({
                id: key,
                config: this.state.postEditForm[key]
            });
        }

        let form = <Spinner />;
        if (this.state.postEditForm) {
            form = (
                <Aux>
                    <h1
                        style={{
                            fontFamily: "Roboto, sans-serif",
                            fontWeight: "200"
                        }}
                    >
                        Edit Post
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
                        <Button disabled={!this.state.isPostEditFormValid}>
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
        onUserPostEdit: (updatedPost, config) =>
            dispatch(actions.userPostEdit(updatedPost, config))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PostEdit);
