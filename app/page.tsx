import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-between  gap-4 bg-gradient-to-b from-violet-100 to-neutral-50">
      <header className="flex w-full items-center justify-between bg-white px-8 py-2 shadow">
        <h1 className="text-2xl font-bold">⌘ Writter</h1>
        <Button variant="default" className="bg-violet-500 hover:bg-violet-600">
          Get Started
        </Button>
      </header>
    </main>
  );
}
