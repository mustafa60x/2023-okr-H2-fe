import UserModel from "../models/User";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  return await login(body.email, body.password);
});

async function login(email: string, password: string) {
  try {
    const user = (await UserModel.findOne({
      email: email,
      password: password,
    })) as any;

    if (!user) {
      throw new Error("User not found");
    }

    return {
      _id: user._id,
      name: user.name,
      profile: "profile.png",
      email: user.email,
      token: "token",
    };
  } catch (error: any) {
    throw createError({
      statusCode: 400,
      statusMessage: error.message,
    });
  }
}
