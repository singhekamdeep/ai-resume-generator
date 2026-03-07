const { GoogleGenAI, Type } = require('@google/genai')

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GENAI_API_KEY
})

/**
 * Gemini-native response schema for the interview report.
 * Uses @google/genai Type to ensure 100% compatibility with Gemini's strict schema requirements.
 */
const interviewReportSchema = {
  type: Type.OBJECT,
  properties: {
    matchScore: {
      type: Type.NUMBER,
      description: "Provide a Match Score between 0 to 100 based on how well the Resume aligns with the job description."
    },
    matchAnalysis: {
      type: Type.ARRAY,
      description: "List the top 3 specific reasons for the match score.",
      items: {
        type: Type.STRING
      }
    },
    technicalQuestions: {
      type: Type.ARRAY,
      description: "Questions must be derived from the intersection of job description & candidate's listed stack. Include a mix of conceptual, architectural, and coding-logic questions.",
      items: {
        type: Type.OBJECT,
        properties: {
          question: {
            type: Type.STRING,
            description: "The technical question can be asked in the interview."
          },
          intention: {
            type: Type.STRING,
            description: "The intention of interviewer behind asking this question. Provide what are they looking for."
          },
          answer: {
            type: Type.STRING,
            description: "How to answer this question, what points to cover, what approach to take etc."
          }
        },
        required: ["question", "intention", "answer"]
      }
    },
    behavioralQuestions: {
      type: Type.ARRAY,
      description: "Generate 4-5 behavioral questions using the STAR method framework. Tailor these to the seniority and culture implied in the JD.",
      items: {
        type: Type.OBJECT,
        properties: {
          question: {
            type: Type.STRING,
            description: "Scenario-based question focusing on culture fit and conflict resolution."
          },
          intention: {
            type: Type.STRING,
            description: "The psychological trait or soft skill being targeted."
          },
          answer: {
            type: Type.STRING,
            description: "How to answer this question, what points to cover, what approach to take etc."
          }
        },
        required: ["question", "intention", "answer"]
      }
    },
    skillGaps: {
      type: Type.ARRAY,
      description: "Identify specific technical and soft skills mentioned in the JD that are missing or weak in the user's profile.",
      items: {
        type: Type.OBJECT,
        properties: {
          skill: {
            type: Type.STRING,
            description: "The skills which candidate is lacking, what he can improve"
          },
          severity: {
            type: Type.STRING,
            enum: ["low", "medium", "high"],
            description: "The severity of this skill gap, i.e. how important is this skill for the job and how much it can impact the candidate's chances"
          }
        },
        required: ["skill", "severity"]
      }
    },
    preparationPlan: {
      type: Type.ARRAY,
      description: "Create a 7 day rigorous, day-by-day study schedule to bridge the identified gaps.",
      items: {
        type: Type.OBJECT,
        properties: {
          day: {
            type: Type.NUMBER,
            description: "The day number of the preparation plan."
          },
          focus: {
            type: Type.STRING,
            description: "The main focus of this day in the preparation plan, e.g. data structures, system design, mock interviews etc."
          },
          tasks: {
            type: Type.ARRAY,
            description: "List of tasks to be done on this day to follow the preparation plan, e.g. read a specific book or article, solve a set of problems, watch a video etc.",
            items: {
              type: Type.STRING
            }
          }
        },
        required: ["day", "focus", "tasks"]
      }
    }
  },
  required: ["matchScore", "technicalQuestions", "behavioralQuestions", "skillGaps", "preparationPlan"]
}

const generateInterviewReport = async ({ resume, selfDescription, jobDescription }) => {

  const prompt = `Generate an interview report for a candidate with the following 
    details:
    Resume: ${resume}
    Self Description: ${selfDescription}
    Job Description: ${jobDescription}
  `

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: interviewReportSchema,
    }
  })

  return JSON.parse(response.text)
}

module.exports = {generateInterviewReport}