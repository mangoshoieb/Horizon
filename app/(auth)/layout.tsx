import type { Metadata } from "next";
import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

        <main className="w-full flex min-h-screen justify-between font-inter">
          {children}
          <div className="auth-asset">
            <div>
              <Image
                src={"/icons/auth-image.svg"}
                width={500}
                height={500}
                alt="Auth image"
              />
            </div>
          </div>
        </main>

  );
}
