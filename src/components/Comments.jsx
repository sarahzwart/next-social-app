import Comment from './Comment';
/*
interface CommentInterface {
  comment: string;
  user: string;
  name: string;
  username: string;
  profileImg: string;
  _id: string;
  createdAt: string;
}*/

export default function Comments({ comments, post }/*: { comments: CommentInterface[] }*/) {
  console.log(comments)
  const sortedComments = [...comments].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div>
      {sortedComments.map((comment) => (
        <Comment key={comment.id} comment={comment} post={post}/>
      ))}
    </div>
  );
}
