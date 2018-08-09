import React, { Component } from "react";
import { connect } from "react-redux";

import cssClass from "./EditPost.css";
import AxiosInstance from "../../../AxiosInstance";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Button from "../../../components/UI/Button/Button";
import Input from "../../../components/UI/Input/Input";
import Aux from "../../../hoc/Aux/Aux";
import * as actions from "../../../store/actions/index";
import { checkValidity } from "../../../shared/checkValidity";

class EditPost extends Component {
    state = {
        editPostForm: null,
        isEditPostFormValid: true
    };

    componentDidMount() {
        const config = {
            headers: {
                "Content-Type": "application/json",
                AUTHORIZATION: "JWT " + this.props.token
            }
        };
        AxiosInstance.get(
            "/admin-panel/posts/view/" + this.props.match.params.slug + "/",
            config
        )
            .then(response => {
                this.setState({
                    editPostForm: {
                        title: {
                            elementType: "input",
                            elementConfig: {
                                type: "text",
                                placeholder: "Title"
                            },
                            validation: {
                                required: true,
                                minLength: 5
                            },
                            value: response.data.title,
                            valid: true,
                            touched: true
                        },
                        body: {
                            elementType: "textarea",
                            elementConfig: {
                                type: "textarea",
                                placeholder: "Body Of The Post"
                            },
                            validation: {
                                required: true,
                                minLength: 5
                            },
                            value: response.data.body,
                            valid: true,
                            touched: true
                        },
                        short_description: {
                            elementType: "input",
                            elementConfig: {
                                type: "text",
                                placeholder: "Short Description"
                            },
                            validation: {
                                required: true
                            },
                            value: response.data.short_description,
                            valid: true,
                            touched: true
                        },
                        slug: {
                            elementType: "input",
                            elementConfig: {
                                type: "text",
                                placeholder: "First Name",
                                readOnly: true
                            },
                            value: response.data.slug,
                            validation: {
                                required: true,
                                minLength: 5
                            },
                            valid: true,
                            touched: true
                        },
                        is_published: {
                            elementType: "checkbox",
                            elementConfig: {
                                type: "checkbox",
                                label: "Published",
                                name: "published",
                                checked: response.data.is_published
                                    ? true
                                    : false
                            },
                            value: response.data.is_published ? true : false,
                            valid: true,
                            touched: true
                        }
                    }
                });
            })
            .catch(error => {
                alert("Something Went Wrong");
            });
    }

    inputChangedHandler = (event, inputIndentifier) => {
        const updatedEditPostForm = {
            ...this.state.editPostForm
        };
        const updatedFormElement = {
            ...updatedEditPostForm[inputIndentifier]
        };
        if (inputIndentifier === "is_published") {
            updatedFormElement.value = !this.state.editPostForm.is_published
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
        updatedEditPostForm[inputIndentifier] = updatedFormElement;
        let isFormValid = true;
        for (let inputIndentifier in updatedEditPostForm) {
            isFormValid =
                updatedEditPostForm[inputIndentifier].valid && isFormValid;
        }
        this.setState({
            editPostForm: updatedEditPostForm,
            isEditPostFormValid: isFormValid
        });
    };

    onFormSubmitEventHandler = event => {
        event.preventDefault();
        let updatedForm = {};
        for (let key in this.state.editPostForm) {
            updatedForm[key] = this.state.editPostForm[key].value;
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
        this.props.onAdminEditPost(config, this.props.match.params.slug);
    };

    render() {
        let formElements = [];
        for (let key in this.state.editPostForm) {
            formElements.push({
                id: key,
                config: this.state.editPostForm[key]
            });
        }

        let form = <Spinner />;
        if (this.state.editPostForm) {
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
                        <Button disabled={!this.state.isEditPostFormValid}>
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
        loading: state.admin.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAdminEditPost: (config, slug) =>
            dispatch(actions.adminEditPost(config, slug))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditPost);
