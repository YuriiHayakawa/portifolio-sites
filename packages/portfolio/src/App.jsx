import React, { useState, useEffect } from "react";
import {
  ArrowUpRight, Mail, MessageCircle, Github, Linkedin, Menu as MenuIcon, X,
  Code2, Layers, Palette, Zap,
} from "lucide-react";

const C = {
  paper: "#FAFAFA",
  ink: "#111014",
  inkSoft: "#5C5A63",
  accent: "#5B4FE9",
  accentSoft: "#EEECFD",
  line: "#E7E5EB",
  panel: "#F1EFF6",
};

const PROJETOS = [
  {
    nicho: "Odontologia",
    nome: "OdontoVitta",
    pitch: "Clínica odontológica com foco em confiança e agendamento.",
    tags: ["Conversão", "UX", "Confiança"],
    swatch: ["#2F5D50", "#C17A4D", "#F4F7F3"],
  },
  {
    nicho: "Imobiliária",
    nome: "NovaLar Imóveis",
    pitch: "Busca com filtros reais, cards animados e modal de detalhes.",
    tags: ["React state", "Filtros", "Dados estruturados"],
    swatch: ["#C97A2E", "#4C6B58", "#EDEBE6"],
  },
  {
    nicho: "Restaurante",
    nome: "Brasa 27",
    pitch: "Hamburgueria com cardápio interativo por categoria.",
    tags: ["Mobile-first", "Micro-interações", "UI/UX"],
    swatch: ["#E85D2C", "#E3B23C", "#211B18"],
  },
  {
    nicho: "Estética",
    nome: "Maison Belle",
    pitch: "Clínica de estética editorial, com animação botânica no hero.",
    tags: ["Design editorial", "Animação", "Apresentação"],
    swatch: ["#C77B76", "#B99A62", "#1A1116"],
  },
  {
    nicho: "Barbearia",
    nome: "The District",
    pitch: "Barbearia com agendamento em etapas, do serviço à confirmação.",
    tags: ["Fluxo de usuário", "Formulários", "Estado"],
    swatch: ["#4DE8D4", "#C08A3E", "#241A16"],
  },
];

const STACK_FRONTEND = ["React", "Tailwind CSS", "Vite", "JavaScript / TypeScript", "Animações CSS", "Design responsivo"];
const STACK_FULLSTACK = ["Node.js", "Express", "Python", "PostgreSQL", "APIs REST", "Autenticação", "Supabase"];

const TERMINAL_LINES = [
  "criando landing_page.tsx",
  "aplicando design system",
  "conectando dados e filtros",
  "testando em mobile",
  "pronto para publicar ✓",
];

function useTypewriter(lines, speed = 45, pause = 1100) {
  const [lineIdx, setLineIdx] = useState(0);
  const [text, setText] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (lineIdx >= lines.length) { setDone(true); return; }
    const full = lines[lineIdx];
    if (text.length < full.length) {
      const t = setTimeout(() => setText(full.slice(0, text.length + 1)), speed);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setLineIdx((i) => i + 1);
      setText("");
    }, pause);
    return () => clearTimeout(t);
  }, [text, lineIdx, lines, speed, pause]);

  return { lineIdx, text, done };
}

function Terminal() {
  const { lineIdx, text, done } = useTypewriter(TERMINAL_LINES);
  const completedLines = done ? TERMINAL_LINES : TERMINAL_LINES.slice(0, lineIdx);

  return (
    <div style={{ background: C.ink, borderRadius: 12, padding: "18px 20px", fontFamily: "'JetBrains Mono', monospace", fontSize: 13, minHeight: 190 }}>
      <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
        {["#E85D2C", "#E3B23C", "#4DE8D4"].map((c) => (
          <span key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c, opacity: 0.85 }} />
        ))}
      </div>
      {completedLines.map((l, i) => (
        <p key={i} style={{ color: "#8B8794", marginBottom: 6 }}>
          <span style={{ color: "#4DE8D4" }}>✓</span> {l}
        </p>
      ))}
      {!done && (
        <p style={{ color: "#FAFAFA" }}>
          <span style={{ color: C.accent }}>{">"}</span> {text}
          <span style={{ opacity: 0.6 }}>▍</span>
        </p>
      )}
    </div>
  );
}

function Section({ id, bg, children, style }) {
  return (
    <section id={id} style={{ background: bg || C.paper, padding: "5.5rem 1.5rem", ...style }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>{children}</div>
    </section>
  );
}

function Eyebrow({ children }) {
  return <p style={{ color: C.accent, fontWeight: 600, fontSize: 13.5, letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: 12 }}>{children}</p>;
}

function ProjectCard({ p }) {
  return (
    <a
      href="#"
      style={{
        display: "block", background: C.paper, border: `1px solid ${C.line}`, borderRadius: 14,
        overflow: "hidden", transition: "transform 0.25s ease, box-shadow 0.25s ease",
      }}
      onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 16px 30px rgba(17,16,20,0.08)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
    >
      <div style={{ display: "flex", height: 8 }}>
        {p.swatch.map((c, i) => <div key={i} style={{ flex: 1, background: c }} />)}
      </div>
      <div style={{ padding: "22px 24px" }}>
        <p style={{ fontSize: 12.5, color: C.accent, fontWeight: 600, marginBottom: 8 }}>{p.nicho}</p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
          <p className="display" style={{ fontSize: 20, fontWeight: 600 }}>{p.nome}</p>
          <ArrowUpRight size={18} color={C.inkSoft} />
        </div>
        <p style={{ fontSize: 14, color: C.inkSoft, lineHeight: 1.6, marginBottom: 16 }}>{p.pitch}</p>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {p.tags.map((t) => (
            <span key={t} style={{ background: C.panel, color: C.inkSoft, fontSize: 12, padding: "4px 10px", borderRadius: 999 }}>{t}</span>
          ))}
        </div>
      </div>
    </a>
  );
}

export default function PortfolioYuri() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", color: C.ink, background: C.paper }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
        .display { font-family: 'Sora', sans-serif; }
        a { color: inherit; text-decoration: none; }
        button { font-family: 'Inter', sans-serif; cursor: pointer; }
      `}</style>

      {/* NAV */}
      <header style={{ position: "sticky", top: 0, zIndex: 40, background: "rgba(250,250,250,0.9)", backdropFilter: "blur(8px)", borderBottom: `1px solid ${C.line}` }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", padding: "1.1rem 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <a href="#topo" className="display" style={{ fontSize: 18, fontWeight: 700 }}>Yuri Hayakawa</a>
          <nav style={{ display: "flex", gap: 28 }} className="desktop-nav">
            {[["Projetos", "#projetos"], ["Stack", "#stack"], ["Sobre", "#sobre"], ["Contato", "#contato"]].map(([l, h]) => (
              <a key={h} href={h} style={{ fontSize: 14, color: C.inkSoft }}>{l}</a>
            ))}
          </nav>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <a href="#contato" className="cta-desktop" style={{ display: "none", background: C.accent, color: "#fff", padding: "9px 20px", borderRadius: 8, fontSize: 13.5, fontWeight: 600 }}>
              Fale comigo
            </a>
            <button aria-label="Menu" className="menu-btn" onClick={() => setMenuOpen((v) => !v)} style={{ background: "none", border: "none", display: "flex" }}>
              {menuOpen ? <X size={22} /> : <MenuIcon size={22} />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <div style={{ background: C.paper, borderTop: `1px solid ${C.line}`, padding: "1rem 1.5rem" }}>
            {[["Projetos", "#projetos"], ["Stack", "#stack"], ["Sobre", "#sobre"], ["Contato", "#contato"]].map(([l, h]) => (
              <a key={h} href={h} onClick={() => setMenuOpen(false)} style={{ display: "block", padding: "10px 0", fontSize: 16, borderBottom: `1px solid ${C.line}` }}>{l}</a>
            ))}
          </div>
        )}
      </header>

      {/* HERO */}
      <Section id="topo" style={{ paddingTop: "4.5rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 40, alignItems: "center" }} className="hero-grid">
          <div>
            <Eyebrow>Desenvolvedor fullstack freelancer</Eyebrow>
            <h1 className="display" style={{ fontSize: 44, fontWeight: 700, lineHeight: 1.15, marginBottom: 22 }}>
              Sites que unem design e conversão.
            </h1>
            <p style={{ fontSize: 16, color: C.inkSoft, lineHeight: 1.7, maxWidth: 460, marginBottom: 30 }}>
              Eu sou Yuri, desenvolvedor web especializado na criação de sites e landing pages sob medida. Cada
              projeto é desenvolvido para refletir a identidade, o público e os objetivos do negócio — sem
              soluções genéricas ou templates simplesmente personalizados.
            </p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <a href="#projetos" style={{ background: C.accent, color: "#fff", padding: "13px 26px", borderRadius: 8, fontWeight: 600, fontSize: 14.5 }}>
                Ver projetos
              </a>
              <a href="#contato" style={{ border: `1px solid ${C.line}`, color: C.ink, padding: "13px 24px", borderRadius: 8, fontSize: 14.5 }}>
                Entrar em contato
              </a>
            </div>
          </div>
          <Terminal />
        </div>
      </Section>

      {/* PROJETOS */}
      <Section id="projetos" bg={C.panel}>
        <Eyebrow>Portfólio</Eyebrow>
        <h2 className="display" style={{ fontSize: 30, fontWeight: 700, marginBottom: 8, maxWidth: 560 }}>
          5 nichos, 5 identidades diferentes.
        </h2>
        <p style={{ fontSize: 14.5, color: C.inkSoft, marginBottom: 36, maxWidth: 560 }}>
          Cada site abaixo é um exemplo completo, com paleta, tipografia e interações desenhadas especificamente
          para aquele tipo de negócio.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }} className="proj-grid">
          {PROJETOS.map((p) => <ProjectCard key={p.nome} p={p} />)}
        </div>
      </Section>

      {/* STACK */}
      <Section id="stack">
        <Eyebrow>Stack</Eyebrow>
        <h2 className="display" style={{ fontSize: 30, fontWeight: 700, marginBottom: 36, maxWidth: 560 }}>
          O que eu uso pra construir isso tudo.
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }} className="stack-grid">
          <div style={{ background: C.panel, borderRadius: 14, padding: "26px 26px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <Palette size={19} color={C.accent} />
              <p style={{ fontWeight: 600, fontSize: 15.5 }}>Front-end</p>
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {STACK_FRONTEND.map((s) => (
                <span key={s} style={{ background: "#fff", border: `1px solid ${C.line}`, fontSize: 13, padding: "6px 14px", borderRadius: 999 }}>{s}</span>
              ))}
            </div>
          </div>
          <div style={{ background: C.panel, borderRadius: 14, padding: "26px 26px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <Code2 size={19} color={C.accent} />
              <p style={{ fontWeight: 600, fontSize: 15.5 }}>Fullstack</p>
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {STACK_FULLSTACK.map((s) => (
                <span key={s} style={{ background: "#fff", border: `1px solid ${C.line}`, fontSize: 13, padding: "6px 14px", borderRadius: 999 }}>{s}</span>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* SOBRE */}
      <Section bg={C.panel}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }} className="sobre-grid">
          <div>
            <Eyebrow>Sobre mim</Eyebrow>
            <h2 className="display" style={{ fontSize: 28, fontWeight: 700, marginBottom: 16 }}>
              Eu penso no negócio antes de pensar no código.
            </h2>
            <p style={{ fontSize: 15, color: C.inkSoft, lineHeight: 1.75 }}>
              Antes de abrir o editor, eu tento entender quem é o cliente do meu cliente. Um site bonito que não
              converte é só decoração — meu trabalho é juntar as duas coisas: identidade visual que representa o
              negócio de verdade, e estrutura pensada pra transformar visita em contato.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[
              [Zap, "Entrega rápida", "Do briefing ao site no ar em poucos dias, sem enrolação."],
              [Layers, "Identidade sob medida", "Cada projeto com paleta, tipografia e tom próprios."],
              [Code2, "Pronto pra crescer", "Base de código organizada, fácil de evoluir com backend depois."],
            ].map(([Icon, t, d]) => (
              <div key={t} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                <Icon size={18} color={C.accent} style={{ marginTop: 3, flexShrink: 0 }} />
                <div>
                  <p style={{ fontWeight: 600, fontSize: 15 }}>{t}</p>
                  <p style={{ fontSize: 13.5, color: C.inkSoft }}>{d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* CONTATO */}
      <Section id="contato" bg={C.ink}>
        <div style={{ textAlign: "center", padding: "1rem 0" }}>
          <Eyebrow>Contato</Eyebrow>
          <h2 className="display" style={{ fontSize: 30, fontWeight: 700, color: "#fff", marginBottom: 16 }}>
            Tem um projeto em mente? Vamos conversar.
          </h2>
          <p style={{ color: "#A9A6B0", fontSize: 14.5, marginBottom: 30, maxWidth: 420, margin: "0 auto 30px" }}>
            Me chama por qualquer um dos canais abaixo.
          </p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="mailto:yuriteixeira1108@gmail.com" style={{ display: "flex", alignItems: "center", gap: 8, background: C.accent, color: "#fff", padding: "13px 24px", borderRadius: 8, fontWeight: 600, fontSize: 14.5 }}>
              <Mail size={16} /> yuriteixeira1108@gmail.com
            </a>
            <a href="https://wa.me/5561985113050" target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", gap: 8, border: "1px solid #3A3844", color: "#fff", padding: "13px 24px", borderRadius: 8, fontWeight: 600, fontSize: 14.5 }}>
              <MessageCircle size={16} /> WhatsApp
            </a>
            <a href="https://github.com/YuriiHayakawa" target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", gap: 8, border: "1px solid #3A3844", color: "#fff", padding: "13px 24px", borderRadius: 8, fontWeight: 600, fontSize: 14.5 }}>
              <Github size={16} /> GitHub
            </a>
            <a href="https://www.linkedin.com/in/yuri-hayakawa-b8a445307/" target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", gap: 8, border: "1px solid #3A3844", color: "#fff", padding: "13px 24px", borderRadius: 8, fontWeight: 600, fontSize: 14.5 }}>
              <Linkedin size={16} /> LinkedIn
            </a>
          </div>
        </div>
      </Section>

      <footer style={{ background: C.ink, borderTop: "1px solid #232129", padding: "1.4rem 1.5rem", textAlign: "center" }}>
        <p style={{ fontSize: 12, color: "#6F6C78" }}>© 2026 Yuri Hayakawa. Portfólio pessoal.</p>
      </footer>

      <style>{`
        @media (max-width: 860px) {
          .hero-grid, .sobre-grid { grid-template-columns: 1fr !important; }
          .proj-grid, .stack-grid { grid-template-columns: 1fr !important; }
          .desktop-nav { display: none !important; }
        }
        @media (min-width: 861px) {
          .menu-btn { display: none !important; }
          .cta-desktop { display: inline-block !important; }
        }
      `}</style>
    </div>
  );
}
