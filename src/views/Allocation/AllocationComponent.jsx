import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
// core components

import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
////////////////////////////
import { withRouter } from "react-router";
import Button from "components/CustomButtons/Button.jsx";
import PropTypes from "prop-types";
import AllocationTableRow from "../../components/Table/AllocationTableRow";
import CustomInput from "../../components/CustomInput/CustomInput";
import InputAdornment from "@material-ui/core/InputAdornment";
// @material-ui/icons
import Search from "@material-ui/icons/Search";
import { NavLink } from "react-router-dom";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Edit from "@material-ui/core/SvgIcon/SvgIcon";
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

//function UpgradeToPro(props)
class AllocationComponent extends React.Component {
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
        const lc = `${item.studentName.toLowerCase()} 
        ${item.supervisor.toLowerCase()} ${item.dateRegistered.toLowerCase()} //filter through table contents
         ${item.projectCode.toLowerCase()} `;
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
  render() {
    const { classes, data } = this.props;
    const { filtered } = this.state;
    return (
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Allocations Table</h4>
              <p className={classes.cardCategoryWhite}>students </p>
            </CardHeader>
            <CardBody>
              <div className={classes.tableUpgradeWrapper}>
                <GridItem xs={2} sm={2} md={2}>
                  <CustomInput
                    labelText="Type to filter"
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
                      <th>StudentName</th>
                      <th>Supervisor</th>
                      <th>Project Code</th>
                      <th>Date Registered</th>
                      <th>Due Date</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  {data.status !== "failed" ? (
                    filtered.map(item => (
                      <AllocationTableRow
                        studentName={item.student_name}
                        supervisor={item.supervisor_name}
                        dateRegistered={item.date_registered}
                        key={item.allocation_id}
                        dueDate={item.due_date}
                        projectCode={item.project_code}
                        allocation_id={item.allocation_id}
                      />
                    ))
                  ) : (
                    <tbody>
                      <tr className={classes.center}>
                        <td />
                        <td />
                        <td>NO ALLOCATIONS</td>
                        <td />
                        <td />
                      </tr>
                    </tbody>
                  )}
                </table>
              </div>
            </CardBody>
          </Card>
          <NavLink to="/admin/addAllocation">
            <Button color="info" round>
              New Allocation
            </Button>
          </NavLink>
        </GridItem>
      </GridContainer>
    );
  }
}
AllocationComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.array
};
export default withRouter(withStyles(styles)(AllocationComponent));
