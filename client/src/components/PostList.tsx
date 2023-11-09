import { useState, useEffect } from "react";
import axios from "axios";
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";

function PostList() {
  interface Post {
    [postId: string]: {
      id: string;
      title: string;
      comments: Comment[];
    };
  }

  interface Comment {
    id: string;
    content: string;
    status: string;
  }

  const [posts, setPosts] = useState<Post>({});

  const fetchPosts = async () => {
    const res = await axios.get("http://localhost:4002/posts");
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const renderedPosts = Object.values(posts).map(post => {
    return (
      <div className='card' style={{ width: "30%", marginBottom: "20px" }} key={post.id}>
        <div className='card-body'>
          <h3>{post.title}</h3>
          <CommentList comments={post.comments} />
          <CommentCreate postId={post.id} />
        </div>
      </div>
    );
  });

  return (
    <div className='d-flex flex-row flex-wrap justify-content-between'>
      {renderedPosts}
    </div>
  );
}

export default PostList;
