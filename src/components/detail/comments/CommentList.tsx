import CommentInput from "./CommentInput";

const CommentList = () => {
  const comments = [
    { id: 1, user: "유저1", text: "유치원 안 나오셨나요 hoxy?" },
    { id: 2, user: "유저2", text: "1+1은 도의적으로 2입니다..." },
  ];

  return (
    <div>
      <h2 className="text-2xl mb-4">COMMENT</h2>
      {comments.map((comment) => (
        <div
          key={comment.id}
          className="border-2 border-orange-500 rounded-lg p-4 mb-4"
        >
          <div className="border-b border-gray-700 pb-2 mb-2">
            <span className="font-bold">
              {comment.user}
            </span>
          </div>
          <p>{comment.text}</p>
        </div>
      ))}
      <CommentInput />
    </div>
  );
};

export default CommentList;
