// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";

import Unarchive from "@material-ui/icons/Unarchive";
// core components/views for Admin layout
import dashboard from "./containers/Dashboard/dashboard.jsx";
import adminProfile from "./containers/UserProfiles/adminProfile";
///Administrator
import projectContainer from "./containers/Form/projectContainer.jsx";
import studentContainer from "./containers/Form/studentsContainer.jsx";
import supervisorContainer from "./containers/Form/supervisorContainer.jsx";
import supervisorTable from "./containers/SupervisorTable/supervisorTable.jsx";
import AdminStudents from "./containers/StudentsTable/AdminStudents.jsx";
import Archives from "./containers/Archives/Archives.jsx";
import allocations from "./containers/Allocation/allocations.jsx";
import AddAllocationContainer from "./containers/Form/AddAllocationContainer.jsx";
import ProjectsTable from "./containers/Projects/ProjectsTable.jsx";
///Supervisor
import studentTable from "./containers/StudentsTable/studentTable";
import supervisorProfile from "./containers/UserProfiles/supervisorProfile";
import progressContainer from "./containers/Form/progressContainer";
///Edit Table
import EditStudentTable from "./containers/EditTable/EditStudentTable";
import EditAllocations from "./containers/EditTable/EditAllocations";
import EditSupervisorsTable from "./containers/EditTable/EditSupervisorsTable";
import EditProjectTable from "./containers/EditTable/EditProjectTable";
import EditProgress from "./containers/EditTable/EditProgress";
const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: dashboard,
    layout: "/admin",
    admin: 1
  },
  {
    path: "/allocation",
    name: "Allocations",
    rtlName: "پشتیبانی از راست به چپ",
    icon: "content_paste",
    component: allocations,
    layout: "/admin",
    admin: 1
  },
  {
    path: "/AddProjects",
    name: "Projects",
    rtlName: "پشتیبانی از راست به چپ",
    icon: LibraryBooks,
    component: projectContainer,
    layout: "/admin",
    invisible: true,
    admin: 1
  },
  {
    path: "/projectsTable",
    name: "Projects Table",
    rtlName: "پشتیبانی از راست به چپ",
    icon: "content_paste",
    component: ProjectsTable,
    layout: "/admin",
    admin: 1
  },
  {
    path: "/editProjects",
    name: "Projects",
    rtlName: "پشتیبانی از راست به چپ",
    icon: LibraryBooks,
    component: EditProjectTable,
    layout: "/admin",
    invisible: true,
    admin: 1
  },
  {
    path: "/superTable",
    name: "Supervisor Table",
    rtlName: "پشتیبانی از راست به چپ",
    icon: "content_paste",
    component: supervisorTable,
    layout: "/admin",
    admin: 1
  },
  {
    path: "/adminStudents",
    name: "Students",
    rtlName: "پشتیبانی از راست به چپ",
    icon: "content_paste",
    component: AdminStudents,
    layout: "/admin",
    admin: 1
  },
  {
    path: "/supervisor",
    name: "Supervisors",
    rtlName: "پشتیبانی از راست به چپ",
    icon: Person,
    component: supervisorContainer,
    layout: "/admin",
    invisible: true
  },
  {
    path: "/students",
    name: "Students",
    rtlName: "پشتیبانی از راست به چپ",
    icon: Person,
    component: studentContainer,
    layout: "/admin",
    invisible: true
  },
  {
    path: "/archives",
    name: "Archive Table",
    rtlName: "پشتیبانی از راست به چپ",
    icon: Unarchive,
    component: Archives,
    layout: "/admin",
    admin: 1
  },
  {
    path: "/user",
    name: "Admin Profile",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Person,
    component: adminProfile,
    layout: "/admin",
    admin: 1
  },
  {
    path: "/studentTable",
    name: "Student Table",
    rtlName: "پشتیبانی از راست به چپ",
    icon: "content_paste",
    component: studentTable,
    layout: "/admin",
    supervisor: 1
  },
  {
    path: "/profile",
    name: "Settings ",
    rtlName: "پشتیبانی از راست به چپ",
    icon: Person,
    component: supervisorProfile,
    layout: "/admin",
    supervisor: 1
  },
  {
    path: "/progress",
    name: "Progress Report",
    rtlName: "پشتیبانی از راست به چپ",
    icon: Person,
    component: progressContainer,
    layout: "/admin",
    invisible: true
  },
  {
    path: "/editProgress",
    name: "Progress Report",
    rtlName: "پشتیبانی از راست به چپ",
    icon: Person,
    component: EditProgress,
    layout: "/admin",
    invisible: true
  },
  {
    path: "/editAllocations",
    name: "Edit Allocations",
    rtlName: "پشتیبانی از راست به چپ",
    icon: Person,
    component: EditAllocations,
    layout: "/admin",
    invisible: true
  },
  {
    path: "/editStudentTable",
    name: "Students Table",
    rtlName: "پشتیبانی از راست به چپ",
    icon: Person,
    component: EditStudentTable,
    layout: "/admin",
    invisible: true
  },
  {
    path: "/editSupervisorTable",
    name: "Edit Supervisors",
    rtlName: "پشتیبانی از راست به چپ",
    icon: Person,
    component: EditSupervisorsTable,
    layout: "/admin",
    invisible: true
  },
  {
    path: "/addAllocation",
    name: "Add Allocation",
    rtlName: "پشتیبانی از راست به چپ",
    component: AddAllocationContainer,
    layout: "/admin",
    invisible: true
  }
];

export default dashboardRoutes;
