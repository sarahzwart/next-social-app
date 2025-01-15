import Posts from "./Posts";

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

export default function Feed({ data }: { data: PostInterface[] }) {
  return (
    <div>
      {data.map((post) => (
        <Posts key={post._id} post={post} />
      ))}
    </div>
  );
}
