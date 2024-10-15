import MobileNav from "@/components/MobileNav";
import SideBar from "@/components/SideBar";
import { getLoggedInUser } from "@/lib/actions/user.action";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const loggedIn = await getLoggedInUser();
  if(!loggedIn) redirect('/sign-in')
  return (
      <main className="flex w-full h-screen font-inter">
        <SideBar user={loggedIn} />
        <div className="flex size-full flex-col">
          <div className="root-layout">
            <Image src={"/icons/logo.svg"} height={30} width={30} alt="logo" />
            <div>
              <MobileNav user={loggedIn} />
            </div>
          </div>
        {children}
        </div>
      </main>
  );
}