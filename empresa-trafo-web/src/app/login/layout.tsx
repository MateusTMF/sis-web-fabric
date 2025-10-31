export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="bg-neutral-900 text-neutral-100">{children}</body>
    </html>
  );
}
