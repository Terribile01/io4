import React, { useState, useEffect, useRef } from "react";
import {
  MessageSquare, X, Send, Mic, MicOff, Sparkles,
  User, Bot, ArrowRight, Loader2, Play
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Message {
  role: "user" | "bot";
  content: string;
}

const PRESET_OPTIONS = [
  "Voglio un sito nuovo da zero",
  "Ho un sito ma non mi aiuta nella vendita",
  "Ho bisogno di una strategia di Lead Generation",
  "Voglio gestire Campagne ADS (Meta & Google)",
  "Cerco un sito in Codice Custom (React)",
  "Ho bisogno di consulenza SEO"
];

export default function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", content: "Ciao! Sono l'assistente virtuale di Maria Teresa Rogani. Come posso aiutarti oggi a far crescere la tua attività?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Speech Recognition setup
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && ("SpeechRecognition" in window || "webkitSpeechRecognition" in window)) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = "it-IT";

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsRecording(false);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error("Speech recognition error", event.error);
        setIsRecording(false);
      };

      recognitionRef.current.onend = () => {
        setIsRecording(false);
      };
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const toggleRecording = () => {
    if (isRecording) {
      recognitionRef.current?.stop();
    } else {
      setInput("");
      recognitionRef.current?.start();
      setIsRecording(true);
    }
  };

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = { role: "user", content: text };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history: messages })
      });

      if (!response.ok) throw new Error("Errore nella risposta del server");

      const data = await response.json();
      const botMessage: Message = { role: "bot", content: data.text };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: "bot", content: "Scusa, si è verificato un errore tecnico. Riprova più tardi." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-[100] w-14 h-14 rounded-full grad-electric text-white shadow-2xl flex items-center justify-center cursor-pointer transition-transform hover:scale-110 active:scale-95 ${isOpen ? 'opacity-0 scale-0 pointer-events-none' : 'opacity-100'}`}
      >
        <MessageSquare className="w-6 h-6" />
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-orange opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-accent-orange"></span>
        </span>
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20, transformOrigin: "bottom right" }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-6 right-6 z-[110] w-[90vw] sm:w-[400px] h-[600px] max-h-[80vh] flex flex-col bg-accent-purple/10 backdrop-blur-2xl rounded-none border border-white/20 shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between bg-white/5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-none bg-accent-purple/20 flex items-center justify-center border border-accent-purple/30">
                  <Sparkles className="w-4 h-4 text-accent-orange" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-white">Consulente Virtuale</h4>
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                    <span className="text-[10px] text-white/50 font-mono">Facilissimo Web</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/40 hover:text-white p-1 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-white/10">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 rounded-none text-xs leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-accent-purple/20 border border-white/10 text-white'
                      : 'bg-white/5 border border-white/10 text-white/90'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-none">
                    <Loader2 className="w-4 h-4 text-accent-blue animate-spin" />
                  </div>
                </div>
              )}

              {/* Preset Options (Only show at the beginning or after bot messages if appropriate) */}
              {messages.length === 1 && (
                <div className="grid grid-cols-1 gap-2 pt-2">
                  <p className="text-[10px] uppercase tracking-widest text-white/30 font-bold mb-1">Seleziona un'opzione:</p>
                  {PRESET_OPTIONS.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => handleSend(opt)}
                      className="text-left p-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] text-white/80 transition-all hover:translate-x-1 flex items-center justify-between group cursor-pointer"
                    >
                      {opt}
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-accent-orange" />
                    </button>
                  ))}
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-white/10 bg-white/5">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend(input);
                }}
                className="flex items-center gap-2"
              >
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Scrivi un messaggio..."
                    className="w-full bg-white/5 border border-white/10 rounded-none px-3 py-2 text-xs text-white focus:outline-none focus:border-accent-purple/50 pr-10"
                  />
                  <button
                    type="button"
                    onClick={toggleRecording}
                    className={`absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full transition-colors cursor-pointer ${isRecording ? 'text-accent-pink animate-pulse' : 'text-white/40 hover:text-white'}`}
                    title={isRecording ? "Ferma registrazione" : "Inizia registrazione vocale"}
                  >
                    {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  </button>
                </div>
                <button
                  type="submit"
                  disabled={!input.trim() || loading}
                  className="p-2.5 grad-electric text-white rounded-none disabled:opacity-50 disabled:grayscale cursor-pointer transition-transform active:scale-95"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
              <p className="text-[8px] text-center text-white/20 mt-2 uppercase tracking-tighter">
                Powered by Maria Teresa Rogani AI Specialist
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
