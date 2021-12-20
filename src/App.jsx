import { Header, Main, Footer } from "./components";

function App() {
  return (
    <div className="font-poppins h-screen flex flex-col justify-start">
      <Header minHeight="10%" maxHeight="10vh" />
      <Main minHeight="78%" maxHeight="78vh" />
      <Footer minHeight="12%" maxHeight="12vh" />
    </div>
  );
}

export default App;
