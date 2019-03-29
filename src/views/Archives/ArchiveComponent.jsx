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
import ArchiveRow from "../../components/Table/ArchiveRow";
import CustomInput from "components/CustomInput/CustomInput.jsx";
////////////////////////////
import InputAdornment from "@material-ui/core/InputAdornment";
import Search from "@material-ui/icons/Search";
import PropTypes from "prop-types";
import moment from "moment";
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

class ArchiveComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filtered: []
    };
  }
  componentDidMount() {
    this.setState({
      filtered: this.props.archives
    });
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({
      filtered: nextProps.archives
    });
  }
  handleChange = e => {
    let currentList = []; // original List

    let newList = []; //copy of list

    if (e.target.value !== "") {
      currentList = this.props.archives;
      newList = currentList.filter(item => {
        const lc = `${item.student_name.toLowerCase()}  ${item.supervisor_name.toLowerCase()}
        ${item.date_registered.toLowerCase()}${item.due_date.toLowerCase()}
         ${item.student_adm} ${item.project_code.toLowerCase()}`;
        const filter = e.target.value.toLowerCase();
        return lc.includes(filter); //returns components present in the table
      });
    } else {
      newList = this.props.archives;
    }
    this.setState({
      filtered: newList
    });
  };
  render() {
    const { classes, archives } = this.props;
    const { filtered } = this.state;
    return (
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Archives Table</h4>
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
                      <th> Admission Number</th>
                      <th>StudentName</th>
                      <th>Supervisor</th>
                      <th>ProjCode</th>
                      <th>Start Date</th>
                      <th> Finish Date</th>
                    </tr>
                  </thead>
                  {archives !== undefined &&
                  archives !== null &&
                  archives.status !== "failed" ? (
                    filtered.map(item => (
                      <ArchiveRow
                        key={item.student_adm}
                        adm={item.student_adm}
                        studentName={item.student_name}
                        supervisor={item.supervisor_name}
                        projectCode={item.project_code}
                        dateRegistered={moment(item.date_registered).format(
                          "Do MMMM YYYY"
                        )}
                        finishDate={item.due_date}
                      />
                    ))
                  ) : (
                    <tbody>
                      <tr className={classes.center}>
                        <td />
                        <td />
                        <td>NO ARCHIVES</td>
                        <td />
                        <td />
                      </tr>
                    </tbody>
                  )}
                </table>
              </div>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}
ArchiveComponent.propTypes = {
  classes: PropTypes.object,
  name: PropTypes.string,
  supervisor: PropTypes.string,
  project_Code: PropTypes.string,
  date: PropTypes.string,
  finishDate: PropTypes.string,
  adm: PropTypes.string,
  archives: PropTypes.array
};
export default withStyles(styles)(ArchiveComponent);
