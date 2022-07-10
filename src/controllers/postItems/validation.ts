import joi from 'joi'

const schema = joi.object({
  title:joi.string().required().min(3),
  body:joi.string()
  .min(10)
  .required(),
  userId:joi.string()
  .required(),
  description:joi.string()
  .required()
})

export default schema