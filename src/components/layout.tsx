import Image from "next/image";
import { useState, type ReactNode } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { VoyageForm } from "./form/createVoyage";
import { Toaster } from "./ui/toaster";

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  return (
    <>
      <nav className="flex w-full items-center justify-center border-b border-white border-opacity-50 bg-gray-800 py-4">
        <div className="flex w-full max-w-screen-xl items-center justify-between px-4">
          <Image src="/logo.svg" alt="DFDS logo" width={56} height={18} />

          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button>Create Voyage</Button>
            </SheetTrigger>
            <SheetContent className="overflow-auto">
              <SheetHeader>
                Create Voyage
              </SheetHeader>
              <VoyageForm setIsSheetOpen={setIsSheetOpen} />
            </SheetContent>
          </Sheet>
        </div>
      </nav>
      <main className="mx-auto flex w-full max-w-screen-xl items-center justify-center px-2">
        <NextThemesProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
        </NextThemesProvider>
      </main>
      <Toaster />
    </>
  );
}
