import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import * as actions from "../../../store/actions/index";
import Spinner from "../../../components/UI/Spinner/Spinner";
import cssClass from "./UserList.css";

class UserList extends Component {
    getUsersList = () => {
        const config = {
            headers: {
                AUTHORIZATION: "JWT " + this.props.token
            }
        };
        this.props.onAdminUserListView(config);
    };

    componentDidMount() {
        this.getUsersList();
    }

    componentWillMount() {
        this.getUsersList();
    }

    render() {
        let userList = null;
        if (this.props.userList) {
            userList = this.props.userList.map(user => (
                <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.first_name}</td>
                    <td>{user.last_name}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    {user.is_active ? (
                        <td style={{ color: "green" }}>Active</td>
                    ) : (
                        <td style={{ color: "red" }}>Not Active</td>
                    )}
                </tr>
            ));
        }

        let userListTable = <Spinner />;

        if (!this.props.loading && this.props.userList) {
            userListTable = (
                <div className={cssClass.OuterWrapper}>
                    <table className={cssClass.Table}>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>{userList}</tbody>
                    </table>
                </div>
            );
        }

        return (
            <div>
                {this.props.userList ? (
                    userListTable
                ) : (
                    null
                )}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        userList: state.admin.userList,
        loading: state.admin.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAdminUserListView: config =>
            dispatch(actions.adminUserListView(config))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserList);
