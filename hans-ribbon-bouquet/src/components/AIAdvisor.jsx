import { useState, useRef } from 'react';

export default function AIAdvisor() {
  const [prompt, setPrompt] = useState('');
  const [recommendation, setRecommendation] = useState('');
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const recommendBouquet = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setShowResults(false);

    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          messages: [{
            role: 'user',
            content: `You are a warm, expert florist at Han's Ribbon Bouquet. Based on the customer's request, suggest a perfect bouquet arrangement with flower types, colors, and a heartfelt message card idea. Keep it concise, poetic, and beautiful (3-4 sentences). Customer request: "${prompt}"`
          }]
        })
      });
      const data = await res.json();
      const reply = data.content?.map(b => b.text || '').join('') || 'Something went wrong. Please try again.';
      setRecommendation(reply);
      setShowResults(true);
    } catch (err) {
      setRecommendation('Unable to connect right now. Please try again shortly.');
      setShowResults(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="advisor" className="advisor-bg">
      <div className="section-inner">
        <div className="reveal">
          <div className="section-label">— Powered by AI —</div>
          <h2 className="section-title">✨ Your Bouquet Advisor</h2>
          <p className="section-sub">Tell us the occasion, recipient, or emotion you want to convey — we'll suggest the perfect arrangement.</p>
        </div>

        <div className="advisor-card reveal">
          <textarea 
            id="advisorPrompt" 
            rows="3" 
            placeholder="e.g., 'A graduation gift for my best friend' or 'Something bright and comforting for a sympathy card'"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          ></textarea>
          <button className="advisor-submit" onClick={recommendBouquet}>
            <i className={`fa-solid fa-wand-magic-sparkles advisor-spinner ${loading ? 'show' : ''}`}></i>
            <i className="fa-solid fa-wand-magic-sparkles" style={{display: loading ? 'none' : ''}}></i>
            Get Personalized Suggestion
          </button>
          {showResults && (
            <div id="advisor-results" style={{display:'block'}}>
              <strong style={{color:'var(--pink)',fontFamily:'Cinzel,serif',fontSize:'0.9rem'}}>Recommendation ✿</strong>
              <div id="recommendation-text" style={{marginTop:'0.75rem'}}>{recommendation}</div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
