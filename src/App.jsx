import { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { publicRoutes } from "./routes/index";
import { setUser } from "./redux/features/userSlice";
import { jwtDecode } from "jwt-decode";
import DefaultLayout from "./components/layout/DefaultLayout";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const localToken = localStorage.getItem("userToken");
    if (localToken) {
      const { user_id, email, fullName } = jwtDecode(localToken);
      dispatch(setUser({ user_id, email, fullName }));
    }
  }, []);

  return (
    <Router Router>
      <div className="App">
        <Routes>
          {publicRoutes.map((route, index) => {
            let Layout = DefaultLayout;
            if (route.Layout === null) {
              Layout = Fragment;
            } else if (route.Layout) {
              Layout = route.Layout;
            }

            const Page = route.component;

            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
