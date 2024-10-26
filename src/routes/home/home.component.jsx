import Directory from "../../components/directory/directory.component";
import categories from "../../data/categories.json";

const Home = () => {
  return <Directory categories={categories} />;
};

export default Home;
