const { GoogleGenAI } = require('@google/genai')
const { z } = require('zod')
const { zodToJsonSchema } = require('zod-to-json-schema')

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GENAI_API_KEY
})

const interviewReportSchema = z.object({

  matchScore: z.number().describe("Provide a Match Score between 0 to 100 based on how well the Resume aligns with the job description."),

  matchAnalysis: z.string().describe("A brutal, honest assessment. 1 paragraph summarizing the gap between the candidate and the JD's 'ideal candidate'."),
  
  technicalQuestions: z.array(z.object({
    question: z.string().describe("The technical question can be asked in the interview."),
    intention: z.string().describe("The intention of interviewer behind asking this question. Provide what are they looking for."),
    answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
  })).describe("Questions must be derived from the intersection of job description & candidate's listed stack. Include a mix of conceptual, architectural, and coding-logic questions."),

  behavioralQuestions: z.array(z.object({
    question: z.string().describe("Scenario-based question focusing on culture fit and conflict resolution."),
    intention: z.string().describe("The psychological trait or soft skill being targeted."),
    answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
  })).describe("Generate 4-5 behavioral questions using the STAR method framework. Tailor these to the seniority and culture implied in the JD (e.g., leadership, conflict resolution, or fast-paced delivery)."),

  skillGaps: z.array(z.object({
    skill: z.string().describe("The skills which candidate is laking, what he can improve"),
    severity: z.enum(["low", "medium", "high"]).describe("The severity of this skill gap, i.e. how important is this skill for the job and how much it can impact the candidate's chances")
  })).describe("Identify specific technical and soft skills mentioned in the JD that are missing or weak in the user's profile."),

  preparationPlan: z.array(z.object({
    day: z.number().describe("The day number of the preparation plan."),
    focus: z.string().describe("The main focus of this day in the preparation plan, e.g. data structures, system design, mock interviews etc."),
    tasks: z.array(z.string()).describe("List of tasks to be done on this day to follow the preparation plan, e.g. read a specific book or article, solve a set of problems, watch a video etc.")
  })).describe("Create a 7 day rigorous, day-by-day study schedule to bridge the identified gaps. Day 1-2: Focus on Critical Skill Gaps. Day 3-4: Deep dive into the core tech stack mentioned in the JD. Day 5: Project deep-dive (rehearsing stories from the resume). Day 6: Mock interview practice (Technical & Behavioral). Day 7: Final review and company-specific research.")
})

const generateInterviewReport = async ({ resume, selfDescription, jobDescription }) => {
  const prompt = `Role: You are an expert Technical Recruiter and Career Coach with 20  
    years of experience in high-growth tech companies.

    Task: Analyze the provided Job Description (JD) and the user's Resume/Skills. Your 
    goal is to provide a comprehensive preparation package that bridges the gap between 
    the candidate's current state and the requirements of the role.
    Resume: ${resume}
    Self Description: ${selfDescription}
    Job Description: ${jobDescription}
  `

  const response = await ai.models.generateContent({
    model: "gemini-3.0-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: zodToJsonSchema(interviewReportSchema),
    }
  })

  return JSON.parse(response.text)
}

module.exports = generateInterviewReport