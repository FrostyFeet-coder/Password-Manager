import Footer from "./Components/Footer";
import Manager from "./Components/Manager"
import Navbar from "./Components/Navbar"

function App() {

  return (
    <>
      <Navbar />
      <div className="min-h-[88vh]">
        {" "}
        <Manager />
      </div>
      {/* <div className="min-h-[2]"> */}
        <Footer />
      {/* </div> */}
    </>
  );
}

export default App
