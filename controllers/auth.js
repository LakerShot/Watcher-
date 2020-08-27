const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const errorHandler = require('../utils/errorHandler')


module.exports.login = async function(req, res) {
  const {email, password } = req.body
  const candidate = await User.findOne({email})

  if (!candidate) res.status(404).json({message: "This email is doesn't exist "})

  const isMatch = bcrypt.compareSync(password, candidate.password)

  if (!isMatch) res.status(401).json({message: 'Incorrect password'}) 

  const token = jwt.sign({email: candidate.email, userId: candidate._id}, process.env.JWT, { expiresIn: '1h' })
  
  res.json({token: `Bearer ${token}`})
} 


module.exports.register = async function(req, res) {
  const {email, password } = req.body
  const candidate = await User.findOne({email})

  if (candidate) res.status(409).json({ message: 'This email is already taken'})
  
  try {
      const user = new User({ email, password: bcrypt.hashSync(password, 10) })
      await user.save()
      res.status(201).json(user)
    } catch(e) {
      errorHandler(res, e)
  }
}