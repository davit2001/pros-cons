import Box from "@mui/material/Box";
import './index.css';
import ProsConsList from "./components/ProsConsList";
import Slider from "./components/Slider";

const App = () => {

  return (
    <Box className="App">
      <Slider />
      <ProsConsList />
    </Box>
  )
}

export default App
