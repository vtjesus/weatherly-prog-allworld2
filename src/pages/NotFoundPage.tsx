import ErrorDisplay from "../common/components/ErrorDisplay";

function NotFoundPage() {
  return (
    <ErrorDisplay
      title="404 - Page Not Found"
      p="The page you are looking for does not exist."
    />
  );
}

export default NotFoundPage;
