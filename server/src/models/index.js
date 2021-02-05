import { Comment } from './Comment';
import { Image } from './Image';
import { Movie } from './Movie';
import { Post } from './Post';
import { PostsImagesRelation } from './PostsImagesRelation';
import { ProfileImage } from './ProfileImage';
import { Sound } from './Sound';
import { User } from './User';

User.hasMany(Post, {
  as: 'posts',
  foreignKey: {
    allowNull: false,
    name: 'userId',
  },
});
Post.belongsTo(User, {
  as: 'user',
  foreignKey: {
    allowNull: false,
    name: 'userId',
  },
});

User.belongsTo(ProfileImage, {
  as: 'profileImage',
  foreignKey: {
    allowNull: false,
    defaultValue: '396fe4ce-aa36-4d96-b54e-6db40bae2eed',
  },
});

Post.belongsToMany(Image, {
  as: 'images',
  foreignKey: {
    name: 'postId',
  },
  otherKey: {
    name: 'imageId',
  },
  through: PostsImagesRelation,
});

Post.belongsTo(Movie, {
  as: 'movie',
});

Post.belongsTo(Sound, {
  as: 'sound',
});

Post.hasMany(Comment, {
  as: 'comments',
  foreignKey: {
    allowNull: false,
    name: 'postId',
  },
});
Comment.belongsTo(Post, {
  as: 'post',
  foreignKey: {
    allowNull: false,
    name: 'postId',
  },
});

Comment.belongsTo(User, {
  as: 'user',
  foreignKey: {
    allowNull: false,
    name: 'userId',
  },
});

export { User, Post, Image, Movie, Sound, Comment, ProfileImage, PostsImagesRelation };
