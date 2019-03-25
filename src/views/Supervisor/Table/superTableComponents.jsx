import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Button from "components/CustomButtons/Button.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";

import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
/////////////
import PersonAdd from "@material-ui/icons/PersonAdd";
import { NavLink } from "react-router-dom";
import SupervisorTableRow from "../../../components/Table/SupervisorTableRow";
import CustomInput from "../../../components/CustomInput/CustomInput";
import InputAdornment from "@material-ui/core/InputAdornment";

import Search from "@material-ui/icons/Search";
import PropTypes from "prop-types";
const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  },
  tableUpgradeWrapper: {
    display: "block",
    width: "100%",
    overflowX: "auto",
    WebkitOverflowScrolling: "touch",
    MsOverflowStyle: "-ms-autohiding-scrollbar"
  },
  table: {
    width: "100%",
    maxWidth: "100%",
    marginBottom: "1rem",
    backgroundColor: "transparent",
    borderCollapse: "collapse",
    display: "table",
    borderSpacing: "2px",
    borderColor: "grey",
    "& thdead tr th": {
      fontSize: "1.063rem",
      padding: "12px 8px",
      verticalAlign: "middle",
      fontWeight: "300",
      borderTopWidth: "0",
      borderBottom: "1px solid rgba(0, 0, 0, 0.06)",
      textAlign: "inherit"
    },
    "& tbody tr td": {
      padding: "12px 8px",
      verticalAlign: "middle",
      borderTop: "1px solid rgba(0, 0, 0, 0.06)"
    },
    "& td, & th": {
      display: "table-cell"
    }
  },
  center: {
    textAlign: "center"
  },
  left: {
    flexDirection: "row"
  }
};
class superTableComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filtered: []
    };
  }
  componentDidMount() {
    this.setState({
      filtered: this.props.data
    });
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({
      filtered: nextProps.data
    });
  }
  handleChange = e => {
    let currentList = []; // original List

    let newList = []; //copy of list

    if (e.target.value !== "") {
      currentList = this.props.data;

      newList = currentList.filter(item => {
        const lc = `${item.f_name.toLowerCase()} //filter through table contents
         ${item.l_name.toLowerCase()}`;
        const filter = e.target.value.toLowerCase();
        return lc.includes(filter); //returns components present in the table
      });
    } else {
      newList = this.props.data;
    }
    this.setState({
      filtered: newList
    });
  };
  course = (val, val2) => {
    if (val === true && val2 === false) {
      return "Degree";
    } else if (val === false && val2 === true) {
      return "Diploma";
    } else if (val === true && val2 === true) {
      return "Degree && Diploma";
    }
  };
  render() {
    const { classes, onDelete, data } = this.props;
    const { filtered } = this.state;
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>SuperVisors Table</h4>
              <p className={classes.cardCategoryWhite}>SuperVisors </p>
            </CardHeader>
            <CardBody>
              <GridItem xs={2} sm={2} md={2}>
                <CustomInput
                  labelText="Filter by Name"
                  id="material"
                  formControlProps={{
                    fullWidth: true,
                    onChange: this.handleChange
                  }}
                  inputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Search />
                      </InputAdornment>
                    )
                  }}
                />
              </GridItem>
              <table className={classes.table}>
                <thead>
                  <tr>
                    <th>first Name</th>
                    <th>last Name</th>
                    <th>Course</th>
                    <th>Allocation Count</th>
                    <th>Action</th>
                  </tr>
                </thead>
                {data !== null
                  ? filtered.map(item => (
                      <SupervisorTableRow
                        key={item.supervisor_id}
                        f_name={item.first_name}
                        l_name={item.last_name}
                        course={this.course(item.degree, item.diploma)}
                        onDelete={onDelete}
                        emp_no={item.supervisor_id}
                        count={item.allocations_count}
                      />
                    ))
                  : null}
              </table>
            </CardBody>
          </Card>

          <NavLink to="/admin/supervisor">
            <Button type="button" color="primary" round>
              <PersonAdd /> Add Supervisor
            </Button>
          </NavLink>
        </GridItem>
      </GridContainer>
    );
  }
}
superTableComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.array,
  onDelete: PropTypes.func.isRequired
};
export default withStyles(styles)(superTableComponent);
