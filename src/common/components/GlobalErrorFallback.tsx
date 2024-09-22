import ErrorDisplay from "./ErrorDisplay";

interface GlobalErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

function GlobalErrorFallback({
  error,
  resetErrorBoundary,
}: GlobalErrorFallbackProps) {
  return (
    <ErrorDisplay
      title="Oops! Something went wrong."
      p={error.message || "We're sorry for the inconvenience."}
      onAction={resetErrorBoundary}
      buttonActionLabel="Try Again"
    />
  );
}

export default GlobalErrorFallback;
