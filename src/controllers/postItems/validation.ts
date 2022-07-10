import joi from 'joi'

export const createPostSchema = joi.object({
  title:joi.string().required().min(3),
  body:joi.string()
  .min(10)
  .required(),
  description:joi.string()
  .required()
})

export const updatePostSchema = joi.object({
  title:joi.string().min(10),
  body:joi.string(),
  description:joi.string()
})