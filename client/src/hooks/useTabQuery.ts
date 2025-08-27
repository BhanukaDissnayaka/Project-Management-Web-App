import { useQueryState } from "nuqs";

export const useTabQuery = (defaultTab: string, param = "tab") => {
  const [currentTab, setCurrentTab] = useQueryState(param, {
    defaultValue: defaultTab,
    history: "push",
  });

  return { currentTab, setCurrentTab };
};
