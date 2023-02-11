import { Configuration, OpenAIApi } from 'openai'

import { OPENAI_API_KEY } from '~/utils/secrets'

const configuration = new Configuration({
  apiKey: OPENAI_API_KEY
})
const openai = new OpenAIApi(configuration)

export const getCompletion = async (prompt: string): Promise<string | null> => {
  const completion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${prompt}\nAI:\n`,
    temperature: 0.9,
    max_tokens: 4000,
    top_p: 1,
    frequency_penalty: 0.0,
    presence_penalty: 0.6,
    stop: [' Human:', ' AI:']
  })

  const { text } = completion.data.choices[0]
  if (!text) {
    return null
  }

  if (text.substring(0, 1) === `\n`) {
    return text.substring(1)
  }

  return text
}

export const getCodeReview = async (prompt: string): Promise<string | null> => {
  const completion = await openai.createCompletion({
    model: 'code-davinci-002',
    prompt: `${prompt}\n\nHere's what the above class is doing:\n`,
    temperature: 0,
    max_tokens: 64,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
    stop: ['"""']
  })

  return completion.data.choices[0].text ? completion.data.choices[0].text.substring(1) : null
}

export const getColorCode = async (prompt: string): Promise<string | null> => {
  const completion = await openai.createCompletion({
    prompt: `${prompt}\n\nbackground-color:`,
    model: 'text-davinci-003',
    temperature: 0,
    max_tokens: 64,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
    stop: [';']
  })

  return completion.data.choices[0].text ? completion.data.choices[0].text.substring(1) : null
}
