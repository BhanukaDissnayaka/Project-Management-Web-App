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

function DeleteWorkspace() {
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
              <AlertDialogTrigger asChild>
                <PermissionWrapper
                  requiredPermission={WorkspacePermissions.DELETE_WORKSPACE}
                >
                  <Button variant="destructive" className="cursor-pointer">
                    Delete Workspace
                  </Button>
                </PermissionWrapper>
              </AlertDialogTrigger>
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
                <AlertDialogAction className="bg-destructive cursor-pointer">
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
