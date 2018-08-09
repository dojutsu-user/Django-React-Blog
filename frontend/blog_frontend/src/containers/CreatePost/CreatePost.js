import React, { Component } from "react";
import { connect } from "react-redux";

import cssClass from "./CreatePost.css";
import Aux from "../../hoc/Aux/Aux";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import * as actions from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";
import { checkValidity } from "../../shared/checkValidity";

class CreatePost extends Component {
    state = {
        postCreationForm: {
            title: {
                elementType: "input",
                elementConfig: {
                    type: "input",
                    placeholder: "Title Of The Post"
                },
                value: "",
                validation: {
                    required: true,
                    minLength: 10
                },
                valid: false,
                touched: false
            },
            body: {
                elementType: "textarea",
                elementConfig: {
                    type: "textarea",
                    placeholder: "Body Of The Post"
                },
                value: "",
                validation: {
                    required: true,
                    minLength: 10
                },
                valid: false,
                touched: false
            },
            short_description: {
                elementType: "input",
                elementConfig: {
                    type: "input",
                    placeholder: "Short Description Of The Post"
                },
                value: "",
                validation: {
                    required: true,
                    minLength: 10,
                    maxLength: 200
                },
                valid: false,
                touched: false
            }
        },
        ispostCreationFormValid: false
    };

    inputChangedHandler = (event, inputIndentifier) => {
        const updatedPostCreationForm = {
            ...this.state.postCreationForm
        };
        const updatedFormElement = {
            ...updatedPostCreationForm[inputIndentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = checkValidity(
            updatedFormElement.value,
            updatedFormElement.validation
        );
        updatedFormElement.touched = true;
        updatedPostCreationForm[inputIndentifier] = updatedFormElement;
        let isFormValid = true;
        for (let inputIndentifier in updatedPostCreationForm) {
            isFormValid =
                updatedPostCreationForm[inputIndentifier].valid && isFormValid;
        }
        this.setState({
            postCreationForm: updatedPostCreationForm,
            ispostCreationFormValid: isFormValid
        });
    };

    onFormSubmitEventHandler = event => {
        event.preventDefault();
        const postData = {
            title: this.state.postCreationForm.title.value,
            body: this.state.postCreationForm.body.value,
            short_description: this.state.postCreationForm.short_description
                .value
        };
        const config = {
            headers: {
                "Content-Type": "application/json",
                AUTHORIZATION: "JWT " + this.props.token
            }
        };
        this.props.onCreateNewPost(postData, config);
    };

    render() {
        let formElements = [];
        for (let key in this.state.postCreationForm) {
            formElements.push({
                id: key,
                config: this.state.postCreationForm[key]
            });
        }

        let form = <Spinner />;
        if (this.state.postCreationForm) {
            form = (
                <Aux>
                    <h1
                        style={{
                            fontFamily: "Roboto, sans-serif",
                            fontWeight: "200"
                        }}
                    >
                        Create A New Post
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
                        <Button disabled={!this.state.ispostCreationFormValid}>
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
        loading: state.post.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onCreateNewPost: (postData, config) =>
            dispatch(actions.sendNewPostToServer(postData, config))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreatePost);
