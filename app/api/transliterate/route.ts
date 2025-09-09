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

    // Use Groq for transliteration
    const { text: transliteratedText } = await generateText({
      model: groq("qwen/qwen3-32b"),
      prompt: `You are a professional transliterator. Transliterate the following text from ${sourceLangName} script to ${targetLangName} script.

Important instructions:
- Provide ONLY the transliteration, no explanations or additional text
- Maintain the original pronunciation as closely as possible
- Use the standard transliteration system for the target script
- Preserve word boundaries and punctuation
- If transliterating to Latin script, use standard romanization

Text to transliterate: "${text}"

Transliteration:`,
      maxTokens: 1000,
      temperature: 0.2,
    })

    return NextResponse.json({
      transliteratedText: transliteratedText.trim(),
      sourceLanguage,
      targetLanguage,
      originalText: text,
    })
  } catch (error) {
    console.error("Transliteration error:", error)
    return NextResponse.json({ error: "Transliteration failed. Please try again." }, { status: 500 })
  }
}
