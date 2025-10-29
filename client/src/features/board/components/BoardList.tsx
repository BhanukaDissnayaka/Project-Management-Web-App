import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Search, Users, MoreVertical, Clock } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { truncateWords } from "@/utils/truncateText";

interface Board {
  id: string;
  name: string;
  description: string;
  color: string;
  members: number;
  tasks: number;
  completedTasks: number;
  dueDate: string;
  isFavorite: boolean;
  lastUpdated: string;
}

function BoardList() {
  // todo - must replace these values with real api data
  const [boards] = useState<Board[]>([
    {
      id: "1",
      name: "Website Redesign",
      description: "Complete redesign of company website with modern UI/UX",
      color: "#0078BF",
      members: 5,
      tasks: 24,
      completedTasks: 18,
      dueDate: "2025-11-15",
      isFavorite: true,
      lastUpdated: "2 hours ago",
    },
    {
      id: "2",
      name: "Mobile App Development",
      description: "iOS and Android app for customer engagement",
      color: "#0279BF",
      members: 8,
      tasks: 42,
      completedTasks: 15,
      dueDate: "2025-12-01",
      isFavorite: true,
      lastUpdated: "1 day ago",
    },
    {
      id: "3",
      name: "Marketing Campaign Q4",
      description: "Social media and email marketing campaigns",
      color: "#0076BF",
      members: 4,
      tasks: 18,
      completedTasks: 12,
      dueDate: "2025-10-30",
      isFavorite: false,
      lastUpdated: "3 hours ago",
    },
    {
      id: "4",
      name: "Backend Infrastructure",
      description: "Server optimization and database migration",
      color: "#0079BF",
      members: 6,
      tasks: 31,
      completedTasks: 28,
      dueDate: "2025-11-20",
      isFavorite: false,
      lastUpdated: "5 hours ago",
    },
    {
      id: "5",
      name: "Product Launch",
      description: "Launch strategy and go-to-market plan",
      color: "#0079BF",
      members: 10,
      tasks: 56,
      completedTasks: 40,
      dueDate: "2025-11-08",
      isFavorite: true,
      lastUpdated: "30 minutes ago",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const filteredBoards = boards.filter(
    (board) =>
      board.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      board.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getProgressPercentage = (completed: number, total: number) => {
    return Math.round((completed / total) * 100);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Search */}
      <div className="mb-8">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-muted" />
          <Input
            placeholder="Search boards..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10  border-gray-boarder"
          />
        </div>
      </div>

      {/* Boards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2  xl:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-4 gap-6">
        {filteredBoards.map((board) => (
          <Card
            key={board.id}
            className="hover:shadow-lg transition-shadow cursor-pointer"
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-xl`}
                  style={{ backgroundColor: board.color }}
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
              <CardTitle className="text-xl mt-4">{board.name}</CardTitle>
              <CardDescription>
                {truncateWords(board.description)}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-gray-text">Progress</span>
                    <span className="font-medium">
                      {getProgressPercentage(board.completedTasks, board.tasks)}
                      %
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2">
                    <div
                      className={` h-2 rounded-full transition-all`}
                      style={{
                        width: `${getProgressPercentage(
                          board.completedTasks,
                          board.tasks
                        )}%`,
                        backgroundColor: board.color,
                      }}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1 text-gray-text">
                    <Users className="h-4 w-4" />
                    <span>{board.members} members</span>
                  </div>
                  <div className="text-gray-text">
                    {board.completedTasks}/{board.tasks} tasks
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t border-gray-border pt-4">
              <div className="flex items-center justify-between w-full text-sm">
                <div className="flex items-center gap-1 text-gray-text">
                  <Clock className="h-4 w-4" />
                  <span>{board.lastUpdated}</span>
                </div>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredBoards.length === 0 && (
        <div className="text-center py-12">
          <p className="text-text">No boards found matching your search.</p>
        </div>
      )}
    </div>
  );
}

export default BoardList;
