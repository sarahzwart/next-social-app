import Comment from './Comment';

interface CommentInterface {
  comment: string;
  user: string;
  name: string;
  username: string;
  profileImg: string;
  _id: string;
  createdAt: string;
}

interface PostInterface {
  comments: string[];
  createdAt: string;
  image: string;
  likes: string[];
  name: string;
  profileImg: string;
  text: string;
  updatedAt: string;
  user: string;
  username: string;
  __v: number;
  _id: string;
}


export default function Comments({ comments, post } : { comments: CommentInterface[], post: PostInterface }) {
  const sortedComments = [...comments].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  console.log('Comments: ',comments)
  console.log('Sorted Comments: ',sortedComments[0])
  return (
    <div>
      {sortedComments.map((comment) => (
        <Comment key={comment._id} comment={comment} post={post}/>
      ))}
    </div>
  );
}
