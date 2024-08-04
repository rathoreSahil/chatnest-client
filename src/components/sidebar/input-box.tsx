import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

type InputBoxProps = {
  id: string;
  label: string;
  value?: string;
  readOnly: boolean;
};

const InputBox = ({ id, label, value, readOnly }: InputBoxProps) => {
  return (
    <div>
      <Label className="pl-3 pb-3" htmlFor={id}>
        {label}
      </Label>
      <Input id={id} value={value} readOnly={readOnly} />
    </div>
  );
};

export default InputBox;
