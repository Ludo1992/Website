import { useEffect, useState } from "react";
import "@/App.css";
import axios from "axios";
import {
    Lightning,
    Gear,
    Wrench,
    ShieldCheck,
    ArrowRight,
    EnvelopeSimple,
    MapPin,
    IdentificationCard,
    Phone,
    CircleNotch,
    CheckCircle,
    XCircle,
    List as ListIcon,
    X as CloseIcon,
} from "@phosphor-icons/react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const LOGO_URL =
    "https://ludoaloserij.nl/wp-content/uploads/2023/11/Color-logo-no-background-1024x627.png";

const NAV_ITEMS = [
    { id: "diensten", label: "Diensten" },
    { id: "over", label: "Over" },
    { id: "projecten", label: "Projecten" },
    { id: "contact", label: "Contact" },
];

const SERVICES = [
    {
        n: "01",
        Icon: Lightning,
        title: "Elektrotechniek",
        desc: "Aanleg, onderhoud en reparatie van industriële en residentiële elektrische installaties.",
    },
    {
        n: "02",
        Icon: Gear,
        title: "Mechanica",
        desc: "Precisiewerk in mechanisch onderhoud, machine-reparaties en constructiewerken.",
    },
    {
        n: "03",
        Icon: Wrench,
        title: "Installatie",
        desc: "Vakkundige installatie van technische systemen, netwerken en apparatuur.",
    },
    {
        n: "04",
        Icon: ShieldCheck,
        title: "Onderhoud",
        desc: "Periodiek en preventief onderhoud om stilstand en defecten te voorkomen.",
    },
];

const PROJECTS = [
    {
        url: "https://images.pexels.com/photos/34054471/pexels-photo-34054471.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        tag: "Industrieel",
        title: "Onderhoud productielijn",
        meta: "2024 · Mechanisch",
    },
    {
        url: "https://images.pexels.com/photos/35290669/pexels-photo-35290669.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        tag: "Installatie",
        title: "Bouwplaats elektra",
        meta: "2024 · Elektrotechniek",
    },
    {
        url: "https://images.unsplash.com/photo-1660400696694-d9a2dcf0c3e5?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA3MDR8MHwxfHNlYXJjaHwzfHxlbGVjdHJpY2FsJTIwcmVwYWlyJTIwZGFya3xlbnwwfHx8fDE3NzgzMjMzODF8MA&ixlib=rb-4.1.0&q=85",
        tag: "Reparatie",
        title: "Storingsanalyse besturing",
        meta: "2024 · Diagnose",
    },
];

const STATS = [
    { v: "10+", l: "Jaar ervaring" },
    { v: "24/7", l: "Bereikbaar" },
    { v: "100%", l: "Hands-on" },
    { v: "NL", l: "Regio Limburg" },
];

const TICKER = [
    "Elektrotechniek",
    "Mechanica",
    "Installatie",
    "Onderhoud",
    "Reparatie",
    "Storingsdienst",
    "Industrie",
    "Precisiewerk",
];

// ---------------- Components ----------------

const Nav = ({ onOpen }) => {
    const [open, setOpen] = useState(false);
    return (
        <nav
            className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-ink-900/80 border-b border-white/10"
            data-testid="main-nav"
        >
            <div className="px-6 md:px-12 lg:px-20 h-20 flex items-center justify-between">
                <a
                    href="#top"
                    className="flex items-center gap-3"
                    data-testid="nav-logo-link"
                >
                    <img
                        src={LOGO_URL}
                        alt="L.A. Technische Service logo"
                        className="h-10 w-auto"
                        data-testid="nav-logo"
                    />
                    <span className="hidden md:flex flex-col leading-tight">
                        <span className="font-heading font-black text-sm tracking-tight text-white">
                            L.A. Technische Service
                        </span>
                        <span className="label-mono text-[0.6rem]">
                            Alles met Techniek
                        </span>
                    </span>
                </a>

                <div className="hidden md:flex items-center gap-10">
                    {NAV_ITEMS.map((item) => (
                        <a
                            key={item.id}
                            href={`#${item.id}`}
                            className="font-mono text-xs uppercase tracking-widest text-slate-300 hover:text-cyber transition-colors"
                            data-testid={`nav-link-${item.id}`}
                        >
                            {item.label}
                        </a>
                    ))}
                </div>

                <a
                    href="#contact"
                    className="hidden md:inline-flex btn-cyber"
                    data-testid="nav-cta-button"
                >
                    Offerte <ArrowRight size={14} weight="bold" />
                </a>

                <button
                    className="md:hidden text-white p-2"
                    onClick={() => setOpen(!open)}
                    aria-label="Menu"
                    data-testid="mobile-menu-toggle"
                >
                    {open ? <CloseIcon size={22} /> : <ListIcon size={22} />}
                </button>
            </div>
            {open && (
                <div className="md:hidden border-t border-white/10 bg-ink-900/95">
                    {NAV_ITEMS.map((i) => (
                        <a
                            key={i.id}
                            href={`#${i.id}`}
                            onClick={() => setOpen(false)}
                            className="block px-6 py-4 font-mono text-xs uppercase tracking-widest text-slate-300 border-b border-white/5"
                            data-testid={`mobile-nav-link-${i.id}`}
                        >
                            {i.label}
                        </a>
                    ))}
                </div>
            )}
        </nav>
    );
};

const Hero = () => (
    <section
        id="top"
        className="relative min-h-screen pt-20 overflow-hidden noise"
        data-testid="hero-section"
    >
        {/* background image */}
        <div className="absolute inset-0">
            <img
                src="https://images.unsplash.com/photo-1675976942582-0272a67c6f21?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA3MDR8MHwxfHNlYXJjaHwyfHxlbGVjdHJpY2FsJTIwcmVwYWlyJTIwZGFya3xlbnwwfHx8fDE3NzgzMjMzODF8MA&ixlib=rb-4.1.0&q=85"
                alt="Elektrische bedrading"
                className="w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-ink-900 via-ink-900/85 to-ink-900/40" />
            <div className="absolute inset-0 blueprint-grid opacity-40" />
        </div>

        <div className="relative px-6 md:px-12 lg:px-20 pt-20 md:pt-28 pb-12">
            <div className="max-w-6xl">
                <div
                    className="flex items-center gap-3 mb-8 animate-fade-up"
                    style={{ animationDelay: "0.05s", opacity: 0 }}
                >
                    <span className="h-px w-10 bg-cyber" />
                    <span className="label-mono">
                        EST. 2020 · KVK 80568173
                    </span>
                </div>

                <h1
                    className="font-heading font-black text-5xl sm:text-6xl lg:text-8xl tracking-tighter text-white leading-[0.92] animate-fade-up"
                    style={{ animationDelay: "0.15s", opacity: 0 }}
                    data-testid="hero-title"
                >
                    Alles met
                    <br />
                    <span className="text-cyber">Techniek.</span>
                </h1>

                <p
                    className="mt-8 max-w-2xl text-base md:text-lg text-slate-400 leading-relaxed animate-fade-up"
                    style={{ animationDelay: "0.3s", opacity: 0 }}
                    data-testid="hero-subtitle"
                >
                    L.A. Technische Service levert hands-on oplossingen voor
                    elektrotechniek, mechanica en installaties. Van complexe
                    industriële storingen tot precies mechanisch werk —
                    kwaliteit en betrouwbaarheid staan voorop.
                </p>

                <div
                    className="mt-12 flex flex-wrap gap-4 animate-fade-up"
                    style={{ animationDelay: "0.45s", opacity: 0 }}
                >
                    <a
                        href="#contact"
                        className="btn-cyber"
                        data-testid="hero-cta-primary"
                    >
                        Vraag offerte aan{" "}
                        <ArrowRight size={14} weight="bold" />
                    </a>
                    <a
                        href="#diensten"
                        className="btn-ghost"
                        data-testid="hero-cta-secondary"
                    >
                        Bekijk diensten
                    </a>
                </div>
            </div>
        </div>

        {/* stat strip */}
        <div className="relative border-t border-white/10 bg-ink-900/70 backdrop-blur">
            <div className="grid grid-cols-2 md:grid-cols-4">
                {STATS.map((s, i) => (
                    <div
                        key={i}
                        className="px-6 md:px-10 py-8 border-r border-white/10 last:border-r-0"
                        data-testid={`hero-stat-${i}`}
                    >
                        <div className="font-heading font-black text-3xl md:text-4xl text-white">
                            {s.v}
                        </div>
                        <div className="label-mono mt-2 text-slate-400">
                            {s.l}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

const Ticker = () => (
    <div className="border-y border-white/10 bg-ink-800/60 py-6 overflow-hidden ticker">
        <div className="flex gap-12 animate-marquee whitespace-nowrap">
            {[...TICKER, ...TICKER, ...TICKER].map((t, i) => (
                <span
                    key={i}
                    className="font-mono text-sm uppercase tracking-[0.3em] text-slate-500 flex items-center gap-12"
                >
                    {t}
                    <span className="h-1 w-1 bg-cyber" />
                </span>
            ))}
        </div>
    </div>
);

const Services = () => (
    <section
        id="diensten"
        className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20"
        data-testid="services-section"
    >
        <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-12 gap-10 mb-16">
                <div className="md:col-span-4">
                    <span className="label-mono">[ 02 ] Wat wij doen</span>
                    <h2 className="mt-4 font-heading font-black text-4xl md:text-5xl tracking-tighter text-white">
                        Diensten op
                        <br />
                        technisch niveau.
                    </h2>
                </div>
                <div className="md:col-span-7 md:col-start-6 flex items-end">
                    <p className="text-slate-400 leading-relaxed text-base md:text-lg">
                        Vier kerngebieden, één aanpak: nauwkeurig, eerlijk en
                        oplossingsgericht. Of het nu gaat om een
                        productiestoring of een nieuw schakelpaneel — u krijgt
                        altijd de man die het zelf doet.
                    </p>
                </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 border-t border-l border-white/10">
                {SERVICES.map((s, i) => (
                    <div
                        key={i}
                        className="group relative border-r border-b border-white/10 p-10 hover:bg-ink-800 transition-colors"
                        data-testid={`service-card-${i}`}
                    >
                        <div className="flex items-start justify-between mb-10">
                            <s.Icon
                                size={42}
                                className="text-cyber"
                                weight="duotone"
                            />
                            <span className="label-mono">{s.n}</span>
                        </div>
                        <h3 className="font-heading font-bold text-2xl text-white mb-3">
                            {s.title}
                        </h3>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            {s.desc}
                        </p>
                        <div className="mt-8 h-px w-0 bg-cyber group-hover:w-full transition-all duration-500" />
                    </div>
                ))}
            </div>
        </div>
    </section>
);

const About = () => (
    <section
        id="over"
        className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20 border-t border-white/10"
        data-testid="about-section"
    >
        <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-5 order-2 md:order-1">
                <div className="relative aspect-[4/5] overflow-hidden border border-white/10">
                    <img
                        src="https://images.unsplash.com/photo-1748347568194-c8cd8edd27da?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxODl8MHwxfHNlYXJjaHw0fHxpbmR1c3RyaWFsJTIwdGVjaG5pY2lhbiUyMHdvcmtpbmd8ZW58MHx8fHwxNzc4MzIzMzgxfDA&ixlib=rb-4.1.0&q=85"
                        alt="Industrieel technicus aan het werk"
                        className="w-full h-full object-cover grayscale contrast-110"
                    />
                    <div className="absolute inset-0 bg-cyber/10 mix-blend-multiply" />
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                        <span className="label-mono">FILE_001</span>
                        <span className="label-mono">L.A.T.S.</span>
                    </div>
                </div>
            </div>

            <div className="md:col-span-6 md:col-start-7 order-1 md:order-2">
                <span className="label-mono">[ 03 ] Over ons</span>
                <h2 className="mt-4 font-heading font-black text-4xl md:text-5xl tracking-tighter text-white">
                    Ludo Aloserij.
                    <br />
                    <span className="text-slate-500">
                        De man achter de techniek.
                    </span>
                </h2>
                <p className="mt-6 text-slate-400 leading-relaxed text-base md:text-lg">
                    Met een passie voor alles wat met techniek te maken heeft,
                    levert Ludo hands-on, no-nonsense technische diensten. Van
                    complexe industriële storingen tot nauwkeurig mechanisch
                    werk — kwaliteit, eerlijkheid en betrouwbaarheid staan
                    voorop.
                </p>

                <div className="mt-10 grid grid-cols-2 gap-px bg-white/10">
                    {[
                        { k: "Aanpak", v: "No-nonsense" },
                        { k: "Specialiteit", v: "Industrie" },
                        { k: "Ervaring", v: "10+ jaar" },
                        { k: "Status", v: "Beschikbaar" },
                    ].map((b, i) => (
                        <div
                            key={i}
                            className="bg-ink-900 p-6"
                            data-testid={`about-meta-${i}`}
                        >
                            <div className="label-mono">{b.k}</div>
                            <div className="mt-2 font-heading font-bold text-white text-lg">
                                {b.v}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </section>
);

const Projects = () => (
    <section
        id="projecten"
        className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20 border-t border-white/10"
        data-testid="projects-section"
    >
        <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between flex-wrap gap-6 mb-14">
                <div>
                    <span className="label-mono">[ 04 ] Portfolio</span>
                    <h2 className="mt-4 font-heading font-black text-4xl md:text-5xl tracking-tighter text-white">
                        Recente projecten.
                    </h2>
                </div>
                <p className="max-w-md text-slate-400 leading-relaxed">
                    Een blik op het werk in de praktijk. Complexe problemen
                    vragen om technische precisie.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-px bg-white/10 border border-white/10">
                {PROJECTS.map((p, i) => (
                    <article
                        key={i}
                        className="group relative bg-ink-900 overflow-hidden"
                        data-testid={`project-card-${i}`}
                    >
                        <div className="relative aspect-[4/5] overflow-hidden">
                            <img
                                src={p.url}
                                alt={p.title}
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/30 to-transparent" />
                            <div className="absolute top-4 left-4">
                                <span className="label-mono bg-ink-900/70 px-2 py-1">
                                    {p.tag}
                                </span>
                            </div>
                        </div>
                        <div className="p-6 border-t border-white/10">
                            <div className="flex items-center justify-between mb-2">
                                <span className="label-mono text-slate-500">
                                    {p.meta}
                                </span>
                                <span className="font-mono text-xs text-slate-600">
                                    0{i + 1} / 0{PROJECTS.length}
                                </span>
                            </div>
                            <h3 className="font-heading font-bold text-xl text-white">
                                {p.title}
                            </h3>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    </section>
);

const ContactForm = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const [status, setStatus] = useState({ state: "idle", msg: "" });

    const update = (k) => (e) =>
        setForm((f) => ({ ...f, [k]: e.target.value }));

    const submit = async (e) => {
        e.preventDefault();
        setStatus({ state: "loading", msg: "" });
        try {
            await axios.post(`${API}/contact`, form);
            setStatus({
                state: "success",
                msg: "Bericht verzonden. Ludo neemt zo snel mogelijk contact op.",
            });
            setForm({ name: "", email: "", subject: "", message: "" });
        } catch (err) {
            const detail =
                err?.response?.data?.detail ||
                "Er ging iets mis. Probeer het opnieuw.";
            setStatus({
                state: "error",
                msg: typeof detail === "string" ? detail : "Validatiefout",
            });
        }
    };

    return (
        <form onSubmit={submit} className="space-y-8" data-testid="contact-form">
            <div className="grid md:grid-cols-2 gap-8">
                <div>
                    <label
                        className="label-mono mb-3 block"
                        htmlFor="name"
                    >
                        Volledige naam *
                    </label>
                    <input
                        id="name"
                        required
                        value={form.name}
                        onChange={update("name")}
                        className="input-line"
                        placeholder="Jouw naam"
                        data-testid="contact-input-name"
                    />
                </div>
                <div>
                    <label
                        className="label-mono mb-3 block"
                        htmlFor="email"
                    >
                        E-mail *
                    </label>
                    <input
                        id="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={update("email")}
                        className="input-line"
                        placeholder="naam@bedrijf.nl"
                        data-testid="contact-input-email"
                    />
                </div>
            </div>

            <div>
                <label className="label-mono mb-3 block" htmlFor="subject">
                    Onderwerp *
                </label>
                <input
                    id="subject"
                    required
                    value={form.subject}
                    onChange={update("subject")}
                    className="input-line"
                    placeholder="Waar kunnen we mee helpen?"
                    data-testid="contact-input-subject"
                />
            </div>

            <div>
                <label className="label-mono mb-3 block" htmlFor="message">
                    Bericht *
                </label>
                <textarea
                    id="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={update("message")}
                    className="input-line resize-none"
                    placeholder="Beschrijf je project, storing of vraag..."
                    data-testid="contact-input-message"
                />
            </div>

            <div className="flex flex-wrap items-center gap-6 pt-4">
                <button
                    type="submit"
                    disabled={status.state === "loading"}
                    className="btn-cyber disabled:opacity-60 disabled:cursor-not-allowed"
                    data-testid="contact-submit-button"
                >
                    {status.state === "loading" ? (
                        <>
                            <CircleNotch
                                size={14}
                                className="animate-spin"
                                weight="bold"
                            />
                            Verzenden...
                        </>
                    ) : (
                        <>
                            Verzenden <ArrowRight size={14} weight="bold" />
                        </>
                    )}
                </button>

                {status.state === "success" && (
                    <div
                        className="flex items-center gap-2 text-cyber font-mono text-xs uppercase tracking-widest"
                        data-testid="contact-success-message"
                    >
                        <CheckCircle size={16} weight="fill" />
                        {status.msg}
                    </div>
                )}
                {status.state === "error" && (
                    <div
                        className="flex items-center gap-2 text-red-400 font-mono text-xs uppercase tracking-widest"
                        data-testid="contact-error-message"
                    >
                        <XCircle size={16} weight="fill" />
                        {status.msg}
                    </div>
                )}
            </div>
        </form>
    );
};

const Contact = () => (
    <section
        id="contact"
        className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20 border-t border-white/10"
        data-testid="contact-section"
    >
        <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-12">
            <div className="md:col-span-5">
                <span className="label-mono">[ 05 ] Direct contact</span>
                <h2 className="mt-4 font-heading font-black text-4xl md:text-5xl tracking-tighter text-white">
                    Laten we praten
                    <br />
                    <span className="text-cyber">over techniek.</span>
                </h2>
                <p className="mt-6 text-slate-400 leading-relaxed">
                    Vul het formulier in of neem direct contact op via
                    onderstaande kanalen. Reactie binnen 24 uur.
                </p>

                <div className="mt-12 space-y-px bg-white/10">
                    <a
                        href="mailto:info@ludoaloserij.nl"
                        className="flex items-center gap-4 bg-ink-900 p-5 hover:bg-ink-800 transition-colors group"
                        data-testid="contact-email-link"
                    >
                        <EnvelopeSimple
                            size={22}
                            className="text-cyber"
                            weight="duotone"
                        />
                        <div>
                            <div className="label-mono text-slate-500">
                                E-mail
                            </div>
                            <div className="text-white font-mono text-sm group-hover:text-cyber transition-colors">
                                info@ludoaloserij.nl
                            </div>
                        </div>
                    </a>
                    <div className="flex items-center gap-4 bg-ink-900 p-5">
                        <IdentificationCard
                            size={22}
                            className="text-cyber"
                            weight="duotone"
                        />
                        <div>
                            <div className="label-mono text-slate-500">
                                KvK
                            </div>
                            <div className="text-white font-mono text-sm">
                                80568173
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 bg-ink-900 p-5">
                        <MapPin
                            size={22}
                            className="text-cyber"
                            weight="duotone"
                        />
                        <div>
                            <div className="label-mono text-slate-500">
                                Regio
                            </div>
                            <div className="text-white font-mono text-sm">
                                Nederland
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 bg-ink-900 p-5">
                        <Phone
                            size={22}
                            className="text-cyber"
                            weight="duotone"
                        />
                        <div>
                            <div className="label-mono text-slate-500">
                                Bereikbaar
                            </div>
                            <div className="text-white font-mono text-sm">
                                Via formulier / e-mail
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="md:col-span-6 md:col-start-7">
                <div className="border border-white/10 bg-ink-800/40 p-8 md:p-10">
                    <ContactForm />
                </div>
            </div>
        </div>
    </section>
);

const Footer = () => (
    <footer
        className="relative border-t border-white/10 bg-ink-900"
        data-testid="footer"
    >
        <div className="px-6 md:px-12 lg:px-20 py-14 max-w-7xl mx-auto grid md:grid-cols-12 gap-10">
            <div className="md:col-span-5">
                <img
                    src={LOGO_URL}
                    alt="L.A. Technische Service logo"
                    className="h-14 w-auto mb-4"
                />
                <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
                    Hands-on technische dienstverlening. Elektrotechniek,
                    mechanica en alles daartussenin.
                </p>
            </div>
            <div className="md:col-span-3">
                <div className="label-mono mb-4">Navigatie</div>
                <ul className="space-y-2">
                    {NAV_ITEMS.map((i) => (
                        <li key={i.id}>
                            <a
                                href={`#${i.id}`}
                                className="font-mono text-sm text-slate-300 hover:text-cyber"
                            >
                                {i.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="md:col-span-4">
                <div className="label-mono mb-4">Contact</div>
                <ul className="space-y-2 font-mono text-sm text-slate-300">
                    <li>Ludo Aloserij</li>
                    <li>
                        <a
                            href="mailto:info@ludoaloserij.nl"
                            className="hover:text-cyber"
                        >
                            info@ludoaloserij.nl
                        </a>
                    </li>
                    <li>KvK: 80568173</li>
                </ul>
            </div>
        </div>
        <div className="border-t border-white/10 px-6 md:px-12 lg:px-20 py-6 flex flex-wrap items-center justify-between gap-4 max-w-7xl mx-auto">
            <span className="label-mono text-slate-500">
                © {new Date().getFullYear()} L.A. Technische Service
            </span>
            <span className="label-mono text-slate-500">
                Alles met Techniek
            </span>
        </div>
    </footer>
);

// ---------------- App ----------------

function App() {
    useEffect(() => {
        // simple health ping (optional)
        axios.get(`${API}/`).catch(() => {});
    }, []);

    return (
        <div className="App" data-testid="app-root">
            <Nav />
            <Hero />
            <Ticker />
            <Services />
            <About />
            <Projects />
            <Contact />
            <Footer />
        </div>
    );
}

export default App;
