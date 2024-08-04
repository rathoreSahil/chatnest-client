import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

type CheckButtonProps = {
  onClickHandler: () => void;
};

const CheckButton = ({ onClickHandler }: CheckButtonProps) => {
  return (
    <Button
      variant="secondary"
      className="mx-auto rounded-full overflow-hidden h-16 w-16"
      onClick={onClickHandler}
    >
      <Check />
    </Button>
  );
};

export default CheckButton;
