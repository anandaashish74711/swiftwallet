import { Providers } from "../provider";




export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={``}>
        <Providers>
        {children}
        </Providers>
      </body>
    </html>
  );
}
