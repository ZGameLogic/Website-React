import {createTheme, ThemeProvider} from "@mui/material/styles";
import {CssBaseline} from "@mui/material";
import AppHeader from "./components/AppHeader.tsx";
import {BrowserRouter, Route, Routes} from "react-router";
import DashboardPage from "./pages/dashboard/DashboardPage.tsx";

function App() {
  const theme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#9b3fba'
      }
    },
  });

  return <ThemeProvider theme={theme}>
    <BrowserRouter>
      <CssBaseline />
      <AppHeader />
      <Routes>
        <Route path={'/'} element={<DashboardPage />} />
      </Routes>
    </BrowserRouter>
  </ThemeProvider>;
}

export default App
