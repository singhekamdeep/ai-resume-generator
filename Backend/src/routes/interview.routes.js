const express = require('express')
const { authUser } = require('../middlewares/auth.middleware')
const { generateInterviewReportController } = require('../controllers/interview.controller')
const { upload } = require('../middlewares/file.middleware')
const interviewRouter = express.Router()

/**
 * @route POST /api/interview
 * @description generate an interview report by analysing the resume/skill of the 
 * candidate and comparing it with the job description. extracting skill gaps, 
 * preparation plan, technical & behavioural questions.
 * @access private
 */
interviewRouter.post("/", authUser, upload.single("resume"), generateInterviewReportController)

module.exports = interviewRouter