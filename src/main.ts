import "./style.css";

const qs = <T extends HTMLElement>(sel: string) => document.querySelector(sel) as T | null;

const themeBtn = qs<HTMLButtonElement>("#themeBtn");
const yearEl = qs<HTMLSpanElement>("#year");
const contactForm = qs<HTMLFormElement>("#contactForm");

const nameInput = qs<HTMLInputElement>("#nameInput");
const emailInput = qs<HTMLInputElement>("#emailInput");
const messageInput = qs<HTMLTextAreaElement>("#messageInput");

const emailLink = qs<HTMLAnchorElement>("#emailLink");
const cvLink = qs<HTMLAnchorElement>("#cvLink");

// ---- Config (resume'ingdan keyin shu joylarni aniq qilamiz)
const YOUR_EMAIL = "youremail@example.com";
const CV_URL = "#"; // masalan: "/cv/Umidbek-CV.pdf" yoki Google Drive direct link

function applyTheme(theme: "light" | "dark") {
  const root = document.documentElement;
  if (theme === "dark") root.classList.add("dark");
  else root.classList.remove("dark");
  localStorage.setItem("theme", theme);
  if (themeBtn) themeBtn.textContent = theme === "dark" ? "☀️ Theme" : "🌙 Theme";
}

function initTheme() {
  const saved = localStorage.getItem("theme") as "light" | "dark" | null;
  if (saved) return applyTheme(saved);

  const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)")?.matches ?? false;
  applyTheme(prefersDark ? "dark" : "light");
}

initTheme();

themeBtn?.addEventListener("click", () => {
  const isDark = document.documentElement.classList.contains("dark");
  applyTheme(isDark ? "light" : "dark");
});

if (yearEl) yearEl.textContent = String(new Date().getFullYear());

if (emailLink) emailLink.href = `mailto:${YOUR_EMAIL}`;
if (cvLink) cvLink.href = CV_URL;

contactForm?.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = nameInput?.value.trim() ?? "";
  const email = emailInput?.value.trim() ?? "";
  const msg = messageInput?.value.trim() ?? "";

  const subject = encodeURIComponent(`Portfolio message from ${name || "Someone"}`);
  const body = encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\n\nMessage:\n${msg}\n`
  );

  window.location.href = `mailto:${YOUR_EMAIL}?subject=${subject}&body=${body}`;
});
