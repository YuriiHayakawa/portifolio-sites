import React, { useState, useEffect, useRef } from "react";
import {
  Sparkles, Droplet, Wind, Sun, Leaf, HeartPulse, MapPin, Clock, Phone,
  MessageCircle, Menu as MenuIcon, X, Star, Check, Instagram, ChevronRight,
  ChevronLeft, Quote,
} from "lucide-react";

const C = {
  noir: "#1A1116",
  noirSoft: "#2B1E24",
  ivory: "#FBF6F1",
  blush: "#F4E3DE",
  blushDeep: "#EBCFC8",
  rose: "#C77B76",
  roseDeep: "#9C4F52",
  gold: "#C9A063",
  goldLight: "#E4C989",
  ink: "#2B1E24",
  inkSoft: "#6E5B60",
};

const CATEGORIAS = ["Rosto", "Corpo", "Bem-estar"];

const PROCEDIMENTOS = [
  { nome: "Harmonização facial", cat: "Rosto", icon: Sparkles, desc: "Equilíbrio e simetria com técnicas minimamente invasivas.", big: true },
  { nome: "Limpeza de pele", cat: "Rosto", icon: Droplet, desc: "Renovação profunda para uma pele mais luminosa." },
  { nome: "Botox", cat: "Rosto", icon: Wind, desc: "Suaviza linhas de expressão com resultado natural." },
  { nome: "Peeling de diamante", cat: "Rosto", icon: Sun, desc: "Esfoliação suave para uniformizar a textura da pele." },
  { nome: "Bioestimuladores", cat: "Corpo", icon: HeartPulse, desc: "Estímulo de colágeno para firmeza duradoura.", big: true },
  { nome: "Depilação a laser", cat: "Corpo", icon: Sparkles, desc: "Redução progressiva e definitiva dos pelos." },
  { nome: "Massagem modeladora", cat: "Corpo", icon: Leaf, desc: "Contorno corporal com técnicas manuais especializadas." },
  { nome: "Drenagem linfática", cat: "Bem-estar", icon: Droplet, desc: "Alívio da retenção e sensação de leveza.", big: true },
];

const EQUIPE = [
  { iniciais: "IF", nome: "Dra. Isabela Franco", area: "Harmonização facial" },
  { iniciais: "TL", nome: "Thaís Lemos", area: "Terapeuta corporal" },
  { iniciais: "PC", nome: "Dra. Paula Coutinho", area: "Dermatologia estética" },
];

const DEPOIMENTOS = [
  { nome: "Renata C.", texto: "Ambiente impecável e os resultados sempre muito naturais, nunca exagerados. Saí de lá me sentindo mais eu mesma." },
  { nome: "Vitória M.", texto: "A equipe explica cada etapa com calma, me senti muito segura do início ao fim do procedimento." },
  { nome: "Aline S.", texto: "Virei cliente fixa depois da primeira limpeza de pele. Atendimento impecável, sempre no horário." },
];

const FAQ = [
  { q: "Preciso de avaliação antes do procedimento?", a: "Sim, toda cliente passa por uma avaliação inicial para entender o histórico e definir o plano ideal." },
  { q: "Os resultados são naturais?", a: "Trabalhamos sempre com resultados discretos e proporcionais aos traços de cada pessoa." },
  { q: "Quanto tempo dura uma sessão?", a: "Varia por procedimento, entre 40 minutos e 1h30, informado com detalhes na avaliação." },
];

const WHATSAPP_URL = "https://wa.me/5561977776666";
const TICKER_WORDS = ["Harmonização", "Skincare", "Peeling", "Bem-estar", "Autoestima", "Bioestímulo", "Autocuidado"];

function BloomSVG() {
  const stemRef = useRef(null);
  const petalRefs = useRef([]);
  useEffect(() => {
    const draw = (el, delay) => {
      if (!el) return;
      const len = el.getTotalLength();
      el.style.strokeDasharray = len;
      el.style.strokeDashoffset = len;
      requestAnimationFrame(() => {
        el.style.transition = `stroke-dashoffset 1.1s ease ${delay}ms`;
        el.style.strokeDashoffset = 0;
      });
    };
    draw(stemRef.current, 0);
    petalRefs.current.forEach((el, i) => draw(el, 500 + i * 160));
  }, []);

  const petals = [0, 60, 120, 180, 240, 300].map((deg, i) => {
    const rad = (deg * Math.PI) / 180;
    const cx = 210 + Math.cos(rad) * 46;
    const cy = 140 + Math.sin(rad) * 46;
    return (
      <ellipse
        key={i}
        ref={(el) => (petalRefs.current[i] = el)}
        cx={cx}
        cy={cy}
        rx="30"
        ry="16"
        transform={`rotate(${deg} ${cx} ${cy})`}
        fill="none"
        stroke={C.goldLight}
        strokeWidth="1.4"
      />
    );
  });

  return (
    <svg viewBox="0 0 420 480" width="100%" height="100%" style={{ maxWidth: 420 }}>
      <path ref={stemRef} d="M 210 460 C 205 360 215 260 210 186" fill="none" stroke={C.gold} strokeWidth="1.6" />
      <circle cx="210" cy="140" r="14" fill="none" stroke={C.gold} strokeWidth="1.4" />
      {petals}
    </svg>
  );
}

function Petal({ style }) {
  return (
    <svg viewBox="0 0 40 24" width="34" height="20" style={{ position: "absolute", opacity: 0.35, ...style }}>
      <ellipse cx="20" cy="12" rx="19" ry="10" fill={C.rose} />
    </svg>
  );
}

function Section({ id, bg, children, style }) {
  return (
    <section id={id} style={{ background: bg || C.ivory, padding: "5.5rem 1.5rem", ...style }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>{children}</div>
    </section>
  );
}

function Eyebrow({ children, light }) {
  return (
    <p style={{ color: light ? C.goldLight : C.roseDeep, fontSize: 13.5, letterSpacing: "0.08em", marginBottom: 12, fontWeight: 500, textTransform: "uppercase" }}>
      {children}
    </p>
  );
}

function useInView() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function ProcCard({ p, i }) {
  const [ref, inView] = useInView();
  const [hover, setHover] = useState(false);
  return (
    <div
      ref={ref}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        gridColumn: p.big ? "span 2" : "span 1",
        background: hover ? `linear-gradient(135deg, ${C.rose}, ${C.roseDeep})` : C.ivory,
        border: `1px solid ${hover ? "transparent" : C.blushDeep}`,
        borderRadius: 14,
        padding: "28px 26px",
        opacity: inView ? 1 : 0,
        transform: inView ? (hover ? "translateY(-5px) scale(1.015)" : "translateY(0)") : "translateY(18px)",
        transition: `opacity 0.5s ease ${i * 70}ms, transform 0.35s ease, background 0.35s ease`,
        cursor: "default",
      }}
    >
      <p.icon size={24} color={hover ? C.ivory : C.gold} style={{ marginBottom: 16, transition: "color 0.3s ease" }} />
      <p className="display" style={{ fontSize: 21, marginBottom: 8, fontStyle: "italic", color: hover ? C.ivory : C.ink, transition: "color 0.3s ease" }}>{p.nome}</p>
      <p style={{ fontSize: 14, lineHeight: 1.6, color: hover ? "#FBEAE7" : C.inkSoft, transition: "color 0.3s ease" }}>{p.desc}</p>
    </div>
  );
}

export default function MaisonBelleSite() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cat, setCat] = useState("Rosto");
  const [openFaq, setOpenFaq] = useState(0);
  const [testIdx, setTestIdx] = useState(0);
  const [step, setStep] = useState(0);
  const [proc, setProc] = useState("");
  const [date, setDate] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const filtered = PROCEDIMENTOS.filter((p) => p.cat === cat);

  const nextStep = () => {
    if (step === 0 && !proc) { setError("Escolha um procedimento."); return; }
    if (step === 1 && !date) { setError("Escolha um dia e horário."); return; }
    if (step === 2 && (!name.trim() || !phone.trim())) { setError("Preencha nome e telefone."); return; }
    setError("");
    setStep((s) => s + 1);
  };

  return (
    <div style={{ fontFamily: "'Outfit', sans-serif", color: C.ink, background: C.ivory }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;1,500;1,600&family=Outfit:wght@300;400;500;600&display=swap');
        .display { font-family: 'Playfair Display', serif; }
        a { color: inherit; text-decoration: none; }
        button, select, input { font-family: 'Outfit', sans-serif; cursor: pointer; }
        @keyframes drift1 { 0%,100% { transform: translate(0,0) rotate(0deg); } 50% { transform: translate(24px,-30px) rotate(18deg); } }
        @keyframes drift2 { 0%,100% { transform: translate(0,0) rotate(0deg); } 50% { transform: translate(-30px,24px) rotate(-14deg); } }
        @keyframes drift3 { 0%,100% { transform: translate(0,0) rotate(0deg); } 50% { transform: translate(18px,20px) rotate(10deg); } }
        @keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
        .fade-in { animation: fadeUp 0.6s ease both; }
      `}</style>

      {/* NAV */}
      <header style={{ position: "sticky", top: 0, zIndex: 40, background: "rgba(26,17,22,0.85)", backdropFilter: "blur(8px)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "1.15rem 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <a href="#inicio" className="display" style={{ fontSize: 23, fontStyle: "italic", color: C.ivory }}>Maison Belle</a>
          <nav style={{ display: "flex", gap: 30 }} className="desktop-nav">
            {[["Início", "#inicio"], ["Procedimentos", "#procedimentos"], ["Equipe", "#equipe"], ["Contato", "#agendar"]].map(([l, h]) => (
              <a key={h} href={h} style={{ fontSize: 13.5, color: "#D9C6C2" }}>{l}</a>
            ))}
          </nav>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <a href="#agendar" className="cta-desktop" style={{ display: "none", background: `linear-gradient(120deg, ${C.gold}, ${C.goldLight})`, color: C.noir, padding: "9px 20px", borderRadius: 999, fontSize: 13, fontWeight: 600 }}>
              Agendar avaliação
            </a>
            <button aria-label="Menu" className="menu-btn" onClick={() => setMenuOpen((v) => !v)} style={{ background: "none", border: "none", display: "flex" }}>
              {menuOpen ? <X size={22} color={C.ivory} /> : <MenuIcon size={22} color={C.ivory} />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <div style={{ background: C.noirSoft, padding: "1rem 1.5rem" }}>
            {[["Início", "#inicio"], ["Procedimentos", "#procedimentos"], ["Equipe", "#equipe"], ["Contato", "#agendar"]].map(([l, h]) => (
              <a key={h} href={h} onClick={() => setMenuOpen(false)} style={{ display: "block", padding: "10px 0", fontSize: 16, color: C.ivory, borderBottom: "1px solid #453941" }}>{l}</a>
            ))}
          </div>
        )}
      </header>

      {/* HERO */}
      <div id="inicio" style={{ position: "relative", overflow: "hidden", background: `radial-gradient(circle at 20% 15%, #3A2530 0%, ${C.noir} 60%)`, padding: "5rem 1.5rem 4rem" }}>
        <Petal style={{ top: "18%", left: "8%", animation: "drift1 9s ease-in-out infinite" }} />
        <Petal style={{ top: "62%", left: "14%", animation: "drift2 11s ease-in-out infinite" }} />
        <Petal style={{ top: "30%", left: "88%", animation: "drift3 10s ease-in-out infinite" }} />
        <Petal style={{ top: "78%", left: "80%", animation: "drift1 12s ease-in-out infinite" }} />

        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1.15fr 1fr", gap: 30, alignItems: "center", position: "relative" }} className="hero-grid">
          <div>
            <Eyebrow light>Clínica de estética</Eyebrow>
            <h1 className="display" style={{ fontSize: 56, fontStyle: "italic", fontWeight: 500, lineHeight: 1.08, color: C.ivory, marginBottom: 24 }}>
              Beleza que floresce em você.
            </h1>
            <p style={{ fontSize: 16.5, color: "#D9C6C2", lineHeight: 1.75, maxWidth: 440, marginBottom: 34, fontWeight: 300 }}>
              Procedimentos estéticos pensados para realçar, nunca transformar. Uma experiência calma, do primeiro
              contato ao resultado final.
            </p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <a href="#agendar" style={{ background: `linear-gradient(120deg, ${C.gold}, ${C.goldLight})`, color: C.noir, padding: "14px 28px", borderRadius: 999, fontSize: 14, fontWeight: 600 }}>
                Agendar avaliação
              </a>
              <a href="#procedimentos" style={{ border: "1px solid #5C4650", color: C.ivory, padding: "14px 26px", borderRadius: 999, fontSize: 14 }}>
                Ver procedimentos
              </a>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <BloomSVG />
          </div>
        </div>
      </div>

      {/* TICKER */}
      <div style={{ background: C.rose, padding: "14px 0", overflow: "hidden" }}>
        <div style={{ display: "flex", width: "fit-content", animation: "ticker 22s linear infinite" }}>
          {[...TICKER_WORDS, ...TICKER_WORDS, ...TICKER_WORDS].map((w, i) => (
            <span key={i} style={{ display: "flex", alignItems: "center", gap: 20, whiteSpace: "nowrap", color: C.ivory, fontSize: 14.5, fontWeight: 500, marginRight: 20 }}>
              {w} <Sparkles size={13} color={C.ivory} />
            </span>
          ))}
        </div>
      </div>

      {/* PROCEDIMENTOS */}
      <Section id="procedimentos">
        <Eyebrow>Procedimentos</Eyebrow>
        <h2 className="display" style={{ fontSize: 34, fontWeight: 500, fontStyle: "italic", marginBottom: 30, maxWidth: 560 }}>
          Cuidados sob medida, categoria por categoria.
        </h2>
        <div style={{ display: "flex", gap: 8, marginBottom: 34 }}>
          {CATEGORIAS.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              style={{
                background: cat === c ? C.roseDeep : "transparent",
                color: cat === c ? C.ivory : C.inkSoft,
                border: `1px solid ${cat === c ? C.roseDeep : C.blushDeep}`,
                padding: "9px 22px",
                borderRadius: 999,
                fontSize: 13.5,
                transition: "all 0.25s ease",
              }}
            >
              {c}
            </button>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }} className="proc-grid" key={cat}>
          {filtered.map((p, i) => <ProcCard key={p.nome} p={p} i={i} />)}
        </div>
      </Section>

      {/* RESULTADOS */}
      <Section bg={`linear-gradient(135deg, ${C.blush}, ${C.blushDeep})`}>
        <div style={{ display: "flex", gap: 50, flexWrap: "wrap", justifyContent: "space-around", textAlign: "center" }}>
          {[["+2.400", "clientes atendidas"], ["98%", "indicariam a clínica"], ["12", "procedimentos especializados"]].map(([n, l]) => (
            <div key={l}>
              <p className="display" style={{ fontSize: 42, fontStyle: "italic", color: C.roseDeep }}>{n}</p>
              <p style={{ fontSize: 13.5, color: C.inkSoft }}>{l}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* SOBRE */}
      <Section>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "start" }} className="sobre-grid">
          <div>
            <Eyebrow>Sobre a Maison Belle</Eyebrow>
            <h2 className="display" style={{ fontSize: 30, fontWeight: 500, fontStyle: "italic", marginBottom: 18 }}>
              Um espaço para desacelerar antes de qualquer coisa.
            </h2>
            <p style={{ fontSize: 15, color: C.inkSoft, lineHeight: 1.8 }}>
              A Maison Belle nasceu para ser diferente das clínicas apressadas: aqui, cada consulta começa com
              escuta. Acreditamos em resultados discretos, que valorizam a identidade de cada cliente, apoiados por
              uma equipe especializada e um ambiente pensado para o conforto.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {["Salas privativas e climatizadas", "Protocolos personalizados por avaliação", "Produtos de linhas premium certificadas"].map((t) => (
              <div key={t} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <Check size={16} color={C.roseDeep} style={{ marginTop: 4, flexShrink: 0 }} />
                <p style={{ fontSize: 14.5, color: C.inkSoft }}>{t}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* EQUIPE */}
      <Section bg={C.blush}>
        <Eyebrow>Equipe</Eyebrow>
        <h2 className="display" style={{ fontSize: 30, fontWeight: 500, fontStyle: "italic", marginBottom: 34, maxWidth: 520 }}>
          Especialistas por trás de cada resultado.
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }} className="equipe-grid">
          {EQUIPE.map((m) => (
            <div key={m.nome} style={{ textAlign: "center" }}>
              <div style={{
                width: 76, height: 76, borderRadius: "50%", margin: "0 auto 14px",
                background: C.ivory, border: `2px solid ${C.gold}`, color: C.roseDeep,
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 500,
              }}>
                {m.iniciais}
              </div>
              <p className="display" style={{ fontSize: 18, fontStyle: "italic", marginBottom: 4 }}>{m.nome}</p>
              <p style={{ fontSize: 13, color: C.inkSoft }}>{m.area}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* DEPOIMENTOS - carousel */}
      <Section bg={C.noir}>
        <Eyebrow light>Depoimentos</Eyebrow>
        <h2 className="display" style={{ fontSize: 30, fontWeight: 500, fontStyle: "italic", color: C.ivory, marginBottom: 34, maxWidth: 520 }}>
          Palavras de quem já se sentiu em casa aqui.
        </h2>
        <div style={{ maxWidth: 620, margin: "0 auto", textAlign: "center" }}>
          <Quote size={28} color={C.gold} style={{ marginBottom: 18 }} />
          <p className="display" style={{ fontSize: 22, fontStyle: "italic", color: C.ivory, lineHeight: 1.5, marginBottom: 22 }}>
            "{DEPOIMENTOS[testIdx].texto}"
          </p>
          <p style={{ fontSize: 13.5, color: C.goldLight, marginBottom: 26 }}>{DEPOIMENTOS[testIdx].nome}</p>
          <div style={{ display: "flex", justifyContent: "center", gap: 16, alignItems: "center" }}>
            <button onClick={() => setTestIdx((i) => (i - 1 + DEPOIMENTOS.length) % DEPOIMENTOS.length)} style={{ background: "none", border: "1px solid #453941", borderRadius: "50%", width: 38, height: 38, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <ChevronLeft size={16} color={C.ivory} />
            </button>
            <div style={{ display: "flex", gap: 6 }}>
              {DEPOIMENTOS.map((_, i) => (
                <span key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: i === testIdx ? C.gold : "#453941" }} />
              ))}
            </div>
            <button onClick={() => setTestIdx((i) => (i + 1) % DEPOIMENTOS.length)} style={{ background: "none", border: "1px solid #453941", borderRadius: "50%", width: 38, height: 38, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <ChevronRight size={16} color={C.ivory} />
            </button>
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section>
        <Eyebrow>Perguntas frequentes</Eyebrow>
        <h2 className="display" style={{ fontSize: 30, fontWeight: 500, fontStyle: "italic", marginBottom: 26, maxWidth: 520 }}>
          Dúvidas comuns antes da primeira visita.
        </h2>
        {FAQ.map((f, i) => (
          <div key={f.q} style={{ borderBottom: `1px solid ${C.blushDeep}` }}>
            <button onClick={() => setOpenFaq(openFaq === i ? -1 : i)} style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", background: "none", border: "none", padding: "18px 0", textAlign: "left" }}>
              <span style={{ fontSize: 15.5 }}>{f.q}</span>
              <ChevronRight size={18} color={C.roseDeep} style={{ transform: openFaq === i ? "rotate(90deg)" : "none", transition: "transform 0.2s", flexShrink: 0 }} />
            </button>
            {openFaq === i && <p style={{ fontSize: 14, color: C.inkSoft, lineHeight: 1.7, paddingBottom: 18, maxWidth: 600 }}>{f.a}</p>}
          </div>
        ))}
      </Section>

      {/* AGENDAMENTO - glass card */}
      <div id="agendar" style={{ position: "relative", padding: "5.5rem 1.5rem", background: `linear-gradient(135deg, ${C.blush} 0%, ${C.rose} 55%, ${C.roseDeep} 100%)`, overflow: "hidden" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative" }}>
          <Eyebrow light>Agendamento</Eyebrow>
          <h2 className="display" style={{ fontSize: 32, fontWeight: 500, fontStyle: "italic", color: C.ivory, marginBottom: 30, maxWidth: 520 }}>
            Agende sua avaliação em poucos passos.
          </h2>

          <div style={{
            maxWidth: 520, background: "rgba(255,255,255,0.55)", backdropFilter: "blur(14px)",
            border: "1px solid rgba(255,255,255,0.6)", borderRadius: 18, padding: "30px 28px",
          }}>
            <div style={{ display: "flex", gap: 6, marginBottom: 26 }}>
              {[0, 1, 2, 3].map((s) => (
                <div key={s} style={{ flex: 1, height: 3, background: s <= step ? C.roseDeep : "rgba(255,255,255,0.6)", borderRadius: 2 }} />
              ))}
            </div>

            {step === 0 && (
              <div>
                <p style={{ fontSize: 15, marginBottom: 14, color: C.ink }}>Escolha o procedimento</p>
                <select value={proc} onChange={(e) => { setProc(e.target.value); setError(""); }} style={{ width: "100%", padding: "12px 14px", border: "none", borderRadius: 8, fontSize: 14, marginBottom: 8 }}>
                  <option value="">Selecione...</option>
                  {PROCEDIMENTOS.map((p) => <option key={p.nome} value={p.nome}>{p.nome}</option>)}
                </select>
              </div>
            )}
            {step === 1 && (
              <div>
                <p style={{ fontSize: 15, marginBottom: 14, color: C.ink }}>Escolha o dia e horário</p>
                <input type="datetime-local" value={date} onChange={(e) => { setDate(e.target.value); setError(""); }} style={{ width: "100%", padding: "12px 14px", border: "none", borderRadius: 8, fontSize: 14, marginBottom: 8 }} />
              </div>
            )}
            {step === 2 && (
              <div>
                <p style={{ fontSize: 15, marginBottom: 14, color: C.ink }}>Seus dados</p>
                <input value={name} onChange={(e) => { setName(e.target.value); setError(""); }} placeholder="Nome" style={{ width: "100%", padding: "12px 14px", border: "none", borderRadius: 8, fontSize: 14, marginBottom: 10 }} />
                <input value={phone} onChange={(e) => { setPhone(e.target.value); setError(""); }} placeholder="WhatsApp" style={{ width: "100%", padding: "12px 14px", border: "none", borderRadius: 8, fontSize: 14 }} />
              </div>
            )}
            {step === 3 && (
              <div style={{ display: "flex", alignItems: "center", gap: 10, background: "rgba(255,255,255,0.7)", padding: "14px 16px", borderRadius: 8 }}>
                <Check size={18} color={C.roseDeep} />
                <p style={{ fontSize: 14, color: C.ink }}>Avaliação de <strong>{proc}</strong> solicitada para <strong>{name}</strong>. Vamos confirmar por WhatsApp.</p>
              </div>
            )}

            {error && <p style={{ color: "#7A2F2F", fontSize: 13, marginBottom: 10 }}>{error}</p>}

            {step < 3 && (
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 20 }}>
                {step > 0 ? (
                  <button onClick={() => setStep((s) => s - 1)} style={{ display: "flex", alignItems: "center", gap: 4, background: "none", border: "none", color: C.ink, fontSize: 13.5 }}>
                    <ChevronLeft size={16} /> Voltar
                  </button>
                ) : <span />}
                <button onClick={nextStep} style={{ background: C.noir, color: C.ivory, border: "none", padding: "11px 24px", borderRadius: 999, fontSize: 13.5 }}>
                  {step === 2 ? "Confirmar" : "Continuar"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CONTATO */}
      <Section bg={C.noir}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }} className="contato-grid">
          <div style={{ borderRadius: 12, overflow: "hidden", minHeight: 240, border: "1px solid #453941" }}>
            <iframe title="Localização Maison Belle" src="https://maps.google.com/maps?q=Brasília,DF&z=14&output=embed" width="100%" height="100%" style={{ border: 0, minHeight: 240 }} loading="lazy" />
          </div>
          <div style={{ color: C.ivory }}>
            <p style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14.5, marginBottom: 14 }}><MapPin size={17} color={C.gold} /> 405 Norte, Bloco A — Brasília, DF</p>
            <p style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14.5, marginBottom: 14 }}><Clock size={17} color={C.gold} /> Terça a sábado, 9h às 19h</p>
            <p style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14.5, marginBottom: 24 }}><Phone size={17} color={C.gold} /> (61) 97777-6666</p>
            <div style={{ display: "flex", gap: 12 }}>
              <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", gap: 8, background: `linear-gradient(120deg, ${C.gold}, ${C.goldLight})`, color: C.noir, padding: "12px 20px", borderRadius: 999, fontSize: 13.5, fontWeight: 600 }}>
                <MessageCircle size={16} /> WhatsApp
              </a>
              <a href="#" style={{ display: "flex", alignItems: "center", gap: 8, border: "1px solid #453941", color: C.ivory, padding: "12px 20px", borderRadius: 999, fontSize: 13.5 }}>
                <Instagram size={16} /> Instagram
              </a>
            </div>
          </div>
        </div>
      </Section>

      <footer style={{ background: C.noir, borderTop: "1px solid #453941", padding: "1.4rem 1.5rem", textAlign: "center" }}>
        <p style={{ fontSize: 12, color: "#8C7F84" }}>© 2026 Maison Belle. Site de exemplo para fins de portfólio.</p>
      </footer>

      <style>{`
        @media (max-width: 860px) {
          .hero-grid, .sobre-grid, .contato-grid { grid-template-columns: 1fr !important; }
          .proc-grid, .equipe-grid { grid-template-columns: 1fr 1fr !important; }
          .proc-grid > div { grid-column: span 1 !important; }
          .desktop-nav { display: none !important; }
        }
        @media (max-width: 560px) {
          .proc-grid, .equipe-grid { grid-template-columns: 1fr !important; }
        }
        @media (min-width: 861px) {
          .menu-btn { display: none !important; }
          .cta-desktop { display: inline-block !important; }
        }
      `}</style>
    </div>
  );
}
