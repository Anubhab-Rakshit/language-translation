import { generateText } from "ai"
import { groq } from "@ai-sdk/groq"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json()

    if (!text || text.trim().length < 3) {
      return NextResponse.json({ error: "Text too short for language detection" }, { status: 400 })
    }

    // Use Groq for language detection
    const { text: detectionResult } = await generateText({
      model: groq("llama-3.1-70b-versatile"),
      prompt: `Detect the language of the following text and respond with ONLY the ISO 639-1 language code (like "en", "es", "fr", etc.). If you cannot determine the language with confidence, respond with "unknown".

Text: "${text.slice(0, 200)}"

Language code:`,
      maxTokens: 10,
      temperature: 0.1,
    })

    const detectedLanguage = detectionResult.trim().toLowerCase()

    // Validate the detected language code
    const validLanguageCodes = [
      "en",
      "es",
      "fr",
      "de",
      "it",
      "pt",
      "ru",
      "ja",
      "ko",
      "zh",
      "ar",
      "hi",
      "nl",
      "sv",
      "no",
      "da",
      "fi",
      "pl",
      "cs",
      "sk",
      "hu",
      "ro",
      "bg",
      "hr",
      "sr",
      "sl",
      "et",
      "lv",
      "lt",
      "el",
      "tr",
      "th",
      "vi",
      "id",
      "ms",
      "tl",
      "bn",
      "ur",
      "ta",
      "te",
      "mr",
      "gu",
      "kn",
      "ml",
      "pa",
      "sw",
      "am",
      "yo",
      "ig",
      "ha",
      "he",
      "fa",
      "uk",
      "be",
      "ka",
      "hy",
      "az",
      "kk",
      "ky",
      "uz",
      "mn",
    ]

    if (!validLanguageCodes.includes(detectedLanguage)) {
      return NextResponse.json({ detectedLanguage: "en" }) // Default to English
    }

    return NextResponse.json({ detectedLanguage })
  } catch (error) {
    console.error("Language detection error:", error)
    return NextResponse.json({ error: "Language detection failed" }, { status: 500 })
  }
}
