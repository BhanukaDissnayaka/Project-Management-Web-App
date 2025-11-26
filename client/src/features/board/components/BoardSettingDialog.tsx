import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useGetBoardByIdAndWorkspaceQuery } from "../api/board.api";
import useWorkspaceId from "@/hooks/useWorkspaceId";
import useBoardId from "@/hooks/useBoardId";
import MainLoader from "@/components/shared/MainLoader";
import useBoardSettings from "../hooks/useBoardSettings";
import { BoardPermissions } from "@/constant/permissions";
import { useBoardPermissions } from "@/hooks/useBoardPermissions";
import BoardSettingsForm from "./BoardSettingsForm";

export default function BoardSettingsDialog() {
  const { open, onClose } = useBoardSettings();
  const workspaceId = useWorkspaceId();
  const boardId = useBoardId();
  const { data, isLoading } = useGetBoardByIdAndWorkspaceQuery({
    workspaceId,
    boardId,
  });
  const canEditBoard = useBoardPermissions(BoardPermissions.EDIT_BOARD);
  if (isLoading) {
    return <MainLoader />;
  }
  const board = data?.board;

  return (
    <Dialog modal={true} open={open && canEditBoard} onOpenChange={onClose}>
      <DialogContent className=" overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl">
            Update {board?.name} Board
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-text">
            Manage your board settings here
          </DialogDescription>
        </DialogHeader>
        <BoardSettingsForm></BoardSettingsForm>
      </DialogContent>
    </Dialog>
  );
}
