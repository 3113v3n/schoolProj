import React from "react";
import MUIDataTable from "mui-datatables";
import moment from "moment";
import PropTypes from "prop-types";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
const columns = [
  {
    name: "Admission",
    options: {
      filter: true
    }
  },
  {
    name: "Student Name",
    options: {
      filter: true
    }
  },
  {
    name: "supervisor",
    options: {
      filter: true
    }
  },
  {
    name: "project Code",
    options: {
      filter: true
    }
  },
  {
    name: "date Registered",
    options: {
      filter: true
    }
  },
  {
    name: "Finish Date",
    options: {
      filter: true
    }
  }
];

const options = {
  filter: true,
  filterType: "dropdown"
};

class Archives extends React.Component {
  getMuiTheme = () =>
    createMuiTheme({
      overrides: {
        MUIDataTableBodyCell: {
          root: {
            backgroundColor: "#FFF"
          }
        }
      }
    });
  render() {
    const { archives } = this.props;
    const data = archives.map(item => [
      item.student_adm,
      item.student_name,
      item.supervisor_name,
      item.project_code,
      moment(item.date_registered).format("Do MMMM YYYY"),
      item.due_date
    ]);
    return (
      <MuiThemeProvider theme={this.getMuiTheme}>
        <MUIDataTable
          title={"Archives Table"}
          data={data}
          columns={columns}
          options={options}
        />
      </MuiThemeProvider>
    );
  }
}
Archives.propTypes = {
  archives: PropTypes.array
};
export default Archives;
