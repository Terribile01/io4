import React, { useState, useRef, useEffect, useCallback } from 'react';
import { MessageSquare, X, Send, Mic, MicOff, Loader2, Sparkles, ArrowRight, MessageCircle, Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const QUICK_ACTIONS = [
  "Come funziona?",
  "Quali servizi offri?",
  "Vorrei un consiglio",
  "Parlami del form AI"
];

const ROI_ACTION = "Analizziamo il mio ROI";

export const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Ciao! Sono Teresa di Facilissimo Web. Sono qui per aiutarti a far crescere il tuo business online. Come posso esserti utile oggi?" }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speakingIndex, setSpeakingIndex] = useState<number | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis | null>(window.speechSynthesis);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    const updateVoices = () => {
      if (synthRef.current) {
        setVoices(synthRef.current.getVoices());
      }
    };

    updateVoices();
    if (synthRef.current) {
      synthRef.current.onvoiceschanged = updateVoices;
    }
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  // Auto-open after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Setup Speech Recognition
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'it-IT';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputValue(prev => prev + (prev ? ' ' : '') + transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      if (recognitionRef.current) {
        recognitionRef.current.start();
        setIsListening(true);
      } else {
        alert("Il riconoscimento vocale non è supportato dal tuo browser.");
      }
    }
  };

  const stopSpeaking = useCallback(() => {
    if (synthRef.current) {
      synthRef.current.cancel();
    }
    setSpeakingIndex(null);
  }, []);

  const speak = useCallback((text: string, index: number) => {
    if (!synthRef.current) return;

    if (speakingIndex === index) {
      stopSpeaking();
      return;
    }

    stopSpeaking();

    // Clean markdown for better speech
    const cleanText = text
      .replace(/[*#_]/g, '')
      .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1')
      .replace(/<[^>]*>/g, '');

    const utterance = new SpeechSynthesisUtterance(cleanText);

    // Priority voice selection: look for Neural/Natural/Google voices first as they sound more human
    const itVoices = voices.filter(v => v.lang.startsWith('it'));

    const femaleItalianVoice = itVoices.find(v =>
      (v.name.toLowerCase().includes('neural') || v.name.toLowerCase().includes('natural')) &&
      (v.name.toLowerCase().includes('elsa') || v.name.toLowerCase().includes('alice') || v.name.toLowerCase().includes('paola'))
    ) || itVoices.find(v =>
      (v.name.toLowerCase().includes('google') || v.name.toLowerCase().includes('natural') || v.name.toLowerCase().includes('neural')) &&
      (v.name.toLowerCase().includes('female') || v.name.toLowerCase().includes('elsa') || v.name.toLowerCase().includes('cosimo') === false)
    ) || itVoices.find(v =>
      v.name.toLowerCase().includes('female') || v.name.toLowerCase().includes('elsa') || v.name.toLowerCase().includes('alice')
    ) || itVoices[0];

    if (femaleItalianVoice) {
      utterance.voice = femaleItalianVoice;
    }

    utterance.lang = 'it-IT';
    utterance.rate = 1.25;
    utterance.pitch = 1.1; // Slightly higher pitch for enthusiasm and confidence

    utterance.onend = () => setSpeakingIndex(null);
    utterance.onerror = () => setSpeakingIndex(null);

    setSpeakingIndex(index);
    synthRef.current.speak(utterance);
  }, [speakingIndex, stopSpeaking]);

  const handleSend = useCallback(async (content: string) => {
    if (!content.trim() || isLoading) return;

    const newMessages: Message[] = [...messages, { role: 'user', content }];
    setMessages(newMessages);
    setInputValue('');
    setIsLoading(true);

    try {
      // Retrieve ROI data from sessionStorage if available
      let roiContext = null;
      try {
        const storedData = sessionStorage.getItem("fw_roi_data");
        if (storedData) {
          roiContext = JSON.parse(storedData);
        }
      } catch (e) {
        console.error("Error parsing ROI data from session:", e);
      }

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages,
          context: {
            roiData: roiContext
          }
        }),
      });

      if (!response.ok) throw new Error('Errore nella risposta del server');

      const data = await response.json();
      let reply = data.reply;

      // Logic to add WhatsApp CTA after 4 user messages if not already present
      const userMessageCount = newMessages.filter(m => m.role === 'user').length;
      if (userMessageCount >= 4 && !reply.includes("WhatsApp") && !reply.includes("+39")) {
        reply += "\n\nSe vuoi approfondire questi temi in modo più diretto, possiamo sentirci su **WhatsApp** per una consulenza rapida!";
      }

      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "Scusami, ho avuto un piccolo problema tecnico nel collegarmi all'AI. Puoi scrivermi direttamente su WhatsApp per una risposta immediata, sono qui per aiutarti!"
      }]);
    } finally {
      setIsLoading(false);
    }
  }, [messages, isLoading]);

  return (
    <div className="fixed bottom-6 right-6 z-[500] pointer-events-auto">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 md:absolute md:inset-auto md:bottom-20 md:right-0 w-full h-full md:w-[400px] md:h-[550px] glass-purple-50 md:rounded-2xl shadow-2xl border-0 md:border md:border-white/10 flex flex-col overflow-hidden z-[1000]"
            style={{ height: '100dvh' }}
          >
            {/* Header */}
            <div className="p-4 bg-white/5 border-b border-white/10 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-accent-blue/20 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-accent-blue" />
                </div>
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-tight">Teresa | Facilissimo Web</h4>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[10px] text-white/60 uppercase font-bold tracking-widest">Online</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth"
            >
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed relative group/msg ${
                    msg.role === 'user'
                      ? 'bg-accent-blue text-white rounded-tr-none'
                      : 'bg-white/10 text-white/90 rounded-tl-none border border-white/5'
                  }`}>
                    {msg.role === 'assistant' ? (
                      <div className="prose prose-invert prose-p:leading-relaxed prose-p:my-1 prose-headings:my-2 prose-headings:text-sm prose-ul:my-2 prose-li:my-0.5 max-w-none relative">
                        <div className="flex justify-between items-start gap-2">
                          <div className="flex-1">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                              {msg.content}
                            </ReactMarkdown>
                          </div>
                          <button
                            onClick={() => speak(msg.content, i)}
                              className={`p-2 rounded-full transition-all shrink-0 shadow-lg border border-white/10 ${
                              speakingIndex === i
                                  ? 'bg-accent-blue text-white animate-pulse'
                                  : 'bg-white/10 text-white/70 hover:text-white hover:bg-white/20'
                            }`}
                            title={speakingIndex === i ? "Interrompi lettura" : "Ascolta risposta"}
                          >
                              {speakingIndex === i ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                          </button>
                        </div>
                        {msg.content.includes("WhatsApp") && (
                          <a
                            href="https://wa.me/393793603321"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-3 flex items-center justify-center gap-2 py-2 px-4 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-xl font-bold uppercase text-[10px] tracking-widest transition-all no-underline"
                          >
                            <MessageCircle className="w-4 h-4" /> Scrivi su WhatsApp
                          </a>
                        )}
                      </div>
                    ) : (
                      msg.content
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/10 p-3 rounded-2xl rounded-tl-none border border-white/5">
                    <Loader2 className="w-4 h-4 animate-spin text-accent-blue" />
                  </div>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            {messages.length === 1 && (
              <div className="px-4 pb-2 flex flex-wrap gap-2">
                {QUICK_ACTIONS.map(action => (
                  <button
                    key={action}
                    onClick={() => handleSend(action)}
                    className="text-[10px] uppercase font-bold tracking-wider px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all"
                  >
                    {action}
                  </button>
                ))}
                {sessionStorage.getItem("fw_roi_data") && (
                  <button
                    onClick={() => handleSend(ROI_ACTION)}
                    className="text-[10px] uppercase font-bold tracking-wider px-3 py-1.5 bg-accent-orange/10 hover:bg-accent-orange/20 border border-accent-orange/20 rounded-full text-accent-orange transition-all flex items-center gap-1"
                  >
                    <Sparkles className="w-3 h-3" /> {ROI_ACTION}
                  </button>
                )}
              </div>
            )}

            {/* Input */}
            <div className="p-4 bg-white/5 border-t border-white/10 space-y-3">
              <div className="relative flex items-center gap-2">
                <button
                  onClick={toggleListening}
                  className={`p-2 rounded-full transition-all shadow-lg border border-white/10 ${
                    isListening
                      ? 'bg-red-500 text-white animate-pulse'
                      : 'bg-white/10 text-white/70 hover:text-white hover:bg-white/20'
                  }`}
                  title={isListening ? "Ferma ascolto" : "Parla con Teresa"}
                >
                  {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                </button>
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend(inputValue)}
                    placeholder={isListening ? "Sto ascoltando..." : "Chiedimi qualcosa..."}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-accent-blue transition-colors pr-10"
                  />
                  <button
                    onClick={() => handleSend(inputValue)}
                    disabled={!inputValue.trim() || isLoading}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-accent-blue disabled:text-white/20 transition-colors"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <button
                onClick={() => {
                  setIsOpen(false);
                  window.location.hash = "#ai-planner";
                }}
                className="w-full py-2 bg-accent-orange/10 hover:bg-accent-orange/20 border border-accent-orange/20 rounded-xl flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest text-accent-orange transition-all"
              >
                Configura Strategia AI <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        aria-label="Open chat"
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-accent-blue rounded-full shadow-2xl flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-all group relative"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              className="relative"
            >
              <MessageSquare className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-accent-orange rounded-full border-2 border-[#0A0015] animate-ping" />
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
};
