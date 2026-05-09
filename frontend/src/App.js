import { useState } from "react";
import "@/App.css";
import axios from "axios";
import {
    PaperPlaneTilt,
    CircleNotch,
    CheckCircle,
    XCircle,
    EnvelopeSimple,
    User,
    IdentificationCard,
} from "@phosphor-icons/react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`; // eslint-disable-line no-unused-vars

const LOGO_URL =
    "https://ludoaloserij.nl/wp-content/uploads/2023/11/Color-logo-no-background-1024x627.png";

// ---------------- Hero (logo + slogan) ----------------

const Hero = () => (
    <section
        id="top"
        className="container-x max-w-4xl mx-auto pt-12 md:pt-16 pb-8 text-center"
        data-testid="hero-section"
    >
        <div className="relative inline-block">
            {/* soft orange halo behind the logo */}
            <div className="absolute -inset-12 rounded-full bg-[hsl(var(--primary))]/15 blur-3xl pointer-events-none" />
            <img
                src={LOGO_URL}
                alt="L.A. Technische Service"
                className="relative h-72 sm:h-80 md:h-96 lg:h-[28rem] w-auto mx-auto"
                data-testid="hero-logo"
            />
        </div>

        <div className="mt-6 flex items-center justify-center gap-4">
            <span className="accent-rule" />
            <span
                className="text-base sm:text-lg md:text-xl font-semibold uppercase tracking-[0.28em]"
                data-testid="hero-slogan"
            >
                <span className="text-[hsl(var(--primary))]">Alles met</span>{" "}
                <span className="text-white">Techniek</span>
            </span>
            <span className="accent-rule" />
        </div>
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
            className="container-x max-w-2xl mx-auto pb-20 pt-10 md:pt-16"
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

const FooterItem = ({ Icon, children, href, testid }) => {
    const content = (
        <span className="inline-flex items-center gap-3">
            <span className="inline-flex items-center justify-center h-8 w-8 bg-[hsl(var(--primary))] rounded-md shrink-0">
                <Icon size={16} weight="bold" className="text-white" />
            </span>
            <span className="text-zinc-200 text-sm md:text-base font-medium">
                {children}
            </span>
        </span>
    );
    if (href) {
        return (
            <a
                href={href}
                className="hover:text-[hsl(var(--primary))] transition-colors group"
                data-testid={testid}
            >
                {content}
            </a>
        );
    }
    return <div data-testid={testid}>{content}</div>;
};

const Footer = () => (
    <footer className="bg-black" data-testid="site-footer">
        {/* Orange divider bar */}
        <div className="h-2 bg-[hsl(var(--primary))]" />

        <div className="container-x max-w-5xl mx-auto py-8 md:py-10">
            <div className="flex flex-wrap items-center justify-center md:justify-between gap-6 md:gap-10">
                <FooterItem Icon={User} testid="footer-name">
                    Ludo Aloserij
                </FooterItem>
                <FooterItem
                    Icon={EnvelopeSimple}
                    href="mailto:info@ludoaloserij.nl"
                    testid="footer-email"
                >
                    info@ludoaloserij.nl
                </FooterItem>
                <FooterItem Icon={IdentificationCard} testid="footer-kvk">
                    KVK: 80568173
                </FooterItem>
            </div>

            <div className="text-center text-xs text-zinc-500 mt-6">
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
