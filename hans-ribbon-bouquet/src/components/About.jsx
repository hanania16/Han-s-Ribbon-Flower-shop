import { useEffect, useRef } from 'react';

export default function About() {
  const countRefs = useRef([]);

  useEffect(() => {
    const animateCount = (el, target, duration = 1500) => {
      let start = null;
      const step = (ts) => {
        if (!start) start = ts;
        const progress = Math.min((ts - start) / duration, 1);
        el.textContent = Math.floor(progress * target) + (target > 10 ? '+' : '');
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    const countEls = countRefs.current.filter(el => el);
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting && !e.target.dataset.counted) {
          e.target.dataset.counted = true;
          animateCount(e.target, parseInt(e.target.dataset.target));
        }
      });
    }, { threshold: 0.5 });

    countEls.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about">
      <div className="section-inner">
        <div className="about-grid">
          <div className="about-img-wrap reveal-left">
            <img src="https://placehold.co/600x400/fce4ec/a020f0?text=Our+Floral+Workshop" alt="Floral Workshop" />
          </div>
          <div className="about-text reveal-right">
            <div className="section-label" style={{textAlign:'left',marginBottom:'0.5rem'}}>— Our Story —</div>
            <h2>Crafted with<br/><em>Love & Passion</em></h2>
            <p>At Han's Ribbon Bouquet, we believe flowers are more than just gifts—they are expressions of emotion, artfully arranged to convey your deepest sentiments.</p>
            <p>Each bouquet is meticulously handcrafted, blending tradition with modern aesthetics, ensuring a unique and memorable piece of floral artistry for every occasion.</p>
            <p>We are dedicated to sourcing the freshest, most beautiful blooms, creating designs that truly resonate with our customers.</p>
            <div className="stat-row">
              <div className="stat">
                <span className="stat-num" data-target="500" ref={el => countRefs.current[0] = el}>0</span>
                <span className="stat-label">Bouquets Made</span>
              </div>
              <div className="stat">
                <span className="stat-num" data-target="200" ref={el => countRefs.current[1] = el}>0</span>
                <span className="stat-label">Happy Clients</span>
              </div>
              <div className="stat">
                <span className="stat-num" data-target="3" ref={el => countRefs.current[2] = el}>0</span>
                <span className="stat-label">Years Crafting</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
