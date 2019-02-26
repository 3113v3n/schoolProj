// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";

import Unarchive from "@material-ui/icons/Unarchive";
import Language from "@material-ui/icons/Language";
import allocations from "views/Allocation/allocations.jsx";
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.jsx";
import UserProfile from "views/UserProfile/UserProfile.jsx";
import Projects from "views/Forms/Projects/Projects.jsx";
import Students from "views/Forms/Students/Students.jsx";
import Supervisors from "views/Forms/Supervisors/Supervisor.jsx";
import superTable from "views/Supervisor/Table/superTable.jsx";
import AdminStudents from "views/Students/AdminStudents.jsx";
import Archives from "views/Archives/Archives.jsx";
// core components/views for SuperVisor layout
import Progress from "views/Forms/Progress/Progress.jsx";
import Profile from "views/Supervisor/Profile/Profile.jsx";
import studentTable from "views/Students/studentTable.jsx";
import RTLPage from "views/RTLPage/RTLPage.jsx";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "پشتیبانی از راست به چپ",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin"
  },
  {
    path: "/allocation",
    name: "Allocations",
    rtlName: "پشتیبانی از راست به چپ",
    icon: "content_paste",
    component: allocations,
    layout: "/admin"
  },
  {
    path: "/projects",
    name: "Projects",
    rtlName: "پشتیبانی از راست به چپ",
    icon: LibraryBooks,
    component: Projects,
    layout: "/admin"
  },
  {
    path: "/allocation",
    name: "Allocations",
    rtlName: "پشتیبانی از راست به چپ",
    icon: "content_paste",
    component: superTable,
    layout: "/admin"
  },
  {
    path: "/allocation",
    name: "Allocations",
    rtlName: "پشتیبانی از راست به چپ",
    icon: "content_paste",
    component: AdminStudents,
    layout: "/admin"
  },
  {
    path: "/allocation",
    name: "Allocations",
    rtlName: "پشتیبانی از راست به چپ",
    icon: Person,
    component: Supervisors,
    layout: "/admin"
  },
  {
    path: "/allocation",
    name: "Allocations",
    rtlName: "پشتیبانی از راست به چپ",
    icon: Person,
    component: Students,
    layout: "/admin"
  },
  {
    path: "/archives",
    name: "Archive Table",
    rtlName: "پشتیبانی از راست به چپ",
    icon: Unarchive,
    component: Archives,
    layout: "/admin"
  },
  {
    path: "/allocation",
    name: "Allocations",
    rtlName: "پشتیبانی از راست به چپ",
    component: Progress,
    layout: "/admin"
  },
  {
    path: "/allocation",
    name: "Allocations",
    rtlName: "پشتیبانی از راست به چپ",
    icon: "content_paste",
    component: studentTable,
    layout: "/admin"
  },
  {
    path: "/allocation",
    name: "Allocations",
    rtlName: "پشتیبانی از راست به چپ",
    icon: Person,
    component: Profile,
    layout: "/admin"
  },
  {
    path: "/users",
    name: "Admin Profile",
    rtlName: "پشتیبانی از راست به چپ",
    icon: Person,
    component: UserProfile,
    layout: "/admin"
  },
  {
    path: "/rtl-page",
    name: "RTL Support",
    rtlName: "پشتیبانی از راست به چپ",
    icon: Language,
    component: RTLPage,
    layout: "/rtl"
  }
];

export default dashboardRoutes;
