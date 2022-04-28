import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import NotFound from './pages/NotFound';
import Navbar from './components/layout/Navbar';
import User from './components/layout/User';
import Footer from './components/layout/Footer';
import { GithubProvider } from './context/github/GithubContext';
import { AlertProvider } from './context/alert/AlertContext'

function App() {
  return (
    <GithubProvider>
      <AlertProvider>
        <Router>
          <div className="flex flex-col justify-between h-screen">
            <Navbar />

            <main className="container mx-auto px-3 pb-12">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path='/user/:login' element={<User />}/>  {/* :login è un parametro che conterrà il nome del login (vedi params in User.jsx)*/}
                <Route path="/notfound" element={<NotFound />} />
                <Route path="/*" element={<NotFound />} />
                {/*asterisco indica qualsiasi altra cosa */}
              </Routes>
            </main>

            <Footer />
          </div>
        </Router>
      </AlertProvider>
    </GithubProvider>
  );
}

export default App;
