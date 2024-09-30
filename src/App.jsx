import Hero from "./components/Hero"
import Highlights from "./components/Highlights"
import Model from "./components/model"
import Navbar from "./components/Navbar"


const App = () => {
  return (
   <main className="bg-black">
    <Navbar/>
    <Hero/>
    <Highlights/>
    <Model/>
   
   </main>
    
   
  )
}

export default App