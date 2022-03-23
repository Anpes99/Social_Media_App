/*const io = require("socket.io")(3001, {
  cors: {
    origin: [
      "http://localhost:3001",
      "http://localhost:3000",
      "https://socialMediaApp1000.herokuapp.com/",
    ],
  },
});*/
const { sequelize } = require("../models/Comment");
const { User, Comment, Post, Community } = require("../models/index");

module.exports = function (io) {
  io.on("connection", (socket) => {
    socket.on(
      "fetch_more_posts",
      async (order, sortBy, offset, limit, communityId, cb) => {
        const totalCountOptions = {};
        if (communityId)
          totalCountOptions.where = { communityId: Number(communityId) };
        const totalCount = await Post.count(totalCountOptions);

        const options = {
          order: [["createdAt", "DESC"]],
          offset,
          limit,
          include: [
            { model: User, attributes: ["username"] },
            { model: Community, attributes: ["name"] },
          ],
        };
        if (communityId) options.where = { communityId: Number(communityId) };
        if (order && sortBy) options.order = [[sortBy, order]];
        const posts = await Post.findAll(options);
        cb({ posts, totalCount });
      }
    );

    socket.on("fetch_top_posts", async (offset, communityId, cb) => {
      const totalCountOptions = {};
      if (communityId)
        totalCountOptions.where = { communityId: Number(communityId) };
      const totalCount = await Post.count(totalCountOptions);

      const options = {
        offset,
        limit: 5,
        include: [
          { model: User, attributes: ["username"] },
          { model: Community, attributes: ["name", "id"] },
        ],
        order: [[sequelize.literal('"up_votes"-"down_votes"'), "desc"]],
      };
      if (communityId) options.where = { communityId: Number(communityId) };
      console.log(options);
      console.log("getting more top posts");
      const posts = await Post.findAll(options);
      console.log(posts);
      cb({ posts, totalCount });
    });
  });
};
