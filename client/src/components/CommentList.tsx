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
    if (comment.status === "pending") {
      content = "This comment is awaiting moderation";
    }
    if (comment.status === "rejected") {
      content = "This comment has been rejected";
    }

    return <li key={comment.id}>{content}</li>;
  });

  return <ul>{renderedComments}</ul>;
}

export default CommentList;
