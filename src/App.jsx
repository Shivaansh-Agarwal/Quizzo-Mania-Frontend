import { Header, Main, Footer } from "./components/layout";

function App() {
  return (
    <div className="font-poppins h-screen flex flex-col justify-start">
      <Header minHeight="10%" maxHeight="10vh" />
      <Main minHeight="80%" maxHeight="80vh" />
      <Footer minHeight="10%" maxHeight="10vh" />
    </div>
  );
}

export default App;
