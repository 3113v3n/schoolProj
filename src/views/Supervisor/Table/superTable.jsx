import React from "react";
// @material-ui/core components
// core components
import SuperTableComponent from "./SuperTableComponent.jsx";
import { asyncRequest } from "../../../services/requests";

class superTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      data: [],
      error: null
    };
  }
  componentDidMount() {
    asyncRequest("supervisor.json").then(responseJson => {
      this.setState({
        data: responseJson.supervisors,
        isLoading: true,
        error: null
      });
    });
  }

  render() {

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
          <SuperTableComponent data={data} />
        </div>
      );
    }
  }
}

export default superTable;
