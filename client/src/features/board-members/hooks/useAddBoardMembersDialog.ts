import { parseAsBoolean, useQueryState } from "nuqs";

const useAddBoardMembersDialog = () => {
  const [open, setOpen] = useQueryState(
    "add-members",
    parseAsBoolean.withDefault(false)
  );
  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);
  return {
    open,
    onOpen,
    onClose,
  };
};
export default useAddBoardMembersDialog;
