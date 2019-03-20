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
      students: "SELECT STUDENTS",
      lecturers: "SELECT LECTURERS",
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
  newStudent = () => {
    const { students, lecturers } = this.state;
    const { status } = this.props;
    const value = students;
    const res = value.split(" ");
    const adm = res[0];
    const data = {};
    data.adm = parseInt(adm);
    data.lec_emp_no = parseInt(lecturers);
   this.props.addAllocation(data);
    if (status === "success") {
      this.showNotification("tl");
    }
  };
  render() {
    const { classes, students } = this.props;
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
                        <MenuItem key={item.emp_no} value={item.emp_no}>
                          {item.name}
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
                  color="success"
                  icon={AddAlert}
                  message="Allocation successfully Added."
                  open={this.state.tl}
                  closeNotification={() => this.setState({ tl: false })}
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
AllocationForm.popTypes = {
  lecturers: PropTypes.array.isRequired,
  students: PropTypes.array.isRequired,
  addAllocation: PropTypes.func.isRequired,
  status: PropTypes.string
};

export default withStyles(styles)(AllocationForm);
