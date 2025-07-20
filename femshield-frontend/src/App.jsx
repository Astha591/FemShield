import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Pcos from "./pages/Pcos";
import BreastCancer from "./pages/BreastCancer";
import CervicalCancer from "./pages/CervicalCancer";
import PregnancyRisk from "./pages/PregnancyRisk";
import Thyroid from "./pages/Thyroid";
import CycleTracker from "./pages/CycleTracker";
import Tools from "./components/Tools";
import Telehealth from "./pages/Telehealth";
import About from "./pages/About";
import Layout from "./components/Layout"; // Import the new layout

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="pcos" element={<Pcos />} />
        <Route path="pregnancy" element={<PregnancyRisk />} />
        <Route path="breastCancer" element={<BreastCancer />} />
        <Route path="cervicalCancer" element={<CervicalCancer />} />
        <Route path="thyroid" element={<Thyroid />} />
        <Route path="cycle-tracker" element={<CycleTracker />} />
        <Route path="tools" element={<Tools />} />
        <Route path="telehealth" element={<Telehealth />} />
        <Route path="about" element={<About />} />
      </Route>
    </Routes>
  );
}

export default App;
