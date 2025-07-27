import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Mic, MicOff, CheckCircle, ExternalLink } from 'lucide-react';
import { GovernmentScheme } from '@/data/schemes';
import { useToast } from '@/hooks/use-toast';

interface ApplicationFormProps {
  scheme: GovernmentScheme;
  language: string;
  onComplete: () => void;
}

interface FormData {
  fullName: string;
  age: string;
  gender: string;
  state: string;
  district: string;
  pincode: string;
  mobileNumber: string;
  email: string;
  monthlyIncome: string;
  category: string;
  aadhaarNumber: string;
  additionalInfo: string;
}

const ApplicationForm: React.FC<ApplicationFormProps> = ({ scheme, language, onComplete }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    age: '',
    gender: '',
    state: '',
    district: '',
    pincode: '',
    mobileNumber: '',
    email: '',
    monthlyIncome: '',
    category: '',
    aadhaarNumber: '',
    additionalInfo: ''
  });

  const [currentField, setCurrentField] = useState<string>('');
  const [isListening, setIsListening] = useState(false);
  const [currentTranscript, setCurrentTranscript] = useState('');
  const recognitionRef = useRef<any>(null);

  // Enhanced voice input processing with NLP
  const processVoiceInput = (text: string) => {
    const lowerText = text.toLowerCase();
    
    // Name detection
    if (lowerText.includes('my name is') || lowerText.includes('मेरा नाम') || lowerText.includes('नाम है')) {
      const nameMatch = text.match(/(?:my name is|मेरा नाम|नाम है)\s*(.+)/i);
      if (nameMatch && nameMatch[1]) {
        const extractedName = nameMatch[1].replace(/[।.|!]/g, '').trim();
        setFormData({...formData, fullName: extractedName});
        setCurrentField('');
        toast({
          title: language === 'hi' ? 'नाम सेव हो गया' : 'Name saved',
          description: `${extractedName}`,
        });
        return;
      }
    }
    
    // Age detection  
    if (lowerText.includes('years old') || lowerText.includes('साल') || lowerText.includes('उम्र') || lowerText.includes('age')) {
      const ageMatch = text.match(/(\d+)(?:\s*(?:years old|साल|year))?/i);
      if (ageMatch && ageMatch[1]) {
        setFormData({...formData, age: ageMatch[1]});
        setCurrentField('');
        toast({
          title: language === 'hi' ? 'उम्र सेव हो गई' : 'Age saved',
          description: `${ageMatch[1]} years`,
        });
        return;
      }
    }
    
    // Income detection
    if (lowerText.includes('income') || lowerText.includes('salary') || lowerText.includes('आय') || lowerText.includes('कमाई') || lowerText.includes('रुपये')) {
      const incomeMatch = text.match(/(\d+(?:,\d{3})*(?:\.\d{2})?)/);
      if (incomeMatch && incomeMatch[1]) {
        const income = incomeMatch[1].replace(/,/g, '');
        setFormData({...formData, monthlyIncome: income});
        setCurrentField('');
        toast({
          title: language === 'hi' ? 'आय सेव हो गई' : 'Income saved',
          description: `₹${income}`,
        });
        return;
      }
    }
    
    // Gender detection
    if (lowerText.includes('male') || lowerText.includes('पुरुष') || lowerText.includes('आदमी')) {
      setFormData({...formData, gender: 'male'});
      setCurrentField('');
      toast({
        title: language === 'hi' ? 'लिंग सेव हो गया' : 'Gender saved',
        description: language === 'hi' ? 'पुरुष' : 'Male',
      });
      return;
    }
    
    if (lowerText.includes('female') || lowerText.includes('महिला') || lowerText.includes('औरत')) {
      setFormData({...formData, gender: 'female'});
      setCurrentField('');
      toast({
        title: language === 'hi' ? 'लिंग सेव हो गया' : 'Gender saved',
        description: language === 'hi' ? 'महिला' : 'Female',
      });
      return;
    }
    
    // Phone number detection
    if (lowerText.includes('phone') || lowerText.includes('mobile') || lowerText.includes('फोन') || lowerText.includes('मोबाइल')) {
      const phoneMatch = text.match(/(\d{10})/);
      if (phoneMatch && phoneMatch[1]) {
        setFormData({...formData, mobileNumber: phoneMatch[1]});
        setCurrentField('');
        toast({
          title: language === 'hi' ? 'फोन नंबर सेव हो गया' : 'Phone number saved',
          description: phoneMatch[1],
        });
        return;
      }
    }
    
    // State detection (sample states)
    const states = ['uttar pradesh', 'bihar', 'rajasthan', 'maharashtra', 'gujarat', 'punjab', 'haryana', 'delhi', 'उत्तर प्रदेश', 'बिहार', 'राजस्थान'];
    const stateFound = states.find(state => lowerText.includes(state));
    if (stateFound) {
      setFormData({...formData, state: stateFound});
      setCurrentField('');
      toast({
        title: language === 'hi' ? 'राज्य सेव हो गया' : 'State saved',
        description: stateFound,
      });
      return;
    }
    
    // Generic field filling based on current field
    if (currentField) {
      setFormData({...formData, [currentField]: text.trim()});
      setCurrentField('');
      toast({
        title: language === 'hi' ? 'जानकारी सेव हो गई' : 'Information saved',
        description: text.trim(),
      });
    }
  };

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = language === 'hi' ? 'hi-IN' : 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setCurrentTranscript(transcript);
        
        if (event.results[0].isFinal) {
          processVoiceInput(transcript);
          setCurrentTranscript('');
        }
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, [language]);

  const startVoiceInput = (fieldName: string) => {
    if (recognitionRef.current) {
      setCurrentField(fieldName);
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  const stopVoiceInput = () => {
    if (recognitionRef.current) {
      setIsListening(false);
      recognitionRef.current.stop();
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    const requiredFields = ['fullName', 'age', 'gender', 'state', 'mobileNumber'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof FormData]);
    
    if (missingFields.length > 0) {
      toast({
        title: language === 'hi' ? 'अधूरी जानकारी' : 'Incomplete Information',
        description: language === 'hi' 
          ? 'कृपया सभी आवश्यक फील्ड भरें' 
          : 'Please fill all required fields',
        variant: 'destructive'
      });
      return;
    }

    // Simulate form submission
    toast({
      title: language === 'hi' ? 'आवेदन सफल' : 'Application Successful',
      description: language === 'hi' 
        ? 'आपका आवेदन सफलतापूर्वक जमा हो गया है' 
        : 'Your application has been submitted successfully'
    });

    // Navigate to success page
    setTimeout(() => {
      window.location.href = '/success';
    }, 2000);
  };

  const VoiceInputButton = ({ fieldName }: { fieldName: string }) => (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={() => isListening && currentField === fieldName ? stopVoiceInput() : startVoiceInput(fieldName)}
      className="ml-2"
    >
      {isListening && currentField === fieldName ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
    </Button>
  );

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card className="shadow-glow border-primary/20">
        <CardHeader>
          <div className="flex items-center justify-center mb-4">
            <img 
              src="/uploads/90c0340a-e404-418a-9133-c70394eddf1b.png" 
              alt="SwarSaathi Logo" 
              className="h-12 w-auto"
            />
          </div>
          <CardTitle className="flex items-center gap-2 text-center">
            <CheckCircle className="h-6 w-6 text-green-600 mx-auto" />
            {language === 'hi' ? 'आवेदन फॉर्म' : 'Application Form'}
          </CardTitle>
          <CardDescription className="text-center">
            {language === 'hi' 
              ? `${scheme.nameHindi} के लिए आवेदन`
              : `Application for ${scheme.name}`
            }
          </CardDescription>
          
          {/* Official Website Link */}
          <div className="text-center mt-4">
            <Button variant="outline" size="sm" asChild>
              <a 
                href={'https://www.india.gov.in'}
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <ExternalLink className="h-4 w-4" />
                {language === 'hi' ? 'आधिकारिक वेबसाइट' : 'Official Website'}
              </a>
            </Button>
          </div>
          
          {currentTranscript && (
            <div className="mt-4 p-3 bg-gradient-hero rounded border-l-4 border-l-primary animate-fade-in">
              <p className="text-sm font-medium">
                {language === 'hi' ? 'सुन रहा हूं...' : 'Listening...'}
              </p>
              <p className="text-sm text-muted-foreground">{currentTranscript}</p>
            </div>
          )}
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold border-b pb-2">
                {language === 'hi' ? 'व्यक्तिगत जानकारी' : 'Personal Information'}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fullName">
                    {language === 'hi' ? 'पूरा नाम' : 'Full Name'} *
                  </Label>
                  <div className="flex items-center">
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      placeholder={language === 'hi' ? 'अपना पूरा नाम लिखें' : 'Enter your full name'}
                      className="flex-1"
                    />
                    <VoiceInputButton fieldName="fullName" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="age">
                    {language === 'hi' ? 'उम्र' : 'Age'} *
                  </Label>
                  <div className="flex items-center">
                    <Input
                      id="age"
                      type="number"
                      value={formData.age}
                      onChange={(e) => handleInputChange('age', e.target.value)}
                      placeholder={language === 'hi' ? 'उम्र' : 'Age'}
                      className="flex-1"
                    />
                    <VoiceInputButton fieldName="age" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="gender">
                    {language === 'hi' ? 'लिंग' : 'Gender'} *
                  </Label>
                  <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder={language === 'hi' ? 'लिंग चुनें' : 'Select Gender'} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">{language === 'hi' ? 'पुरुष' : 'Male'}</SelectItem>
                      <SelectItem value="female">{language === 'hi' ? 'महिला' : 'Female'}</SelectItem>
                      <SelectItem value="other">{language === 'hi' ? 'अन्य' : 'Other'}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="category">
                    {language === 'hi' ? 'श्रेणी' : 'Category'}
                  </Label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder={language === 'hi' ? 'श्रेणी चुनें' : 'Select Category'} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">{language === 'hi' ? 'सामान्य' : 'General'}</SelectItem>
                      <SelectItem value="obc">{language === 'hi' ? 'अन्य पिछड़ा वर्ग' : 'OBC'}</SelectItem>
                      <SelectItem value="sc">{language === 'hi' ? 'अनुसूचित जाति' : 'SC'}</SelectItem>
                      <SelectItem value="st">{language === 'hi' ? 'अनुसूचित जनजाति' : 'ST'}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Address Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold border-b pb-2">
                {language === 'hi' ? 'पता की जानकारी' : 'Address Information'}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="state">
                    {language === 'hi' ? 'राज्य' : 'State'} *
                  </Label>
                  <div className="flex items-center">
                    <Input
                      id="state"
                      value={formData.state}
                      onChange={(e) => handleInputChange('state', e.target.value)}
                      placeholder={language === 'hi' ? 'राज्य का नाम' : 'State name'}
                      className="flex-1"
                    />
                    <VoiceInputButton fieldName="state" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="district">
                    {language === 'hi' ? 'जिला' : 'District'}
                  </Label>
                  <div className="flex items-center">
                    <Input
                      id="district"
                      value={formData.district}
                      onChange={(e) => handleInputChange('district', e.target.value)}
                      placeholder={language === 'hi' ? 'जिला का नाम' : 'District name'}
                      className="flex-1"
                    />
                    <VoiceInputButton fieldName="district" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="pincode">
                    {language === 'hi' ? 'पिन कोड' : 'Pincode'}
                  </Label>
                  <div className="flex items-center">
                    <Input
                      id="pincode"
                      value={formData.pincode}
                      onChange={(e) => handleInputChange('pincode', e.target.value)}
                      placeholder={language === 'hi' ? 'पिन कोड' : 'Pincode'}
                      className="flex-1"
                    />
                    <VoiceInputButton fieldName="pincode" />
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold border-b pb-2">
                {language === 'hi' ? 'संपर्क जानकारी' : 'Contact Information'}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="mobileNumber">
                    {language === 'hi' ? 'मोबाइल नंबर' : 'Mobile Number'} *
                  </Label>
                  <div className="flex items-center">
                    <Input
                      id="mobileNumber"
                      value={formData.mobileNumber}
                      onChange={(e) => handleInputChange('mobileNumber', e.target.value)}
                      placeholder={language === 'hi' ? 'मोबाइल नंबर' : 'Mobile number'}
                      className="flex-1"
                    />
                    <VoiceInputButton fieldName="mobileNumber" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">
                    {language === 'hi' ? 'ईमेल' : 'Email'}
                  </Label>
                  <div className="flex items-center">
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder={language === 'hi' ? 'ईमेल पता' : 'Email address'}
                      className="flex-1"
                    />
                    <VoiceInputButton fieldName="email" />
                  </div>
                </div>
              </div>
            </div>

            {/* Financial Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold border-b pb-2">
                {language === 'hi' ? 'आर्थिक जानकारी' : 'Financial Information'}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="monthlyIncome">
                    {language === 'hi' ? 'मासिक आय (₹)' : 'Monthly Income (₹)'}
                  </Label>
                  <div className="flex items-center">
                    <Input
                      id="monthlyIncome"
                      type="number"
                      value={formData.monthlyIncome}
                      onChange={(e) => handleInputChange('monthlyIncome', e.target.value)}
                      placeholder={language === 'hi' ? 'मासिक आय' : 'Monthly income'}
                      className="flex-1"
                    />
                    <VoiceInputButton fieldName="monthlyIncome" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="aadhaarNumber">
                    {language === 'hi' ? 'आधार संख्या' : 'Aadhaar Number'}
                  </Label>
                  <div className="flex items-center">
                    <Input
                      id="aadhaarNumber"
                      value={formData.aadhaarNumber}
                      onChange={(e) => handleInputChange('aadhaarNumber', e.target.value)}
                      placeholder={language === 'hi' ? 'आधार संख्या' : 'Aadhaar number'}
                      className="flex-1"
                    />
                    <VoiceInputButton fieldName="aadhaarNumber" />
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div>
              <Label htmlFor="additionalInfo">
                {language === 'hi' ? 'अतिरिक्त जानकारी' : 'Additional Information'}
              </Label>
              <div className="flex items-start">
                <Textarea
                  id="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={(e) => handleInputChange('additionalInfo', e.target.value)}
                  placeholder={language === 'hi' 
                    ? 'कोई अतिरिक्त जानकारी या विशेष परिस्थितियां' 
                    : 'Any additional information or special circumstances'
                  }
                  className="flex-1"
                  rows={3}
                />
                <VoiceInputButton fieldName="additionalInfo" />
              </div>
            </div>

            {/* Voice Input Status */}
            {isListening && (
              <div className="text-center">
                <Badge variant="default" className="animate-pulse bg-green-500">
                  {language === 'hi' ? '🎤 सुन रहा हूं...' : '🎤 Listening...'}
                </Badge>
              </div>
            )}

            {/* Voice Instructions */}
            <Card className="p-4 bg-gradient-hero">
              <h4 className="font-medium mb-2">
                {language === 'hi' ? 'आवाज़ से भरने के लिए:' : 'For voice input:'}
              </h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>{language === 'hi' ? '• "मेरा नाम रवि कुमार है"' : '• "My name is Ravi Kumar"'}</li>
                <li>{language === 'hi' ? '• "मैं 30 साल का हूं"' : '• "I am 30 years old"'}</li>
                <li>{language === 'hi' ? '• "मेरी मासिक आय 25000 रुपये है"' : '• "My monthly income is 25000 rupees"'}</li>
              </ul>
            </Card>

            {/* Submit Button */}
            <div className="pt-6">
              <Button 
                type="submit" 
                variant="hero" 
                size="lg" 
                className="w-full"
              >
                {language === 'hi' ? 'आवेदन जमा करें' : 'Submit Application'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApplicationForm;
