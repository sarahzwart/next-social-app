import Post from '../../../../lib/models/post.model';
import { connect } from '../../../../lib/mongodb/mongoose';
import { currentUser } from '@clerk/nextjs/server';

export const DELETE = async (req) => {
  const user = await currentUser();
  try {
    await connect();
    const data = await req.json();
    console.log(req.json())
    if (!user) {
      return new Response( {status: 401}, 'Unauthorized' );
    }

    const post = await Post.findById(data.postId);
    if (!post) {
      return new Response('Post not found', { status: 404 });
    }

    post.comments = post.comments.filter((comment) => comment._id.toString() !== data.commentId);
    const updatedPost = await Post.findByIdAndUpdate(
      data.postId,
      { comments: post.comments },
      { new: true }
    );

    return new Response(JSON.stringify(updatedPost), { status: 200 });
  } catch (error) {
    console.log('Error deleting comment:', error);
    return new Response('Error deleting comment', { status: 500 });
  }
};