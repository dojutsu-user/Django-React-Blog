import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import cssClass from "./UserProfileView.css";
import Spinner from "../../../components/UI/Spinner/Spinner";
import * as actions from "../../../store/actions/index";
import Aux from "../../../hoc/Aux/Aux";
import Button from "../../../components/UI/Button/Button";

class UserProfileView extends Component {
    fetchUserProfile = () => {
        const config = {
            headers: {
                "Content-Type": "application/json",
                AUTHORIZATION: "JWT " + this.props.token
            }
        };
        this.props.onUserProfileView(config);
    };

    componentWillMount() {
        this.fetchUserProfile();
    }

    render() {
        let profile = null;
        if (this.props.userProfile) {
            profile = (
                <Aux>
                    <table className={cssClass.Table}>
                        <tbody>
                            <tr>
                                <th>First Name</th>
                                <td>{this.props.userProfile.first_name}</td>
                            </tr>
                            <tr>
                                <th>Last Name</th>
                                <td>{this.props.userProfile.last_name}</td>
                            </tr>
                            <tr>
                                <th>Username</th>
                                <td>{this.props.userProfile.username}</td>
                            </tr>
                            <tr>
                                <th>Email</th>
                                <td>{this.props.userProfile.email}</td>
                            </tr>
                            <tr>
                                <th>Bio</th>
                                <td>{this.props.userProfile.bio}</td>
                            </tr>
                            <tr>
                                <th>Website</th>
                                <td>
                                    <a href={this.props.userProfile.website}>
                                        {this.props.userProfile.website}
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <th>Country</th>
                                <td>{this.props.userProfile.country}</td>
                            </tr>
                        </tbody>
                    </table>
                    {this.props.userProfile.facebook_url ? (
                        <a href={this.props.userProfile.facebook_url}>
                            <img
                                className={cssClass.SocialIcons}
                                src="https://svgshare.com/i/7V_.svg"
                                alt="Facebook"
                                title="Facebook"
                            />
                        </a>
                    ) : null}
                    {this.props.userProfile.twitter_handler ? (
                        <a
                            href={
                                "https://twitter.com/" +
                                this.props.userProfile.twitter_handler
                            }
                        >
                            <img
                                className={cssClass.SocialIcons}
                                src="https://svgshare.com/i/7Vj.svg"
                                alt="Twitter"
                                title="Twitter"
                            />
                        </a>
                    ) : null}
                </Aux>
            );
        }

        if (this.props.loading) {
            profile = <Spinner />;
        }
        return (
            <Aux>
                <div className={cssClass.Title}>Your Profile</div>
                <div className={cssClass.OuterWrapper}>{profile}</div>
                <div className={cssClass.Edit}>
                    <Link to="/dashboard/profile/edit">
                        <Button disabled={false}>Edit Profile</Button>
                    </Link>
                </div>
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        loading: state.user.loading,
        userProfile: state.user.userProfile
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onUserProfileView: config => dispatch(actions.userProfileView(config))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserProfileView);
