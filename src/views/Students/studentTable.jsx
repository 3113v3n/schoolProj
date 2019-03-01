import React from "react";
import SupervisorComponent from "./Components/SupervisorComponent.jsx";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";

import { asyncRequest } from "../../services/requests.js";
// @material-ui/core components


class StudentTable extends React.Component {
  state = {
    toEditScreen: false,
    isLoading: true,
    data: [],
    error: null
  };
  goToEdit = () => {
    this.setState({
      toEditScreen: true
    });
  }
  componentDidMount() {
    asyncRequest("allocations2.json").then(responseJson => {
      this.setState({
        data: responseJson.Allocations,
        isLoading: true,
        error: null
      });
    });
  }
  render() {
    if (this.state.toEditScreen === true) {
      return <Redirect to="/admin/progress" />;
    }

    const { isLoading, data, error } = this.state;
    if (error) {
      return (
        <div>
          Error:
          {error.message}
        </div>
      );
    } else if (!isLoading) {
      return <div> Loading...</div>;
    } else {
      return (
        <div>
          <SupervisorComponent data={data} goToEdit={() => this.goToEdit()} />
        </div>
      );
    }
  }
}
export default StudentTable;

StudentTable.propTypes = {
  classes: PropTypes.object.isRequired
};
