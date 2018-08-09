import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import * as actions from "../../../store/actions/index";
import Spinner from "../../../components/UI/Spinner/Spinner";
import cssClass from "./UserList.css";
import Button from "../../../components/UI/Button/Button";
import AxiosInstance from "../../../AxiosInstance";
import Aux from "../../../hoc/Aux/Aux";

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

    userDeleteHandler = userPk => {
        const config = {
            headers: {
                "Content-Type": "application/json",
                AUTHORIZATION: "JWT " + this.props.token
            },
            data: {
                pk: userPk
            }
        };

        let confirmation = window.confirm("Do You Want To Delete This User?");

        if (confirmation) {
            AxiosInstance.delete("/admin-panel/users/detail/", config)
                .then(response => {
                    alert("Post Deleted");
                    this.getUsersList();
                })
                .catch(error => {
                    alert("Something Went Wrong");
                });
        }
    };

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
                    <td>
                        <div className={cssClass.Actions}>
                            <Link to={"/admin-panel/users/detail/" + user.id}>
                                <Button>Edit</Button>
                            </Link>
                        </div>
                        <Button
                            red
                            clicked={this.userDeleteHandler}
                            identifier={user.id}
                        >
                            Delete
                        </Button>
                    </td>
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
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>{userList}</tbody>
                    </table>
                </div>
            );
        }

        return (
            <Aux>
                <div className={cssClass.Title}>Users List</div>
                <div>{this.props.userList ? userListTable : null}</div>
            </Aux>
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
