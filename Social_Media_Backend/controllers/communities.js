const communitiesRouter = require("express").Router();
const {
  User,
  Comment,
  Post,
  Community,
  UserCommunities,
} = require("../models/index");

communitiesRouter.post("/:communityId/user", async (req, res) => {
  try {
    const result = await UserCommunities.create({
      userId: req.user.id,
      communityId: req.params.communityId,
    });
    console.log(result);
    return res.json("User successfully joined community");
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .json("Something went wrong while saving saving community member");
  }
});
communitiesRouter.delete("/:communityId/user", async (req, res) => {
  console.log(req.user);
  try {
    console.log(
      req.user.id,
      req.params.communityId,
      typeof req.user.id,
      typeof req.params.communityId
    );

    const r = await UserCommunities.destroy({
      where: {
        userId: req.user.id,
        communityId: Number(req.params.communityId),
      },
    });
    console.log(r, "resuöt");
    return res.status(204).json("User successfully removed from community");
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .json("Something went wrong while removing user from community");
  }
});

communitiesRouter.get("/", async (req, res) => {
  const name = req.query.name;
  const options = {};
  if (name) options.where = { name };
  const communities = await Community.findAll(options);
  return res.json(communities);
});

module.exports = communitiesRouter;
