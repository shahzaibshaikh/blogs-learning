import { useState } from "react";
import axios from "axios";

interface CommentCreateProps {
  postId: string;
}

function CommentCreate({ postId }: CommentCreateProps) {
  const [content, setContent] = useState("");

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await axios.post(`http://posts.com/posts/${postId}/comments`, {
      content
    });
    setContent("");
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label>New Comment</label>
          <input
            type='text'
            value={content}
            onChange={e => setContent(e.target.value)}
            className='form-control'
          />
        </div>
        <button className='btn btn-primary'>Submit</button>
      </form>
    </div>
  );
}

export default CommentCreate;
