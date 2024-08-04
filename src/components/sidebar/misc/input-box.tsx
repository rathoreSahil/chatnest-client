import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type InputBoxProps = {
  id: string;
  label: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  readOnly: boolean;
};

const InputBox = ({
  id,
  label,
  value,
  onChange,
  className,
  readOnly,
}: InputBoxProps) => {
  return (
    <div>
      <Label className="pl-3 pb-3" htmlFor={id}>
        {label}
      </Label>
      <Input
        id={id}
        value={value}
        onChange={onChange}
        className={cn("", className)}
        readOnly={readOnly}
      />
    </div>
  );
};

export default InputBox;
