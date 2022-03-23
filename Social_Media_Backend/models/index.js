const Comment = require("./Comment");
const User = require("./User");
const Post = require("./Post");
const Community = require("./Community");
const UserCommunities = require("./UserCommunities");
const UserRatedPosts = require("./UserRatedPosts");

User.hasMany(Post);
User.hasMany(Comment);
Comment.hasMany(Comment);
Post.hasMany(Comment);
Community.hasMany(Post);
Community.belongsToMany(User, {
  through: UserCommunities,
});
User.belongsToMany(Community, {
  through: UserCommunities,
});
User.belongsToMany(Post, { through: UserRatedPosts, as: "ratedPosts" });
Post.belongsToMany(User, { through: UserRatedPosts, as: "usersRated" });

Post.belongsTo(Community);
Comment.belongsTo(Post);
Comment.belongsTo(User);
Post.belongsTo(User);

/*
UserRatedPosts.sync({ alter: true });
User.sync({ alter: true });
Post.sync({ alter: true });
Community.sync({ alter: true });
Comment.sync({ alter: true });
UserCommunities.sync({ alter: true });*/

module.exports = {
  User,
  Comment,
  Post,
  Community,
  UserCommunities,
  UserRatedPosts,
};
