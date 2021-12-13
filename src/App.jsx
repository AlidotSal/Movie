import React, { Suspense, useState, useLayoutEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import Home from "./pages/Home";
import Nav from "./components/Nav";
import Loading from "./components/Loading";
const Movie = React.lazy(() => import("./pages/Movies"));
const Show = React.lazy(() => import("./pages/TV"));
const Person = React.lazy(() => import("./pages/Person"));
const News = React.lazy(() => import("./pages/News"));
import "./app.css";

export default () => {
  const [theme, setTheme] = useState("light");

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnmount: false,
        refetchOnReconnect: false,
        retry: false,
        staleTime: 1000000,
      },
    },
  });

  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <ScrollToTop />
        <div className={`app ${theme}`}>
          <Nav theme={theme} setTheme={setTheme} />
          <Switch>
            <Route path="/movie/:id">
              <Suspense fallback={<Loading />}>
                <Movie />
              </Suspense>
            </Route>
            <Route path="/tv/:id">
              <Suspense fallback={<Loading />}>
                <Show />
              </Suspense>
            </Route>
            <Route path="/person/:id">
              <Suspense fallback={<Loading />}>
                <Person />
              </Suspense>
            </Route>
            <Route path="/news">
              <Suspense fallback={<Loading />}>
                <News />
              </Suspense>
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </QueryClientProvider>
    </Router>
  );
};

function ScrollToTop() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}
