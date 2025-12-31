import BoardSettingsDialog from "@/features/board/components/BoardSettingDialog";
import CreateListCard from "@/features/card-list/components/CreateCardList";

function BoardPage() {
  return (
    <div className="flex">
      <BoardSettingsDialog />
      Board Page
      <CreateListCard></CreateListCard>
    </div>
  );
}

export default BoardPage;
