import type { PropsWithChildren } from "react";

export function HeadingOne({
  children,
  className = "",
}: PropsWithChildren<{ className?: string }>) {
  const headingStyle =
    `text-xl font-semibold leading-tight ${className}`.trim();

  return <h1 className={headingStyle}>{children}</h1>;
}
