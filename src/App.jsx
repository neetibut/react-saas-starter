import { Routes, Route } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import Home from "./pages/Home";
import Pricing from "./pages/Pricing";
import Dashboard from "./pages/Dashboard";
import SignIn from "./pages/SignIn";
import PremiumResource from "./pages/PremiumResource";
import RequireAuth from "./components/RequireAuth";

function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route
          path="/dashboard"
          element={
            <RequireAuth requireSubscription={false}>
              <Dashboard />
            </RequireAuth>
          }
        />
        <Route
          path="/premium"
          element={
            <RequireAuth requireSubscription={true}>
              <PremiumResource />
            </RequireAuth>
          }
        />
        <Route path="/sign-in" element={<SignIn />} />
      </Route>
    </Routes>
  );
}

export default App;
