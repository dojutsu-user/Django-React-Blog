import React, { Component } from "react";
import { connect } from "react-redux";

import cssClass from "./CreateComment.css";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import Aux from "../../hoc/Aux/Aux";
import * as actions from "../../store/actions/index";
import { checkValidity } from "../../shared/checkValidity";

class CreateComment extends Component {
    state = {
        commentCreationForm: {
            name: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Your Name"
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
            email: {
                elementType: "input",
                elementConfig: {
                    type: "email",
                    placeholder: "Email (It Will Not Be Revealed)"
                },
                value: "",
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            website: {
                elementType: "input",
                elementConfig: {
                    type: "url",
                    placeholder: "Your Website (Optional)"
                },
                value: "",
                valid: true,
                touched: true
            },
            body: {
                elementType: "textarea",
                elementConfig: {
                    type: "textarea",
                    placeholder: "Comment"
                },
                value: "",
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            }
        },
        isCommentCreationFormValid: false
    };

    inputChangedHandler = (event, inputIndentifier) => {
        const updatedCommentCreationForm = {
            ...this.state.commentCreationForm
        };
        const updatedFormElement = {
            ...this.state.commentCreationForm[inputIndentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = checkValidity(
            updatedFormElement.value,
            updatedFormElement.validation
        );
        updatedFormElement.touched = true;
        updatedCommentCreationForm[inputIndentifier] = updatedFormElement;
        let isFormValid = true;
        for (let inputIndentifier in updatedCommentCreationForm) {
            isFormValid =
                updatedCommentCreationForm[inputIndentifier].valid &&
                isFormValid;
        }
        this.setState({
            commentCreationForm: updatedCommentCreationForm,
            isCommentCreationFormValid: isFormValid
        });
    };

    onFormSubmitHandler = event => {
        event.preventDefault();
        let commentData = {};
        for (let key in this.state.commentCreationForm) {
            commentData[key] = this.state.commentCreationForm[key].value;
        }
        this.props.onCreateComment(
            commentData,
            this.props.slug,
            this.props.refresh
        );
    };

    render() {
        let formElements = [];
        for (let key in this.state.commentCreationForm) {
            formElements.push({
                id: key,
                config: this.state.commentCreationForm[key]
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
                    Add A Comment
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
                    <Button disabled={!this.state.isCommentCreationFormValid}>
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
        loading: state.comment.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onCreateComment: (data, slug, refreshFunction) =>
            dispatch(actions.createComment(data, slug, refreshFunction))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateComment);
