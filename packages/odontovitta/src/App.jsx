import React, { useState } from "react";
import {
  Menu, X, Phone, MapPin, Calendar, Star, ChevronDown, MessageCircle,
  Clock, ShieldCheck, Sparkles, Users, Check, Mail, Instagram, Facebook,
} from "lucide-react";

const C = {
  bg: "#F4F7F3",
  bgAlt: "#EAE3D5",
  ink: "#1C2B24",
  inkSoft: "#4B5A52",
  pine: "#2F5D50",
  pineDark: "#20423A",
  pineTint: "#E4ECE7",
  clay: "#C17A4D",
  clayDark: "#A6613A",
  clayTint: "#F3E4D8",
  line: "#D3D8CD",
  white: "#FFFFFF",
};

const NAV_LINKS = [
  { label: "Início", href: "#inicio" },
  { label: "Tratamentos", href: "#tratamentos" },
  { label: "Equipe", href: "#equipe" },
  { label: "Sobre", href: "#sobre" },
  { label: "Contato", href: "#contato" },
];

const DIFERENCIAIS = [
  {
    icon: Users,
    title: "Atendimento humanizado",
    text: "Explicamos cada procedimento antes de começar, sem pressa e sem termos técnicos difíceis.",
  },
  {
    icon: Sparkles,
    title: "Tecnologia de ponta",
    text: "Equipamentos digitais para diagnósticos mais precisos e tratamentos menos invasivos.",
  },
  {
    icon: ShieldCheck,
    title: "Conforto em cada visita",
    text: "Ambiente pensado para reduzir a ansiedade, do agendamento até a cadeira.",
  },
  {
    icon: Clock,
    title: "Acompanhamento contínuo",
    text: "Retornos programados para garantir que o tratamento realmente funcionou.",
  },
];

const TRATAMENTOS = [
  { nome: "Limpeza e prevenção", desc: "Profilaxia completa para manter a saúde bucal em dia." },
  { nome: "Clareamento dental", desc: "Técnicas a laser e caseiras para um sorriso mais claro." },
  { nome: "Ortodontia", desc: "Aparelhos fixos, estéticos e alinhadores invisíveis." },
  { nome: "Implantes dentários", desc: "Reabilitação completa com planejamento digital 3D." },
  { nome: "Tratamento de canal", desc: "Endodontia moderna, indolor e com anestesia local." },
  { nome: "Estética dental", desc: "Facetas e lentes de contato para o sorriso ideal." },
];

const EQUIPE = [
  { iniciais: "CD", nome: "Dra. Camila Duarte", area: "Clínica geral e odontologia restauradora", cor: C.pine },
  { iniciais: "RA", nome: "Dr. Rafael Andrade", area: "Ortodontia e alinhadores", cor: C.clay },
  { iniciais: "BL", nome: "Dra. Beatriz Lopes", area: "Implantodontia e cirurgia", cor: C.pineDark },
];

const DEPOIMENTOS = [
  { nome: "Marina T.", texto: "Sempre tive medo de dentista. Aqui a equipe explica cada passo e eu me sinto no controle o tempo todo." },
  { nome: "Eduardo S.", texto: "Fiz meu tratamento de canal e nem senti dor. Atendimento pontual, sem enrolação." },
  { nome: "Juliana P.", texto: "O clareamento ficou natural, exatamente como conversamos antes de começar." },
];

const FAQ = [
  { q: "Vocês atendem convênio?", a: "Atendemos os principais convênios odontológicos. Entre em contato para confirmar se o seu plano está na nossa lista." },
  { q: "Quanto tempo dura uma consulta de avaliação?", a: "A primeira consulta leva entre 30 e 45 minutos, incluindo exame clínico e conversa sobre seus objetivos." },
  { q: "O clareamento dói?", a: "A maioria dos pacientes sente apenas uma leve sensibilidade temporária, que costuma passar em poucas horas." },
  { q: "Vocês atendem emergências?", a: "Sim, reservamos horários no mesmo dia para dores agudas e urgências odontológicas." },
  { q: "Como faço para agendar minha primeira consulta?", a: "Você pode agendar pelo WhatsApp, telefone ou preenchendo o formulário na seção de contato." },
];

const WHATSAPP_URL = "https://wa.me/5561999999999";

function SmileArcIllustration() {
  return (
    <svg viewBox="0 0 480 380" width="100%" height="100%" role="img" aria-label="Ilustração abstrata de um arco de sorriso">
      <ellipse cx="330" cy="120" rx="140" ry="130" fill={C.pineTint} />
      <ellipse cx="150" cy="260" rx="110" ry="100" fill={C.clayTint} />
      <path
        d="M 90 190 Q 240 300 390 190"
        fill="none"
        stroke={C.pine}
        strokeWidth="6"
        strokeLinecap="round"
      />
      {Array.from({ length: 9 }).map((_, i) => {
        const t = i / 8;
        const x = 90 + t * 300;
        const y = 190 + Math.sin(t * Math.PI) * 82;
        return <circle key={i} cx={x} cy={y} r={i % 2 === 0 ? 9 : 6} fill={i % 2 === 0 ? C.pine : C.clay} />;
      })}
      <circle cx="380" cy="70" r="5" fill={C.clay} />
      <circle cx="60" cy="120" r="4" fill={C.pine} />
    </svg>
  );
}

function Section({ id, bg, children, style }) {
  return (
    <section id={id} style={{ background: bg || C.bg, padding: "5rem 1.5rem", ...style }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>{children}</div>
    </section>
  );
}

function Eyebrow({ children }) {
  return (
    <p style={{ color: C.clayDark, fontFamily: "Manrope, sans-serif", fontWeight: 600, fontSize: 15, marginBottom: 10 }}>
      {children}
    </p>
  );
}

export default function OdontoVittaSite() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div style={{ fontFamily: "Manrope, sans-serif", color: C.ink, background: C.bg }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,400;0,500;0,600;1,500&family=Manrope:wght@400;500;600;700&display=swap');
        .display { font-family: 'Fraunces', serif; }
        a { color: inherit; text-decoration: none; }
        button { font-family: 'Manrope', sans-serif; cursor: pointer; }
      `}</style>

      {/* NAV */}
      <header style={{ position: "sticky", top: 0, zIndex: 40, background: "rgba(244,247,243,0.92)", backdropFilter: "blur(6px)", borderBottom: `1px solid ${C.line}` }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", padding: "1rem 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <a href="#inicio" className="display" style={{ fontSize: 22, fontWeight: 600, color: C.pineDark }}>
            OdontoVitta
          </a>
          <nav style={{ display: "flex", gap: 28 }} className="desktop-nav">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} style={{ fontSize: 15, color: C.inkSoft }}>
                {l.label}
              </a>
            ))}
          </nav>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <a
              href="#contato"
              style={{
                display: "none",
                background: C.pine,
                color: C.white,
                padding: "10px 20px",
                borderRadius: 999,
                fontSize: 14,
                fontWeight: 600,
              }}
              className="cta-desktop"
            >
              Agendar consulta
            </a>
            <button
              aria-label="Abrir menu"
              onClick={() => setMenuOpen((v) => !v)}
              style={{ background: "none", border: "none", display: "flex" }}
              className="menu-btn"
            >
              {menuOpen ? <X size={24} color={C.ink} /> : <Menu size={24} color={C.ink} />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <div style={{ borderTop: `1px solid ${C.line}`, background: C.white, padding: "1rem 1.5rem" }}>
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                style={{ display: "block", padding: "10px 0", fontSize: 16, borderBottom: `1px solid ${C.line}` }}
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contato"
              onClick={() => setMenuOpen(false)}
              style={{ display: "inline-block", marginTop: 14, background: C.pine, color: C.white, padding: "10px 22px", borderRadius: 999, fontSize: 14, fontWeight: 600 }}
            >
              Agendar consulta
            </a>
          </div>
        )}
      </header>

      {/* HERO */}
      <Section id="inicio" style={{ paddingTop: "4rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 48, alignItems: "center" }} className="hero-grid">
          <div>
            <h1 className="display" style={{ fontSize: 44, lineHeight: 1.15, fontWeight: 500, color: C.ink, marginBottom: 20 }}>
              Seu sorriso, cuidado com atenção de verdade.
            </h1>
            <p style={{ fontSize: 17, color: C.inkSoft, lineHeight: 1.7, marginBottom: 28, maxWidth: 480 }}>
              Da limpeza de rotina aos tratamentos mais complexos, a OdontoVitta acompanha você com tecnologia
              moderna e uma equipe que explica cada passo antes de agir.
            </p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 36 }}>
              <a href="#contato" style={{ background: C.pine, color: C.white, padding: "13px 26px", borderRadius: 999, fontWeight: 600, fontSize: 15 }}>
                Agendar consulta
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  border: `1px solid ${C.pine}`,
                  color: C.pineDark,
                  padding: "13px 22px",
                  borderRadius: 999,
                  fontWeight: 600,
                  fontSize: 15,
                }}
              >
                <MessageCircle size={18} /> Falar no WhatsApp
              </a>
            </div>
            <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
              {[
                ["+12 anos", "cuidando de sorrisos"],
                ["+3.400", "pacientes atendidos"],
                ["4.9", "avaliação média"],
              ].map(([n, l]) => (
                <div key={l}>
                  <p className="display" style={{ fontSize: 26, color: C.pineDark, fontWeight: 600 }}>{n}</p>
                  <p style={{ fontSize: 13, color: C.inkSoft }}>{l}</p>
                </div>
              ))}
            </div>
          </div>
          <div style={{ minHeight: 320 }}>
            <SmileArcIllustration />
          </div>
        </div>
      </Section>

      {/* DIFERENCIAIS */}
      <Section bg={C.white}>
        <Eyebrow>Por que a OdontoVitta</Eyebrow>
        <h2 className="display" style={{ fontSize: 30, fontWeight: 500, marginBottom: 40, maxWidth: 520 }}>
          Cuidado odontológico sem sustos, do início ao fim.
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0 }} className="diferenciais-grid">
          {DIFERENCIAIS.map((d, i) => (
            <div
              key={d.title}
              style={{
                padding: "0 24px",
                borderLeft: i === 0 ? "none" : `1px solid ${C.line}`,
              }}
            >
              <d.icon size={26} color={C.pine} style={{ marginBottom: 14 }} />
              <p style={{ fontWeight: 600, fontSize: 16, marginBottom: 8 }}>{d.title}</p>
              <p style={{ fontSize: 14, color: C.inkSoft, lineHeight: 1.6 }}>{d.text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* TRATAMENTOS */}
      <Section id="tratamentos">
        <Eyebrow>Tratamentos</Eyebrow>
        <h2 className="display" style={{ fontSize: 30, fontWeight: 500, marginBottom: 40, maxWidth: 520 }}>
          Tudo o que seu sorriso pode precisar, em um só lugar.
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }} className="tratamentos-grid">
          {TRATAMENTOS.map((t, i) => (
            <div
              key={t.nome}
              style={{
                background: i % 2 === 0 ? C.white : C.bgAlt,
                padding: "26px 24px",
                borderRadius: "26px 8px 26px 8px",
                border: `1px solid ${C.line}`,
              }}
            >
              <p style={{ fontWeight: 600, fontSize: 17, marginBottom: 8 }}>{t.nome}</p>
              <p style={{ fontSize: 14, color: C.inkSoft, lineHeight: 1.6, marginBottom: 16 }}>{t.desc}</p>
              <a href="#contato" style={{ fontSize: 14, fontWeight: 600, color: C.pineDark }}>
                Saiba mais
              </a>
            </div>
          ))}
        </div>
      </Section>

      {/* SOBRE */}
      <Section id="sobre" bg={C.pineTint}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "start" }} className="sobre-grid">
          <div>
            <Eyebrow>Sobre a clínica</Eyebrow>
            <h2 className="display" style={{ fontSize: 30, fontWeight: 500, marginBottom: 18 }}>
              Uma clínica pensada para tirar o medo da cadeira do dentista.
            </h2>
            <p style={{ fontSize: 15, color: C.inkSoft, lineHeight: 1.75 }}>
              Há mais de uma década, a OdontoVitta nasceu com um objetivo simples: tornar o cuidado odontológico
              mais próximo e compreensível. Hoje reunimos uma equipe multidisciplinar e tecnologia digital para
              tratamentos que vão da prevenção à reabilitação completa, sempre explicando cada etapa em uma
              linguagem que você entende.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {[
              ["Acolhimento", "Cada paciente é ouvido antes de qualquer decisão de tratamento."],
              ["Precisão", "Diagnóstico digital para planos de tratamento mais assertivos."],
              ["Transparência", "Você sabe o valor e o motivo de cada procedimento antes de começar."],
            ].map(([t, d]) => (
              <div key={t} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                <Check size={18} color={C.pineDark} style={{ marginTop: 3, flexShrink: 0 }} />
                <div>
                  <p style={{ fontWeight: 600, fontSize: 15 }}>{t}</p>
                  <p style={{ fontSize: 14, color: C.inkSoft }}>{d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* EQUIPE */}
      <Section id="equipe" bg={C.white}>
        <Eyebrow>Equipe</Eyebrow>
        <h2 className="display" style={{ fontSize: 30, fontWeight: 500, marginBottom: 40, maxWidth: 520 }}>
          Profissionais que você vai reconhecer a cada visita.
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }} className="equipe-grid">
          {EQUIPE.map((m) => (
            <div key={m.nome} style={{ textAlign: "left" }}>
              <div
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: "50%",
                  background: m.cor,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: C.white,
                  fontWeight: 600,
                  fontSize: 20,
                  marginBottom: 16,
                }}
              >
                {m.iniciais}
              </div>
              <p style={{ fontWeight: 600, fontSize: 16, marginBottom: 4 }}>{m.nome}</p>
              <p style={{ fontSize: 14, color: C.inkSoft }}>{m.area}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* DEPOIMENTOS */}
      <Section bg={C.bgAlt}>
        <Eyebrow>Depoimentos</Eyebrow>
        <h2 className="display" style={{ fontSize: 30, fontWeight: 500, marginBottom: 40, maxWidth: 520 }}>
          O que quem já passou pela cadeira tem a dizer.
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }} className="depoimentos-grid">
          {DEPOIMENTOS.map((d) => (
            <div key={d.nome} style={{ background: C.white, padding: "24px", borderRadius: 16, border: `1px solid ${C.line}` }}>
              <div style={{ display: "flex", gap: 3, marginBottom: 12 }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} fill={C.clay} color={C.clay} />
                ))}
              </div>
              <p style={{ fontSize: 14, color: C.inkSoft, lineHeight: 1.65, marginBottom: 16 }}>"{d.texto}"</p>
              <p style={{ fontWeight: 600, fontSize: 14 }}>{d.nome}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section bg={C.white}>
        <Eyebrow>Perguntas frequentes</Eyebrow>
        <h2 className="display" style={{ fontSize: 30, fontWeight: 500, marginBottom: 30, maxWidth: 520 }}>
          Ainda com dúvidas? Provavelmente já respondemos.
        </h2>
        <div>
          {FAQ.map((f, i) => (
            <div key={f.q} style={{ borderBottom: `1px solid ${C.line}` }}>
              <button
                onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  background: "none",
                  border: "none",
                  padding: "18px 0",
                  textAlign: "left",
                }}
              >
                <span style={{ fontWeight: 600, fontSize: 16, color: C.ink }}>{f.q}</span>
                <ChevronDown
                  size={20}
                  color={C.pineDark}
                  style={{ transform: openFaq === i ? "rotate(180deg)" : "none", transition: "transform 0.2s", flexShrink: 0, marginLeft: 12 }}
                />
              </button>
              {openFaq === i && (
                <p style={{ fontSize: 14, color: C.inkSoft, lineHeight: 1.7, paddingBottom: 18, maxWidth: 640 }}>{f.a}</p>
              )}
            </div>
          ))}
        </div>
      </Section>

      {/* LOCALIZACAO / CONTATO */}
      <Section id="contato" bg={C.bgAlt}>
        <Eyebrow>Localização e contato</Eyebrow>
        <h2 className="display" style={{ fontSize: 30, fontWeight: 500, marginBottom: 30, maxWidth: 520 }}>
          Venha nos conhecer ou fale com a gente antes.
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }} className="contato-grid">
          <div style={{ borderRadius: 16, overflow: "hidden", border: `1px solid ${C.line}`, minHeight: 280 }}>
            <iframe
              title="Localização da OdontoVitta"
              src="https://maps.google.com/maps?q=Brasília,DF&z=14&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: 280 }}
              loading="lazy"
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div style={{ display: "flex", gap: 12 }}>
              <MapPin size={20} color={C.pineDark} style={{ flexShrink: 0, marginTop: 2 }} />
              <p style={{ fontSize: 15, color: C.inkSoft }}>SGAS 913, Bloco C, Asa Sul — Brasília, DF</p>
            </div>
            <div style={{ display: "flex", gap: 12 }}>
              <Clock size={20} color={C.pineDark} style={{ flexShrink: 0, marginTop: 2 }} />
              <p style={{ fontSize: 15, color: C.inkSoft }}>Segunda a sexta, 8h às 19h · Sábado, 8h às 13h</p>
            </div>
            <div style={{ display: "flex", gap: 12 }}>
              <Phone size={20} color={C.pineDark} style={{ flexShrink: 0, marginTop: 2 }} />
              <p style={{ fontSize: 15, color: C.inkSoft }}>(61) 99999-9999</p>
            </div>
            <div style={{ display: "flex", gap: 12 }}>
              <Mail size={20} color={C.pineDark} style={{ flexShrink: 0, marginTop: 2 }} />
              <p style={{ fontSize: 15, color: C.inkSoft }}>contato@odontovitta.com.br</p>
            </div>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              style={{
                marginTop: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                background: C.pine,
                color: C.white,
                padding: "13px 22px",
                borderRadius: 999,
                fontWeight: 600,
                fontSize: 15,
              }}
            >
              <MessageCircle size={18} /> Agendar pelo WhatsApp
            </a>
          </div>
        </div>
      </Section>

      {/* CTA FINAL */}
      <Section bg={C.pineDark}>
        <div style={{ textAlign: "center", padding: "1.5rem 0" }}>
          <h2 className="display" style={{ fontSize: 32, fontWeight: 500, color: C.white, marginBottom: 22 }}>
            Seu próximo sorriso começa com uma consulta.
          </h2>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            style={{ display: "inline-block", background: C.clay, color: C.white, padding: "14px 30px", borderRadius: 999, fontWeight: 600, fontSize: 15 }}
          >
            Agendar minha consulta
          </a>
        </div>
      </Section>

      {/* FOOTER */}
      <footer style={{ background: C.ink, color: C.bg, padding: "3rem 1.5rem 2rem" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr", gap: 32 }} className="footer-grid">
          <div>
            <p className="display" style={{ fontSize: 20, fontWeight: 600, marginBottom: 10 }}>OdontoVitta</p>
            <p style={{ fontSize: 14, color: "#9CAA9F", lineHeight: 1.6, maxWidth: 280 }}>
              Cuidado odontológico próximo, transparente e sem sustos, em Brasília.
            </p>
            <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
              <a href="#" aria-label="Instagram"><Instagram size={18} color="#9CAA9F" /></a>
              <a href="#" aria-label="Facebook"><Facebook size={18} color="#9CAA9F" /></a>
            </div>
          </div>
          <div>
            <p style={{ fontWeight: 600, fontSize: 14, marginBottom: 12 }}>Clínica</p>
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} style={{ display: "block", fontSize: 14, color: "#9CAA9F", marginBottom: 8 }}>
                {l.label}
              </a>
            ))}
          </div>
          <div>
            <p style={{ fontWeight: 600, fontSize: 14, marginBottom: 12 }}>Contato</p>
            <p style={{ fontSize: 14, color: "#9CAA9F", marginBottom: 8 }}>(61) 99999-9999</p>
            <p style={{ fontSize: 14, color: "#9CAA9F", marginBottom: 8 }}>contato@odontovitta.com.br</p>
            <p style={{ fontSize: 14, color: "#9CAA9F" }}>SGAS 913, Bloco C — Brasília, DF</p>
          </div>
        </div>
        <p style={{ textAlign: "center", fontSize: 12, color: "#6E7C71", marginTop: 32 }}>
          © 2026 OdontoVitta. Site de exemplo para fins de portfólio.
        </p>
      </footer>

      {/* WHATSAPP FLOAT */}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noreferrer"
        aria-label="Falar no WhatsApp"
        style={{
          position: "fixed",
          bottom: 22,
          right: 22,
          width: 54,
          height: 54,
          borderRadius: "50%",
          background: "#25D366",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 14px rgba(0,0,0,0.25)",
          zIndex: 50,
        }}
      >
        <MessageCircle size={26} color={C.white} />
      </a>

      <style>{`
        @media (max-width: 860px) {
          .hero-grid, .sobre-grid, .contato-grid { grid-template-columns: 1fr !important; }
          .diferenciais-grid, .tratamentos-grid, .equipe-grid, .depoimentos-grid { grid-template-columns: 1fr 1fr !important; }
          .footer-grid { grid-template-columns: 1fr !important; }
          .desktop-nav { display: none !important; }
        }
        @media (max-width: 560px) {
          .diferenciais-grid, .tratamentos-grid, .equipe-grid, .depoimentos-grid { grid-template-columns: 1fr !important; }
          .diferenciais-grid > div { border-left: none !important; border-top: 1px solid ${C.line}; padding: 20px 0 !important; }
          .diferenciais-grid > div:first-child { border-top: none; }
        }
        @media (min-width: 861px) {
          .menu-btn { display: none !important; }
          .cta-desktop { display: inline-block !important; }
        }
      `}</style>
    </div>
  );
}
