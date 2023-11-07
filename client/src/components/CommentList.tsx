interface CommentProps {
  comments: Comment[];
}

interface Comment {
  id: string;
  content: string;
  status: string;
}

function CommentList({ comments }: CommentProps) {
  const renderedComments = comments.map(comment => {
    let content;
    if (comment.status === "approved") {
      content = comment.content;
    }

    return <li key={comment.id}>{comment.content}</li>;
  });

  return <ul>{renderedComments}</ul>;
}

export default CommentList;
