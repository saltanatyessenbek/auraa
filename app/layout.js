import "./globals.css";

export const metadata = {
  title: "Aura — Aurafarm. Be extra.",
  description: "A personal brand trainer for experts who want clients.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
