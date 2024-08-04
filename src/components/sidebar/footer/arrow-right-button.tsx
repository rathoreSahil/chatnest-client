import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

type ArrowRightButtonProps = {
  onClickHandler: () => void;
};

const ArrowRightButton = ({ onClickHandler }: ArrowRightButtonProps) => {
  return (
    <Button
      variant={"outline"}
      className="mx-auto my-8 rounded-full overflow-hidden h-16 w-16"
      onClick={onClickHandler}
    >
      <ArrowRight />
    </Button>
  );
};

export default ArrowRightButton;
