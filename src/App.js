import categories from "./data/categories.json";
import Directory from "./components/directory/directory.component";

const App = () => {
  return <Directory categories={categories} />;
};
export default App;
