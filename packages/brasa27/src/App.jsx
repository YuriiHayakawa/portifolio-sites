import React, { useState, useRef, useEffect } from "react";
import {
  Flame, Sandwich, CupSoda, IceCream, MapPin, Clock, Phone, MessageCircle,
  Menu as MenuIcon, X, Star, Check, Users, Utensils,
} from "lucide-react";

const C = {
  charcoal: "#211B18",
  charcoalSoft: "#2B241F",
  bone: "#F4ECE1",
  boneSoft: "#E4DACB",
  ember: "#E85D2C",
  emberDark: "#B8431A",
  mustard: "#E3B23C",
  smoke: "#6B625A",
  line: "rgba(244,236,225,0.14)",
};

const CATEGORIES = [
  { name: "Hambúrgueres", icon: Sandwich },
  { name: "Acompanhamentos", icon: Utensils },
  { name: "Bebidas", icon: CupSoda },
  { name: "Sobremesas", icon: IceCream },
];

const MENU = {
  Hambúrgueres: [
    { name: "Smash Bacon", desc: "Hambúrguer artesanal, cheddar, bacon crocante e molho da casa", price: 34.9 },
    { name: "Brasa Clássico", desc: "Blend 180g, queijo prato, alface, tomate e maionese defumada", price: 29.9 },
    { name: "Duplo Cheddar", desc: "Dois smash de 100g, dobro de cheddar e cebola caramelizada", price: 39.9 },
  ],
  Acompanhamentos: [
    { name: "Batata rústica", desc: "Batata com casca, alecrim e flor de sal", price: 18.9 },
    { name: "Onion rings", desc: "Anéis de cebola empanados, crocantes por fora", price: 21.9 },
    { name: "Batata com cheddar e bacon", desc: "Porção generosa para compartilhar", price: 26.9 },
  ],
  Bebidas: [
    { name: "Limonada da casa", desc: "Limão siciliano, hortelã e um toque de gengibre", price: 12.9 },
    { name: "Refrigerante lata", desc: "Diversos sabores geladinhos", price: 7.9 },
    { name: "Milkshake artesanal", desc: "Baunilha, chocolate ou morango", price: 19.9 },
  ],
  Sobremesas: [
    { name: "Brownie com sorvete", desc: "Brownie quente, sorvete de creme e calda de chocolate", price: 22.9 },
    { name: "Petit gateau", desc: "Massa de chocolate com recheio cremoso e sorvete", price: 24.9 },
  ],
};

const DEPOIMENTOS = [
  { nome: "Lucas M.", texto: "O Smash Bacon é sensacional, melhor hambúrguer da região sem dúvida." },
  { nome: "Fernanda A.", texto: "Ambiente animado e atendimento rápido, virou parada fixa de sexta." },
  { nome: "Rodrigo P.", texto: "Batata rústica é surpreendente, veio na medida certa de sal." },
  { nome: "Camila S.", texto: "Pedi delivery e chegou quentinho, embalagem impecável." },
  { nome: "Bruno T.", texto: "Milkshake de chocolate é outro nível, voltarei com certeza." },
];

const WHATSAPP_URL = "https://wa.me/5561988887777";

function fmt(v) {
  return v.toFixed(2).replace(".", ",");
}

function CategoryIcon({ Icon }) {
  return (
    <div
      style={{
        width: 46,
        height: 46,
        borderRadius: 12,
        background: C.charcoalSoft,
        border: `1px solid ${C.line}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Icon size={22} color={C.mustard} />
    </div>
  );
}

function Section({ id, bg, children, style }) {
  return (
    <section id={id} style={{ background: bg || C.bone, padding: "5rem 1.5rem", ...style }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>{children}</div>
    </section>
  );
}

export default function Brasa27Site() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cat, setCat] = useState("Hambúrgueres");
  const [resName, setResName] = useState("");
  const [resPhone, setResPhone] = useState("");
  const [resPeople, setResPeople] = useState("2");
  const [resError, setResError] = useState("");
  const [resSent, setResSent] = useState(false);
  const tabRefs = useRef({});
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const el = tabRefs.current[cat];
    if (el) setIndicator({ left: el.offsetLeft, width: el.offsetWidth });
  }, [cat]);

  const submitReserva = () => {
    if (!resName.trim() || !resPhone.trim()) {
      setResError("Preencha nome e telefone para reservar.");
      return;
    }
    setResError("");
    setResSent(true);
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", color: C.charcoal, background: C.bone }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;500;600;700&display=swap');
        .display { font-family: 'Anton', sans-serif; letter-spacing: 0.01em; }
        a { color: inherit; text-decoration: none; }
        button, select, input { font-family: 'Inter', sans-serif; cursor: pointer; }
        @keyframes glowPulse { 0%,100% { opacity: 0.55; transform: scale(1); } 50% { opacity: 0.85; transform: scale(1.06); } }
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .marquee-track { animation: marquee 32s linear infinite; }
        .marquee-track:hover { animation-play-state: paused; }
        .menu-item { animation: fadeUp 0.35s ease both; }
      `}</style>

      {/* NAV */}
      <header style={{ position: "sticky", top: 0, zIndex: 40, background: "rgba(33,27,24,0.94)", backdropFilter: "blur(6px)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "1rem 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <a href="#inicio" className="display" style={{ fontSize: 22, color: C.bone, display: "flex", alignItems: "center", gap: 8 }}>
            <Flame size={20} color={C.ember} /> BRASA 27
          </a>
          <nav style={{ display: "flex", gap: 28 }} className="desktop-nav">
            {[["Início", "#inicio"], ["Cardápio", "#cardapio"], ["Sobre", "#sobre"], ["Localização", "#local"]].map(([l, h]) => (
              <a key={h} href={h} style={{ fontSize: 14.5, color: C.boneSoft, fontWeight: 500 }}>{l}</a>
            ))}
          </nav>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <a href="#reservar" className="cta-desktop" style={{ display: "none", background: C.ember, color: C.bone, padding: "10px 20px", borderRadius: 8, fontSize: 14, fontWeight: 700 }}>
              Reservar mesa
            </a>
            <button aria-label="Menu" className="menu-btn" onClick={() => setMenuOpen((v) => !v)} style={{ background: "none", border: "none", display: "flex" }}>
              {menuOpen ? <X size={24} color={C.bone} /> : <MenuIcon size={24} color={C.bone} />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <div style={{ background: C.charcoalSoft, padding: "1rem 1.5rem" }}>
            {[["Início", "#inicio"], ["Cardápio", "#cardapio"], ["Sobre", "#sobre"], ["Localização", "#local"]].map(([l, h]) => (
              <a key={h} href={h} onClick={() => setMenuOpen(false)} style={{ display: "block", padding: "10px 0", color: C.bone, fontSize: 16, borderBottom: `1px solid ${C.line}` }}>{l}</a>
            ))}
          </div>
        )}
      </header>

      {/* HERO */}
      <div id="inicio" style={{ position: "relative", overflow: "hidden", background: `radial-gradient(circle at 78% 30%, ${C.emberDark} 0%, ${C.charcoal} 55%)`, padding: "5rem 1.5rem" }}>
        <div style={{
          position: "absolute", right: -40, top: "50%", transform: "translateY(-50%)",
          fontSize: 320, fontWeight: 900, color: C.ember, opacity: 0.6,
          animation: "glowPulse 4s ease-in-out infinite", pointerEvents: "none",
        }} className="display">
          27
        </div>
        <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative" }}>
          <p style={{ color: C.mustard, fontWeight: 600, fontSize: 14.5, marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}>
            <Flame size={16} /> Hamburgueria artesanal
          </p>
          <h1 className="display" style={{ fontSize: 52, color: C.bone, lineHeight: 1.05, maxWidth: 600, marginBottom: 20 }}>
            Sabor que vem direto da brasa.
          </h1>
          <p style={{ fontSize: 16.5, color: C.boneSoft, maxWidth: 460, marginBottom: 34, lineHeight: 1.6 }}>
            Hambúrgueres artesanais grelhados na hora, ingredientes frescos e aquele clima de boteco bom, todos os dias da semana.
          </p>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 40 }}>
            <a href="#cardapio" style={{ background: C.ember, color: C.bone, padding: "13px 26px", borderRadius: 8, fontWeight: 700, fontSize: 15 }}>
              Ver cardápio
            </a>
            <a href="#reservar" style={{ border: `1px solid ${C.boneSoft}`, color: C.bone, padding: "13px 24px", borderRadius: 8, fontWeight: 700, fontSize: 15 }}>
              Reservar mesa
            </a>
          </div>
          <div style={{ display: "flex", gap: 30, flexWrap: "wrap" }}>
            {["Delivery em 30 min", "Ingredientes frescos todo dia", "Aberto até meia-noite"].map((t) => (
              <span key={t} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13.5, color: C.boneSoft }}>
                <Check size={15} color={C.mustard} /> {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* CARDAPIO */}
      <Section id="cardapio">
        <p style={{ color: C.emberDark, fontWeight: 700, fontSize: 14.5, marginBottom: 8 }}>Cardápio</p>
        <h2 className="display" style={{ fontSize: 32, marginBottom: 30, maxWidth: 500 }}>Conheça nosso cardápio</h2>

        <div style={{ position: "relative", display: "flex", gap: 8, borderBottom: `1px solid ${C.boneSoft}`, marginBottom: 32, overflowX: "auto" }}>
          {CATEGORIES.map((c) => (
            <button
              key={c.name}
              ref={(el) => (tabRefs.current[c.name] = el)}
              onClick={() => setCat(c.name)}
              style={{
                background: "none", border: "none", padding: "12px 18px", fontSize: 14.5,
                fontWeight: 600, color: cat === c.name ? C.charcoal : C.smoke,
                display: "flex", alignItems: "center", gap: 8, whiteSpace: "nowrap",
              }}
            >
              <c.icon size={16} /> {c.name}
            </button>
          ))}
          <div style={{ position: "absolute", bottom: -1, left: indicator.left, width: indicator.width, height: 2, background: C.ember, transition: "left 0.3s ease, width 0.3s ease" }} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }} className="menu-grid" key={cat}>
          {MENU[cat].map((item, i) => (
            <div
              key={item.name}
              className="menu-item"
              style={{
                animationDelay: `${i * 60}ms`,
                display: "flex", gap: 16, alignItems: "flex-start",
                background: C.charcoalSoft, borderRadius: 12, padding: "18px 20px",
              }}
            >
              <CategoryIcon Icon={CATEGORIES.find((c) => c.name === cat).icon} />
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 10, marginBottom: 6 }}>
                  <p style={{ fontWeight: 700, fontSize: 15.5, color: C.bone }}>{item.name}</p>
                  <span style={{ background: C.mustard, color: C.charcoal, fontWeight: 700, fontSize: 13, padding: "3px 10px", borderRadius: 999, whiteSpace: "nowrap", height: "fit-content" }}>
                    R$ {fmt(item.price)}
                  </span>
                </div>
                <p style={{ fontSize: 13.5, color: C.boneSoft, lineHeight: 1.5 }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* SOBRE */}
      <Section id="sobre" bg={C.charcoal}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }} className="sobre-grid">
          <div>
            <p style={{ color: C.mustard, fontWeight: 700, fontSize: 14.5, marginBottom: 8 }}>Sobre a Brasa 27</p>
            <h2 className="display" style={{ fontSize: 30, color: C.bone, marginBottom: 18 }}>
              Um cantinho pra comer bem e ficar à vontade.
            </h2>
            <p style={{ fontSize: 15, color: C.boneSoft, lineHeight: 1.75 }}>
              A Brasa 27 nasceu de uma ideia simples: hambúrguer bom, feito na hora, num lugar onde dá vontade de
              ficar. Grelhamos cada blend no ponto certo, servimos porções generosas e mantemos aquele clima
              descontraído de fim de tarde com os amigos, todos os dias da semana.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {[["1.500+", "hambúrgueres servidos por mês"], ["4.8", "avaliação média dos clientes"], ["7", "dias por semana abertos"]].map(([n, l]) => (
              <div key={l} style={{ display: "flex", alignItems: "baseline", gap: 12, borderBottom: `1px solid ${C.line}`, paddingBottom: 14 }}>
                <span className="display" style={{ fontSize: 26, color: C.ember }}>{n}</span>
                <span style={{ fontSize: 14, color: C.boneSoft }}>{l}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* DEPOIMENTOS - MARQUEE */}
      <div style={{ background: C.bone, padding: "3.5rem 0", overflow: "hidden" }}>
        <p style={{ textAlign: "center", color: C.emberDark, fontWeight: 700, fontSize: 14.5, marginBottom: 24 }}>O que dizem por aí</p>
        <div style={{ display: "flex", width: "fit-content" }} className="marquee-track">
          {[...DEPOIMENTOS, ...DEPOIMENTOS].map((d, i) => (
            <div key={i} style={{ width: 300, flexShrink: 0, background: "#fff", border: `1px solid ${C.boneSoft}`, borderRadius: 12, padding: "18px 20px", margin: "0 10px" }}>
              <div style={{ display: "flex", gap: 3, marginBottom: 10 }}>
                {Array.from({ length: 5 }).map((_, j) => <Star key={j} size={13} fill={C.mustard} color={C.mustard} />)}
              </div>
              <p style={{ fontSize: 13.5, color: C.smoke, lineHeight: 1.55, marginBottom: 12 }}>"{d.texto}"</p>
              <p style={{ fontWeight: 700, fontSize: 13.5 }}>{d.nome}</p>
            </div>
          ))}
        </div>
      </div>

      {/* LOCALIZACAO + RESERVA */}
      <Section id="local" bg={C.boneSoft}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }} className="local-grid">
          <div style={{ borderRadius: 12, overflow: "hidden", minHeight: 260, border: `1px solid ${C.smoke}` }}>
            <iframe
              title="Localização da Brasa 27"
              src="https://maps.google.com/maps?q=Brasília,DF&z=14&output=embed"
              width="100%" height="100%" style={{ border: 0, minHeight: 260 }} loading="lazy"
            />
          </div>
          <div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 24 }}>
              <span style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14.5 }}><MapPin size={17} color={C.emberDark} /> 108 Sul, Bloco B, Brasília — DF</span>
              <span style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14.5 }}><Clock size={17} color={C.emberDark} /> Todos os dias, 18h às 00h</span>
              <span style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14.5 }}><Phone size={17} color={C.emberDark} /> (61) 98888-7777</span>
            </div>
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, background: "#25D366", color: "#fff", padding: "12px 20px", borderRadius: 8, fontWeight: 700, fontSize: 14.5 }}>
              <MessageCircle size={17} /> Pedir pelo WhatsApp
            </a>
          </div>
        </div>

        <div id="reservar" style={{ marginTop: 48, background: C.charcoal, borderRadius: 16, padding: "32px 28px" }}>
          <p style={{ color: C.mustard, fontWeight: 700, fontSize: 14.5, marginBottom: 6 }}>Reserva</p>
          <h3 className="display" style={{ fontSize: 24, color: C.bone, marginBottom: 20 }}>Reserve sua mesa</h3>
          {resSent ? (
            <div style={{ display: "flex", alignItems: "center", gap: 10, background: "rgba(227,178,60,0.14)", padding: "16px 18px", borderRadius: 10 }}>
              <Check size={20} color={C.mustard} />
              <p style={{ color: C.bone, fontSize: 14.5 }}>Reserva recebida! Vamos confirmar pelo telefone informado.</p>
            </div>
          ) : (
            <div>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 10 }}>
                <input value={resName} onChange={(e) => { setResName(e.target.value); if (resError) setResError(""); }} placeholder="Seu nome" style={{ flex: "1 1 180px", padding: "12px 14px", borderRadius: 8, border: "none", fontSize: 14 }} />
                <input value={resPhone} onChange={(e) => { setResPhone(e.target.value); if (resError) setResError(""); }} placeholder="Telefone" style={{ flex: "1 1 160px", padding: "12px 14px", borderRadius: 8, border: "none", fontSize: 14 }} />
                <select value={resPeople} onChange={(e) => setResPeople(e.target.value)} style={{ padding: "12px 14px", borderRadius: 8, border: "none", fontSize: 14 }}>
                  {[1, 2, 3, 4, 5, 6].map((n) => <option key={n} value={n}>{n} pessoa{n > 1 ? "s" : ""}</option>)}
                </select>
                <button onClick={submitReserva} style={{ background: C.ember, color: C.bone, border: "none", padding: "12px 24px", borderRadius: 8, fontWeight: 700, fontSize: 14 }}>
                  Reservar
                </button>
              </div>
              {resError && <p style={{ color: "#F0997B", fontSize: 13 }}>{resError}</p>}
            </div>
          )}
        </div>
      </Section>

      <footer style={{ background: C.charcoal, padding: "1.6rem 1.5rem", textAlign: "center" }}>
        <p style={{ fontSize: 12, color: C.smoke }}>© 2026 Brasa 27. Site de exemplo para fins de portfólio.</p>
      </footer>

      <a
        href={WHATSAPP_URL} target="_blank" rel="noreferrer" aria-label="WhatsApp"
        style={{ position: "fixed", bottom: 22, right: 22, width: 54, height: 54, borderRadius: "50%", background: "#25D366", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 14px rgba(0,0,0,0.3)", zIndex: 50 }}
      >
        <MessageCircle size={26} color="#fff" />
      </a>

      <style>{`
        @media (max-width: 860px) {
          .sobre-grid, .local-grid { grid-template-columns: 1fr !important; }
          .desktop-nav { display: none !important; }
        }
        @media (max-width: 560px) {
          .menu-grid { grid-template-columns: 1fr !important; }
        }
        @media (min-width: 861px) {
          .menu-btn { display: none !important; }
          .cta-desktop { display: inline-block !important; }
        }
      `}</style>
    </div>
  );
}
