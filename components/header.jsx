import HeaderClient from "./HeaderClient.jsx";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b">
      <div className="container flex h-16 items-center justify-between py-4 px-4">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold tracking-tight text-primary">Todo App</h1>
        </div>
        <HeaderClient />
      </div>
    </header>
  );
}

