import { useState } from "react";
import "@/App.css";
import axios from "axios";
import {
    EnvelopeSimple,
    IdentificationCard,
    PaperPlaneTilt,
    CircleNotch,
    CheckCircle,
    XCircle,
    ArrowUpRight,
    Clock,
    Wrench,
} from "@phosphor-icons/react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const LOGO_URL =
    "https://ludoaloserij.nl/wp-content/uploads/2023/11/Color-logo-no-background-1024x627.png";

// ---------------- Decorative blobs ----------------

const Blobs = () => (
    <>
        {/* Big left blob (top) */}
        <div
            className="blob"
            style={{
                width: "640px",
                height: "640px",
                top: "-180px",
                left: "-260px",
                opacity: 0.55,
            }}
        />
        {/* Right side blob (mid) */}
        <div
            className="blob"
            style={{
                width: "520px",
                height: "520px",
                top: "30%",
                right: "-200px",
                opacity: 0.35,
            }}
        />
        {/* Bottom left small */}
        <div
            className="blob"
            style={{
                width: "360px",
                height: "360px",
                bottom: "-120px",
                left: "10%",
                opacity: 0.25,
            }}
        />
    </>
);

// ---------------- Header ----------------

const Header = () => (
    <header
        className="relative z-30 backdrop-blur-md bg-zinc-950/40 border-b border-white/5"
        data-testid="site-header"
    >
        <div className="container-x h-24 flex items-center justify-between max-w-6xl mx-auto">
            <a
                href="#top"
                className="flex items-center gap-4"
                data-testid="header-logo-link"
            >
                <div className="bg-white rounded-2xl px-4 py-2.5 shadow-[0_8px_28px_-8px_rgba(249,115,22,0.45)] ring-1 ring-brand-500/20">
                    <img
                        src={LOGO_URL}
                        alt="L.A. Technische Service"
                        className="h-11 md:h-12 w-auto"
                        data-testid="header-logo"
                    />
                </div>
                <div className="hidden sm:flex flex-col leading-tight">
                    <span className="font-serif italic text-2xl md:text-[28px] text-white">
                        Alles met techniek
                    </span>
                    <span className="text-[0.65rem] font-mono uppercase tracking-[0.28em] text-brand-400 mt-1">
                        L.A. Technische Service
                    </span>
                </div>
            </a>
            <a
                href="#contact"
                className="hidden md:inline-flex btn-primary"
                data-testid="header-cta"
            >
                Neem contact op
                <ArrowUpRight size={16} weight="bold" />
            </a>
        </div>
    </header>
);

// ---------------- Hero ----------------

const Hero = () => (
    <section
        id="top"
        className="relative overflow-hidden"
        data-testid="hero-section"
    >
        <div className="absolute inset-0 grid-fade opacity-70 pointer-events-none" />

        <div className="relative container-x max-w-6xl mx-auto pt-16 md:pt-24 pb-12 md:pb-16">
            <div className="flex items-center gap-3 mb-7">
                <span className="h-2.5 w-2.5 rounded-full bg-brand-500 animate-pulse" />
                <span className="eyebrow">
                    Beschikbaar voor opdrachten
                </span>
            </div>

            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
                <div>
                    <h1
                        className="font-serif text-6xl sm:text-7xl md:text-8xl leading-[0.95] text-white"
                        data-testid="hero-title"
                    >
                        Alles met
                        <br />
                        <span className="italic text-brand-500">techniek.</span>
                    </h1>
                    <p
                        className="mt-7 max-w-xl text-base md:text-lg text-zinc-400 leading-relaxed"
                        data-testid="hero-description"
                    >
                        L.A. Technische Service — hands-on technische dienstverlening
                        door Ludo Aloserij. Heb je een klus, vraag of storing? Stuur
                        een berichtje en ik neem snel contact met je op.
                    </p>
                </div>

                <div className="hidden md:flex items-center gap-4 pb-2">
                    <div className="h-px w-16 bg-brand-500" />
                    <Wrench size={28} weight="duotone" className="text-brand-500" />
                </div>
            </div>
        </div>
    </section>
);

// ---------------- Contact info card ----------------

const InfoRow = ({ Icon, label, value, href, testid }) => {
    const Wrapper = href ? "a" : "div";
    const props = href
        ? {
              href,
              className:
                  "group flex items-start gap-5 py-5 hover:translate-x-1 transition-transform",
          }
        : { className: "flex items-start gap-5 py-5" };
    return (
        <Wrapper {...props} data-testid={testid}>
            <div className="icon-badge">
                <Icon size={20} weight="bold" />
            </div>
            <div className="flex-1 pt-1">
                <div className="text-xs font-mono uppercase tracking-[0.18em] text-zinc-400 mb-1">
                    {label}
                </div>
                <div className="text-white text-lg font-medium">
                    {value}
                </div>
            </div>
            {href && (
                <ArrowUpRight
                    size={18}
                    className="text-zinc-500 group-hover:text-brand-400 mt-2 transition-colors"
                    weight="bold"
                />
            )}
        </Wrapper>
    );
};

// ---------------- Contact Form ----------------

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
                msg: "Bericht verzonden — ik neem zo snel mogelijk contact op.",
            });
            setForm({ name: "", email: "", subject: "", message: "" });
        } catch (err) {
            const detail =
                err?.response?.data?.detail ||
                "Er ging iets mis. Probeer het opnieuw.";
            setStatus({
                state: "error",
                msg:
                    typeof detail === "string"
                        ? detail
                        : "Controleer de ingevulde velden.",
            });
        }
    };

    return (
        <form
            onSubmit={submit}
            className="space-y-5"
            data-testid="contact-form"
            noValidate
        >
            <div>
                <label className="field-label" htmlFor="name">
                    Volledige naam
                </label>
                <input
                    id="name"
                    required
                    value={form.name}
                    onChange={update("name")}
                    className="field-input"
                    placeholder="Jouw naam"
                    autoComplete="name"
                    data-testid="contact-input-name"
                />
            </div>

            <div>
                <label className="field-label" htmlFor="email">
                    E-mailadres
                </label>
                <input
                    id="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={update("email")}
                    className="field-input"
                    placeholder="naam@voorbeeld.nl"
                    autoComplete="email"
                    data-testid="contact-input-email"
                />
            </div>

            <div>
                <label className="field-label" htmlFor="subject">
                    Onderwerp
                </label>
                <input
                    id="subject"
                    required
                    value={form.subject}
                    onChange={update("subject")}
                    className="field-input"
                    placeholder="Waar kan ik mee helpen?"
                    data-testid="contact-input-subject"
                />
            </div>

            <div>
                <label className="field-label" htmlFor="message">
                    Bericht
                </label>
                <textarea
                    id="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={update("message")}
                    className="field-input resize-none"
                    placeholder="Vertel kort over je project, klus of vraag..."
                    data-testid="contact-input-message"
                />
            </div>

            <div className="pt-3">
                <button
                    type="submit"
                    disabled={status.state === "loading"}
                    className="btn-primary w-full sm:w-auto"
                    data-testid="contact-submit-button"
                >
                    {status.state === "loading" ? (
                        <>
                            <CircleNotch
                                size={16}
                                className="animate-spin"
                                weight="bold"
                            />
                            Verzenden...
                        </>
                    ) : (
                        <>
                            Verzenden
                            <PaperPlaneTilt size={16} weight="fill" />
                        </>
                    )}
                </button>

                {status.state === "success" && (
                    <div
                        className="mt-4 flex items-start gap-2 text-emerald-400 text-sm"
                        data-testid="contact-success-message"
                    >
                        <CheckCircle size={18} weight="fill" className="mt-0.5" />
                        {status.msg}
                    </div>
                )}
                {status.state === "error" && (
                    <div
                        className="mt-4 flex items-start gap-2 text-red-400 text-sm"
                        data-testid="contact-error-message"
                    >
                        <XCircle size={18} weight="fill" className="mt-0.5" />
                        {status.msg}
                    </div>
                )}
            </div>
        </form>
    );
};

// ---------------- Contact section ----------------

const Contact = () => (
    <section
        id="contact"
        className="relative container-x max-w-6xl mx-auto pb-24 md:pb-32 pt-4"
        data-testid="contact-section"
    >
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14">
            {/* LEFT: contact info */}
            <div className="lg:col-span-5">
                <span className="eyebrow">Contact</span>
                <h2 className="mt-4 font-serif text-4xl md:text-5xl text-white">
                    Even <span className="italic text-brand-500">kennismaken?</span>
                </h2>
                <p className="mt-4 text-zinc-400 leading-relaxed max-w-md">
                    Vul het formulier in of mail direct. Reactie meestal binnen
                    24 uur.
                </p>

                <div className="mt-8 divide-y divide-white/5">
                    <InfoRow
                        Icon={EnvelopeSimple}
                        label="E-mail"
                        value="info@ludoaloserij.nl"
                        href="mailto:info@ludoaloserij.nl"
                        testid="contact-info-email"
                    />
                    <InfoRow
                        Icon={IdentificationCard}
                        label="KvK-nummer"
                        value="80568173"
                        testid="contact-info-kvk"
                    />
                    <InfoRow
                        Icon={Clock}
                        label="Reactietijd"
                        value="Binnen 24 uur"
                        testid="contact-info-hours"
                    />
                </div>
            </div>

            {/* RIGHT: form card */}
            <div className="lg:col-span-7">
                <div className="relative bg-zinc-900/60 backdrop-blur-sm border border-white/10 rounded-3xl p-7 md:p-10 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)]">
                    {/* small accent corner */}
                    <div className="absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-brand-500/60 to-transparent" />
                    <div className="flex items-baseline justify-between mb-6">
                        <h3 className="font-serif text-3xl md:text-4xl text-white">
                            Stuur een bericht
                        </h3>
                        <span className="eyebrow hidden sm:inline">
                            01 / Contact
                        </span>
                    </div>
                    <p className="text-sm text-zinc-400 mb-8">
                        Vul hieronder je gegevens in.
                    </p>
                    <ContactForm />
                </div>
            </div>
        </div>
    </section>
);

// ---------------- Footer ----------------

const Footer = () => (
    <footer
        className="relative border-t border-white/5 bg-black/40"
        data-testid="site-footer"
    >
        <div className="container-x max-w-6xl mx-auto py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
                <div className="bg-white rounded-xl px-3 py-2 ring-1 ring-brand-500/20">
                    <img
                        src={LOGO_URL}
                        alt="L.A. Technische Service"
                        className="h-9 w-auto"
                    />
                </div>
                <div className="text-sm text-zinc-500">
                    <div className="text-white font-medium">
                        Ludo Aloserij
                    </div>
                    <div>KvK: 80568173</div>
                </div>
            </div>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-zinc-500">
                <a
                    href="mailto:info@ludoaloserij.nl"
                    className="underline-link text-zinc-300 hover:text-brand-400"
                    data-testid="footer-email"
                >
                    info@ludoaloserij.nl
                </a>
                <span className="text-zinc-700">•</span>
                <span>© {new Date().getFullYear()} L.A. Technische Service</span>
            </div>
        </div>
    </footer>
);

// ---------------- App ----------------

function App() {
    return (
        <div
            className="App relative min-h-screen overflow-hidden"
            data-testid="app-root"
        >
            <Blobs />
            <div className="relative z-10">
                <Header />
                <Hero />
                <Contact />
                <Footer />
            </div>
        </div>
    );
}

export default App;
