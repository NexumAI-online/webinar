import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Target, Map, Rocket, Check, X, Lock, Zap, Gift, ArrowRight,
  ChevronDown, Sparkles, MessageSquare, Calendar, Users, ExternalLink,
} from "lucide-react";

/**
 * Webinar Nexum AI — Landing + Post-Registro
 * ------------------------------------------------------
 * Single-file React component. Drop into any Vite/Next
 * project that has Tailwind + lucide-react installed.
 *
 * REQUIRED GLOBAL CSS (e.g. index.css):
 * --------------------------------------------------
 *  @tailwind base; @tailwind components; @tailwind utilities;
 *
 *  :root { --nexum-purple:#8943E3; --nexum-pink:#F239FF; }
 *  html { scroll-behavior:smooth }
 *  body { background:#0A0A0A; color:#fff; font-family:'Helvetica Neue',Helvetica,Arial,system-ui,sans-serif; letter-spacing:-0.005em; -webkit-font-smoothing:antialiased }
 *
 *  .brand-gradient { background: linear-gradient(95deg,#8943E3 0%, #F239FF 100%); }
 *  .text-brand-gradient { background: linear-gradient(95deg,#B57DFF,#F239FF 70%,#FFB0FF); -webkit-background-clip:text; background-clip:text; color:transparent; }
 *  .text-brand-solid { background: linear-gradient(95deg,#8943E3,#F239FF); -webkit-background-clip:text; background-clip:text; color:transparent; }
 *  .gradient-border { background: linear-gradient(#0D0B10,#0D0B10) padding-box, linear-gradient(135deg,rgba(137,67,227,.55),rgba(242,57,255,.55)) border-box; border:1px solid transparent; }
 *  .gradient-border-strong { background: linear-gradient(#0E0A14,#0E0A14) padding-box, linear-gradient(135deg,#8943E3,#F239FF) border-box; border:1.5px solid transparent; }
 *  .glass { background: linear-gradient(180deg,rgba(255,255,255,.04),rgba(255,255,255,.015)); backdrop-filter: blur(10px); }
 *  .cta-primary { background: linear-gradient(95deg,#8943E3,#F239FF); background-size:200% 100%; transition:transform .35s,background-position .6s,box-shadow .35s; box-shadow:0 10px 30px -10px rgba(242,57,255,.45), 0 0 0 1px rgba(255,255,255,.08) inset; }
 *  .cta-primary:hover { transform: translateY(-2px) scale(1.02); background-position:100% 50%; box-shadow:0 20px 50px -12px rgba(242,57,255,.6), 0 0 0 1px rgba(255,255,255,.12) inset; }
 *  .reveal { opacity:0; transform: translateY(28px); transition: opacity .9s cubic-bezier(.2,.7,.2,1), transform .9s cubic-bezier(.2,.7,.2,1); }
 *  .reveal.is-visible { opacity:1; transform: translateY(0); }
 *  @keyframes pulseDot { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.15);opacity:.9} }
 *  @keyframes pulseRing { 0%{transform:scale(.8);opacity:.7} 100%{transform:scale(2.2);opacity:0} }
 *  @keyframes marquee { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
 *  @keyframes fadeUp { 0%{opacity:0;transform:translateY(28px)} 100%{opacity:1;transform:translateY(0)} }
 *  @keyframes scaleIn { 0%{opacity:0;transform:scale(.7)} 100%{opacity:1;transform:scale(1)} }
 *  @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
 *  @keyframes drawCheck { 0%{stroke-dashoffset:48} 100%{stroke-dashoffset:0} }
 *
 *  If using Tailwind, add these to tailwind.config.js extend.animation:
 *    'pulse-dot': 'pulseDot 1.6s ease-in-out infinite',
 *    'pulse-ring': 'pulseRing 1.6s ease-out infinite',
 *    'marquee': 'marquee 26s linear infinite',
 *    'fade-up': 'fadeUp .9s cubic-bezier(.2,.7,.2,1) both',
 *    'scale-in': 'scaleIn .5s cubic-bezier(.2,.9,.2,1.2) both',
 *    'float': 'float 8s ease-in-out infinite',
 *    'spin-slow': 'spin 1.1s linear infinite',
 * --------------------------------------------------
 *
 * ASSETS expected in /public (or imported):
 *   /assets/logo-nexum.svg
 *   /assets/founder-jp.jpg
 *   /assets/founder-agustin.jpg
 */

/* ------------------- Config ------------------- */
// May 7 2026 · 14:00 (UTC-3 Uruguay) → 17:00 UTC
const TARGET = new Date("2026-05-07T17:00:00Z");

const LATAM = [
  { flag: "🇺🇾", code: "+598", name: "Uruguay" },
  { flag: "🇦🇷", code: "+54",  name: "Argentina" },
  { flag: "🇲🇽", code: "+52",  name: "México" },
  { flag: "🇨🇴", code: "+57",  name: "Colombia" },
  { flag: "🇨🇱", code: "+56",  name: "Chile" },
  { flag: "🇵🇪", code: "+51",  name: "Perú" },
  { flag: "🇪🇨", code: "+593", name: "Ecuador" },
  { flag: "🇧🇴", code: "+591", name: "Bolivia" },
  { flag: "🇵🇾", code: "+595", name: "Paraguay" },
  { flag: "🇻🇪", code: "+58",  name: "Venezuela" },
  { flag: "🇩🇴", code: "+1",   name: "Rep. Dominicana" },
  { flag: "🇨🇷", code: "+506", name: "Costa Rica" },
  { flag: "🇬🇹", code: "+502", name: "Guatemala" },
  { flag: "🇵🇦", code: "+507", name: "Panamá" },
  { flag: "🇭🇳", code: "+504", name: "Honduras" },
  { flag: "🇸🇻", code: "+503", name: "El Salvador" },
  { flag: "🇳🇮", code: "+505", name: "Nicaragua" },
  { flag: "🇨🇺", code: "+53",  name: "Cuba" },
];
const OTROS = [
  { flag: "🇺🇸", code: "+1",  name: "Estados Unidos" },
  { flag: "🇪🇸", code: "+34", name: "España" },
  { flag: "🇧🇷", code: "+55", name: "Brasil" },
];

/* ------------------- Helpers ------------------- */
const pad = (n) => String(n).padStart(2, "0");

function computeCountdown(target) {
  const diff = Math.max(0, target.getTime() - Date.now());
  return {
    d: Math.floor(diff / 86400000),
    h: Math.floor((diff % 86400000) / 3600000),
    m: Math.floor((diff % 3600000) / 60000),
    s: Math.floor((diff % 60000) / 1000),
    diff,
  };
}

function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("is-visible"); io.unobserve(e.target); }
      }),
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ------------------- Subcomponents ------------------- */
const Logo = ({ className = "h-7" }) => (
  <img src="/assets/logo-nexum.svg" alt="Nexum AI" className={className} />
);

const CountdownPill = ({ c }) => (
  <div className="hidden sm:flex items-center gap-2 font-mono text-xs tabular-nums">
    {[
      { v: pad(c.d), l: "días" },
      { v: pad(c.h), l: "hrs" },
      { v: pad(c.m), l: "min" },
      { v: pad(c.s), l: "seg" },
    ].map((it, i, arr) => (
      <React.Fragment key={it.l}>
        <div className="flex flex-col items-center leading-none">
          <span className="text-white font-semibold text-base">{it.v}</span>
          <span className="text-white/40 uppercase tracking-[0.15em] text-[10px] mt-0.5">{it.l}</span>
        </div>
        {i < arr.length - 1 && <span className="text-[#F239FF]/60">·</span>}
      </React.Fragment>
    ))}
  </div>
);

const CountdownBig = ({ c }) => (
  <div className="flex gap-2 sm:gap-3 justify-center lg:justify-start font-mono tabular-nums">
    {[
      { v: pad(c.d), l: "Días" },
      { v: pad(c.h), l: "Horas" },
      { v: pad(c.m), l: "Min" },
      { v: pad(c.s), l: "Seg" },
    ].map((it) => (
      <div key={it.l} className="gradient-border rounded-xl px-3 py-2 sm:px-4 sm:py-3 min-w-[64px] sm:min-w-[78px] text-center">
        <div className="text-2xl sm:text-3xl font-bold text-white leading-none">{it.v}</div>
        <div className="text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-white/50 mt-1.5">{it.l}</div>
      </div>
    ))}
  </div>
);

const LiveBadge = () => (
  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full gradient-border text-[11px] tracking-[0.2em] uppercase font-semibold">
    <span className="relative flex h-2 w-2">
      <span className="absolute inline-flex h-full w-full rounded-full bg-[#F239FF] opacity-75" style={{ animation: "pulseRing 1.6s ease-out infinite" }} />
      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F239FF]" style={{ animation: "pulseDot 1.6s ease-in-out infinite" }} />
    </span>
    <span className="text-white/90">Webinar gratuito en vivo</span>
  </div>
);

const Nav = ({ countdown }) => (
  <nav className="fixed top-0 inset-x-0 z-40 backdrop-blur-xl bg-black/50 border-b border-white/5">
    <div className="max-w-[1180px] mx-auto px-4 sm:px-6 h-14 md:h-16 flex items-center justify-between">
      <a href="#top"><Logo className="h-6 md:h-7" /></a>
      <CountdownPill c={countdown} />
      <a href="#form" className="sm:hidden text-[11px] font-semibold uppercase tracking-wider text-white/80 border border-white/15 rounded-full px-3 py-1.5">
        Reservar
      </a>
    </div>
  </nav>
);

const Hero = ({ countdown }) => (
  <section id="top" className="relative pt-24 md:pt-28 pb-14 md:pb-24 px-4 sm:px-6">
    <div className="max-w-[1180px] mx-auto grid lg:grid-cols-[1.2fr_1fr] gap-10 lg:gap-14 items-center">
      <div className="text-center lg:text-left" style={{ animation: "fadeUp .9s cubic-bezier(.2,.7,.2,1) both" }}>
        <LiveBadge />
        <h1 className="mt-6 font-black text-[clamp(2.2rem,6.2vw,4.6rem)] leading-[1.02] tracking-[-0.02em]">
          Todas las empresas necesitan IA.<br />
          Casi nadie sabe cómo <span className="text-brand-gradient">convertir eso en un negocio.</span>
        </h1>
        <p className="mt-6 text-white/70 text-lg sm:text-xl max-w-xl mx-auto lg:mx-0 leading-relaxed">
          En este webinar en vivo te mostramos el mapa exacto para construir una agencia de IA seria — y llegar a
          <span className="text-white font-semibold"> $3.000/mes en 90 días</span>.
        </p>

        <div className="mt-8 flex flex-col items-center lg:items-start gap-4">
          <div className="inline-flex items-center gap-2 text-white/85 font-medium">
            <Calendar className="w-5 h-5 text-[#F239FF]" />
            <span>Miércoles 7 de mayo · 14:00 hs (Uruguay)</span>
          </div>
          <CountdownBig c={countdown} />
        </div>

        <div className="mt-8 flex flex-col items-center lg:items-start gap-3">
          <a href="#form" className="cta-primary rounded-full px-7 py-4 font-semibold text-white text-sm sm:text-base tracking-wide inline-flex items-center gap-2">
            RESERVAR MI LUGAR GRATIS <ArrowRight className="w-4 h-4" />
          </a>
          <div className="flex items-center gap-2 text-xs text-white/50">
            <Zap className="w-3.5 h-3.5 text-[#F239FF]" />
            +200 personas ya se registraron
          </div>
        </div>

        <div className="mt-10 flex flex-wrap gap-x-5 gap-y-2 justify-center lg:justify-start text-[13px] text-white/55 font-mono">
          <span>🇺🇾 UY 14:00</span>
          <span>🇦🇷 AR 14:00</span>
          <span>🇨🇱 CL 13:00</span>
          <span>🇨🇴 CO 12:00</span>
          <span>🇲🇽 MX 11:00</span>
          <span>🇪🇸 ES 19:00</span>
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-md lg:max-w-none" style={{ animation: "fadeUp .9s .15s cubic-bezier(.2,.7,.2,1) both" }}>
        <div className="absolute -inset-8 rounded-[2.5rem] bg-gradient-to-br from-[#8943E3]/30 via-transparent to-[#F239FF]/25 blur-3xl" />
        <div className="relative grid grid-cols-2 gap-3 sm:gap-4">
          <div className="rounded-2xl overflow-hidden translate-y-4" style={{ padding: 2, background: "linear-gradient(135deg,#8943E3,#F239FF 70%,#6A32B3)" }}>
            <img src="/assets/founder-jp.jpg" alt="Juan Pablo Rosso" className="w-full aspect-[4/5] object-cover rounded-2xl bg-[#0A0A0A]" />
          </div>
          <div className="rounded-2xl overflow-hidden -translate-y-4" style={{ padding: 2, background: "linear-gradient(135deg,#8943E3,#F239FF 70%,#6A32B3)" }}>
            <img src="/assets/founder-agustin.jpg" alt="Agustín Badt" className="w-full aspect-[4/5] object-cover rounded-2xl bg-[#0A0A0A]" />
          </div>
        </div>
        <div className="mt-4 flex justify-between text-xs font-mono uppercase tracking-[0.2em] text-white/55 px-2">
          <span>JP Rosso</span>
          <span className="text-[#F239FF]/70">×</span>
          <span>A. Badt</span>
        </div>
      </div>
    </div>
  </section>
);

const LearnCards = () => {
  const cards = [
    { Icon: Target, tag: "Oportunidad", title: "La oportunidad real que tienen las agencias de IA hoy",
      body: "Por qué las empresas están buscando desesperadamente a alguien que les implemente IA — y cómo posicionarte para ser esa persona." },
    { Icon: Map, tag: "Sistema", title: "El mapa paso a paso para llegar a $3K/mes",
      body: "Los 3 pilares que separan una agencia que factura $500 de una que factura $3.000: oferta, adquisición y retención." },
    { Icon: Rocket, tag: "Ejecución", title: "Cómo hacerlo en 90 días (sin ser un experto técnico)",
      body: "El sistema exacto que usamos en Nexum AI y que replicamos con agencias reales en toda América Latina." },
  ];
  return (
    <section className="relative py-20 md:py-28 px-4 sm:px-6">
      <div className="max-w-[1180px] mx-auto">
        <div className="text-center max-w-2xl mx-auto reveal">
          <div className="text-[11px] uppercase tracking-[0.3em] text-[#F239FF] font-semibold">El programa</div>
          <h2 className="mt-4 font-bold text-[clamp(1.8rem,4.5vw,3rem)] leading-[1.05] tracking-[-0.02em]">
            ¿Qué vas a descubrir en<br />este <span className="text-brand-gradient">webinar</span>?
          </h2>
        </div>
        <div className="mt-14 grid md:grid-cols-3 gap-5 md:gap-6">
          {cards.map((c, i) => (
            <div key={c.title} className="reveal gradient-border rounded-3xl p-7 md:p-8 group hover:-translate-y-1 transition-all duration-500 relative overflow-hidden" style={{ transitionDelay: `${i * 80}ms` }}>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: "radial-gradient(circle at 30% 0%, rgba(242,57,255,0.10), transparent 60%)" }} />
              <div className="relative">
                <div className="w-12 h-12 rounded-xl brand-gradient flex items-center justify-center text-white" style={{ boxShadow: "0 0 40px rgba(137,67,227,0.35), 0 0 80px rgba(242,57,255,0.18)" }}>
                  <c.Icon className="w-6 h-6" />
                </div>
                <div className="mt-5 text-[10px] uppercase tracking-[0.3em] text-[#F239FF]/80 font-semibold">{c.tag}</div>
                <h3 className="mt-2 font-semibold text-xl md:text-[1.3rem] leading-snug">{c.title}</h3>
                <p className="mt-3 text-white/65 text-[15px] leading-relaxed">{c.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ForYou = () => {
  const yes = [
    "Sabés de IA pero todavía no facturás de forma consistente con eso",
    "Querés construir una agencia de IA seria, no un hobby",
    "Estás cansado de buscar clientes sin un sistema",
    "Querés un plan claro en vez de seguir improvisando",
    "Estás dispuesto a ejecutar si alguien te muestra el camino",
  ];
  const no = [
    "Buscás hacerte rico de la noche a la mañana sin trabajar",
    "No te interesa la IA aplicada a negocios reales",
    "Querés solo teoría y no estás dispuesto a implementar",
    "Ya facturás +$10K/mes y tenés tu sistema armado",
  ];
  return (
    <section className="relative py-20 md:py-28 px-4 sm:px-6">
      <div className="max-w-[1100px] mx-auto grid md:grid-cols-2 gap-5 md:gap-6">
        <div className="reveal glass gradient-border rounded-3xl p-7 md:p-8">
          <div className="text-[11px] uppercase tracking-[0.3em] text-emerald-300/80 font-semibold">✓ Es para vos si...</div>
          <h3 className="mt-3 font-bold text-2xl md:text-3xl">Este webinar es <span className="text-brand-gradient">para vos</span></h3>
          <ul className="mt-6 space-y-4">
            {yes.map((t) => (
              <li key={t} className="flex gap-3 items-start text-white/80">
                <span className="mt-0.5 w-6 h-6 flex-shrink-0 rounded-full bg-emerald-400/10 border border-emerald-400/30 flex items-center justify-center">
                  <Check className="w-3.5 h-3.5 text-emerald-300" strokeWidth={2.6} />
                </span>
                <span className="text-[15px] leading-relaxed">{t}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="reveal glass rounded-3xl p-7 md:p-8 border border-white/10" style={{ transitionDelay: "80ms" }}>
          <div className="text-[11px] uppercase tracking-[0.3em] text-rose-300/80 font-semibold">✗ No es para vos si...</div>
          <h3 className="mt-3 font-bold text-2xl md:text-3xl text-white/80">No es para vos</h3>
          <ul className="mt-6 space-y-4">
            {no.map((t) => (
              <li key={t} className="flex gap-3 items-start text-white/55">
                <span className="mt-0.5 w-6 h-6 flex-shrink-0 rounded-full bg-rose-400/10 border border-rose-400/30 flex items-center justify-center">
                  <X className="w-3.5 h-3.5 text-rose-300" strokeWidth={2.6} />
                </span>
                <span className="text-[15px] leading-relaxed">{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

const About = () => (
  <section className="relative py-20 md:py-28 px-4 sm:px-6">
    <div className="max-w-[1180px] mx-auto grid lg:grid-cols-[0.8fr_1fr] gap-10 lg:gap-16 items-center">
      <div className="reveal relative order-2 lg:order-1">
        <div className="absolute -inset-6 bg-gradient-to-br from-[#8943E3]/30 to-[#F239FF]/20 blur-3xl rounded-[3rem]" />
        <div className="relative grid grid-cols-2 gap-3">
          <div className="rounded-2xl overflow-hidden" style={{ padding: 2, background: "linear-gradient(135deg,#8943E3,#F239FF 70%,#6A32B3)" }}>
            <img src="/assets/founder-agustin.jpg" alt="Agustín Badt" className="w-full aspect-[4/5] object-cover rounded-2xl bg-[#0A0A0A]" />
          </div>
          <div className="rounded-2xl overflow-hidden translate-y-6" style={{ padding: 2, background: "linear-gradient(135deg,#8943E3,#F239FF 70%,#6A32B3)" }}>
            <img src="/assets/founder-jp.jpg" alt="Juan Pablo Rosso" className="w-full aspect-[4/5] object-cover rounded-2xl bg-[#0A0A0A]" />
          </div>
        </div>
      </div>
      <div className="reveal order-1 lg:order-2">
        <div className="text-[11px] uppercase tracking-[0.3em] text-[#F239FF] font-semibold">Quiénes somos</div>
        <h2 className="mt-4 font-bold text-[clamp(1.8rem,4.5vw,3rem)] leading-[1.05] tracking-[-0.02em]">
          Agustín Badt <span className="text-brand-gradient">&</span> Juan Pablo Rosso
        </h2>
        <div className="mt-6 space-y-4 text-white/70 text-[16px] leading-relaxed">
          <p>Somos los <span className="text-white font-medium">co-fundadores de Nexum AI</span> — una agencia de IA que trabaja con negocios en toda América Latina.</p>
          <p>No somos gurús. No vendemos humo. Construimos Nexum AI desde cero y hoy ayudamos a empresas reales a implementar IA en sus operaciones.</p>
          <p>En este webinar te mostramos el <span className="text-white">mismo sistema</span> que usamos nosotros — y que replicaríamos si tuviéramos que empezar de cero hoy.</p>
        </div>
        <div className="mt-10 grid grid-cols-3 gap-4 md:gap-6">
          {[
            { n: "+50", l: "Empresas asesoradas" },
            { n: "+3 años", l: "En el mercado de IA" },
            { n: "100%", l: "Enfocados en LATAM" },
          ].map((s) => (
            <div key={s.l} className="gradient-border rounded-2xl p-4 md:p-5 text-center">
              <div className="font-bold text-2xl md:text-3xl text-brand-solid">{s.n}</div>
              <div className="text-[11px] mt-1 uppercase tracking-[0.15em] text-white/50">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const Bonus = () => {
  const skills = [
    "Generación automática de documentos profesionales (contratos, propuestas, reportes)",
    "Creación de presentaciones listas para clientes",
    "Análisis de datos y generación de dashboards",
    "Automatización de lectura y extracción de PDFs",
    "Generación de hojas de cálculo avanzadas con fórmulas",
    "Diseño frontend de componentes y landing pages",
    "Sistema de creación y edición de archivos Word (.docx)",
    "Lectura inteligente de cualquier tipo de archivo",
    "+14 skills adicionales para desarrollo, diseño y productividad",
  ];
  const tree = [
    { d: 0, n: "nexum-workspace/" },
    { d: 1, n: "skills/" },
    { d: 2, n: "docs-generator.md" },
    { d: 2, n: "presentations.md" },
    { d: 2, n: "data-dashboards.md" },
    { d: 2, n: "pdf-extractor.md" },
    { d: 2, n: "sheets-automator.md" },
    { d: 2, n: "frontend-design.md" },
    { d: 2, n: "docx-editor.md" },
    { d: 2, n: "file-reader.md" },
    { d: 2, n: "… +14 more" },
    { d: 1, n: "CLAUDE.md" },
    { d: 1, n: "README.md" },
  ];
  return (
    <section className="relative py-20 md:py-28 px-4 sm:px-6">
      <div className="max-w-[1180px] mx-auto">
        <div className="reveal relative gradient-border-strong rounded-[2rem] p-7 md:p-12 overflow-hidden">
          <div className="absolute -top-32 -right-32 w-[400px] h-[400px] rounded-full bg-[#F239FF]/20 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full bg-[#8943E3]/20 blur-3xl pointer-events-none" />
          <div className="relative grid lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-14 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full brand-gradient text-[11px] tracking-[0.2em] uppercase font-bold text-white">
                <Gift className="w-3.5 h-3.5" /> Bonus exclusivo
              </div>
              <h2 className="mt-5 font-black text-[clamp(1.8rem,4.8vw,3.2rem)] leading-[1.02] tracking-[-0.02em]">
                Llevate <span className="text-brand-gradient">gratis</span> nuestro Espacio de Trabajo de Claude Code
              </h2>
              <p className="mt-4 text-white/70 leading-relaxed">
                Registrate al webinar y accedé al workspace con <span className="text-white font-semibold">+22 skills profesionales</span> — listo para importar en Claude Code.
                <span className="block mt-1 text-white/45 text-sm">Valorado en <span className="line-through">$197 USD</span> · hoy gratis.</span>
              </p>
              <ul className="mt-6 space-y-2.5">
                {skills.map((s, i) => (
                  <li key={i} className="flex gap-3 items-start text-[14.5px] text-white/80">
                    <span className="mt-0.5 w-5 h-5 flex-shrink-0 rounded-full brand-gradient flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" strokeWidth={3} />
                    </span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
              <a href="#form" className="mt-8 cta-primary rounded-full px-7 py-4 font-semibold text-white text-sm sm:text-base tracking-wide inline-flex items-center gap-2">
                QUIERO MI LUGAR + EL BONUS <ArrowRight className="w-4 h-4" />
              </a>
            </div>
            <div className="reveal relative" style={{ transitionDelay: "120ms" }}>
              <div className="gradient-border rounded-2xl overflow-hidden shadow-2xl shadow-black/50 bg-[#0A080D]">
                <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/5 bg-black/40">
                  <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                  <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                  <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
                  <span className="ml-3 text-[11px] font-mono text-white/40">~/nexum-workspace</span>
                </div>
                <div className="p-5 font-mono text-[13px] leading-[1.7]">
                  <div className="text-white/35">$ <span className="text-white/90">tree nexum-workspace</span></div>
                  <div className="mt-2 space-y-0.5">
                    {tree.map((t, i) => (
                      <div key={i} className="flex">
                        <span className="text-white/25 w-[32px]">{t.d === 0 ? "├─" : t.d === 1 ? "│  ├─" : "│  │  ├─"}</span>
                        <span className={t.d === 0 ? "text-[#F239FF] font-semibold" : t.d === 1 ? "text-[#8943E3]" : "text-white/70"}>{t.n}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 text-white/35">$ <span className="text-[#F239FF]">claude</span> <span className="text-white/90">–skill docs-generator</span></div>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="text-emerald-300">✓</span>
                    <span className="text-white/60">22 skills cargadas · listo</span>
                    <span className="inline-block w-2 h-4 bg-[#F239FF]/80 ml-1" style={{ animation: "pulseDot 1.6s ease-in-out infinite" }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Form = ({ onSubmit, submitting }) => {
  const [name, setName] = useState("");
  const [phoneCountry, setPhoneCountry] = useState("+598");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [accepts, setAccepts] = useState(true);
  const [errors, setErrors] = useState({});
  const [countryOpen, setCountryOpen] = useState(false);
  const dropRef = useRef(null);

  useEffect(() => {
    const h = (ev) => { if (dropRef.current && !dropRef.current.contains(ev.target)) setCountryOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const allCountries = [...LATAM, { divider: true }, ...OTROS];
  const current = [...LATAM, ...OTROS].find((c) => c.code === phoneCountry) || LATAM[0];

  const validate = () => {
    const e = {};
    if (!name.trim()) e.name = "Ingresá tu nombre completo";
    if (!phone.trim()) e.phone = "Ingresá tu número de WhatsApp";
    else if (phone.replace(/\D/g, "").length < 6) e.phone = "Número demasiado corto";
    if (!email.trim()) e.email = "Ingresá tu email";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Email inválido";
    return e;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length === 0) onSubmit({ name, phone: phoneCountry + phone, email, accepts });
  };

  return (
    <section id="form" className="relative py-20 md:py-28 px-4 sm:px-6 scroll-mt-20">
      <div className="max-w-[640px] mx-auto">
        <div className="reveal text-center">
          <div className="text-[11px] uppercase tracking-[0.3em] text-[#F239FF] font-semibold">Reservá tu lugar</div>
          <h2 className="mt-4 font-bold text-[clamp(1.8rem,4.8vw,3rem)] leading-[1.05] tracking-[-0.02em]">
            Reservá tu <span className="text-brand-gradient">lugar ahora</span>
          </h2>
          <p className="mt-4 text-white/60">Completá tus datos y asegurá tu plaza para el webinar del 7 de mayo.</p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="reveal mt-10 glass gradient-border rounded-3xl p-6 md:p-8 space-y-5">
          <div>
            <label className="text-[11px] uppercase tracking-[0.2em] text-white/50 font-semibold">Nombre completo</label>
            <div className={`mt-2 flex items-center rounded-xl border bg-black/30 ${errors.name ? "border-rose-400/60" : "border-white/10"}`}>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Tu nombre"
                     className="w-full bg-transparent px-4 py-3.5 outline-none text-white placeholder:text-white/30" />
            </div>
            {errors.name && <p className="mt-1.5 text-xs text-rose-300">{errors.name}</p>}
          </div>

          <div>
            <label className="text-[11px] uppercase tracking-[0.2em] text-white/50 font-semibold">Número de WhatsApp</label>
            <div className={`mt-2 flex items-stretch rounded-xl border bg-black/30 ${errors.phone ? "border-rose-400/60" : "border-white/10"} relative`}>
              <div ref={dropRef} className="relative">
                <button type="button" onClick={() => setCountryOpen((v) => !v)}
                        className="h-full flex items-center gap-2 pl-4 pr-3 text-white/85 border-r border-white/10 hover:bg-white/5 rounded-l-xl">
                  <span className="text-lg leading-none">{current.flag}</span>
                  <span className="font-mono text-sm">{current.code}</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-white/50 transition-transform ${countryOpen ? "rotate-180" : ""}`} />
                </button>
                {countryOpen && (
                  <div className="absolute z-30 mt-1 left-0 top-full w-[260px] max-h-72 overflow-auto rounded-xl border border-white/10 bg-[#0D0B10] shadow-2xl shadow-black/60 backdrop-blur">
                    {allCountries.map((c, i) => c.divider ? (
                      <div key={"d-" + i} className="px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-white/30 border-y border-white/5">Otros</div>
                    ) : (
                      <button type="button" key={c.name} onClick={() => { setPhoneCountry(c.code); setCountryOpen(false); }}
                              className={`w-full flex items-center gap-3 px-3 py-2.5 text-left text-sm hover:bg-white/5 ${phoneCountry === c.code ? "bg-white/5" : ""}`}>
                        <span className="text-base leading-none">{c.flag}</span>
                        <span className="text-white/85 flex-1">{c.name}</span>
                        <span className="font-mono text-white/45 text-xs">{c.code}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Tu número de WhatsApp" inputMode="tel"
                     className="flex-1 bg-transparent px-4 py-3.5 outline-none text-white placeholder:text-white/30 rounded-r-xl" />
            </div>
            {errors.phone && <p className="mt-1.5 text-xs text-rose-300">{errors.phone}</p>}
          </div>

          <div>
            <label className="text-[11px] uppercase tracking-[0.2em] text-white/50 font-semibold">Email</label>
            <div className={`mt-2 flex items-center rounded-xl border bg-black/30 ${errors.email ? "border-rose-400/60" : "border-white/10"}`}>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Tu mejor email"
                     className="w-full bg-transparent px-4 py-3.5 outline-none text-white placeholder:text-white/30" />
            </div>
            {errors.email && <p className="mt-1.5 text-xs text-rose-300">{errors.email}</p>}
          </div>

          <label className="flex gap-3 items-start cursor-pointer select-none">
            <span className={`relative mt-0.5 w-5 h-5 flex-shrink-0 rounded-md border transition ${accepts ? "brand-gradient border-transparent" : "border-white/25 bg-black/30"}`}>
              {accepts && <Check className="w-3.5 h-3.5 text-white absolute inset-0 m-auto" strokeWidth={3} />}
            </span>
            <input type="checkbox" checked={accepts} onChange={(e) => setAccepts(e.target.checked)} className="sr-only" />
            <span className="text-sm text-white/65">Acepto recibir comunicaciones sobre el webinar</span>
          </label>

          <button type="submit" disabled={submitting}
                  className="cta-primary w-full rounded-full py-4 font-semibold text-white text-sm sm:text-base tracking-wide inline-flex items-center justify-center gap-2 disabled:opacity-80 disabled:cursor-wait">
            {submitting ? (
              <>
                <span className="inline-block w-4 h-4 border-2 border-white/70 border-t-transparent rounded-full" style={{ animation: "spin 1.1s linear infinite" }} />
                PROCESANDO…
              </>
            ) : (
              <>RESERVAR MI LUGAR GRATIS <ArrowRight className="w-4 h-4" /></>
            )}
          </button>

          <div className="pt-2 space-y-1.5 text-center">
            <div className="flex items-center justify-center gap-2 text-xs text-white/45">
              <Lock className="w-3.5 h-3.5" /> Tus datos están seguros. No compartimos tu información.
            </div>
            <div className="flex items-center justify-center gap-2 text-xs text-[#F239FF]/80 font-medium">
              <Zap className="w-3.5 h-3.5" /> Quedan pocas plazas disponibles
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="relative border-t border-white/5 mt-8 py-10 px-4 sm:px-6">
    <div className="max-w-[1180px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
      <Logo className="h-6 opacity-80" />
      <div className="text-xs text-white/40 text-center">© 2026 Nexum AI. Todos los derechos reservados.</div>
      <div className="flex items-center gap-5 text-xs text-white/50">
        <a href="#" className="hover:text-white transition">Aviso Legal</a>
        <a href="#" className="hover:text-white transition">Política de Privacidad</a>
      </div>
    </div>
  </footer>
);

const ConfirmOverlay = () => (
  <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-md" style={{ animation: "fadeUp .4s cubic-bezier(.2,.7,.2,1) both" }}>
    <div style={{ animation: "scaleIn .5s cubic-bezier(.2,.9,.2,1.2) both" }} className="text-center px-6">
      <div className="relative mx-auto w-24 h-24 rounded-full brand-gradient flex items-center justify-center" style={{ boxShadow: "0 0 60px rgba(242,57,255,0.45)" }}>
        <svg viewBox="0 0 52 52" className="w-14 h-14 text-white">
          <path d="M14 27 l8 8 l16 -18" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"
                style={{ strokeDasharray: 48, strokeDashoffset: 48, animation: "drawCheck .55s ease-out .25s both" }} />
        </svg>
      </div>
      <h3 className="mt-8 font-bold text-2xl md:text-3xl">¡Listo! Tu lugar está reservado 🎉</h3>
      <p className="mt-3 text-white/60">Te llevamos a los próximos pasos…</p>
    </div>
  </div>
);

const Marquee = () => {
  const item = "⚠️  SOLO TE QUEDA UN PASO PARA CONFIRMAR TU PLAZA";
  const items = Array(16).fill(item);
  return (
    <div className="relative overflow-hidden brand-gradient border-y border-white/10">
      <div className="flex whitespace-nowrap py-3 font-bold tracking-[0.1em] text-sm md:text-base text-white" style={{ animation: "marquee 26s linear infinite" }}>
        {items.map((t, i) => (
          <span key={i} className="flex items-center gap-8 px-6">{t}<span className="text-white/70">✦</span></span>
        ))}
      </div>
    </div>
  );
};

const PostRegistration = () => (
  <div style={{ animation: "fadeUp .9s cubic-bezier(.2,.7,.2,1) both" }}>
    <Marquee />
    <section className="relative pt-16 md:pt-24 pb-16 px-4 sm:px-6">
      <div className="max-w-[760px] mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full gradient-border text-[11px] tracking-[0.2em] uppercase font-semibold">
          <span className="text-emerald-300">✓</span><span className="text-white/85">Plaza confirmada</span>
        </div>
        <h1 className="mt-6 font-black text-[clamp(2.2rem,6vw,4.2rem)] leading-[1.02] tracking-[-0.02em]">
          ¡Ya estás dentro! <span style={{ animation: "float 8s ease-in-out infinite", display: "inline-block" }}>🎉</span><br />
          <span className="text-brand-gradient">Ahora unite a la comunidad</span><br />para no perderte nada.
        </h1>
        <p className="mt-6 text-white/70 text-lg max-w-xl mx-auto leading-relaxed">
          Entrá a nuestra comunidad exclusiva en Skool donde vas a encontrar: el bonus que te prometimos, material previo al webinar, y el acceso directo al evento en vivo.
        </p>
        <a href="https://www.skool.com/nexum" target="_blank" rel="noopener noreferrer"
           className="mt-10 cta-primary rounded-full px-8 py-4 font-semibold text-white text-sm sm:text-base tracking-wide inline-flex items-center gap-2">
          UNIRME A LA COMUNIDAD <ExternalLink className="w-4 h-4" />
        </a>
        <div className="mt-12 grid md:grid-cols-3 gap-4">
          {[
            { Icon: Gift, t: "Tu bonus", d: "Workspace de Claude Code con +22 Skills" },
            { Icon: Calendar, t: "Recordatorio", d: "Acceso al webinar en vivo" },
            { Icon: Users, t: "Comunidad", d: "Personas construyendo agencias de IA" },
          ].map((c, i) => (
            <div key={i} className="reveal gradient-border rounded-2xl p-5 text-left">
              <div className="w-10 h-10 rounded-lg brand-gradient flex items-center justify-center">
                <c.Icon className="w-5 h-5 text-white" />
              </div>
              <div className="mt-3 text-[11px] uppercase tracking-[0.2em] text-[#F239FF]/80 font-semibold">{c.t}</div>
              <div className="mt-1 text-[15px] text-white/85 leading-snug">{c.d}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
    <section className="relative pb-20 md:pb-28 px-4 sm:px-6">
      <div className="max-w-[860px] mx-auto">
        <div className="reveal relative gradient-border-strong rounded-[2rem] p-8 md:p-12 overflow-hidden text-center">
          <div className="absolute -top-32 -right-16 w-[340px] h-[340px] rounded-full bg-[#F239FF]/15 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -left-16 w-[340px] h-[340px] rounded-full bg-[#8943E3]/15 blur-3xl pointer-events-none" />
          <div className="relative">
            <div className="text-[11px] uppercase tracking-[0.3em] text-[#F239FF] font-semibold">Atajo</div>
            <h2 className="mt-3 font-bold text-[clamp(1.5rem,3.8vw,2.4rem)] leading-tight tracking-[-0.02em]">
              ¿Ya sabés que querés escalar<br className="hidden md:inline"/> tu agencia con <span className="text-brand-gradient">nuestra ayuda</span>?
            </h2>
            <p className="mt-4 text-white/65 max-w-xl mx-auto leading-relaxed">
              Si no necesitás esperar al webinar y ya querés hablar con nosotros sobre cómo podemos ayudarte 1:1 a construir tu agencia de IA, agendá una llamada de descubrimiento directa.
            </p>
            <a href="https://cal.com/nexumai" target="_blank" rel="noopener noreferrer"
               className="mt-8 inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-semibold text-white text-sm tracking-wide gradient-border-strong hover:bg-white/5 transition">
              Agendar llamada de descubrimiento <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
);

/* ------------------- Main App ------------------- */
export default function App() {
  const [view, setView] = useState("registration");
  const [submitting, setSubmitting] = useState(false);
  const [overlay, setOverlay] = useState(false);
  const [countdown, setCountdown] = useState(computeCountdown(TARGET));

  useEffect(() => {
    const id = setInterval(() => setCountdown(computeCountdown(TARGET)), 1000);
    return () => clearInterval(id);
  }, []);

  useReveal();

  const handleSubmit = useCallback(() => {
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setOverlay(true);
      setTimeout(() => {
        setView("postRegistration");
        setOverlay(false);
        window.scrollTo({ top: 0, behavior: "auto" });
      }, 2500);
    }, 900);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#0A0A0A] text-white" style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, system-ui, sans-serif", letterSpacing: '-0.005em' }}>
      {view === "registration" ? (
        <>
          <Nav countdown={countdown} />
          <Hero countdown={countdown} />
          <LearnCards />
          <ForYou />
          <About />
          <Bonus />
          <Form onSubmit={handleSubmit} submitting={submitting} />
        </>
      ) : (
        <PostRegistration />
      )}
      <Footer />
      {overlay && <ConfirmOverlay />}
    </div>
  );
}
