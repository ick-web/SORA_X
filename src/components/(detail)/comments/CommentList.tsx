import { fetchCommentById } from "@/utils/fetchCommentById";
import CommentInput from "./CommentInput";
import { Comment } from "@/types/commentTypes";

const CommentList = async () => {
  const answerId = "bafb482a-b5f6-43ea-af90-254941ecb660"; // 임시로 answer_id 넣음
  const comments: Comment[] = await fetchCommentById(answerId);

  return (
    <div>
      <h2 className="text-2xl mb-4">COMMENT</h2>
      {comments.length > 0 ? (
        comments.map((comment) => (
          <div
            key={comment.comment_id}
            className="border-2 border-orange-500 rounded-lg p-4 mb-4"
          >
            <span className="font-bold">{comment.users.user_nickname}</span>
            <span className="ml-2 text-gray-400 text-sm">
              {new Date(comment.comment_created_at).toLocaleString()}
            </span>
            <p className="mt-2">{comment.comment_content}</p>
          </div>
        ))
      ) : (
        <p className="text-gray-500">아직 댓글이 없습니다.</p>
      )}
      <CommentInput />
    </div>
  );
};

export default CommentList;
