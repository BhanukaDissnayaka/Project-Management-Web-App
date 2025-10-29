import { parseAsBoolean, useQueryState } from "nuqs";

const useCreateBoardDialog = () => {
  const [open, setOpen] = useQueryState(
    "new-board",
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
export default useCreateBoardDialog;
