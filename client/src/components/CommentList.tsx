import { useState, useEffect } from "react";
import axios from "axios";

interface CommentProps {
  comment: Comment[];
}

interface Comment {
  id: string;
  content: string;
}

function CommentList({ comment }: CommentProps) {
  const [comm, setComments] = useState<Comment[]>([]);

  const fetchData = async () => {
    const res = await axios.get(`http://localhost:4001/posts/${postId}/comments`);
    setComments(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderedComments = comment.map(comm => <li key={comm.id}>{comm.content}</li>);

  return <ul>{renderedComments}</ul>;
}

export default CommentList;
