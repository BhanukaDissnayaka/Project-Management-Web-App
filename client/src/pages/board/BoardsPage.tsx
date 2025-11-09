import BoardList from "@/features/board/components/BoardList";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import useCreateBoardDialog from "@/hooks/useCreateBoardDialog";
import CreateBoardDialog from "@/features/board/components/CreateBoardDialog";

export default function BoardsPage() {
  const { onOpen } = useCreateBoardDialog();

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between gap-2 mb-1 ">
        <div>
          <h1 className="text-lg md:text-3xl  font-bold ">All Boards</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={onOpen} size="sm" className="cursor-pointer">
            <Plus className="h-4 w-4 mr-2" />
            New Board
          </Button>
        </div>
      </div>
      <CreateBoardDialog />
      <div className="min-h-screen  transition-colors">
        <BoardList />
      </div>
    </div>
  );
}
