import { generateText } from "ai"
import { groq } from "@ai-sdk/groq"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { text, sourceLanguage, targetLanguage } = await request.json()

    if (!text || !sourceLanguage || !targetLanguage) {
      return NextResponse.json(
        { error: "Missing required fields: text, sourceLanguage, targetLanguage" },
        { status: 400 },
      )
    }

    // Language mapping for better prompts
    const languageNames: Record<string, string> = {
      en: "English",
      es: "Spanish",
      fr: "French",
      de: "German",
      it: "Italian",
      pt: "Portuguese",
      ru: "Russian",
      ja: "Japanese",
      ko: "Korean",
      zh: "Chinese",
      ar: "Arabic",
      hi: "Hindi",
    }

    const sourceLangName = languageNames[sourceLanguage] || sourceLanguage
    const targetLangName = languageNames[targetLanguage] || targetLanguage

    // Use Groq for translation
    const { text: translatedText } = await generateText({
      model: groq("qwen/qwen3-32b"),
      prompt: `You are a professional translator. Translate the following text from ${sourceLangName} to ${targetLangName}. 

Important instructions:
- Provide ONLY the translation, no explanations or additional text
- Maintain the original meaning and context
- Preserve formatting and punctuation
- If the text is already in the target language, still provide a natural translation
- For proper nouns, keep them as appropriate for the target language

Text to translate: "${text}"

Translation:`,
      maxTokens: 1000,
      temperature: 0.3,
    })

    return NextResponse.json({
      translatedText: translatedText.trim(),
      sourceLanguage,
      targetLanguage,
      originalText: text,
    })
  } catch (error) {
    console.error("Translation error:", error)
    return NextResponse.json({ error: "Translation failed. Please try again." }, { status: 500 })
  }
}
