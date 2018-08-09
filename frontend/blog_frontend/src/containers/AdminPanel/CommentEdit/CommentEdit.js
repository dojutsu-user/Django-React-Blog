import React, { Component } from "react";
import { connect } from "react-redux";

import cssClass from "./CommentEdit.css";
import AxiosInstance from "../../../AxiosInstance";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Button from "../../../components/UI/Button/Button";
import Input from "../../../components/UI/Input/Input";
import Aux from "../../../hoc/Aux/Aux";
import * as actions from "../../../store/actions/index";
import {checkValidity} from "../../../shared/checkValidity";

class EditPost extends Component {
    state = {
        postTitle: null,
        commentEditForm: null,
        isCommentEditFormValid: true
    };

    componentDidMount() {
        const config = {
            headers: {
                "Content-Type": "application/json",
                AUTHORIZATION: "JWT " + this.props.token
            }
        };
        AxiosInstance.get(
            "/admin-panel/comments/detail/" + this.props.match.params.pk + "/",
            config
        )
            .then(response => {
                this.setState({
                    commentEditForm: {
                        name: {
                            elementType: "input",
                            elementConfig: {
                                type: "text",
                                placeholder: "Name"
                            },
                            validation: {
                                required: true,
                                minLength: 5
                            },
                            value: response.data.name,
                            valid: true,
                            touched: true
                        },
                        email: {
                            elementType: "input",
                            elementConfig: {
                                type: "text",
                                placeholder: "Email"
                            },
                            validation: {
                                required: true,
                                isEmail: 5
                            },
                            value: response.data.email,
                            valid: true,
                            touched: true
                        },
                        website: {
                            elementType: "input",
                            elementConfig: {
                                type: "url",
                                placeholder: "Website"
                            },
                            value: response.data.website,
                            valid: true,
                            touched: true
                        },
                        body: {
                            elementType: "textarea",
                            elementConfig: {
                                type: "textarea",
                                placeholder: "Comment"
                            },
                            value: response.data.body,
                            validation: {
                                required: true,
                                minLength: 5
                            },
                            valid: true,
                            touched: true
                        },
                        is_displayed: {
                            elementType: "checkbox",
                            elementConfig: {
                                type: "checkbox",
                                label: "Published",
                                name: "published",
                                checked: response.data.is_displayed
                                    ? true
                                    : false
                            },
                            value: response.data.is_displayed ? true : false,
                            valid: true,
                            touched: true
                        }
                    },
                    postTitle: response.data.post_title
                });
            })
            .catch(error => {
                alert("Something Went Wrong");
            });
    }

    inputChangedHandler = (event, inputIndentifier) => {
        const updatedCommentEditForm = {
            ...this.state.commentEditForm
        };
        const updatedFormElement = {
            ...updatedCommentEditForm[inputIndentifier]
        };
        if (inputIndentifier === "is_displayed") {
            updatedFormElement.value = !this.state.commentEditForm.is_displayed
                .value;
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
        updatedCommentEditForm[inputIndentifier] = updatedFormElement;
        let isFormValid = true;
        for (let inputIndentifier in updatedCommentEditForm) {
            isFormValid =
                updatedCommentEditForm[inputIndentifier].valid && isFormValid;
        }
        this.setState({
            commentEditForm: updatedCommentEditForm,
            isCommentEditFormValid: isFormValid
        });
    };

    onFormSubmitEventHandler = event => {
        event.preventDefault();
        let updatedForm = {};
        for (let key in this.state.commentEditForm) {
            updatedForm[key] = this.state.commentEditForm[key].value;
        }
        const config = {
            headers: {
                "Content-Type": "application/json",
                AUTHORIZATION: "JWT " + this.props.token
            },
            data: {
                ...updatedForm
            }
        };
        this.props.onAdminCommentEdit(config, this.props.match.params.pk);
    };

    render() {
        let formElements = [];
        for (let key in this.state.commentEditForm) {
            formElements.push({
                id: key,
                config: this.state.commentEditForm[key]
            });
        }

        let form = <Spinner />;
        if (this.state.commentEditForm) {
            form = (
                <Aux>
                    <h1
                        style={{
                            fontFamily: "Roboto, sans-serif",
                            fontWeight: "200"
                        }}
                    >
                        Edit Comment On "<strong>{this.state.postTitle}</strong>"
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
                        <Button disabled={!this.state.isCommentEditFormValid}>
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
        loading: state.comment.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAdminCommentEdit: (config, pk) =>
            dispatch(actions.adminCommentEdit(config, pk))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditPost);
