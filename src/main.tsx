// React and ReactDOM imports
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// Third-party libraries
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { Analytics } from "@vercel/analytics/react";

// Local imports
import { store } from "./app/store";
import theme from "./styles/theme";
import GlobalStyle from "./styles/GlobalStyle";
import GlobalErrorFallback from "./common/components/GlobalErrorFallback";
import NotFoundPage from "./pages/NotFoundPage";
import Home from "./pages/Home/Home";
import WeatherDashboard from "./pages/WeatherDashboard/WeatherDashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ErrorBoundary FallbackComponent={GlobalErrorFallback}>
        <Home />
      </ErrorBoundary>
    ),
    errorElement: <NotFoundPage />,
  },
  {
    path: "/weather",
    element: (
      <ErrorBoundary FallbackComponent={GlobalErrorFallback}>
        <WeatherDashboard />
      </ErrorBoundary>
    ),
    errorElement: <NotFoundPage />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <RouterProvider router={router} />
        <Analytics />
      </ThemeProvider>
    </Provider>
  </StrictMode>
);
