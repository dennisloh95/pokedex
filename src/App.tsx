import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import CustomPokedex from "./pages/CustomPokedex";
import Error from "./pages/Error";
import Home from "./pages/Home";
import Pokemon from "./pages/Pokemon";

function App() {
  const router = createBrowserRouter([
    {
      element: <Layout />,
      errorElement: <Error />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/custom-pokedex",
          element: <CustomPokedex />,
        },
        {
          path: "/pokemon/:pokemonIndex",
          element: <Pokemon />,
        },
      ],
    },
  ]);
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
