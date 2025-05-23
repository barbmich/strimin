import { Link } from "react-router-dom";

export function Sidebar() {
  return (
    <aside className="w-16 shrink-0 border-r bg-white md:w-60">
      <nav className="flex h-full flex-col py-2">
        <div className="space-y-1 px-2">
          <Link
            to={"/"}
            className="flex flex-col items-center justify-center rounded-lg px-2 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 md:flex-row md:justify-start"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5 md:mr-3"
            >
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            <span className="mt-1 text-xs md:mt-0 md:text-sm">Home</span>
          </Link>
          <Link
            to={"/"}
            className="flex flex-col items-center justify-center rounded-lg px-2 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 md:flex-row md:justify-start"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5 md:mr-3"
            >
              <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2Z" />
              <path d="M10 2v4" />
              <path d="M14 2v4" />
              <path d="M10 14h4" />
              <path d="M12 12v4" />
            </svg>
            <span className="mt-1 text-xs md:mt-0 md:text-sm">
              Subscriptions
            </span>
          </Link>
          <Link
            to={"/"}
            className="flex flex-col items-center justify-center rounded-lg px-2 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 md:flex-row md:justify-start"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5 md:mr-3"
            >
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            <span className="mt-1 text-xs md:mt-0 md:text-sm">You</span>
          </Link>
        </div>
        <div className="mt-4 border-t pt-4 md:block">
          <h3 className="px-4 text-sm font-semibold uppercase tracking-wider text-gray-500 md:block">
            Subscriptions
          </h3>
          <div className="mt-2 space-y-1 px-2">
            <Link
              to="#"
              className="flex flex-col items-center justify-center rounded-lg px-2 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 md:flex-row md:justify-start"
            >
              <div className="h-6 w-6 rounded-full bg-red-500 md:mr-3"></div>
              <span className="mt-1 text-xs md:mt-0 md:text-sm">Channel 1</span>
            </Link>
            <Link
              to="#"
              className="flex flex-col items-center justify-center rounded-lg px-2 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 md:flex-row md:justify-start"
            >
              <div className="h-6 w-6 rounded-full bg-purple-500 md:mr-3"></div>
              <span className="mt-1 text-xs md:mt-0 md:text-sm">Channel 2</span>
            </Link>
            <Link
              to="#"
              className="flex flex-col items-center justify-center rounded-lg px-2 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 md:flex-row md:justify-start"
            >
              <div className="h-6 w-6 rounded-full bg-green-500 md:mr-3"></div>
              <span className="mt-1 text-xs md:mt-0 md:text-sm">Channel 3</span>
            </Link>
          </div>
        </div>
      </nav>
    </aside>
  );
}
