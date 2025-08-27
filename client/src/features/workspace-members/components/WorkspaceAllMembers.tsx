import ProfileCard from "@/features/workspace-members/components/ProfileCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserRoundX } from "lucide-react";

export default function WorkspaceAllMembers() {
  return (
    <div>
      <div className="mt-3 md:mt-0">
        <h1 className="text-base md:text-lg font-semibold text-gray-text">
          Workspace Members
        </h1>
        <p className="mt-2 text-gray-text max-w-3xl leading-[1.3] text-sm">
          Manage your workspace team members efficiently — view all current
          members, their roles, and permissions, and update their roles directly
          from this page to keep your workspace organized and secure.
        </p>
      </div>
      <hr className="my-5" />

      <div>
        <Input className="max-w-100 " placeholder="Filter by name or email" />
        <hr className="my-4" />

        <div className="flex items-center justify-between mt-2">
          {/* // todo - must replace with real api data */}
          <ProfileCard name="Bhanuka Dissnayaka" lastActive="205 May 25" />
          <div className="flex items-center space-x-2 md:space-x-5">
            <Select>
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="Admin" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Role in</SelectLabel>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="member">Member</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Button variant="destructive" size="sm">
              <UserRoundX /> Remove
            </Button>
          </div>
        </div>
        <hr className="mt-2" />
      </div>
    </div>
  );
}
