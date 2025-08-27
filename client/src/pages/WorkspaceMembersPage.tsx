import WorkspaceMembersTabs from "@/features/workspace-members/components/WorkspaceMemberPageTabs";

function WorkspaceMembersPage() {
  return (
    <div className="w-full">
      <div className="mb-3 md:mb-7 space-y-2">
        <p className="text-gray-text font-medium text-lg">
          Manage Workspace Members
        </p>
        <p className="text-gray-text text-sm">
          Easily switch between viewing all members and adding new ones.
        </p>
      </div>
      <WorkspaceMembersTabs />
    </div>
  );
}

export default WorkspaceMembersPage;
