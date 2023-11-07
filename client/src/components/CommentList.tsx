interface CommentProps {
  comments: Comment[];
}

interface Comment {
  id: string;
  content: string;
}

function CommentList({ comments }: CommentProps) {
  const renderedComments = comments.map(comment => (
    <li key={comment.id}>{comment.content}</li>
  ));

  return <ul>{renderedComments}</ul>;
}

export default CommentList;
