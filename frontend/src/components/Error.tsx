export default function ErrorMessage({ error }: { error: Error }) {
  return (
    <div className="flex h-screen items-center justify-center w-full">
      Error: {error.message}
    </div>
  );
}
