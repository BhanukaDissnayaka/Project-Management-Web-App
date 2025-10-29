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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold ">All Boards</h1>
          <p className="mt-1">Manage and organize your project boards</p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={onOpen} className="cursor-pointer">
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
