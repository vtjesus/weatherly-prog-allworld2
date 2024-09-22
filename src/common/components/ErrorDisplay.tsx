import { useNavigate } from "react-router-dom";
import * as StyledCommon from "./styled";

interface ErrorDisplayProps {
  title: string;
  p: string;
  onAction?: () => void;
  buttonActionLabel?: string;
}

const Styled = { Common: StyledCommon };

function ErrorDisplay({
  title,
  p,
  onAction,
  buttonActionLabel,
}: ErrorDisplayProps) {
  const navigate = useNavigate();

  const handleAction = () => {
    if (onAction) {
      onAction();
    } else {
      navigate("/");
    }
  };

  return (
    <Styled.Common.SectionFlexWrapper $padding="2.5rem">
      <Styled.Common.Flex
        $flexDirection="column"
        $alignItems="center"
        $gap="1rem"
      >
        <Styled.Common.SectionTitle>{title}</Styled.Common.SectionTitle>
        <p>{p}</p>
        <Styled.Common.Button onClick={handleAction}>
          {buttonActionLabel || "Go to Home"}
        </Styled.Common.Button>
      </Styled.Common.Flex>
    </Styled.Common.SectionFlexWrapper>
  );
}

export default ErrorDisplay;
