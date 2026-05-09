import { useState } from "react";
import "@/App.css";
import axios from "axios";
import {
    PaperPlaneTilt,
    CircleNotch,
    CheckCircle,
    XCircle,
} from "@phosphor-icons/react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const LOGO_URL =
    "https://ludoaloserij.nl/wp-content/uploads/2023/11/Color-logo-no-background-1024x627.png";

// ---------------- Hero (logo right + orange blob left, black bg) ----------------

const HeroVisual = () => (
    <section
        id="top"
        className="relative w-full overflow-hidden"
        data-testid="hero-section"
    >
        {/* Right: BIG logo on white pill */}
        <div className="absolute top-8 md:top-12 right-0 w-[58%] md:w-[55%] h-[420px] md:h-[520px] flex items-center justify-center pointer-events-none">
            <div className="bg-white rounded-3xl px-10 py-10 md:px-16 md:py-12 shadow-[0_30px_80px_-20px_rgba(238,90,36,0.45)] ring-1 ring-[hsl(var(--primary))]/30">
                <img
                    src={LOGO_URL}
                    alt="L.A. Technische Service"
                    className="h-40 md:h-56 lg:h-64 w-auto"
                    data-testid="hero-logo"
                />
            </div>
        </div>

        {/* Left: organic orange blob */}
        <div className="absolute top-[180px] -left-10 w-[58%] md:w-[55%] h-[420px] md:h-[480px] pointer-events-none">
            <svg
                viewBox="0 0 800 700"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                className="w-full h-full"
                aria-hidden="true"
            >
                <path
                    d="M0,80 C140,30 290,90 420,140 C560,195 690,170 800,120 L800,520 C700,490 580,560 440,580 C310,598 170,560 70,610 C30,628 0,640 -10,648 L-10,80 Z"
                    fill="#EE5A24"
                />
                <path
                    d="M-20,200 C100,170 230,250 360,290 C500,332 620,310 740,270 L760,540 C640,520 510,580 380,590 C250,600 120,560 0,610 L-20,200 Z"
                    fill="#F2723A"
                    opacity="0.55"
                />
            </svg>
        </div>

        {/* Spacer to push form below hero visuals */}
        <div className="h-[470px] md:h-[560px]" />
    </section>
);

// ---------------- Contact form card ----------------

const ContactCard = () => {
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
        <div
            className="bg-zinc-100 rounded-md shadow-[0_25px_60px_-20px_rgba(238,90,36,0.35)] p-8 md:p-12 lg:p-14 max-w-2xl mx-auto w-full"
            data-testid="contact-form-card"
        >
            <h2
                className="text-zinc-900 text-3xl md:text-4xl font-[Poppins] font-extrabold uppercase tracking-tight text-center mb-3"
                data-testid="contact-form-title"
            >
                Contacteer ons
            </h2>
            <p className="text-center text-zinc-500 text-sm mb-8">
                Vul hieronder je gegevens in.
            </p>

            <form
                onSubmit={submit}
                className="space-y-4"
                data-testid="contact-form"
                noValidate
            >
                <input
                    required
                    value={form.name}
                    onChange={update("name")}
                    className="field-input"
                    placeholder="Volledige naam"
                    autoComplete="name"
                    data-testid="contact-input-name"
                />

                <input
                    type="email"
                    required
                    value={form.email}
                    onChange={update("email")}
                    className="field-input"
                    placeholder="Geldig e-mailadres"
                    autoComplete="email"
                    data-testid="contact-input-email"
                />

                <input
                    required
                    value={form.subject}
                    onChange={update("subject")}
                    className="field-input"
                    placeholder="Onderwerp"
                    data-testid="contact-input-subject"
                />

                <textarea
                    required
                    rows={6}
                    value={form.message}
                    onChange={update("message")}
                    className="field-input resize-none"
                    placeholder="Bericht"
                    data-testid="contact-input-message"
                />

                <div className="pt-3">
                    <button
                        type="submit"
                        disabled={status.state === "loading"}
                        className="btn-primary w-full"
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
                            className="mt-4 flex items-start gap-2 text-emerald-700 text-sm"
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
                            className="mt-4 flex items-start gap-2 text-red-600 text-sm"
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
                </div>
            </form>
        </div>
    );
};

// ---------------- Footer ----------------

const Footer = () => (
    <footer
        className="border-t border-zinc-800/80 bg-black mt-20"
        data-testid="site-footer"
    >
        <div className="container-x max-w-5xl mx-auto py-10 grid sm:grid-cols-3 gap-6 text-sm">
            <div data-testid="footer-name">
                <div className="text-[hsl(var(--primary))] font-semibold uppercase tracking-widest text-xs mb-2">
                    Bedrijf
                </div>
                <div className="text-white font-medium">
                    L.A. Technische Service
                </div>
                <div className="text-zinc-400">Ludo Aloserij</div>
            </div>

            <div data-testid="footer-kvk">
                <div className="text-[hsl(var(--primary))] font-semibold uppercase tracking-widest text-xs mb-2">
                    KvK
                </div>
                <div className="text-zinc-200">80568173</div>
            </div>

            <div data-testid="footer-contact">
                <div className="text-[hsl(var(--primary))] font-semibold uppercase tracking-widest text-xs mb-2">
                    Contact
                </div>
                <a
                    href="mailto:info@ludoaloserij.nl"
                    className="text-zinc-200 hover:text-[hsl(var(--primary))] transition-colors"
                    data-testid="footer-email"
                >
                    info@ludoaloserij.nl
                </a>
            </div>
        </div>

        <div className="border-t border-zinc-900 max-w-5xl mx-auto container-x py-5 text-xs text-zinc-500">
            © {new Date().getFullYear()} L.A. Technische Service — Alles met
            Techniek
        </div>
    </footer>
);

// ---------------- App ----------------

function App() {
    return (
        <div
            className="App relative min-h-screen bg-black"
            data-testid="app-root"
        >
            <HeroVisual />

            <section
                id="contact"
                className="relative z-20 container-x max-w-7xl mx-auto -mt-44 md:-mt-52 pb-12"
                data-testid="contact-section"
            >
                <ContactCard />
            </section>

            <Footer />
        </div>
    );
}

export default App;
