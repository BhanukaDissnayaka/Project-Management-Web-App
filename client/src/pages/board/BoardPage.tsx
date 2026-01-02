import BoardSettingsDialog from "@/features/board/components/BoardSettingDialog";
import CardListGrid from "@/features/card-list/components/CardListGrid";

function BoardPage() {
  return (
    <div className="">
      <BoardSettingsDialog />
      Board Page
      <CardListGrid />
    </div>
  );
}

export default BoardPage;
