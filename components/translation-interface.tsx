"use client"

import type React from "react"
import Link from "next/link"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import {
  Languages,
  ArrowRightLeft,
  Copy,
  Volume2,
  History,
  Zap,
  Globe,
  Upload,
  Download,
  FileText,
  BarChart3,
  Star,
  RefreshCw,
  Mic,
  MicOff,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const languages = [
  // Major World Languages
  { code: "en", name: "English", flag: "🇺🇸", region: "Global" },
  { code: "zh", name: "Chinese (Simplified)", flag: "🇨🇳", region: "Asia" },
  { code: "zh-tw", name: "Chinese (Traditional)", flag: "🇹🇼", region: "Asia" },
  { code: "es", name: "Spanish", flag: "🇪🇸", region: "Europe" },
  { code: "hi", name: "Hindi", flag: "🇮🇳", region: "Asia" },
  { code: "ar", name: "Arabic", flag: "🇸🇦", region: "Middle East" },
  { code: "pt", name: "Portuguese", flag: "🇵🇹", region: "Europe" },
  { code: "pt-br", name: "Portuguese (Brazil)", flag: "🇧🇷", region: "Americas" },
  { code: "ru", name: "Russian", flag: "🇷🇺", region: "Europe" },
  { code: "ja", name: "Japanese", flag: "🇯🇵", region: "Asia" },
  { code: "de", name: "German", flag: "🇩🇪", region: "Europe" },
  { code: "fr", name: "French", flag: "🇫🇷", region: "Europe" },
  { code: "it", name: "Italian", flag: "🇮🇹", region: "Europe" },
  { code: "ko", name: "Korean", flag: "🇰🇷", region: "Asia" },

  // European Languages
  { code: "nl", name: "Dutch", flag: "🇳🇱", region: "Europe" },
  { code: "sv", name: "Swedish", flag: "🇸🇪", region: "Europe" },
  { code: "no", name: "Norwegian", flag: "🇳🇴", region: "Europe" },
  { code: "da", name: "Danish", flag: "🇩🇰", region: "Europe" },
  { code: "fi", name: "Finnish", flag: "🇫🇮", region: "Europe" },
  { code: "pl", name: "Polish", flag: "🇵🇱", region: "Europe" },
  { code: "cs", name: "Czech", flag: "🇨🇿", region: "Europe" },
  { code: "sk", name: "Slovak", flag: "🇸🇰", region: "Europe" },
  { code: "hu", name: "Hungarian", flag: "🇭🇺", region: "Europe" },
  { code: "ro", name: "Romanian", flag: "🇷🇴", region: "Europe" },
  { code: "bg", name: "Bulgarian", flag: "🇧🇬", region: "Europe" },
  { code: "hr", name: "Croatian", flag: "🇭🇷", region: "Europe" },
  { code: "sr", name: "Serbian", flag: "🇷🇸", region: "Europe" },
  { code: "sl", name: "Slovenian", flag: "🇸🇮", region: "Europe" },
  { code: "et", name: "Estonian", flag: "🇪🇪", region: "Europe" },
  { code: "lv", name: "Latvian", flag: "🇱🇻", region: "Europe" },
  { code: "lt", name: "Lithuanian", flag: "🇱🇹", region: "Europe" },
  { code: "el", name: "Greek", flag: "🇬🇷", region: "Europe" },
  { code: "tr", name: "Turkish", flag: "🇹🇷", region: "Europe" },

  // Asian Languages
  { code: "th", name: "Thai", flag: "🇹🇭", region: "Asia" },
  { code: "vi", name: "Vietnamese", flag: "🇻🇳", region: "Asia" },
  { code: "id", name: "Indonesian", flag: "🇮🇩", region: "Asia" },
  { code: "ms", name: "Malay", flag: "🇲🇾", region: "Asia" },
  { code: "tl", name: "Filipino", flag: "🇵🇭", region: "Asia" },
  { code: "bn", name: "Bengali", flag: "🇧🇩", region: "Asia" },
  { code: "ur", name: "Urdu", flag: "🇵🇰", region: "Asia" },
  { code: "ta", name: "Tamil", flag: "🇮🇳", region: "Asia" },
  { code: "te", name: "Telugu", flag: "🇮🇳", region: "Asia" },
  { code: "mr", name: "Marathi", flag: "🇮🇳", region: "Asia" },
  { code: "gu", name: "Gujarati", flag: "🇮🇳", region: "Asia" },
  { code: "kn", name: "Kannada", flag: "🇮🇳", region: "Asia" },
  { code: "ml", name: "Malayalam", flag: "🇮🇳", region: "Asia" },
  { code: "pa", name: "Punjabi", flag: "🇮🇳", region: "Asia" },

  // African Languages
  { code: "sw", name: "Swahili", flag: "🇰🇪", region: "Africa" },
  { code: "am", name: "Amharic", flag: "🇪🇹", region: "Africa" },
  { code: "yo", name: "Yoruba", flag: "🇳🇬", region: "Africa" },
  { code: "ig", name: "Igbo", flag: "🇳🇬", region: "Africa" },
  { code: "ha", name: "Hausa", flag: "🇳🇬", region: "Africa" },

  // Other Languages
  { code: "he", name: "Hebrew", flag: "🇮🇱", region: "Middle East" },
  { code: "fa", name: "Persian", flag: "🇮🇷", region: "Middle East" },
  { code: "uk", name: "Ukrainian", flag: "🇺🇦", region: "Europe" },
  { code: "be", name: "Belarusian", flag: "🇧🇾", region: "Europe" },
  { code: "ka", name: "Georgian", flag: "🇬🇪", region: "Asia" },
  { code: "hy", name: "Armenian", flag: "🇦🇲", region: "Asia" },
  { code: "az", name: "Azerbaijani", flag: "🇦🇿", region: "Asia" },
  { code: "kk", name: "Kazakh", flag: "🇰🇿", region: "Asia" },
  { code: "ky", name: "Kyrgyz", flag: "🇰🇬", region: "Asia" },
  { code: "uz", name: "Uzbek", flag: "🇺🇿", region: "Asia" },
  { code: "mn", name: "Mongolian", flag: "🇲🇳", region: "Asia" },
]

const languageRegions = ["All", "Global", "Europe", "Asia", "Americas", "Africa", "Middle East"]

interface TranslationResult {
  translatedText: string
  confidence: number
  alternatives?: string[]
  processingTime: number
}

interface BatchTranslationItem {
  id: string
  text: string
  result?: TranslationResult
  status: "pending" | "processing" | "completed" | "error"
}

export function TranslationInterface() {
  const [inputText, setInputText] = useState("")
  const [outputText, setOutputText] = useState("")
  const [sourceLanguage, setSourceLanguage] = useState("en")
  const [targetLanguage, setTargetLanguage] = useState("es")
  const [isTranslating, setIsTranslating] = useState(false)
  const [isDetecting, setIsDetecting] = useState(false)
  const [autoDetect, setAutoDetect] = useState(false)
  const [transliterationMode, setTransliterationMode] = useState(false)
  const [selectedRegion, setSelectedRegion] = useState("All")
  const [detectedLanguage, setDetectedLanguage] = useState<string | null>(null)
  const [translationHistory, setTranslationHistory] = useState<
    Array<{
      input: string
      output: string
      from: string
      to: string
      timestamp: Date
      isTransliteration?: boolean
      confidence?: number
      processingTime?: number
    }>
  >([])
  const [batchTexts, setBatchTexts] = useState<BatchTranslationItem[]>([])
  const [isBatchProcessing, setIsBatchProcessing] = useState(false)
  const [batchProgress, setBatchProgress] = useState(0)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isRecording, setIsRecording] = useState(false)
  const [showAlternatives, setShowAlternatives] = useState(false)
  const [translationConfidence, setTranslationConfidence] = useState<number | null>(null)
  const [processingTime, setProcessingTime] = useState<number | null>(null)
  const [alternatives, setAlternatives] = useState<string[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const { toast } = useToast()

  const detectLanguage = async (text: string) => {
    if (!text.trim()) return null

    setIsDetecting(true)
    try {
      const response = await fetch("/api/detect-language", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      })

      if (response.ok) {
        const data = await response.json()
        return data.detectedLanguage
      }
    } catch (error) {
      console.error("Language detection failed:", error)
    } finally {
      setIsDetecting(false)
    }
    return null
  }

  const handleTranslate = async () => {
    if (!inputText.trim()) {
      toast({
        title: "Input Required",
        description: "Please enter text to translate.",
        variant: "destructive",
      })
      return
    }

    let finalSourceLanguage = sourceLanguage
    const startTime = Date.now()

    // Auto-detect language if enabled
    if (autoDetect) {
      const detected = await detectLanguage(inputText)
      if (detected) {
        finalSourceLanguage = detected
        setDetectedLanguage(detected)
        setSourceLanguage(detected)
      }
    }

    if (finalSourceLanguage === targetLanguage) {
      toast({
        title: "Same Language",
        description: "Please select different source and target languages.",
        variant: "destructive",
      })
      return
    }

    setIsTranslating(true)

    try {
      const endpoint = transliterationMode ? "/api/transliterate" : "/api/translate-advanced"
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: inputText,
          sourceLanguage: finalSourceLanguage,
          targetLanguage,
          mode: transliterationMode ? "transliterate" : "translate",
          includeAlternatives: showAlternatives,
        }),
      })

      if (!response.ok) {
        throw new Error("Request failed")
      }

      const data = await response.json()

      if (data.error) {
        throw new Error(data.error)
      }

      const endTime = Date.now()
      const processingTimeMs = endTime - startTime

      setOutputText(data.translatedText || data.transliteratedText)
      setTranslationConfidence(data.confidence || null)
      setAlternatives(data.alternatives || [])
      setProcessingTime(processingTimeMs)

      const newTranslation = {
        input: inputText,
        output: data.translatedText || data.transliteratedText,
        from: finalSourceLanguage,
        to: targetLanguage,
        timestamp: new Date(),
        isTransliteration: transliterationMode,
        confidence: data.confidence,
        processingTime: processingTimeMs,
      }
      setTranslationHistory((prev) => [newTranslation, ...prev.slice(0, 9)])

      toast({
        title: transliterationMode ? "Transliteration Complete" : "Translation Complete",
        description: `Text processed in ${processingTimeMs}ms with ${data.confidence ? `${Math.round(data.confidence)}% confidence` : "high accuracy"}.`,
      })
    } catch (error) {
      console.error("Translation error:", error)
      toast({
        title: transliterationMode ? "Transliteration Error" : "Translation Error",
        description: error instanceof Error ? error.message : "Failed to process text. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsTranslating(false)
    }
  }

  const handleBatchTranslation = async () => {
    if (batchTexts.length === 0) {
      toast({
        title: "No Batch Items",
        description: "Please add texts to translate in batch mode.",
        variant: "destructive",
      })
      return
    }

    setIsBatchProcessing(true)
    setBatchProgress(0)

    try {
      for (let i = 0; i < batchTexts.length; i++) {
        const item = batchTexts[i]

        // Update status to processing
        setBatchTexts((prev) => prev.map((t) => (t.id === item.id ? { ...t, status: "processing" as const } : t)))

        try {
          const startTime = Date.now()
          const response = await fetch("/api/translate-advanced", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              text: item.text,
              sourceLanguage,
              targetLanguage,
              includeAlternatives: false,
            }),
          })

          const data = await response.json()
          const endTime = Date.now()

          if (data.error) throw new Error(data.error)

          const result: TranslationResult = {
            translatedText: data.translatedText,
            confidence: data.confidence || 95,
            alternatives: data.alternatives || [],
            processingTime: endTime - startTime,
          }

          setBatchTexts((prev) =>
            prev.map((t) => (t.id === item.id ? { ...t, result, status: "completed" as const } : t)),
          )
        } catch (error) {
          setBatchTexts((prev) => prev.map((t) => (t.id === item.id ? { ...t, status: "error" as const } : t)))
        }

        setBatchProgress(((i + 1) / batchTexts.length) * 100)
      }

      toast({
        title: "Batch Translation Complete",
        description: `Successfully processed ${batchTexts.filter((t) => t.status === "completed").length} out of ${batchTexts.length} items.`,
      })
    } catch (error) {
      toast({
        title: "Batch Translation Error",
        description: "Some translations failed. Please check individual results.",
        variant: "destructive",
      })
    } finally {
      setIsBatchProcessing(false)
    }
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (file.type !== "text/plain" && !file.name.endsWith(".txt")) {
      toast({
        title: "Invalid File Type",
        description: "Please upload a text file (.txt).",
        variant: "destructive",
      })
      return
    }

    if (file.size > 1024 * 1024) {
      // 1MB limit
      toast({
        title: "File Too Large",
        description: "Please upload a file smaller than 1MB.",
        variant: "destructive",
      })
      return
    }

    setUploadedFile(file)

    try {
      const text = await file.text()
      const lines = text.split("\n").filter((line) => line.trim().length > 0)

      const batchItems: BatchTranslationItem[] = lines.map((line, index) => ({
        id: `file-${index}`,
        text: line.trim(),
        status: "pending",
      }))

      setBatchTexts(batchItems)

      toast({
        title: "File Uploaded",
        description: `Loaded ${lines.length} lines for batch translation.`,
      })
    } catch (error) {
      toast({
        title: "File Read Error",
        description: "Failed to read the uploaded file.",
        variant: "destructive",
      })
    }
  }

  const handleExportResults = () => {
    const completedTranslations = batchTexts.filter((t) => t.status === "completed" && t.result)

    if (completedTranslations.length === 0) {
      toast({
        title: "No Results to Export",
        description: "Complete some translations first.",
        variant: "destructive",
      })
      return
    }

    const csvContent = [
      "Original Text,Translated Text,Confidence,Processing Time (ms)",
      ...completedTranslations.map(
        (t) => `"${t.text}","${t.result!.translatedText}",${t.result!.confidence},${t.result!.processingTime}`,
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `translations-${new Date().toISOString().split("T")[0]}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast({
      title: "Export Complete",
      description: "Translation results exported to CSV file.",
    })
  }

  const addBatchText = () => {
    const newItem: BatchTranslationItem = {
      id: `batch-${Date.now()}`,
      text: "",
      status: "pending",
    }
    setBatchTexts((prev) => [...prev, newItem])
  }

  const updateBatchText = (id: string, text: string) => {
    setBatchTexts((prev) => prev.map((t) => (t.id === id ? { ...t, text } : t)))
  }

  const removeBatchText = (id: string) => {
    setBatchTexts((prev) => prev.filter((t) => t.id !== id))
  }

  const filteredLanguages =
    selectedRegion === "All" ? languages : languages.filter((lang) => lang.region === selectedRegion)

  const handleSwapLanguages = () => {
    setSourceLanguage(targetLanguage)
    setTargetLanguage(sourceLanguage)
    setInputText(outputText)
    setOutputText("")
    setDetectedLanguage(null)
  }

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      toast({
        title: "Copied",
        description: "Text copied to clipboard.",
      })
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Failed to copy text to clipboard.",
        variant: "destructive",
      })
    }
  }

  const handleClear = () => {
    setInputText("")
    setOutputText("")
    setDetectedLanguage(null)
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Languages className="h-8 w-8 text-accent" />
          <h1 className="text-4xl font-bold text-foreground">AI Translation System</h1>
        </div>
        <p className="text-foreground/80 text-lg max-w-2xl mx-auto">
          Advanced multilingual translation powered by artificial intelligence. Translate text between multiple
          languages with high accuracy and context awareness.
        </p>
        <div className="flex items-center justify-center gap-2 mt-4">
          <Badge variant="secondary">Academic Project</Badge>
          <Badge variant="outline">AI-Powered</Badge>
          <Badge variant="outline">{languages.length}+ Languages</Badge>
          <Badge variant="outline">Batch Processing</Badge>
          <Badge variant="outline">Analytics</Badge>
        </div>
        <div className="mt-4">
          <Link
            href="/demo"
            className="text-accent hover:text-accent/80 text-sm font-medium underline underline-offset-4"
          >
            View Project Documentation & Demo →
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Translation Interface */}
        <div className="lg:col-span-3">
          <Tabs defaultValue="single" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="single">Single Translation</TabsTrigger>
              <TabsTrigger value="batch">Batch Translation</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="single">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Languages className="h-5 w-5" />
                    Translation Interface
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Advanced Options */}
                  <div className="flex flex-wrap gap-4 p-4 bg-muted/30 rounded-lg">
                    
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="transliteration"
                        checked={transliterationMode}
                        onCheckedChange={setTransliterationMode}
                      />
                      <label htmlFor="transliteration" className="text-sm font-medium flex items-center gap-1">
                        <Globe className="h-4 w-4" />
                        Transliteration mode
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="alternatives" checked={showAlternatives} onCheckedChange={setShowAlternatives} />
                      <label htmlFor="alternatives" className="text-sm font-medium flex items-center gap-1">
                        <RefreshCw className="h-4 w-4" />
                        Show alternatives
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <label className="text-sm font-medium">Region:</label>
                      <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {languageRegions.map((region) => (
                            <SelectItem key={region} value={region}>
                              {region}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Language Selection */}
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <label className="text-sm font-medium mb-2 block">
                        From{" "}
                        {detectedLanguage && (
                          <Badge variant="secondary" className="ml-2">
                            Detected: {languages.find((l) => l.code === detectedLanguage)?.name}
                          </Badge>
                        )}
                      </label>
                      <Select value={sourceLanguage} onValueChange={setSourceLanguage} disabled={autoDetect}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="max-h-60">
                          {filteredLanguages.map((lang) => (
                            <SelectItem key={lang.code} value={lang.code}>
                              <span className="flex items-center gap-2">
                                <span>{lang.flag}</span>
                                <span>{lang.name}</span>
                                <span className="text-xs text-foreground/60">({lang.region})</span>
                              </span>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <Button variant="outline" size="icon" onClick={handleSwapLanguages} className="mt-6 bg-transparent">
                      <ArrowRightLeft className="h-4 w-4" />
                    </Button>

                    <div className="flex-1">
                      <label className="text-sm font-medium mb-2 block">To</label>
                      <Select value={targetLanguage} onValueChange={setTargetLanguage}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="max-h-60">
                          {filteredLanguages.map((lang) => (
                            <SelectItem key={lang.code} value={lang.code}>
                              <span className="flex items-center gap-2">
                                <span>{lang.flag}</span>
                                <span>{lang.name}</span>
                                <span className="text-xs text-foreground/60">({lang.region})</span>
                              </span>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Input Area */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Input Text</label>
                    <Textarea
                      placeholder={
                        transliterationMode ? "Enter text to transliterate..." : "Enter text to translate..."
                      }
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      className="min-h-[120px] resize-none"
                    />
                    <div className="flex justify-between items-center text-sm text-foreground/70">
                      <span>{inputText.length} characters</span>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleCopy(inputText)}
                          className="text-foreground/80 hover:text-foreground"
                        >
                          <Copy className="h-4 w-4 mr-1" />
                          Copy
                        </Button>
                    
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <Button
                      onClick={handleTranslate}
                      disabled={isTranslating || isDetecting || !inputText.trim()}
                      className="flex-1"
                    >
                      {isTranslating
                        ? transliterationMode
                          ? "Transliterating..."
                          : "Translating..."
                        : isDetecting
                          ? "Detecting..."
                          : transliterationMode
                            ? "Transliterate"
                            : "Translate"}
                    </Button>
                    <Button variant="outline" onClick={handleClear}>
                      Clear
                    </Button>
                  </div>

                  {/* Translation Quality Metrics */}
                  {(translationConfidence || processingTime) && (
                    <div className="p-4 bg-muted/30 rounded-lg space-y-3">
                      <h4 className="text-sm font-medium flex items-center gap-2">
                        <BarChart3 className="h-4 w-4" />
                        Translation Quality Metrics
                      </h4>
                      <div className="grid grid-cols-2 gap-4">
                        {translationConfidence && (
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Confidence Score</span>
                              <span>{Math.round(translationConfidence)}%</span>
                            </div>
                            <Progress value={translationConfidence} className="h-2" />
                          </div>
                        )}
                        {processingTime && (
                          <div>
                            <div className="flex justify-between text-sm">
                              <span>Processing Time</span>
                              <span>{processingTime}ms</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Output Area */}
                  {outputText && (
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        {transliterationMode ? "Transliteration" : "Translation"} Result
                      </label>
                      <Textarea value={outputText} readOnly className="min-h-[120px] resize-none bg-muted/50" />
                      <div className="flex justify-between items-center text-sm text-foreground/70">
                        <span>{outputText.length} characters</span>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleCopy(outputText)}
                            className="text-foreground/80 hover:text-foreground"
                          >
                            <Copy className="h-4 w-4 mr-1" />
                            Copy
                          </Button>
                          <Button variant="ghost" size="sm" className="text-foreground/80 hover:text-foreground">
                            <Volume2 className="h-4 w-4 mr-1" />
                            Listen
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Alternative Translations */}
                  {alternatives.length > 0 && (
                    <div className="space-y-2">
                      <label className="text-sm font-medium flex items-center gap-2">
                        <Star className="h-4 w-4" />
                        Alternative Translations
                      </label>
                      <div className="space-y-2">
                        {alternatives.map((alt, index) => (
                          <div key={index} className="p-3 bg-muted/30 rounded-lg text-sm">
                            <div className="flex justify-between items-center">
                              <span>{alt}</span>
                              <Button variant="ghost" size="sm" onClick={() => handleCopy(alt)}>
                                <Copy className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="batch">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Batch Translation
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* File Upload */}
                  <div className="flex gap-4">
                  
                    <Button onClick={addBatchText} variant="outline">
                      Add Text
                    </Button>
                    <Button
                      onClick={handleExportResults}
                      variant="outline"
                      disabled={batchTexts.filter((t) => t.status === "completed").length === 0}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Export Results
                    </Button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".txt"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </div>

                  {uploadedFile && (
                    <div className="p-3 bg-muted/30 rounded-lg text-sm">
                      <span className="font-medium">Uploaded: </span>
                      {uploadedFile.name} ({Math.round(uploadedFile.size / 1024)}KB)
                    </div>
                  )}

                  {/* Batch Progress */}
                  {isBatchProcessing && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Processing batch translations...</span>
                        <span>{Math.round(batchProgress)}%</span>
                      </div>
                      <Progress value={batchProgress} />
                    </div>
                  )}

                  {/* Batch Items */}
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {batchTexts.map((item) => (
                      <div key={item.id} className="p-4 border rounded-lg space-y-2">
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={
                              item.status === "completed"
                                ? "default"
                                : item.status === "processing"
                                  ? "secondary"
                                  : item.status === "error"
                                    ? "destructive"
                                    : "outline"
                            }
                          >
                            {item.status}
                          </Badge>
                          <Button variant="ghost" size="sm" onClick={() => removeBatchText(item.id)}>
                            Remove
                          </Button>
                        </div>
                        <Input
                          value={item.text}
                          onChange={(e) => updateBatchText(item.id, e.target.value)}
                          placeholder="Enter text to translate..."
                          disabled={item.status === "processing"}
                        />
                        {item.result && (
                          <div className="space-y-1">
                            <div className="text-sm font-medium">Translation:</div>
                            <div className="text-sm bg-muted/50 p-2 rounded">{item.result.translatedText}</div>
                            <div className="flex gap-4 text-xs text-muted-foreground">
                              <span>Confidence: {Math.round(item.result.confidence)}%</span>
                              <span>Time: {item.result.processingTime}ms</span>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {batchTexts.length > 0 && (
                    <Button
                      onClick={handleBatchTranslation}
                      disabled={isBatchProcessing || batchTexts.every((t) => t.text.trim() === "")}
                      className="w-full"
                    >
                      {isBatchProcessing ? "Processing..." : `Translate ${batchTexts.length} Items`}
                    </Button>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Translation Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-2xl font-bold">{translationHistory.length}</div>
                        <div className="text-sm text-muted-foreground">Total Translations</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-2xl font-bold">
                          {translationHistory.length > 0
                            ? Math.round(
                                translationHistory.reduce((acc, t) => acc + (t.confidence || 95), 0) /
                                  translationHistory.length,
                              )
                            : 0}
                          %
                        </div>
                        <div className="text-sm text-muted-foreground">Avg Confidence</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-2xl font-bold">
                          {translationHistory.length > 0
                            ? Math.round(
                                translationHistory.reduce((acc, t) => acc + (t.processingTime || 1000), 0) /
                                  translationHistory.length,
                              )
                            : 0}
                          ms
                        </div>
                        <div className="text-sm text-muted-foreground">Avg Processing Time</div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-lg font-medium">Language Usage</h4>
                    <div className="space-y-2">
                      {Object.entries(
                        translationHistory.reduce(
                          (acc, t) => {
                            const pair = `${t.from} → ${t.to}`
                            acc[pair] = (acc[pair] || 0) + 1
                            return acc
                          },
                          {} as Record<string, number>,
                        ),
                      )
                        .slice(0, 5)
                        .map(([pair, count]) => (
                          <div key={pair} className="flex justify-between items-center">
                            <span className="text-sm">{pair}</span>
                            <Badge variant="secondary">{count}</Badge>
                          </div>
                        ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Features Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Advanced Features</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <span>{languages.length}+ Language Support</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <span>Auto Language Detection</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <span>Batch Translation</span>
              </div>
             
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <span>Confidence Scoring</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <span>Alternative Translations</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <span>Performance Analytics</span>
              </div>
             
            </CardContent>
          </Card>

          {/* Translation History */}
          {translationHistory.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <History className="h-4 w-4" />
                  Recent Translations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {translationHistory.map((item, index) => (
                  <div key={index} className="p-3 bg-muted/50 rounded-lg text-sm">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">
                        {languages.find((l) => l.code === item.from)?.flag} →{" "}
                        {languages.find((l) => l.code === item.to)?.flag}
                      </span>
                      {item.isTransliteration && (
                        <Badge variant="outline" className="text-xs">
                          Transliteration
                        </Badge>
                      )}
                      <span className="text-xs text-muted-foreground">{item.timestamp.toLocaleTimeString()}</span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{item.input}</p>
                    {item.confidence && (
                      <div className="text-xs text-muted-foreground mt-1">
                        Confidence: {Math.round(item.confidence)}%
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Statistics */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-foreground/70">Languages Supported</span>
                <span className="font-medium">{languages.length}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-sm text-foreground/70">Translations Today</span>
                <span className="font-medium">{translationHistory.length}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-sm text-foreground/70">Avg Confidence</span>
                <span className="font-medium text-accent">
                  {translationHistory.length > 0
                    ? Math.round(
                        translationHistory.reduce((acc, t) => acc + (t.confidence || 95), 0) /
                          translationHistory.length,
                      )
                    : 98}
                  %
                </span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-sm text-foreground/70">Regions Covered</span>
                <span className="font-medium">{languageRegions.length - 1}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-12 pt-8 border-t border-border">
        <div className="text-center text-sm text-muted-foreground">
          <p className="mb-2">AI Translation System - Academic Project Demonstration</p>
          <p>Built with Next.js, TypeScript, and modern AI technologies for multilingual communication.</p>
          <div className="flex items-center justify-center gap-4 mt-4">
            <Link href="/demo" className="hover:text-foreground transition-colors">
              Project Documentation
            </Link>
            <Separator orientation="vertical" className="h-4" />
            <span>Language Translation Systems Course</span>
            <Separator orientation="vertical" className="h-4" />
            <span>Academic Project 2024</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
