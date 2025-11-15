import { useParams } from "react-router-dom";

const useBoardId = () => {
  const params = useParams();
  return params.boardId as string;
};
export default useBoardId;
