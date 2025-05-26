import { useParams } from "react-router-dom";
import HomePage from "../home";
import ErrorMessage from "../../components/Error";
import { HeadingOne } from "../../components/Heading";

export default function UserPage() {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <ErrorMessage error={new Error("User ID is required")} />;
  }

  return (
    <div className="h-full overflow-y-auto flex flex-col pt-4">
      <HeadingOne className="pl-4">{id}</HeadingOne>
      <HomePage />
    </div>
  );
}
