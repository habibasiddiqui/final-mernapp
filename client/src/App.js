import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";


import Users from "./components/users/Users";
import Header from "./components/Header";
import SingleUser from "./components/users/SingleUser";
import Home from "./components/Home";
import Posts from "./components/posts/Posts";
import AddPost from "./components/posts/AddPost";
import SinglePost from "./components/posts/SinglePost";
import EditPost from "./components/posts/EditPost";
import SinglePostHome from "./components/posts/SinglePostHome";
import Signin from "./components/authorization/Signin";
import Signup from "./components/authorization/Signup";
import SignOut from "./components/authorization/SignOut";
import EditDialog from "./components/posts/EditDialog";
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div>
          <Header />

          <Switch>
            {/* User */}
            
            <Route path="/users">
              <Users />
            </Route>
            <Route path="/single-user/:id">
              <SingleUser />
            </Route>

            {/* Post */}
            <Route path="/posts">
              <Posts />
            </Route>

            <Route path="/add-post">
              <AddPost />
            </Route>

            <Route path="/single-post/:id">
              <SinglePost />
            </Route>

            <Route path="/edit-post/:id">
              {/* <EditPost /> */}
              <EditDialog />
            </Route>
            <Route path="/single-post-home/:id">
              <SinglePostHome />
            </Route>

            {/* auth */}
            <Route path="/signin">
              <Signin />
            </Route>
            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="/signout">
              <SignOut />
            </Route>

            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
