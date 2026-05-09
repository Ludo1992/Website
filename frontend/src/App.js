import { useState } from "react";
import "@/App.css";
import axios from "axios";
import {
    Phone,
    EnvelopeSimple,
    IdentificationCard,
    Clock,
    PaperPlaneTilt,
    CircleNotch,
    CheckCircle,
    XCircle,
} from "@phosphor-icons/react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const LOGO_URL =
    "https://ludoaloserij.nl/wp-content/uploads/2023/11/Color-logo-no-background-1024x627.png";

// Black & white industrial / technical hero image
const HERO_IMG =
    "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=1600&q=80";

// ---------------- Top: logo + slogan ----------------

const TopBar = () => (
    <div
        className="relative z-30 container-x max-w-7xl mx-auto pt-8 md:pt-10"
        data-testid="site-header"
    >
        <a
            href="#top"
            className="inline-flex items-center gap-5"
            data-testid="header-logo-link"
        >
            <img
                src={LOGO_URL}
                alt="L.A. Technische Service"
                className="h-16 md:h-20 w-auto"
                data-testid="header-logo"
            />
            <div className="hidden sm:flex flex-col leading-tight border-l-2 border-[hsl(var(--primary))] pl-5">
                <span
                    className="font-[Poppins] font-extrabold text-zinc-900 text-xl md:text-2xl uppercase tracking-tight"
                    data-testid="header-company"
                >
                    L.A. Technische Service
                </span>
                <span
                    className="text-[hsl(var(--primary))] font-semibold text-sm md:text-base mt-0.5"
                    data-testid="header-slogan"
                >
                    Alles met Techniek
                </span>
            </div>
        </a>
    </div>
);

// ---------------- Hero (B&W image right + orange blob left) ----------------

const HeroVisual = () => (
    <section
        id="top"
        className="relative w-full overflow-hidden"
        data-testid="hero-section"
    >
        {/* Right: large B&W industrial image */}
        <div className="absolute top-0 right-0 w-[58%] md:w-[55%] h-[420px] md:h-[520px] overflow-hidden pointer-events-none">
            <img
                src={HERO_IMG}
                alt="Industriële techniek"
                className="w-full h-full object-cover grayscale contrast-110 brightness-95"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-white/10" />
        </div>

        {/* Left: organic orange blob (SVG) */}
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

        {/* Spacer to push content below hero visuals */}
        <div className="h-[380px] md:h-[460px]" />
    </section>
);

// ---------------- Cards row ----------------

const InfoCard = () => (
    <div
        className="bg-white rounded-md shadow-[0_25px_60px_-20px_rgba(0,0,0,0.18)] p-8 md:p-12 lg:p-14"
        data-testid="contact-info-card"
    >
        <div className="space-y-12">
            {/* E-mail */}
            <a
                href="mailto:info@ludoaloserij.nl"
                className="flex items-start gap-5 group"
                data-testid="contact-info-email"
            >
                <div className="icon-circle">
                    <EnvelopeSimple size={22} weight="fill" />
                </div>
                <div className="pt-2">
                    <div className="info-label">E-MAIL</div>
                    <div className="mt-2 text-zinc-700 text-base group-hover:text-[hsl(var(--primary))] transition-colors">
                        info@ludoaloserij.nl
                    </div>
                </div>
            </a>

            {/* KvK */}
            <div
                className="flex items-start gap-5"
                data-testid="contact-info-kvk"
            >
                <div className="icon-circle">
                    <IdentificationCard size={22} weight="fill" />
                </div>
                <div className="pt-2">
                    <div className="info-label">KVK-NUMMER</div>
                    <div className="mt-2 text-zinc-700 text-base">
                        80568173 — Ludo Aloserij
                    </div>
                </div>
            </div>

            {/* Hours */}
            <div
                className="flex items-start gap-5"
                data-testid="contact-info-hours"
            >
                <div className="icon-circle">
                    <Clock size={22} weight="fill" />
                </div>
                <div className="pt-2">
                    <div className="info-label">BEREIKBAARHEID</div>
                    <div className="mt-2 text-zinc-700 text-base">
                        Ma – Vr: 08:00 – 18:00
                        <br />
                        Reactie binnen 24 uur
                    </div>
                </div>
            </div>

            <div className="pt-2 text-xs text-zinc-400">
                Hands-on technische dienstverlening.
            </div>
        </div>
    </div>
);

// ---------------- Form ----------------

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
            className="bg-zinc-100 rounded-md shadow-[0_25px_60px_-20px_rgba(0,0,0,0.18)] p-8 md:p-12 lg:p-14"
            data-testid="contact-form-card"
        >
            <h2
                className="text-zinc-900 text-3xl md:text-4xl font-[Poppins] font-extrabold uppercase tracking-tight text-center mb-8"
                data-testid="contact-form-title"
            >
                Contacteer ons
            </h2>

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
        className="border-t border-zinc-200 bg-white mt-20"
        data-testid="site-footer"
    >
        <div className="container-x max-w-7xl mx-auto py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
                <img
                    src={LOGO_URL}
                    alt="L.A. Technische Service"
                    className="h-10 w-auto"
                />
                <div className="text-sm text-zinc-500">
                    Ludo Aloserij · KvK 80568173
                </div>
            </div>
            <div className="text-sm text-zinc-500">
                © {new Date().getFullYear()} L.A. Technische Service —{" "}
                <a
                    href="mailto:info@ludoaloserij.nl"
                    className="text-zinc-700 hover:text-[hsl(var(--primary))] underline-offset-4 hover:underline"
                    data-testid="footer-email"
                >
                    info@ludoaloserij.nl
                </a>
            </div>
        </div>
    </footer>
);

// ---------------- App ----------------

function App() {
    return (
        <div className="App relative min-h-screen bg-white" data-testid="app-root">
            <TopBar />
            <HeroVisual />

            {/* Cards overlap the hero visual */}
            <section
                id="contact"
                className="relative z-20 container-x max-w-7xl mx-auto -mt-44 md:-mt-52 pb-12"
                data-testid="contact-section"
            >
                <div className="grid lg:grid-cols-2 gap-6 md:gap-8 items-stretch">
                    <InfoCard />
                    <ContactCard />
                </div>
            </section>

            <Footer />
        </div>
    );
}

export default App;
