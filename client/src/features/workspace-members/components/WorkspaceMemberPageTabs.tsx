import { Button } from "@/components/ui/button";
import { useTabQuery } from "@/hooks/useTabQuery";
import { User, UserRoundPlus } from "lucide-react";
import WorkspaceAllMembers from "./WorkspaceAllMembers";
import WorkspaceAddMember from "./WorkspaceAddMemebers";

import type { LucideIcon } from "lucide-react";

type TapType = {
  slug: string;
  label: string;
  icon: LucideIcon;
};

function WorkspaceMembersTabs() {
  const tabs: TapType[] = [
    {
      slug: "members",
      label: "Workspace members",
      icon: User,
    },
    {
      slug: "add",
      label: "Add member",
      icon: UserRoundPlus,
    },
  ];
  const tabComponents: Record<string, React.FC> = {
    members: WorkspaceAllMembers,
    add: WorkspaceAddMember,
  };
  const { currentTab, setCurrentTab } = useTabQuery("members");
  const CurrentTabComponent = tabComponents[currentTab];

  return (
    <div className="md:flex">
      <div className="min-w-50 md:min-w-65">
        <div className="flex md:block md:space-y-2">
          {tabs.map((tab) => (
            <div className="flex-1" key={tab.slug}>
              <Button
                variant="ghost"
                onClick={() => setCurrentTab(tab.slug)}
                className={` w-full border-none shadow-none md:py-5 md:justify-start ${
                  tab.slug === currentTab
                    ? "bg-blue-muted text-blue-text hover:text-blue-text hover:bg-blue-muted"
                    : "text-gray-text"
                }`}
                size="sm"
              >
                <tab.icon />
                {tab.label}
              </Button>
            </div>
          ))}
        </div>
      </div>
      <div className="flex-1 md:pl-5">
        {CurrentTabComponent ? <CurrentTabComponent /> : null}
      </div>
    </div>
  );
}

export default WorkspaceMembersTabs;
