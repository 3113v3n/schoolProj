import React from "react";
import ArchiveComponent from "../../views/Archives/ArchiveComponent.jsx";

class Archives extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      adm: "11947",
      studentName: "Sidney Reezy",
      supervisor: " Mr. Gitau",
      project_Code: " 200",
      date: "20-12-2018",
      finishDate: "23-04-2019"
    };
  }
  render() {
    const {
      studentName,
      supervisor,
      project_Code,
      date,
      finishDate,
      adm
    } = this.state;
    return (
      <div>
        <ArchiveComponent
          name={studentName}
          supervisor={supervisor}
          project_Code={project_Code}
          date={date}
          finishDate={finishDate}
          adm={adm}
        />
      </div>
    );
  }
}

export default Archives;
