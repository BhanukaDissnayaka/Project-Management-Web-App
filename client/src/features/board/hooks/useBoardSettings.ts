import { parseAsBoolean, useQueryState } from "nuqs";

const useBoardSettings = () => {
  const [open, setOpen] = useQueryState(
    "settings",
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
export default useBoardSettings;
