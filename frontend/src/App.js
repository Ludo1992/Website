import { useState } from "react";
import "@/App.css";
import axios from "axios";
import {
    PaperPlaneTilt,
    CircleNotch,
    CheckCircle,
    XCircle,
    EnvelopeSimple,
} from "@phosphor-icons/react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const LOGO_URL =
    "https://ludoaloserij.nl/wp-content/uploads/2023/11/Color-logo-no-background-1024x627.png";

// ---------------- Hero (logo + slogan) ----------------

// ---------------- Hero (logo + heading) ----------------

const Hero = () => (
    <section
        id="top"
        className="container-x max-w-4xl mx-auto pt-20 md:pt-28 pb-12 text-center"
        data-testid="hero-section"
    >
        <div className="relative inline-block">
            {/* soft orange halo behind the logo */}
            <div className="absolute -inset-10 rounded-full bg-[hsl(var(--primary))]/15 blur-3xl pointer-events-none" />
            <img
                src={LOGO_URL}
                alt="L.A. Technische Service"
                className="relative h-36 md:h-48 lg:h-56 w-auto mx-auto"
                data-testid="hero-logo"
            />
        </div>

        <div className="mt-10 flex items-center justify-center gap-3">
            <span className="accent-rule" />
            <span className="text-xs font-semibold uppercase tracking-[0.28em] text-[hsl(var(--primary))]">
                Alles met Techniek
            </span>
            <span className="accent-rule" />
        </div>

        <h1
            className="mt-5 font-[Poppins] font-extrabold text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-white"
            data-testid="hero-company"
        >
            L.A. <span className="text-[hsl(var(--primary))]">Technische</span>{" "}
            Service
        </h1>
    </section>
);

// ---------------- Contact ----------------

const Contact = () => {
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
        <section
            id="contact"
            className="container-x max-w-2xl mx-auto pb-20"
            data-testid="contact-section"
        >
            <div className="text-center mb-10">
                <h2 className="font-[Poppins] font-bold text-3xl md:text-4xl text-white">
                    Contact
                </h2>
                <p className="mt-3 text-zinc-400">
                    Vul hieronder uw gegevens in
                </p>
            </div>

            <div
                className="bg-zinc-900/60 backdrop-blur-sm border border-white/10 rounded-2xl shadow-[0_30px_80px_-25px_rgba(238,90,36,0.35)] p-7 md:p-10"
                data-testid="contact-form-card"
            >
                <form
                    onSubmit={submit}
                    className="space-y-5"
                    data-testid="contact-form"
                    noValidate
                >
                    <div className="grid sm:grid-cols-2 gap-5">
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

                    <div className="pt-2 flex justify-center">
                        <button
                            type="submit"
                            disabled={status.state === "loading"}
                            className="btn-primary w-full sm:w-auto sm:min-w-[240px]"
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
                    </div>

                    {status.state === "success" && (
                        <div
                            className="flex items-start gap-2 text-emerald-400 text-sm justify-center"
                            data-testid="contact-success-message"
                        >
                            <CheckCircle
                                size={18}
                                weight="fill"
                                className="mt-0.5"
                            />
                            {status.msg}
                        </div>
                    )}
                    {status.state === "error" && (
                        <div
                            className="flex items-start gap-2 text-red-400 text-sm justify-center"
                            data-testid="contact-error-message"
                        >
                            <XCircle
                                size={18}
                                weight="fill"
                                className="mt-0.5"
                            />
                            {status.msg}
                        </div>
                    )}
                </form>
            </div>

            {/* Direct mail link below form */}
            <div className="mt-6 text-center">
                <a
                    href="mailto:info@ludoaloserij.nl"
                    className="inline-flex items-center gap-2 text-zinc-400 hover:text-[hsl(var(--primary))] transition-colors text-sm"
                    data-testid="contact-direct-mail"
                >
                    <EnvelopeSimple size={16} weight="bold" />
                    Of mail direct naar info@ludoaloserij.nl
                </a>
            </div>
        </section>
    );
};

// ---------------- Footer ----------------

const Footer = () => (
    <footer
        className="border-t border-white/10 bg-black/60"
        data-testid="site-footer"
    >
        <div className="container-x max-w-3xl mx-auto py-10 flex flex-col items-center text-center gap-2">
            <div className="text-white font-semibold" data-testid="footer-name">
                Ludo Aloserij
            </div>
            <a
                href="mailto:info@ludoaloserij.nl"
                className="text-zinc-300 hover:text-[hsl(var(--primary))] transition-colors text-sm"
                data-testid="footer-email"
            >
                info@ludoaloserij.nl
            </a>
            <div className="text-zinc-400 text-sm" data-testid="footer-kvk">
                KvK: 80568173
            </div>
            <div className="text-xs text-zinc-500 mt-3">
                © {new Date().getFullYear()} L.A. Technische Service — Alles
                met Techniek
            </div>
        </div>
    </footer>
);

// ---------------- App ----------------

function App() {
    return (
        <div
            className="App page-bg min-h-screen flex flex-col"
            data-testid="app-root"
        >
            <main className="flex-1">
                <Hero />
                <Contact />
            </main>
            <Footer />
        </div>
    );
}

export default App;
