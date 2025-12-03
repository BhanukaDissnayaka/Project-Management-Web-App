import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useAddBoardMembersDialog from "../hooks/useAddBoardMembersDialog";
import AddBoardMembers from "./AddBoardMembers";

function AddBoardMembersDialog() {
  const { open, onClose } = useAddBoardMembersDialog();

  return (
    <Dialog modal={true} open={open} onOpenChange={onClose}>
      <DialogContent className=" overflow-y-auto p-6">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl">
            Add Members to Board
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-text">
            You cam add members to board who is already in workspace.
          </DialogDescription>
        </DialogHeader>
        <AddBoardMembers></AddBoardMembers>
      </DialogContent>
    </Dialog>
  );
}

export default AddBoardMembersDialog;
