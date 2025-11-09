import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users, MoreVertical, Clock } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { truncateWords } from "@/utils/truncateText";
import { timeAgo } from "@/utils/timeAgo";
import type { BoardCardType } from "../types/board.type";
import type React from "react";

interface BoardCardProps {
  board: BoardCardType;
}

const BoardCard: React.FC<BoardCardProps> = ({ board }) => {
  return (
    <Card
      key={board._id}
      className="hover:shadow-lg transition-shadow cursor-pointer pt-0 gap-0"
    >
      <CardHeader
        className="rounded-t-lg pt-2"
        style={board.bgColor ? { backgroundColor: board.bgColor } : undefined}
      >
        <div className="flex items-start justify-between">
          <div
            className={`w-12 h-12 rounded-lg flex items-center justify-center  font-bold text-xl`}
          >
            {board.name.charAt(0)}
          </div>
          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Edit Board</DropdownMenuItem>
                <DropdownMenuItem>Duplicate</DropdownMenuItem>
                <DropdownMenuItem>Archive</DropdownMenuItem>
                <DropdownMenuItem className="text-red-600">
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <CardTitle className="text-lg lg:text-xl mt-4 ">
            {board.name}
          </CardTitle>
          <CardDescription>
            {board.description && truncateWords(board.description)}
          </CardDescription>
          <div className="flex items-center justify-between text-sm mb-2">
            <div className="flex items-center gap-1 text-gray-text">
              <Users className="h-4 w-4" />
              <span>{board.memberCount} members</span>
            </div>
          </div>
        </div>
      </CardContent>
      <hr />
      <CardFooter className="pt-3">
        <div className="flex items-center justify-between w-full text-sm">
          <div className="flex items-center gap-1 text-gray-text">
            <Clock className="h-4 w-4" />
            <span>{timeAgo(board.updatedAt)}</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default BoardCard;
