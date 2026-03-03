const {Router} = require('express')
const { registerUserController, loginUserController, logoutUserController } = require('../controllers/auth.controller')
const authRouter = Router()

/**
 * @route POST /api/auth/register
 * @description register a new user
 * @access Public
 */
authRouter.post("/register", registerUserController)

/**
 * @route POST /api/auth/login
 * @description logs in an existing user
 * @access Public
 */
authRouter.post("/login", loginUserController)


/**
 * @route GET /api/auth/logout
 * @description logouts the loggedIn user, clear cookie from client & add to blacklist
 * @access Public
 */
authRouter.get("/logout", logoutUserController)

module.exports = authRouter