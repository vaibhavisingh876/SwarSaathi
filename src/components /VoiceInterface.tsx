import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import { searchSchemes, getEligibleSchemes } from '@/data/schemes';

interface VoiceInterfaceProps {
  language: string;
  onLanguageChange: (lang: string) => void;
}

interface ChatMessage {
  type: 'user' | 'assistant';
  text: string;
  timestamp: Date;
  intent?: string;
}

const VoiceInterface: React.FC<VoiceInterfaceProps> = ({ language, onLanguageChange }) => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      type: 'assistant',
      text: language === 'hi' 
        ? 'नमस्ते! मैं स्वरसाथी हूं। मैं आपको सरकारी योजनाओं के बारे में जानकारी देने में मदद कर सकता हूं। आप अपना सवाल पूछ सकते हैं।'
        : 'Hello! I am SwarSaathi. I can help you learn about government schemes. Please ask your question.',
      timestamp: new Date()
    }
  ]);
  const [currentTranscript, setCurrentTranscript] = useState('');
  const recognitionRef = useRef<any>(null);
  const synthesisRef = useRef<SpeechSynthesis | null>(null);
  const conversationContext = useRef<string>('');

  // Enhanced conversation processing
  const processUserQuery = async (transcript: string) => {
    const userMessage: ChatMessage = {
      type: 'user',
      text: transcript,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);

    // Build conversation context
    conversationContext.current += `User: ${transcript}\n`;

    let response = '';
    let intent = 'general';
    
    // Enhanced intent detection with context awareness
    const lowerTranscript = transcript.toLowerCase();
    
    // Scheme inquiry with detailed context
    if (lowerTranscript.includes('योजना') || lowerTranscript.includes('scheme') || 
        lowerTranscript.includes('सरकारी') || lowerTranscript.includes('government')) {
      intent = 'scheme_inquiry';
      
      if (lowerTranscript.includes('किसान') || lowerTranscript.includes('farmer')) {
        response = language === 'hi' 
          ? 'किसानों के लिए मुख्य योजनाएं हैं: PM किसान सम्मान निधि - ₹6000 सालाना, फसल बीमा योजना, और KCC कार्ड। आपकी कितनी जमीन है?'
          : 'Main schemes for farmers are: PM Kisan Samman Nidhi - ₹6000 annually, Crop Insurance, and KCC Card. How much land do you own?';
      } else if (lowerTranscript.includes('महिला') || lowerTranscript.includes('women') || lowerTranscript.includes('woman')) {
        response = language === 'hi' 
          ? 'महिलाओं के लिए योजनाएं: बेटी बचाओ बेटी पढ़ाओ, प्रधानमंत्री मातृ वंदना योजना, और महिला उद्यमिता योजना। आपकी उम्र क्या है?'
          : 'Women schemes: Beti Bachao Beti Padhao, PM Matru Vandana Yojana, and Women Entrepreneurship Scheme. What is your age?';
      } else if (lowerTranscript.includes('आवास') || lowerTranscript.includes('housing') || lowerTranscript.includes('घर')) {
        response = language === 'hi' 
          ? 'आवास योजनाएं: PM आवास योजना (शहरी/ग्रामीण), अपना घर योजना। क्या आपके पास पहले से घर है?'
          : 'Housing schemes: PM Awas Yojana (Urban/Rural), Apna Ghar Yojana. Do you already own a house?';
      } else {
        response = language === 'hi' 
          ? 'सरकारी योजनाओं की जानकारी के लिए मैं आपकी मदद कर सकता हूं। आप किस क्षेत्र में काम करते हैं - किसान, मजदूर, व्यापारी या छात्र?'
          : 'I can help you with government scheme information. What field do you work in - farmer, laborer, business, or student?';
      }
    }
    // Application help with follow-up
    else if (lowerTranscript.includes('कैसे') || lowerTranscript.includes('how') || 
             lowerTranscript.includes('apply') || lowerTranscript.includes('आवेदन')) {
      intent = 'application_help';
      response = language === 'hi' 
        ? 'आवेदन के लिए आपको ये दस्तावेज चाहिए: आधार कार्ड, बैंक पासबुक, आय प्रमाण पत्र। क्या आपके पास ये सब हैं?'
        : 'For application you need: Aadhaar Card, Bank Passbook, Income Certificate. Do you have all these documents?';
    }
    // Income-based recommendations
    else if (lowerTranscript.includes('आय') || lowerTranscript.includes('income') || 
             lowerTranscript.includes('salary') || lowerTranscript.includes('कमाई')) {
      intent = 'eligibility_check';
      response = language === 'hi' 
        ? 'आपकी मासिक आय के आधार पर अलग योजनाएं हैं। ₹50,000 से कम आय वालों के लिए विशेष योजनाएं हैं। आपकी मासिक आय कितनी है?'
        : 'Different schemes are available based on your monthly income. Special schemes for those earning less than ₹50,000. What is your monthly income?';
    }
    // Age-based recommendations
    else if (lowerTranscript.includes('उम्र') || lowerTranscript.includes('age') || 
             lowerTranscript.includes('साल') || lowerTranscript.includes('year')) {
      intent = 'eligibility_check';
      response = language === 'hi' 
        ? 'अलग उम्र के लिए अलग योजनाएं हैं। युवाओं के लिए रोजगार योजनाएं, बुजुर्गों के लिए पेंशन योजनाएं हैं। आप कितने साल के हैं?'
        : 'Different age groups have different schemes. Employment schemes for youth, pension schemes for elderly. How old are you?';
    }
    // Contextual responses based on previous conversation
    else if (conversationContext.current.includes('income') || conversationContext.current.includes('आय')) {
      if (lowerTranscript.match(/\d+/)) {
        const income = lowerTranscript.match(/\d+/)?.[0];
        response = language === 'hi' 
          ? `₹${income} मासिक आय के लिए आप PM आवास योजना, मुद्रा लोन, और स्वास्थ्य बीमा के लिए eligible हैं। कौन सी योजना में interest है?`
          : `For ₹${income} monthly income, you're eligible for PM Awas Yojana, Mudra Loan, and Health Insurance. Which scheme interests you?`;
      } else {
        response = language === 'hi' ? 'कृपया अपनी मासिक आय बताएं।' : 'Please tell me your monthly income.';
      }
    }
    // Age context handling
    else if (conversationContext.current.includes('age') || conversationContext.current.includes('उम्र')) {
      if (lowerTranscript.match(/\d+/)) {
        const age = lowerTranscript.match(/\d+/)?.[0];
        const ageNum = parseInt(age);
        if (ageNum < 35) {
          response = language === 'hi' 
            ? `${age} साल की उम्र के लिए स्किल डेवलपमेंट, स्टार्टअप लोन, और रोजगार की योजनाएं हैं। कौन सा क्षेत्र पसंद है?`
            : `For age ${age}, there are skill development, startup loans, and employment schemes. Which field do you prefer?`;
        } else {
          response = language === 'hi' 
            ? `${age} साल की उम्र के लिए बिजनेस लोन, आवास योजना, और स्वास्थ्य बीमा की योजनाएं हैं। क्या जानना चाहते हैं?`
            : `For age ${age}, there are business loans, housing schemes, and health insurance. What would you like to know?`;
        }
      }
    }
    // Greeting responses
    else if (lowerTranscript.includes('नमस्ते') || lowerTranscript.includes('hello') || 
             lowerTranscript.includes('hi') || lowerTranscript.includes('हैलो')) {
      response = language === 'hi' 
        ? 'नमस्ते! मैं SwarSaathi हूं। मैं आपको सरकारी योजनाओं की जानकारी दे सकता हूं। आप क्या जानना चाहते हैं?'
        : 'Hello! I am SwarSaathi. I can help you with government scheme information. What would you like to know?';
    }
    // Thank you responses
    else if (lowerTranscript.includes('धन्यवाद') || lowerTranscript.includes('thank')) {
      response = language === 'hi' 
        ? 'आपका स्वागत है! क्या और कोई योजना के बारे में जानना चाहते हैं?'
        : 'You\'re welcome! Would you like to know about any other schemes?';
    }
    // Default encouraging response
    else {
      response = language === 'hi' 
        ? 'मैं समझ गया। क्या आप और कुछ जानना चाहते हैं? आप योजनाओं, पात्रता, या आवेदन प्रक्रिया के बारे में पूछ सकते हैं।'
        : 'I understand. Would you like to know more? You can ask about schemes, eligibility, or application process.';
    }

    conversationContext.current += `Assistant: ${response}\n`;
    
    const assistantMessage: ChatMessage = {
      type: 'assistant',
      text: response,
      timestamp: new Date(),
      intent
    };
    setMessages(prev => [...prev, assistantMessage]);

    // Speak response and continue listening
    speak(response);
  };

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = language === 'hi' ? 'hi-IN' : 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        setCurrentTranscript(transcript);
        
        if (event.results[event.results.length - 1].isFinal) {
          processUserQuery(transcript);
          setCurrentTranscript('');
        }
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        // Auto-restart on error for continuous conversation
        setTimeout(() => {
          if (!isSpeaking && !isListening) {
            startListening();
          }
        }, 1500);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
        // Auto-restart for continuous conversation
        setTimeout(() => {
          if (!isSpeaking) {
            startListening();
          }
        }, 1000);
      };
    }

    synthesisRef.current = window.speechSynthesis;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [language]);

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      setIsListening(false);
      recognitionRef.current.stop();
    }
  };

  const speak = (text: string) => {
    if (synthesisRef.current) {
      synthesisRef.current.cancel();
      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === 'hi' ? 'hi-IN' : 'en-US';
      utterance.rate = 0.9;
      utterance.pitch = 1.1;
      
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => {
        setIsSpeaking(false);
        // Continue listening after speaking for continuous conversation
        setTimeout(() => {
          if (!isListening) {
            startListening();
          }
        }, 1000);
      };
      
      synthesisRef.current.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    if (synthesisRef.current) {
      synthesisRef.current.cancel();
      setIsSpeaking(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <img 
          src="/uploads/90c0340a-e404-418a-9133-c70394eddf1b.png" 
          alt="SwarSaathi Logo" 
          className="h-16 w-auto mx-auto mb-4"
        />
        <h2 className="text-3xl font-bold bg-gradient-saffron bg-clip-text text-transparent mb-2">
          {language === 'hi' ? 'स्वरसाथी वॉयस असिस्टेंट' : 'SwarSaathi Voice Assistant'}
        </h2>
        <p className="text-lg text-muted-foreground mb-2 font-medium">
          Sarkari kaam ab baato se aasaan
        </p>
        <p className="text-muted-foreground">
          {language === 'hi' 
            ? 'अपनी आवाज़ से सरकारी योजनाओं के बारे में पूछें'
            : 'Ask about government schemes using your voice'
          }
        </p>
      </div>

      {/* Language Selector */}
      <div className="flex justify-center gap-2 mb-6">
        {[
          { code: 'hi', name: 'हिंदी' },
          { code: 'en', name: 'English' },
          { code: 'gu', name: 'ગુજરાતી' },
          { code: 'te', name: 'తెలుగు' },
          { code: 'ta', name: 'தமிழ்' },
          { code: 'bn', name: 'বাংলা' }
        ].map((lang) => (
          <Button
            key={lang.code}
            variant={language === lang.code ? 'saffron' : 'outline'}
            size="sm"
            onClick={() => onLanguageChange(lang.code)}
          >
            {lang.name}
          </Button>
        ))}
      </div>

      {/* Voice Controls */}
      <div className="flex justify-center gap-4 mb-8">
        <Button
          variant="voice"
          size="lg"
          onClick={isListening ? stopListening : startListening}
          className="h-16 w-16 rounded-full animate-pulse-glow"
        >
          {isListening ? <MicOff className="h-8 w-8" /> : <Mic className="h-8 w-8" />}
        </Button>
        
        <Button
          variant={isSpeaking ? 'destructive' : 'secondary'}
          size="lg"
          onClick={stopSpeaking}
          className="h-16 w-16 rounded-full"
        >
          {isSpeaking ? <VolumeX className="h-8 w-8" /> : <Volume2 className="h-8 w-8" />}
        </Button>
      </div>

      {/* Current Transcript */}
      {currentTranscript && (
        <Card className="p-4 mb-6 border-primary/20 bg-gradient-hero animate-fade-in">
          <p className="text-center text-muted-foreground">
            {language === 'hi' ? 'सुन रहा हूं...' : 'Listening...'}
          </p>
          <p className="text-center font-medium">{currentTranscript}</p>
        </Card>
      )}

      {/* Chat Messages */}
      <div className="space-y-4 max-h-96 overflow-y-auto mb-6">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
          >
            <Card className={`max-w-xs p-4 ${
              message.type === 'user' 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-card border-primary/20'
            }`}>
              {message.intent && (
                <Badge variant="secondary" className="mb-2 text-xs">
                  {message.intent.replace('_', ' ')}
                </Badge>
              )}
              <p className="text-sm">{message.text}</p>
              <p className="text-xs opacity-70 mt-2">
                {message.timestamp.toLocaleTimeString()}
              </p>
            </Card>
          </div>
        ))}
      </div>

      {/* Status Indicators */}
      <div className="flex justify-center gap-4 mb-6">
        {isListening && (
          <Badge variant="default" className="animate-pulse bg-green-500">
            {language === 'hi' ? '🎤 सुन रहा हूं' : '🎤 Listening'}
          </Badge>
        )}
        {isSpeaking && (
          <Badge variant="default" className="animate-pulse bg-blue-500">
            {language === 'hi' ? '🗣️ बोल रहा हूं' : '🗣️ Speaking'}
          </Badge>
        )}
      </div>

      {/* Instructions */}
      <Card className="p-6 bg-gradient-hero">
        <h3 className="font-semibold mb-3">
          {language === 'hi' ? 'कैसे उपयोग करें:' : 'How to use:'}
        </h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>
            {language === 'hi' 
              ? '🎤 माइक बटन दबाकर बोलना शुरू करें (स्वतः जारी रहेगा)'
              : '🎤 Press the mic button to start speaking (continues automatically)'
            }
          </li>
          <li>
            {language === 'hi' 
              ? '💬 सरकारी योजनाओं के बारे में प्रश्न पूछें'
              : '💬 Ask questions about government schemes'
            }
          </li>
          <li>
            {language === 'hi' 
              ? '🔄 आप कई सवाल पूछ सकते हैं - बातचीत जारी रहेगी'
              : '🔄 Ask multiple questions - conversation continues'
            }
          </li>
          <li>
            {language === 'hi' 
              ? '✋ स्पीकर बटन दबाकर आवाज़ बंद करें'
              : '✋ Press speaker button to stop voice'
            }
          </li>
        </ul>
      </Card>
    </div>
  );
};

export default VoiceInterface;
