import React from "react";
<<<<<<< HEAD
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Edit from "@material-ui/icons/Edit";
import PropTypes from "prop-types";
=======
import SupervisorComponent from "./Components/SupervisorComponent.jsx";
>>>>>>> c6bbc9de6510fa73edfbbcb4e05daebad44126c1
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
// @material-ui/core components

class StudentTable extends React.Component {
  state = {
    toEditScreen: false
  };
  goToEdit = () => {
    this.setState({
      toEditScreen: true
    });
  }
  render() {
    if(this.state.toEditScreen === true){
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
          <SupervisorComponent data={data} goToEdit={this.goToEdit} />
        </div>
      );
    }
  }
}
export default StudentTable;

StudentTable.propTypes = {
  classes: PropTypes.object.isRequired
};
