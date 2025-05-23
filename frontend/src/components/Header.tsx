import { Search, Bell, Upload, User, Film } from "lucide-react";
import { Button } from "./Button";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="sticky top-0 z-10 flex h-14 items-center justify-between border-b bg-white px-4">
      <div className="flex items-center gap-4">
        <Link to="/" className="flex items-center gap-1">
          <Film className="h-6 w-6" />
          <span className="text-lg font-semibold">Strimin</span>
        </Link>
      </div>
      <div className="hidden flex-1 items-center justify-center gap-2 px-4 md:flex">
        <div className="flex w-full max-w-[600px] items-center">
          <div className="relative flex flex-1">
            <input
              type="search"
              placeholder="Search"
              className="w-full rounded-l-full border py-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full rounded-r-none"
            >
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="md:hidden">
          <Search className="h-5 w-5" />
          <span className="sr-only">Search</span>
        </Button>
        <Button variant="ghost" size="icon" className="hidden md:flex">
          <Upload className="h-5 w-5" />
          <span className="sr-only">Upload</span>
        </Button>
        <Button variant="ghost" size="icon" className="hidden md:flex">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
        </Button>
        <Button variant="outline" className="ml-2">
          <User className="mr-2 h-4 w-4" />
          Sign in
        </Button>
      </div>
    </header>
  );
}
