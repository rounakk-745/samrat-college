import "./globals.css";

export const metadata = {
  title: "Samrat Group",
  description: "Samrat Group of Institutions",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-sans text-slate-800 bg-gray-50">
        {children}
      </body>
    </html>
  );
}
