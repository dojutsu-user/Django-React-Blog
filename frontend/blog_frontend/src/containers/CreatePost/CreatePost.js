import React, { Component } from "react";
import { connect } from "react-redux";

import cssClass from "./CreatePost.css";
import Aux from "../../hoc/Aux/Aux";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import * as actions from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";

class CreatePost extends Component {
    state = {
        postForm: {
            title: {
                elementType: "input",
                elementConfig: {
                    type: "input",
                    placeholder: "Title Of The Post"
                },
                value: ""
            },
            body: {
                elementType: "textarea",
                elementConfig: {
                    type: "textarea",
                    placeholder: "Body Of The Post"
                },
                value: ""
            },
            short_description: {
                elementType: "input",
                elementConfig: {
                    type: "input",
                    placeholder: "Short Description Of The Post"
                },
                value: ""
            }
        }
    };

    inputChangedHandler(event, inputIdentifier) {
        const updatedPostForm = {
            ...this.state.postForm,
            [inputIdentifier]: {
                ...this.state.postForm[inputIdentifier],
                value: event.target.value
            }
        };
        this.setState({ postForm: updatedPostForm });
    }

    createPost = event => {
        event.preventDefault();
        const postData = {
            title: this.state.postForm.title.value,
            body: this.state.postForm.body.value,
            short_description: this.state.postForm.short_description.value
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
        for (let key in this.state.postForm) {
            formElements.push({
                id: key,
                config: this.state.postForm[key]
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
                    Create A New Post
                </h1>
                <form onSubmit={this.createPost}>
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
                    <Button>Submit</Button>
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
        loading: state.post.loading,
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
