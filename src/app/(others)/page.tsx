import Input from "@/components/Input";
import Feed from "@/components/Feed";

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

export default async function Home() {
  let data: PostInterface[] = [];
  try{
    const result = await fetch(process.env.URL + '/api/post/all', {
      method: 'GET',
      cache: 'no-store'
    });
    data = await result.json()
    console.log(data)
  } catch (error){
    console.error('Error fecthing posts:', error);
  }
  return (
    <div className="min-h-screen max-w-xl mx-auto border-r border-l">
      <div className="py-2 px-3 sticky top-0 z-50 bg-white border-b border-gray-200">
        <h2 className="text-lg sm:text-xl font-bold">Home</h2>
      </div>
      <Input />
      <Feed data={data}/>
    </div>
  );
}
