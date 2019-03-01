import React from "react";
// @material-ui/core components
// core components
import AdminComponent from "./Components/AdminComponent.jsx";
import { asyncRequest } from "../../services/requests.js";

class AdminStudents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
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
          <AdminComponent data={data} />
        </div>
      );
    }
  }
}

export default AdminStudents;
