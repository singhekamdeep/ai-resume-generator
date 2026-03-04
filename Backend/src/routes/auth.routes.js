const { Router } = require('express')
const { registerUserController, loginUserController, logoutUserController, getMeController } = require('../controllers/auth.controller')
const { authUser } = require('../middlewares/auth.middleware')
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
 * @access public
 */
authRouter.post("/login", loginUserController)


/**
 * @route GET /api/auth/logout
 * @description logouts the loggedIn user, clear cookie from client & add to blacklist
 * @access public
 */
authRouter.get("/logout", logoutUserController)

/**
 * @route GET /api/auth/get-me
 * @description get the details of current logged in user
 * @access private
 */
authRouter.get("/get-me", authUser, getMeController)

module.exports = authRouter