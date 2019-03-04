// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";

import Unarchive from "@material-ui/icons/Unarchive";
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.jsx";
import UserProfile from "views/UserProfile/UserProfile.jsx";
///Administrator
import projectContainer from "./containers/Form/projectContainer.jsx";
import studentContainer from "./containers/Form/studentsContainer.jsx";
import supervisorContainer from "./containers/Form/supervisorContainer.jsx";
import supervisorTable from "./containers/SupervisorTable/supervisorTable.jsx";
import AdminStudents from "./containers/StudentsTable/AdminStudents.jsx";
import Archives from "./containers/Archives/Archives.jsx";
import allocations from "./containers/Allocation/allocations.jsx";

///Supervisor
import studentTable from "./containers/StudentsTable/studentTable";
import Profile from "./views/Supervisor/Profile/Profile";
import progressContainer from "./containers/Form/progressContainer";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: DashboardPage,
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
    path: "/projects",
    name: "Projects",
    rtlName: "پشتیبانی از راست به چپ",
    icon: LibraryBooks,
    component: projectContainer,
    layout: "/admin",
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
    component: UserProfile,
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
    component: Profile,
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
  }
];

export default dashboardRoutes;
