import { Button } from "@/components/ui/button";
import AddBoardMembersDialog from "@/features/board-members/components/AddBoardMembersDialog";
import useAddBoardMembersDialog from "@/features/board-members/hooks/useAddBoardMembersDialog";

function BoardMembersPage() {
  const { onOpen } = useAddBoardMembersDialog();
  return (
    <div>
      <div className="flex justify-between">
        <p className="text-xl font-semibold">Board Members</p>
        <Button onClick={onOpen}>Add Members</Button>
      </div>
      <AddBoardMembersDialog></AddBoardMembersDialog>
    </div>
  );
}

export default BoardMembersPage;
