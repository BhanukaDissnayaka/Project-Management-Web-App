import React, { type ReactElement } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { BoardPermissionsType } from "@/constant/permissions";
import { useBoardPermissions } from "@/hooks/useBoardPermissions";

type PermissionWrapperProps = {
  requiredPermission: BoardPermissionsType;
  children: ReactElement<{ disabled?: boolean }>;
  tooltipMessage?: string;
  mode?: "disable" | "hide";
};
// should pass components as children that has disbale attribute
const PermissionWrapper = ({
  children,
  mode = "disable",
  requiredPermission,
  tooltipMessage = "Only Board admins can perform this action",
}: PermissionWrapperProps) => {
  const hasPermission = useBoardPermissions(requiredPermission);
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
