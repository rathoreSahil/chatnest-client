import { cn } from "@/lib/utils";
import RightPanelHeader from "@/components/right-panel/right-panel-header";
import RightPanelContent from "@/components/right-panel/right-panel-content";

const RightPanel = ({ className }: { className: string }) => {
  return (
    <div className={cn("flex flex-col bg-blue-600/40", className)}>
      <RightPanelHeader />
      <RightPanelContent />
    </div>
  );
};

export default RightPanel;
