import { useEffect, useMemo, useState } from "react";
import { useGetAvailableWorkspaceMembersQuery } from "../api/board-members.api";
import useBoardId from "@/hooks/useBoardId";
import useWorkspaceId from "@/hooks/useWorkspaceId";
import { showErrorToast } from "@/lib/toastHandler";
import { isFetchBaseQueryError } from "@/utils/errorGuards";
import MainLoader from "@/components/shared/MainLoader";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import AvailableMemberCard from "./AvailableMemberCard";

function AddBoardMembers() {
  const workspaceId = useWorkspaceId();
  const boardId = useBoardId();
  const [inputValue, setInputValue] = useState("");

  const { data, error, isError, isFetching } =
    useGetAvailableWorkspaceMembersQuery({
      workspaceId,
      boardId,
    });
  const members = data?.members || [];

  const filterdMembers = useMemo(() => {
    if (inputValue.trim() === "") return members;
    const search = inputValue.toLowerCase();
    return members.filter(
      (m) =>
        m.name.toLowerCase().includes(search) ||
        m.email.toLowerCase().includes(search)
    );
  }, [members, inputValue]);

  useEffect(() => {
    if (isError && error && isFetchBaseQueryError(error)) {
      if (
        typeof error.data === "object" &&
        error.data !== null &&
        "message" in error.data
      ) {
        const message = (error.data as { message: string }).message;
        showErrorToast(message);
      }
    }
  }, [isError, error]);

  return (
    <div className="">
      <div className="mb-4 lg:mb-8">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-muted" />
          <Input
            placeholder="Search boards..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="pl-10  border-gray-boarder text-sm"
          />
        </div>
      </div>
      <div className="h-[50vh] overflow-auto">
        <hr className="mt-2" />
        {isFetching && <MainLoader className="mt-5"></MainLoader>}
        {members.length === 0 && !isFetching && (
          <p className=" text-gray-500 mt-3">No users found</p>
        )}
        {!isFetching && members.length > 0 && (
          <div className="divide-y">
            {filterdMembers.map((member) => (
              <AvailableMemberCard
                member={member}
                key={member._id}
              ></AvailableMemberCard>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AddBoardMembers;
