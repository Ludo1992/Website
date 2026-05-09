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
} from "@phosphor-icons/react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const LOGO_URL =
    "https://ludoaloserij.nl/wp-content/uploads/2023/11/Color-logo-no-background-1024x627.png";

// ---------------- Header ----------------

const Header = () => (
    <header
        className="sticky top-0 z-40 backdrop-blur-md bg-[#faf8f4]/80 border-b border-zinc-200/60"
        data-testid="site-header"
    >
        <div className="container-x h-20 flex items-center justify-between max-w-6xl mx-auto">
            <a
                href="#top"
                className="flex items-center gap-3"
                data-testid="header-logo-link"
            >
                <img
                    src={LOGO_URL}
                    alt="L.A. Technische Service"
                    className="h-10 md:h-12 w-auto"
                    data-testid="header-logo"
                />
            </a>
            <a
                href="#contact"
                className="hidden sm:inline-flex btn-primary"
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
        className="relative overflow-hidden glow-bg"
        data-testid="hero-section"
    >
        <div className="absolute inset-0 dot-grid opacity-50 pointer-events-none" />

        <div className="relative container-x max-w-6xl mx-auto pt-20 md:pt-28 pb-16 md:pb-24">
            <div
                className="flex items-center gap-3 mb-7 animate-fade-up"
                style={{ animationDelay: "0.05s", opacity: 0 }}
            >
                <span className="h-2.5 w-2.5 rounded-full bg-brand-500 animate-pulse" />
                <span className="eyebrow">Beschikbaar voor opdrachten</span>
            </div>

            <h1
                className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[88px] leading-[1] tracking-tight text-zinc-900 max-w-4xl animate-fade-up"
                style={{ animationDelay: "0.15s", opacity: 0 }}
                data-testid="hero-title"
            >
                Alles met{" "}
                <span className="italic text-brand-500">techniek.</span>
                <br />
                <span className="text-zinc-400">Eén aanspreekpunt.</span>
            </h1>

            <p
                className="mt-8 max-w-xl text-lg md:text-xl text-zinc-600 leading-relaxed animate-fade-up"
                style={{ animationDelay: "0.3s", opacity: 0 }}
                data-testid="hero-description"
            >
                L.A. Technische Service — hands-on technische dienstverlening
                door Ludo Aloserij. Heb je een klus, vraag of storing? Stuur
                een berichtje en ik neem snel contact met je op.
            </p>

            <div
                className="mt-10 flex flex-wrap gap-3 animate-fade-up"
                style={{ animationDelay: "0.45s", opacity: 0 }}
            >
                <a
                    href="#contact"
                    className="btn-primary"
                    data-testid="hero-cta-primary"
                >
                    Stuur een bericht
                    <PaperPlaneTilt size={16} weight="fill" />
                </a>
                <a
                    href="mailto:info@ludoaloserij.nl"
                    className="btn-outline"
                    data-testid="hero-cta-mail"
                >
                    info@ludoaloserij.nl
                </a>
            </div>
        </div>
    </section>
);

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
            className="space-y-6"
            data-testid="contact-form"
            noValidate
        >
            <div className="grid md:grid-cols-2 gap-5">
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
                        E-mail
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
                    rows={6}
                    value={form.message}
                    onChange={update("message")}
                    className="field-input resize-none"
                    placeholder="Vertel kort over je project, klus of vraag..."
                    data-testid="contact-input-message"
                />
            </div>

            <div className="flex flex-wrap items-center gap-5 pt-2">
                <button
                    type="submit"
                    disabled={status.state === "loading"}
                    className="btn-primary"
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
                        className="flex items-center gap-2 text-emerald-700 text-sm"
                        data-testid="contact-success-message"
                    >
                        <CheckCircle size={18} weight="fill" />
                        {status.msg}
                    </div>
                )}
                {status.state === "error" && (
                    <div
                        className="flex items-center gap-2 text-red-600 text-sm"
                        data-testid="contact-error-message"
                    >
                        <XCircle size={18} weight="fill" />
                        {status.msg}
                    </div>
                )}
            </div>
        </form>
    );
};

// ---------------- Contact Section ----------------

const Contact = () => (
    <section
        id="contact"
        className="relative container-x max-w-6xl mx-auto py-20 md:py-28"
        data-testid="contact-section"
    >
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
            {/* Left: copy + contact info */}
            <div className="lg:col-span-5">
                <span className="eyebrow">Contact</span>
                <h2 className="mt-4 font-serif text-4xl md:text-5xl tracking-tight text-zinc-900">
                    Even <span className="italic text-brand-500">kennismaken?</span>
                </h2>
                <p className="mt-5 text-zinc-600 leading-relaxed">
                    Vul het formulier in of mail direct. Reactie meestal binnen
                    24 uur.
                </p>

                <div className="mt-10 space-y-4">
                    <a
                        href="mailto:info@ludoaloserij.nl"
                        className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-zinc-200 hover:border-brand-400 hover:shadow-sm transition-all group"
                        data-testid="contact-info-email"
                    >
                        <div className="h-11 w-11 rounded-xl bg-brand-50 flex items-center justify-center text-brand-600 group-hover:bg-brand-500 group-hover:text-white transition-colors">
                            <EnvelopeSimple size={20} weight="duotone" />
                        </div>
                        <div className="flex-1">
                            <div className="text-xs text-zinc-500 mb-0.5">
                                E-mail
                            </div>
                            <div className="text-zinc-900 font-medium">
                                info@ludoaloserij.nl
                            </div>
                        </div>
                        <ArrowUpRight
                            size={18}
                            className="text-zinc-400 group-hover:text-brand-500 transition-colors"
                            weight="bold"
                        />
                    </a>

                    <div
                        className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-zinc-200"
                        data-testid="contact-info-kvk"
                    >
                        <div className="h-11 w-11 rounded-xl bg-brand-50 flex items-center justify-center text-brand-600">
                            <IdentificationCard size={20} weight="duotone" />
                        </div>
                        <div>
                            <div className="text-xs text-zinc-500 mb-0.5">
                                KvK
                            </div>
                            <div className="text-zinc-900 font-medium">
                                80568173
                            </div>
                        </div>
                    </div>

                    <div
                        className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-zinc-200"
                        data-testid="contact-info-hours"
                    >
                        <div className="h-11 w-11 rounded-xl bg-brand-50 flex items-center justify-center text-brand-600">
                            <Clock size={20} weight="duotone" />
                        </div>
                        <div>
                            <div className="text-xs text-zinc-500 mb-0.5">
                                Reactietijd
                            </div>
                            <div className="text-zinc-900 font-medium">
                                Binnen 24 uur
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right: form card */}
            <div className="lg:col-span-7">
                <div className="bg-white rounded-3xl border border-zinc-200 p-7 md:p-10 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.08)]">
                    <h3 className="font-serif text-2xl md:text-3xl text-zinc-900 mb-1">
                        Stuur een bericht
                    </h3>
                    <p className="text-sm text-zinc-500 mb-8">
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
        className="border-t border-zinc-200 bg-white"
        data-testid="site-footer"
    >
        <div className="container-x max-w-6xl mx-auto py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
                <img
                    src={LOGO_URL}
                    alt="L.A. Technische Service"
                    className="h-10 w-auto"
                />
                <div className="text-sm text-zinc-500">
                    <div className="text-zinc-900 font-medium">
                        Ludo Aloserij
                    </div>
                    <div>KvK: 80568173</div>
                </div>
            </div>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-zinc-500">
                <a
                    href="mailto:info@ludoaloserij.nl"
                    className="underline-link text-zinc-700 hover:text-brand-600"
                    data-testid="footer-email"
                >
                    info@ludoaloserij.nl
                </a>
                <span className="text-zinc-300">•</span>
                <span>© {new Date().getFullYear()} L.A. Technische Service</span>
            </div>
        </div>
    </footer>
);

// ---------------- App ----------------

function App() {
    return (
        <div className="App" data-testid="app-root">
            <Header />
            <Hero />
            <Contact />
            <Footer />
        </div>
    );
}

export default App;
