import { Search, Bell, Upload, User, Film } from "lucide-react";
import { Button } from "./Button";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  SignedOut,
  SignInButton,
  SignedIn,
  UserButton,
} from "@clerk/clerk-react";
import { SEARCH_QUERY_PARAM } from "../constants";

export function Header() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const search = searchParams.get(SEARCH_QUERY_PARAM) || "";
  const [value, setValue] = useState(search);

  useEffect(() => {
    setValue(search);
  }, [search]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const params = new URLSearchParams(location.search);
    if (value) {
      params.set(SEARCH_QUERY_PARAM, value);
    } else {
      params.delete(SEARCH_QUERY_PARAM);
    }

    const navigateTo = {
      pathname: location.pathname,
      search: params.toString(),
    };

    navigate(navigateTo);
  }

  return (
    <header className="sticky top-0 z-10 flex h-14 items-center justify-between border-b bg-white px-4">
      <div className="flex items-center gap-4">
        <Link to="/" className="flex items-center gap-1">
          <Film className="h-6 w-6" />
          <span className="text-lg font-semibold">Strimin</span>
        </Link>
      </div>
      <form
        className="flex-1 items-center justify-center gap-2 px-4 flex"
        onSubmit={handleSubmit}
      >
        <div className="flex w-full max-w-[600px] items-center">
          <div className="relative flex flex-1">
            <input
              autoFocus
              type="text"
              placeholder="Search"
              value={value}
              onChange={(e) => setValue(e.target.value)}
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
      </form>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="hidden md:flex">
          <Upload className="h-5 w-5" />
          <span className="sr-only">Upload</span>
        </Button>
        <Button variant="ghost" size="icon" className="hidden md:flex">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
        </Button>
        <SignedOut>
          <SignInButton mode="modal">
            <Button variant="outline" className="ml-2">
              <User className="mr-2 h-4 w-4" />
              Sign in
            </Button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </header>
  );
}
