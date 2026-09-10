import { ChevronLeft } from "lucide-react";

import IconContainer from "@/shared/components/IconContainer/IconContainer";
import type { BackButtonProps } from "./BackButton.type";
import { useNavigate } from "react-router-dom";

const BackButton = ({ title }: BackButtonProps) => {
    const navigate = useNavigate();
    const onBack = () => {
        navigate(-1)
    }
  return (
    <div className="flex items-center gap-3">
      <IconContainer
        className="
        h-6 w-6
        rounded-md
        border
        "
        onClick={onBack}
      >
        <ChevronLeft size={14} />
      </IconContainer>

      <h1 className="text-3xl font-semibold text-slate-900">{title}</h1>
    </div>
  );
};

export default BackButton;
