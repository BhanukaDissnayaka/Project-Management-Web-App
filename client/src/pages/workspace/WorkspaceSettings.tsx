import { InitialsAvatar } from "@/components/shared/InitialsAvatar";
import { useGetWorkspaceByIdQuery } from "@/features/workspace/api/workspace.api";
import DeleteWorkspace from "@/features/workspace/components/DeleteWorkspace";
import EditWorkspaceForm from "@/features/workspace/components/EditWorkspaceForm";
import useWorkspaceId from "@/hooks/useWorkspaceId";

function WorkspaceSettings() {
  const workspaceId = useWorkspaceId();
  const { data } = useGetWorkspaceByIdQuery(workspaceId);

  return (
    <div className="min-h-screen bg-background transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            {/* logo */}
            <InitialsAvatar
              name={data?.workspace.name || "Workspace Name"}
              size={60}
            ></InitialsAvatar>
            <div>
              <h1 className="text-xl font-semibold">
                {data?.workspace.name || "Workspace Name"}
              </h1>
              <p className="text-sm text-gray-muted">Free</p>
            </div>
          </div>
        </div>

        {/* Workspace Settings */}
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-6">
              Workspace settings
            </h2>
          </div>
          <EditWorkspaceForm></EditWorkspaceForm>
          <DeleteWorkspace></DeleteWorkspace>
        </div>
      </div>
    </div>
  );
}
export default WorkspaceSettings;
