import PermissionWrapper from "@/components/shared/PermissionWrapper";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WorkspacePermissions } from "@/constant/permissions";
import { useDeleteWorkspaceMutation } from "../api/workspace.api";
import useWorkspaceId from "@/hooks/useWorkspaceId";
import { showErrorToast, showSuccessToast } from "@/lib/toastHandler";
import { isFetchBaseQueryError } from "@/utils/errorGuards";
import { useNavigate } from "react-router-dom";

function DeleteWorkspace() {
  const workspaceId = useWorkspaceId();
  const navigate = useNavigate();
  const [deleteWorkspace, { isLoading }] = useDeleteWorkspaceMutation();

  const handleConfirm = async () => {
    try {
      const res = await deleteWorkspace({ workspaceId }).unwrap();
      showSuccessToast(res.message || "Workspace deleted successfully");
      navigate(`/workspace/${res.currentWorkspace}`);
    } catch (err) {
      if (isFetchBaseQueryError(err)) {
        if (
          typeof err.data === "object" &&
          err.data !== null &&
          "message" in err.data
        ) {
          const message = (err.data as { message: string }).message;
          showErrorToast(message);
        }
      }
    }
  };

  return (
    <div>
      {/* Delete Workspace */}
      <Card className="border-gray-200 dark:border-gray-800">
        <CardHeader>
          <CardTitle className="text-lg">Delete Workspace</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-text ">
            Deleting a workspace is a permanent action and cannot be undone.
            Once you delete a workspace, all its associated data, including
            projects, tasks, and member roles, will be permanently removed.
            Please proceed with caution and ensure this action is intentional.
          </p>

          <AlertDialog>
            <div className="flex justify-end">
              <PermissionWrapper
                requiredPermission={WorkspacePermissions.DELETE_WORKSPACE}
              >
                <AlertDialogTrigger asChild>
                  <Button
                    variant="destructive"
                    className="cursor-pointer"
                    disabled={isLoading}
                  >
                    {isLoading ? "Deleting Workspace" : "Delete Workspace"}
                  </Button>
                </AlertDialogTrigger>
              </PermissionWrapper>
            </div>

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the
                  workspace and remove all associated data.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="cursor-pointer">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  className="bg-destructive cursor-pointer"
                  onClick={handleConfirm}
                  disabled={isLoading}
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>
    </div>
  );
}

export default DeleteWorkspace;
