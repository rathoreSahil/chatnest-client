import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

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
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        value={value}
        onChange={onChange}
        className={cn(
          "focus:ring-0 focus-visible:ring-0 border-0 border-b border-b-white",
          className
        )}
        readOnly={readOnly}
      />
    </div>
  );
};

export default InputBox;
