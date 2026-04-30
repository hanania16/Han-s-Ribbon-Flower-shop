export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-ring" style={{width:'320px',height:'320px',left:'50%',top:'50%',animationDuration:'4s'}}></div>
      <div className="hero-ring" style={{width:'520px',height:'520px',left:'50%',top:'50%',animationDuration:'5s',animationDelay:'0.5s'}}></div>
      <div className="hero-ring" style={{width:'720px',height:'720px',left:'50%',top:'50%',animationDuration:'6s',animationDelay:'1s'}}></div>

      <svg className="hero-badge" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <text x="60" y="75" textAnchor="middle" fontSize="80" fill="#e91e63">✿</text>
      </svg>

      <div className="hero-content">
        <div className="hero-eyebrow">✦ Handcrafted with Love ✦</div>
        <h1>Exquisite<br/><span>Floral Artistry</span></h1>
        <p>Hand-tied bouquets, crafted with passion and elegance for every precious moment.</p>
        <a href="#featured" className="hero-cta">
          <i className="fa-solid fa-seedling"></i>
          Explore Collection
        </a>
      </div>
    </section>
  );
}
