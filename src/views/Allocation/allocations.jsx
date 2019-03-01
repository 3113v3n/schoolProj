import React from "react";
import PropTypes from "prop-types";
// @material-ui/icons

import { asyncRequest } from "../../services/requests.js";
import AllocationComponent from "./AllocationComponent.jsx";
class allocations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      data: [],
      error: null
    };
  }
  componentDidMount() {
    asyncRequest("students.json").then(responseJson => {
      this.setState({
        data: responseJson.Students,
        isLoading: true,
        error: null
      });
    });
  }

  render() {
    const { classes } = this.props;
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
          <AllocationComponent classes={classes} data={data} />
        </div>
      );
    }
  }
}
allocations.propTypes = {
  classes: PropTypes.object
}
export default allocations;
