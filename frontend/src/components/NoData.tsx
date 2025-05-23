export default function NoData({ message }: { message?: string }) {
  return (
    <div className="flex h-screen items-center justify-center">
      {message ?? "No data found"}
    </div>
  );
}
