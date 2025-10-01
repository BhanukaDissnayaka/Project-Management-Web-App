import React, { type ReactElement } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { usePermissions } from "@/hooks/usePermissions";
import type { WorkspacePermissionsType } from "@/constant/permissions";

type PermissionWrapperProps = {
  requiredPermission: WorkspacePermissionsType;
  children: ReactElement<{ disabled?: boolean }>;
  tooltipMessage?: string;
  mode?: "disable" | "hide";
};
// should pass components as children that has disbale attribute
const PermissionWrapper = ({
  children,
  mode = "disable",
  requiredPermission,
  tooltipMessage = "Only workspace admins can perform this action",
}: PermissionWrapperProps) => {
  const hasPermission = usePermissions(requiredPermission);
  if (mode === "hide" && !hasPermission) return null;

  if (mode === "disable" && !hasPermission) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div>{React.cloneElement(children, { disabled: true })}</div>
          </TooltipTrigger>
          <TooltipContent>
            <p>{tooltipMessage}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return children;
};

export default PermissionWrapper;
