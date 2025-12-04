import { Button } from "@/components/ui/button";
import AddBoardMembersDialog from "@/features/board-members/components/AddBoardMembersDialog";
import BoardMembersList from "@/features/board-members/components/BoardMembersList";
import useAddBoardMembersDialog from "@/features/board-members/hooks/useAddBoardMembersDialog";

function BoardMembersPage() {
  const { onOpen } = useAddBoardMembersDialog();
  return (
    <div>
      <div className="flex justify-between items-center">
        <p className="text-xl font-semibold">Board Members</p>
        <Button onClick={onOpen}>Add Members</Button>
      </div>
      <p className="mt-3 lg:mt-0 text-gray-text max-w-3xl leading-[1.3] text-sm">
        Manage your Board members efficiently — view all current members, their
        roles, and permissions, and update their roles directly from this page
        to keep your Board organized and secure.
      </p>
      <div className="mt-7 lg:mt-10">
        <BoardMembersList></BoardMembersList>
      </div>
      <AddBoardMembersDialog></AddBoardMembersDialog>
    </div>
  );
}

export default BoardMembersPage;
