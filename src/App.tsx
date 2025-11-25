import "./App.css";
import florero from "./Florero.jpg";


function App() {
  return (
    <>
      {/* HEADER */}
      <header className="header">
        <div className="logo">Quest</div>

        <nav className="nav">
          <a href="#">Home</a>
          <a href="#">About</a>
          <a href="#">Courses</a>
          <a href="#">Pages</a>
          <a href="#">Blog</a>
        </nav>
      </header>

      {/* HERO SECTION */}
      <div className="hero">
        <div className="hero-text">
          <h1>
            Grow your skills,<br />define your future
          </h1>

          <p>
            Presenting Academy, the tech school of the future.
            We teach you the right skills to be prepared for tomorrow.
          </p>

          <div className="hero-buttons">
            <button className="btn primary">Explore Courses</button>
            <button className="btn">Learn More</button>
          </div>
        </div>

<div className="hero-image">
  <img src={florero} alt="Florero" />
</div>

      </div>
    </>
  );
}

export default App;
