import { generateText } from "ai"
import { groq } from "@ai-sdk/groq"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { text, sourceLanguage, targetLanguage, includeAlternatives = false } = await request.json()

    if (!text || !sourceLanguage || !targetLanguage) {
      return NextResponse.json(
        { error: "Missing required fields: text, sourceLanguage, targetLanguage" },
        { status: 400 },
      )
    }

    // Language mapping for better prompts
    const languageNames: Record<string, string> = {
      en: "English",
      zh: "Chinese",
      es: "Spanish",
      hi: "Hindi",
      ar: "Arabic",
      pt: "Portuguese",
      ru: "Russian",
      ja: "Japanese",
      de: "German",
      fr: "French",
      it: "Italian",
      ko: "Korean",
      nl: "Dutch",
      sv: "Swedish",
      no: "Norwegian",
      da: "Danish",
      fi: "Finnish",
      pl: "Polish",
      cs: "Czech",
      sk: "Slovak",
      hu: "Hungarian",
      ro: "Romanian",
      bg: "Bulgarian",
      hr: "Croatian",
      sr: "Serbian",
      sl: "Slovenian",
      et: "Estonian",
      lv: "Latvian",
      lt: "Lithuanian",
      el: "Greek",
      tr: "Turkish",
      th: "Thai",
      vi: "Vietnamese",
      id: "Indonesian",
      ms: "Malay",
      tl: "Filipino",
      bn: "Bengali",
      ur: "Urdu",
      ta: "Tamil",
      te: "Telugu",
      mr: "Marathi",
      gu: "Gujarati",
      kn: "Kannada",
      ml: "Malayalam",
      pa: "Punjabi",
      sw: "Swahili",
      am: "Amharic",
      yo: "Yoruba",
      ig: "Igbo",
      ha: "Hausa",
      he: "Hebrew",
      fa: "Persian",
      uk: "Ukrainian",
      be: "Belarusian",
      ka: "Georgian",
      hy: "Armenian",
      az: "Azerbaijani",
      kk: "Kazakh",
      ky: "Kyrgyz",
      uz: "Uzbek",
      mn: "Mongolian",
    }

    const sourceLangName = languageNames[sourceLanguage] || sourceLanguage
    const targetLangName = languageNames[targetLanguage] || targetLanguage

    // Main translation
    const translationPrompt = `You are a professional translator. Translate the following text from ${sourceLangName} to ${targetLangName}.

Important instructions:
- Provide ONLY the translation, no explanations or additional text
- Maintain the original meaning and context
- Preserve formatting and punctuation
- Use natural, fluent language in the target language
- For proper nouns, adapt appropriately for the target language

Text to translate: "${text}"

Translation:`

  const response = await generateText({
  model: groq("qwen/qwen3-32b"),
  prompt: translationPrompt,
  maxTokens: 1000,
  temperature: 0.3,
})

// Extract text from the first step’s contennt
    let translatedText = response.steps[0].content[0].text

// Remove any <think>...</think> blocks if present
    translatedText = translatedText.replace(/<think>[\s\S]*?<\/think>/g, "").trim()


    // Calculate confidence score based on text characteristics
    const calculateConfidence = (originalText: string, translatedText: string): number => {
      let confidence = 85 // Base confidence

      // Boost confidence for longer texts (more context)
      if (originalText.length > 100) confidence += 5
      if (originalText.length > 300) confidence += 5

      // Boost for common language pairs
      const commonPairs = ["en-es", "en-fr", "en-de", "es-en", "fr-en", "de-en"]
      if (commonPairs.includes(`${sourceLanguage}-${targetLanguage}`)) confidence += 5

      // Reduce confidence for very short texts
      if (originalText.length < 20) confidence -= 10

      // Ensure confidence is within reasonable bounds
      return Math.min(Math.max(confidence, 70), 98)
    }

    const confidence = calculateConfidence(text, translatedText.trim())

    let alternatives: string[] = []

    // Generate alternatives if requested
    if (includeAlternatives) {
      try {
        const alternativePrompt = `Provide 2-3 alternative translations for the following text from ${sourceLangName} to ${targetLangName}. Each alternative should have a slightly different style or emphasis while maintaining the same meaning.

Original text: "${text}"
Main translation: "${translatedText.trim()}"

Provide alternatives separated by newlines, with no numbering or bullets:`

        const { text: alternativesText } = await generateText({
          model: groq("qwen/qwen3-32b"),
          prompt: alternativePrompt,
          maxTokens: 800,
          temperature: 0.7,
        })

        alternatives = alternativesText
          .split("\n")
          .map((alt) => alt.trim())
          .filter((alt) => alt.length > 0 && alt !== translatedText.trim())
          .slice(0, 3)
      } catch (error) {
        console.error("Failed to generate alternatives:", error)
      }
    }

    return NextResponse.json({
      translatedText: translatedText.trim(),
      confidence,
      alternatives,
      sourceLanguage,
      targetLanguage,
      originalText: text,
    })

  } catch (error) {
    console.error("Advanced translation error:", error)
    return NextResponse.json({ error: "Translation failed. Please try again." }, { status: 500 })
  }
}
