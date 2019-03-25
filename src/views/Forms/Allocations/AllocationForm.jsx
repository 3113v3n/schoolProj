import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Person from "@material-ui/icons/Person";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import PropTypes from "prop-types";
import AddAlert from "@material-ui/core/SvgIcon/SvgIcon";
import Snackbar from "../../../components/Snackbar/Snackbar";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import uuid from "uuid";
const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

class AllocationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      students: "",
      lecturers: "",
      tl: false,
      tr: false,
      filtered: []
    };
  }
  componentWillUnmount() {
    var id = window.setTimeout(null, 0);
    while (id--) {
      window.clearTimeout(id);
    }
  }
  showNotification(place) {
    var x = [];
    x[place] = true;
    this.setState(x);
    this.alertTimeout = setTimeout(
      function() {
        x[place] = false;
        this.setState(x);
      }.bind(this),
      6000
    );
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleMyChange = e => {
    const value = e.target.value;
    const res = value.split(" ");
    const course = res[1];
    this.setState({ [e.target.name]: value });

    let currentList = []; // original List

    let newList = []; //copy of list

    currentList = this.props.lecturers;
    newList = currentList.filter(item => {
      const lc = `${item.course.toLowerCase()}`;
      const filter = course.toLowerCase();
      return lc.includes(filter) || lc.includes("both"); //returns components present in the table
    });

    this.setState({
      filtered: newList
    });
  };
  resetValues = () => {
    let inputs = document.getElementsByTagName("input");
    for (let i = 0; i < inputs.length; i++) inputs[i].value = "";
    this.setState({
      students: "",
      lecturers: ""
    });
  };
  newStudent = () => {
    const { students, lecturers } = this.state;
    const { error } = this.props;
    const value = students;
    const res = value.split(" ");
    const adm = res[0];
    const data = {};
    data.allocation_id = uuid();
    data.student_adm = adm;
    data.supervisor_id = lecturers;
    if (adm.length === 0 || lecturers.length === 0) {
      this.showNotification("tl");
    } else {
      this.props.addAllocation(data);
      if (error === false) {
        this.showNotification("tr");
      } else {
        this.showNotification("tl");
      }
    }
  };
  render() {
    const { classes, students, error, message, errorMessage } = this.props;
    const { filtered } = this.state;
    return (
      <div>
        <GridContainer container justify="center" alignItems="baseline">
          <GridItem xs={12} sm={12} md={5}>
            <Card>
              <CardHeader color="success">
                <h4 className={classes.cardTitleWhite}>New Allocations </h4>
                <p className={classes.cardCategoryWhite}>
                  Select Allocation Details{" "}
                </p>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={10}>
                    <InputLabel htmlFor="lecturers">
                      Select Students:{" "}
                    </InputLabel>
                    <Select
                      style={{ marginLeft: 10, width: "50%" }}
                      value={this.state.students}
                      onChange={this.handleMyChange}
                      formcontrolprops={{
                        fullWidth: true
                      }}
                      inputProps={{
                        name: "students",
                        id: "students"
                      }}
                    >
                      {students.map(item => (
                        <MenuItem
                          key={item.adm}
                          value={`${item.adm} ${item.course}`}
                        >
                          {item.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={10}>
                    <InputLabel htmlFor="lecturers">Select Lecturer</InputLabel>{" "}
                    <Select
                      style={{ marginLeft: 10, width: "49%", paddingTop: 20 }}
                      value={this.state.lecturers}
                      onChange={this.handleChange}
                      formcontrolprops={{
                        fullWidth: true
                      }}
                      inputProps={{
                        name: "lecturers",
                        id: "lecturer"
                      }}
                    >
                      {filtered.map(item => (
                        <MenuItem
                          key={item.supervisor_id}
                          value={item.supervisor_id}
                        >
                          {item.name} : {item.allocations_count}
                        </MenuItem>
                      ))}
                    </Select>
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter>
                <Button color="success" round onClick={this.newStudent}>
                  <Person />
                  Add Allocation
                </Button>
                <Snackbar
                  place="tl"
                  color="danger"
                  icon={AddAlert}
                  message={
                    error === true ? errorMessage : "PLEASE SELECT AN OPTION"
                  }
                  open={this.state.tl}
                  closeNotification={() => this.setState({ tl: false })}
                  close
                />
                <Snackbar
                  place="tr"
                  color="success"
                  icon={AddAlert}
                  message={"Allocation was Successful"}
                  open={this.state.tr}
                  closeNotification={() => this.setState({ tr: false })}
                  close
                />
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}
AllocationForm.propTypes = {
  lecturers: PropTypes.array.isRequired,
  students: PropTypes.array.isRequired,
  addAllocation: PropTypes.func.isRequired,
  error: PropTypes.bool,
  classes: PropTypes.object,
  message: PropTypes.string,
  errorMessage: PropTypes.string
};

export default withStyles(styles)(AllocationForm);
