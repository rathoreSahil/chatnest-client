import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import RightPanelHeader from "@/components/right-panel/right-panel-header";
import RightPanelContent from "@/components/right-panel/right-panel-content";

const RightPanel = ({ className }: { className: string }) => {
  return (
    <motion.div
      key="right-panel"
      initial={{ width: 0 }}
      animate={{ width: "27%" }}
      exit={{ width: 0 }}
      transition={{ duration: 0.12 }}
      className={cn("flex flex-col", className)}
    >
      <RightPanelHeader />
      <RightPanelContent />
    </motion.div>
  );
};

export default RightPanel;
