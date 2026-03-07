const pdfParser = require('pdf-parse')
const { generateInterviewReport } = require('../services/ai.service')
const interviewReportModel = require('../models/interviewReport.model')

/**
 * @description controller to generate interview report based on user's self description/
 * resume, & job description
 */
const generateInterviewReportController = async (req, res) => {
  const resumeContent = await ( new pdfParser.PDFParse(Uint8Array.from(req.file.buffer))).getText()
  const { selfDescription, jobDescription } = req.body

  const interviewReportFromAI = await generateInterviewReport({
    resume: resumeContent.text,
    selfDescription,
    jobDescription,
  })

  const interviewReport = await interviewReportModel.create({
    user: req.user.id,
    resume: resumeContent.text,
    selfDescription,
    jobDescription,
    ...interviewReportFromAI
  })

  res.status(201).json({
    message: "Interview Report generated successfully",
    interviewReport
  })
}

module.exports = { generateInterviewReportController }