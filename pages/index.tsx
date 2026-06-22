import Head from 'next/head'
import { useState, useEffect, useRef } from 'react'

// ── Edit your business details here ──────────────────────────────────────────
const BIZ = {
  name:        'Tofu Hauz',
  tagline:     'Fresh. Wholesome. Delicious.',
  description: 'Handcrafted tofu-based dishes made with love — plant-powered eating that never compromises on taste.',
  address:     'No. 196, Jalan Dillenia 5, Laman Dillenia, 71800 Nilai, Negeri Sembilan, Malaysia',
  phone:       '+60 12-XXX XXXX',
  whatsapp:    '601XXXXXXXXX',
  email:       'hello@tofuhauz.com',
  hoursWeekday:'Mon – Fri  |  10:00 AM – 9:00 PM',
  hoursWeekend:'Sat – Sun  |  9:00 AM – 10:00 PM',
  instagram:   'https://instagram.com/tofuhauz',
  facebook:    'https://facebook.com/tofuhauz',
}
// ─────────────────────────────────────────────────────────────────────────────

const MENU = [
  { name:'Silken Tofu Bowl',  desc:'Smooth silken tofu on jasmine rice, drenched in our house garlic soy broth with spring onion oil.', price:'RM 12.90', badge:'Best Seller', badgeColor:'bg-amber-400/20 text-amber-300',  emoji:'🍚' },
  { name:'Crispy Tofu Katsu', desc:'Panko-crusted tofu fillet, golden-fried and served with house katsu sauce and shredded cabbage.',    price:'RM 14.90', badge:'Fan Fav',    badgeColor:'bg-rose-400/20 text-rose-300',    emoji:'🥢' },
  { name:'Mapo Tofu Bowl',    desc:'Classic Sichuan-inspired silken tofu in a rich, mildly spicy bean-paste broth with minced mushroom.',price:'RM 13.90', badge:'Spicy',      badgeColor:'bg-red-400/20 text-red-300',      emoji:'🌶️' },
  { name:'Tofu Satay Plate',  desc:'Marinated grilled tofu skewers with signature peanut sauce, compressed rice, and cucumber.',         price:'RM 11.90', badge:'Local Twist',badgeColor:'bg-yellow-400/20 text-yellow-300', emoji:'🍡' },
  { name:'Tofu Laksa',        desc:'Creamy coconut laksa broth with silken tofu, rice noodles, crunchy tofu puffs, and sambal.',         price:'RM 13.90', badge:'Signature',  badgeColor:'bg-cyan-400/20 text-cyan-300',    emoji:'🍜' },
  { name:'Tau Fu Fah',        desc:'Traditional silken tofu pudding served warm or chilled with ginger syrup. The perfect sweet ending.',  price:'RM 5.90',  badge:'Dessert',    badgeColor:'bg-purple-400/20 text-purple-300',emoji:'🍮' },
]

const FEATURES = [
  { icon:'🌱', title:'Plant-Based',      text:'Every dish is built around wholesome, plant-forward ingredients with no compromise on flavour.' },
  { icon:'🔪', title:'Made Fresh Daily', text:'We prepare our tofu and sauces in-house every morning for the best quality every single time.' },
  { icon:'💚', title:'Guilt-Free',       text:'High in protein, low in cholesterol — eating well has never tasted this good.' },
]

const TESTIMONIALS = [
  { name:'Aisyah R.', rating:5, text:'The Silken Tofu Bowl is life-changing. I come here every week — the garlic soy broth is just perfect!' },
  { name:'James T.',  rating:5, text:"Never been a tofu fan until Tofu Hauz. The Crispy Katsu converted me. My whole office orders from here now." },
  { name:'Priya N.',  rating:5, text:'Love the Tau Fu Fah! Reminds me of my childhood but elevated. Great place, very friendly staff too.' },
]

interface Particle { x:number; y:number; vx:number; vy:number; r:number; o:number }

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled]  = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Scroll detection for nav style
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  // Particle constellation canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    const particles: Particle[] = []

    const resize = () => {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()

    const count = Math.min(90, Math.floor((canvas.offsetWidth * canvas.offsetHeight) / 12000))
    for (let i = 0; i < count; i++) {
      particles.push({
        x:  Math.random() * canvas.width,
        y:  Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        r:  Math.random() * 1.6 + 0.4,
        o:  Math.random() * 0.5 + 0.25,
      })
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (const p of particles) {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(74,222,128,${p.o})`
        ctx.fill()
      }
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const d  = Math.sqrt(dx * dx + dy * dy)
          if (d < 140) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(74,222,128,${(1 - d / 140) * 0.22})`
            ctx.lineWidth = 0.6
            ctx.stroke()
          }
        }
      }
      animId = requestAnimationFrame(draw)
    }
    draw()
    window.addEventListener('resize', resize)
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
  }, [])

  const waLink = `https://wa.me/${BIZ.whatsapp}?text=Hi%20Tofu%20Hauz!%20I'd%20like%20to%20place%20an%20order%20%F0%9F%8D%BD%EF%B8%8F`

  return (
    <>
      <Head>
        <title>{BIZ.name} — {BIZ.tagline}</title>
        <meta name="description" content={BIZ.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content={BIZ.name} />
        <meta property="og:description" content={BIZ.description} />
      </Head>

      {/* ── WhatsApp floating button ── */}
      <a href={waLink} target="_blank" rel="noopener noreferrer" className="whatsapp-btn" aria-label="Order on WhatsApp">
        <svg width="30" height="30" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>

      {/* ── Navigation ── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-black/80 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/40' : 'bg-transparent'}`}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-2">
            <span className="text-2xl">🫘</span>
            <span className="text-xl font-bold gradient-text" style={{fontFamily:'Playfair Display, serif'}}>{BIZ.name}</span>
          </a>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            {['Menu','About','Testimonials','Contact'].map(s => (
              <a key={s} href={`#${s.toLowerCase()}`} className="nav-link hover:text-green-400 transition-colors">{s}</a>
            ))}
            <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn-neon text-white px-5 py-2 rounded-full text-sm font-semibold">
              Order Now
            </a>
          </div>
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 rounded-lg text-slate-300 hover:bg-white/10 transition-colors" aria-label="Toggle menu">
            <div className="w-5 h-0.5 bg-current mb-1"></div>
            <div className="w-5 h-0.5 bg-current mb-1"></div>
            <div className="w-5 h-0.5 bg-current"></div>
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden glass border-t border-white/10 px-6 py-4 flex flex-col gap-4 text-sm font-medium text-slate-300">
            {['Menu','About','Testimonials','Contact'].map(s => (
              <a key={s} href={`#${s.toLowerCase()}`} onClick={() => setMenuOpen(false)} className="hover:text-green-400 transition-colors">{s}</a>
            ))}
            <a href={waLink} target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)}
              className="btn-neon text-white text-center px-5 py-2.5 rounded-full font-semibold">
              Order via WhatsApp
            </a>
          </div>
        )}
      </nav>

      <main id="top">

        {/* ── Hero ── */}
        <section className="relative min-h-screen flex items-center justify-center px-6 pt-20 pb-16 overflow-hidden" style={{background:'#050d1a'}}>
          {/* Particle canvas */}
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{zIndex:1}} />

          {/* Aurora blobs */}
          <div className="aurora-blob aurora-1" style={{zIndex:2}} />
          <div className="aurora-blob aurora-2" style={{zIndex:2}} />
          <div className="aurora-blob aurora-3" style={{zIndex:2}} />

          {/* Cyber grid */}
          <div className="absolute inset-0 cyber-grid pointer-events-none" style={{zIndex:3}} />

          {/* Scan line */}
          <div className="scan-line" style={{zIndex:4}} />

          {/* Content */}
          <div className="max-w-4xl mx-auto text-center relative" style={{zIndex:10}}>
            <div className="animate-float text-6xl md:text-8xl mb-8 drop-shadow-[0_0_30px_rgba(34,197,94,0.5)]">🫘</div>

            <div className="animate-fade-up" style={{animationDelay:'0.1s'}}>
              <span className="inline-block glass border border-green-500/30 text-green-400 text-xs font-semibold tracking-widest uppercase px-5 py-2 rounded-full mb-7">
                ✦ Plant-Based · Made Fresh Daily ✦
              </span>
            </div>

            <h1 className="animate-fade-up text-6xl md:text-8xl font-extrabold mb-5 leading-none gradient-text"
              style={{animationDelay:'0.2s',fontFamily:'Playfair Display, serif'}}>
              {BIZ.name}
            </h1>

            <p className="animate-fade-up text-xl md:text-2xl text-slate-300 font-light mb-5 tracking-wide"
              style={{animationDelay:'0.3s'}}>
              {BIZ.tagline}
            </p>

            <p className="animate-fade-up text-slate-400 max-w-xl mx-auto mb-12 leading-relaxed"
              style={{animationDelay:'0.4s'}}>
              {BIZ.description}
            </p>

            <div className="animate-fade-up flex flex-col sm:flex-row gap-4 justify-center"
              style={{animationDelay:'0.5s'}}>
              <a href="#menu" className="btn-neon text-white px-9 py-4 rounded-full font-semibold text-base">
                Explore Our Menu
              </a>
              <a href={waLink} target="_blank" rel="noopener noreferrer"
                className="glass border border-green-500/30 text-green-400 px-9 py-4 rounded-full font-semibold text-base flex items-center justify-center gap-2 hover:border-green-400/60 hover:bg-green-500/10 transition-all">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Order on WhatsApp
              </a>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-green-500/50" style={{zIndex:10}}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12l7 7 7-7"/>
            </svg>
          </div>
        </section>

        {/* ── Feature Strip ── */}
        <section className="py-16 px-6 relative overflow-hidden" style={{background:'#07101f'}}>
          <div className="absolute inset-0 cyber-grid opacity-60 pointer-events-none" />
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
            {FEATURES.map((f) => (
              <div key={f.title} className="glass glass-hover rounded-2xl p-8 text-center">
                <div className="text-4xl mb-4">{f.icon}</div>
                <h3 className="text-lg font-bold text-white mb-2">{f.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{f.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Menu ── */}
        <section id="menu" className="py-24 px-6 relative overflow-hidden" style={{background:'#050d1a'}}>
          {/* Background aurora */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none"
            style={{background:'radial-gradient(ellipse,rgba(34,197,94,0.08) 0%,transparent 70%)'}} />

          <div className="max-w-6xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <p className="text-green-400 text-xs font-semibold tracking-widest uppercase mb-3">What We Serve</p>
              <h2 className="text-4xl md:text-5xl font-bold text-white">Our Menu</h2>
              <div className="section-divider"></div>
              <p className="text-slate-400 mt-6 max-w-xl mx-auto">
                Every dish is crafted fresh with the finest tofu and seasonal ingredients. Simple food, serious flavour.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {MENU.map((item) => (
                <div key={item.name} className="glass glass-hover rounded-2xl p-6">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-4xl drop-shadow-[0_0_12px_rgba(34,197,94,0.4)]">{item.emoji}</span>
                    <span className={`menu-badge ${item.badgeColor} border border-current/30`}>{item.badge}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{item.name}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-5">{item.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-green-400 font-bold text-lg" style={{textShadow:'0 0 12px rgba(34,197,94,0.5)'}}>{item.price}</span>
                    <a href={`${waLink}&text=Hi%20Tofu%20Hauz!%20I%27d%20like%20to%20order%20the%20${encodeURIComponent(item.name)}`}
                      target="_blank" rel="noopener noreferrer"
                      className="btn-neon text-white text-xs font-bold px-4 py-2 rounded-full">
                      Order
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-14">
              <p className="text-slate-500 text-sm mb-4">Can&apos;t decide? Let us help!</p>
              <a href={waLink} target="_blank" rel="noopener noreferrer"
                className="btn-neon inline-flex items-center gap-2 text-white px-8 py-4 rounded-full font-semibold">
                Chat with Us on WhatsApp
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* ── About ── */}
        <section id="about" className="py-24 px-6 relative overflow-hidden" style={{background:'#07101f'}}>
          <div className="absolute inset-0 cyber-grid opacity-50 pointer-events-none" />
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center relative z-10">
            {/* Visual */}
            <div className="relative">
              <div className="glass rounded-3xl h-80 flex items-center justify-center text-8xl border border-green-500/20"
                style={{boxShadow:'0 0 60px rgba(34,197,94,0.1), inset 0 0 60px rgba(34,197,94,0.05)'}}>
                🫘
              </div>
              <div className="absolute -bottom-6 -right-6 glass rounded-2xl w-32 h-32 flex items-center justify-center text-5xl border border-cyan-500/20"
                style={{boxShadow:'0 0 30px rgba(6,182,212,0.15)'}}>
                💚
              </div>
            </div>
            {/* Text */}
            <div>
              <p className="text-green-400 text-xs font-semibold tracking-widest uppercase mb-3">Our Story</p>
              <h2 className="text-4xl font-bold text-white mb-6">Why We Started Tofu Hauz</h2>
              <div className="section-divider" style={{margin:'0 0 24px'}}></div>
              <p className="text-slate-400 leading-relaxed mb-4">
                We started Tofu Hauz from a simple belief — that plant-based food should be exciting, satisfying, and accessible to everyone. No bland salads. No sad substitutes.
              </p>
              <p className="text-slate-400 leading-relaxed mb-6">
                Every bowl, skewer, and dessert we serve is a testament to what tofu can really do when it&apos;s treated with care, creativity, and good spices.
              </p>
              <blockquote className="border-l-2 border-green-500 pl-4 italic text-green-300 text-lg"
                style={{textShadow:'0 0 20px rgba(34,197,94,0.3)'}}>
                &quot;Great food starts with great ingredients and a lot of love.&quot;
              </blockquote>
            </div>
          </div>
        </section>

        {/* ── Testimonials ── */}
        <section id="testimonials" className="py-24 px-6 relative overflow-hidden" style={{background:'#050d1a'}}>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] pointer-events-none"
            style={{background:'radial-gradient(ellipse,rgba(6,182,212,0.08) 0%,transparent 70%)'}} />

          <div className="max-w-6xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <p className="text-cyan-400 text-xs font-semibold tracking-widest uppercase mb-3">Happy Customers</p>
              <h2 className="text-4xl md:text-5xl font-bold text-white">What People Say</h2>
              <div className="section-divider"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {TESTIMONIALS.map((t) => (
                <div key={t.name} className="testimonial-card relative glass glass-hover rounded-2xl p-8">
                  <div className="flex mb-4">
                    {Array.from({length:t.rating}).map((_,i) => (
                      <span key={i} className="text-amber-400 text-lg" style={{textShadow:'0 0 8px rgba(251,191,36,0.6)'}}>★</span>
                    ))}
                  </div>
                  <p className="text-slate-300 leading-relaxed mb-6 pt-4">{t.text}</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
                      style={{background:'linear-gradient(135deg,#22c55e,#06b6d4)',boxShadow:'0 0 12px rgba(34,197,94,0.4)'}}>
                      {t.name.charAt(0)}
                    </div>
                    <span className="font-semibold text-white">{t.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA Banner ── */}
        <section className="py-20 px-6 relative overflow-hidden" style={{background:'#020810'}}>
          <div className="absolute inset-0 cyber-grid pointer-events-none" />
          <div className="absolute inset-0 pointer-events-none"
            style={{background:'radial-gradient(ellipse at center, rgba(34,197,94,0.1) 0%, transparent 70%)'}} />
          <div className="max-w-2xl mx-auto text-center relative z-10">
            <div className="text-5xl mb-6 drop-shadow-[0_0_20px_rgba(34,197,94,0.5)]">🍽️</div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Order?</h2>
            <p className="text-slate-400 mb-10 leading-relaxed">
              Skip the queue and order ahead via WhatsApp. We&apos;ll have your food ready for pickup or arrange delivery.
            </p>
            <a href={waLink} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-3 text-white px-9 py-4 rounded-full font-bold text-base btn-neon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Chat &amp; Order Now
            </a>
          </div>
        </section>

        {/* ── Contact ── */}
        <section id="contact" className="py-24 px-6 relative overflow-hidden" style={{background:'#07101f'}}>
          <div className="absolute inset-0 cyber-grid opacity-50 pointer-events-none" />
          <div className="max-w-5xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <p className="text-cyan-400 text-xs font-semibold tracking-widest uppercase mb-3">Come Visit Us</p>
              <h2 className="text-4xl md:text-5xl font-bold text-white">Find Us</h2>
              <div className="section-divider"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon:'📍', title:'Our Location',  lines:[BIZ.address] },
                { icon:'🕐', title:'Opening Hours', lines:[BIZ.hoursWeekday, BIZ.hoursWeekend] },
                { icon:'📬', title:'Get in Touch',  lines:[BIZ.phone, BIZ.email] },
              ].map((b) => (
                <div key={b.title} className="glass glass-hover rounded-2xl p-8 text-center">
                  <div className="text-4xl mb-4">{b.icon}</div>
                  <h3 className="font-bold text-white mb-3 text-lg">{b.title}</h3>
                  {b.lines.map((line) => (
                    <p key={line} className="text-slate-400 text-sm leading-relaxed">{line}</p>
                  ))}
                </div>
              ))}
            </div>
            {/* Social links */}
            <div className="flex justify-center gap-6 mt-12">
              <a href={BIZ.instagram} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-white px-6 py-3 rounded-full text-sm font-semibold transition-all hover:scale-105"
                style={{background:'linear-gradient(135deg,#833ab4,#fd1d1d,#fcb045)',boxShadow:'0 0 20px rgba(253,29,29,0.3)'}}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
                Instagram
              </a>
              <a href={BIZ.facebook} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-white px-6 py-3 rounded-full text-sm font-semibold transition-all hover:scale-105"
                style={{background:'#1877f2',boxShadow:'0 0 20px rgba(24,119,242,0.3)'}}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook
              </a>
            </div>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer className="py-10 px-6 text-center text-sm border-t border-white/5" style={{background:'#020810'}}>
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="text-2xl">🫘</span>
              <span className="text-lg font-bold gradient-text" style={{fontFamily:'Playfair Display, serif'}}>{BIZ.name}</span>
            </div>
            <p className="text-slate-600 mb-2">{BIZ.tagline}</p>
            <p className="text-slate-700">© {new Date().getFullYear()} {BIZ.name}. All rights reserved.</p>
          </div>
        </footer>

      </main>
    </>
  )
}
