import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Mic, Search, FileText, Globe, Users, Heart, Zap } from 'lucide-react';
import Layout from '@/components/Layout';
import VoiceInterface from '@/components/VoiceInterface';
import SchemesFinder from '@/components/SchemesFinder';
import ApplicationForm from '@/components/ApplicationForm';
import SuccessPage from '@/pages/SuccessPage';
import { getAllSchemes } from '@/data/schemes';
import heroImage from '@/assets/hero-image.jpg';

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [language, setLanguage] = useState('en');
  const [selectedScheme, setSelectedScheme] = useState(null);
  const [showSuccessPage, setShowSuccessPage] = useState(false);

  const schemes = getAllSchemes();
  const featuredSchemes = schemes.slice(0, 6);

  const handleSchemeSelect = (scheme: any) => {
    setSelectedScheme(scheme);
    setActiveTab('apply');
  };

  const handleApplicationComplete = () => {
    setShowSuccessPage(true);
  };

  const handleGoHome = () => {
    setActiveTab('home');
    setSelectedScheme(null);
    setShowSuccessPage(false);
  };

  const HomeContent = () => (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="text-center py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col items-center space-y-4 mb-8">
            <img 
              src="/uploads/90c0340a-e404-418a-9133-c70394eddf1b.png" 
              alt="SwarSaathi Logo" 
              className="h-20 w-auto mb-4"
            />
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-tricolor bg-clip-text text-transparent">
              {language === 'hi' ? 'स्वरसाथी' : 'SwarSaathi'}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-2 font-semibold">
              Sarkari kaam ab baato se aasaan
            </p>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              {language === 'hi' 
                ? 'अपनी भाषा में बोलें, सरकारी योजनाओं की जानकारी पाएं, और आसानी से आवेदन करें। हमारा AI असिस्टेंट आपकी मदद के लिए हमेशा तैयार है।'
                : 'Speak in your language, discover government schemes, and apply with ease. Our AI assistant is always ready to help you.'
              }
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button 
              variant="hero" 
              size="lg" 
              onClick={() => setActiveTab('voice')}
              className="flex items-center gap-2"
            >
              <Mic className="h-6 w-6" />
              {language === 'hi' ? 'वॉयस असिस्टेंट शुरू करें' : 'Start Voice Assistant'}
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              onClick={() => setActiveTab('schemes')}
              className="flex items-center gap-2"
            >
              <Search className="h-5 w-5" />
              {language === 'hi' ? 'योजनाएं खोजें' : 'Browse Schemes'}
            </Button>
          </div>

          {/* Language Selector */}
          <div className="flex justify-center gap-2 mb-8">
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
                onClick={() => setLanguage(lang.code)}
              >
                {lang.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Hero Image */}
        <div className="max-w-4xl mx-auto mt-12">
          <img 
            src={heroImage} 
            alt="SwarSaathi - Government Schemes Assistant"
            className="w-full h-64 md:h-96 object-cover rounded-2xl shadow-glow"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">
            {language === 'hi' ? 'मुख्य विशेषताएं' : 'Key Features'}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {language === 'hi' 
              ? 'स्वरसाथी आपको सरकारी योजनाओं तक पहुंचने में हर तरह से मदद करता है'
              : 'SwarSaathi helps you access government schemes in every possible way'
            }
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="text-center hover:shadow-glow transition-all duration-300">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-saffron rounded-full flex items-center justify-center mx-auto mb-4">
                <Mic className="h-6 w-6 text-white" />
              </div>
              <CardTitle>
                {language === 'hi' ? 'आवाज़ की पहचान' : 'Voice Recognition'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {language === 'hi' 
                  ? 'अपनी भाषा में बोलें और तुरंत उत्तर पाएं। हिंदी, अंग्रेजी और अन्य क्षेत्रीय भाषाओं में उपलब्ध।'
                  : 'Speak in your language and get instant responses. Available in Hindi, English, and other regional languages.'
                }
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-glow transition-all duration-300">
            <CardHeader>
              <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-6 w-6 text-secondary-foreground" />
              </div>
              <CardTitle>
                {language === 'hi' ? 'तुरंत सुझाव' : 'Instant Recommendations'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {language === 'hi' 
                  ? 'AI आपकी जानकारी के आधार पर सबसे उपयुक्त योजनाओं का सुझाव देता है।'
                  : 'AI suggests the most suitable schemes based on your information and eligibility.'
                }
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-glow transition-all duration-300">
            <CardHeader>
              <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="h-6 w-6 text-accent-foreground" />
              </div>
              <CardTitle>
                {language === 'hi' ? 'आसान आवेदन' : 'Easy Application'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {language === 'hi' 
                  ? 'आवाज़ से फॉर्म भरें और सीधे सरकारी पोर्टल पर आवेदन करें।'
                  : 'Fill forms with voice input and apply directly through government portals.'
                }
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-glow transition-all duration-300">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-saffron rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="h-6 w-6 text-white" />
              </div>
              <CardTitle>
                {language === 'hi' ? 'बहुभाषी सपोर्ट' : 'Multilingual Support'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {language === 'hi' 
                  ? '10+ भारतीय भाषाओं में उपलब्ध। अपनी मातृभाषा में बात करें।'
                  : 'Available in 10+ Indian languages. Communicate in your mother tongue.'
                }
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-glow transition-all duration-300">
            <CardHeader>
              <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-secondary-foreground" />
              </div>
              <CardTitle>
                {language === 'hi' ? 'व्यक्तिगत सहायता' : 'Personalized Help'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {language === 'hi' 
                  ? 'आपकी उम्र, आय, और स्थान के आधार पर सबसे उपयुक्त योजनाएं।'
                  : 'Most suitable schemes based on your age, income, and location.'
                }
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-glow transition-all duration-300">
            <CardHeader>
              <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-6 w-6 text-accent-foreground" />
              </div>
              <CardTitle>
                {language === 'hi' ? 'निशुल्क सेवा' : 'Completely Free'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {language === 'hi' 
                  ? 'सभी सेवाएं बिल्कुल मुफ्त। किसी भी प्रकार का शुल्क नहीं।'
                  : 'All services are completely free. No charges or hidden fees.'
                }
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Featured Schemes */}
      <section className="py-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">
            {language === 'hi' ? 'लोकप्रिय योजनाएं' : 'Popular Schemes'}
          </h2>
          <p className="text-muted-foreground">
            {language === 'hi' 
              ? 'सबसे ज्यादा उपयोग की जाने वाली सरकारी योजनाएं'
              : 'Most popular government schemes among citizens'
            }
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {featuredSchemes.map((scheme) => (
            <Card key={scheme.id} className="hover:shadow-glow transition-all duration-300 cursor-pointer" onClick={() => handleSchemeSelect(scheme)}>
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant={scheme.category === 'central' ? 'default' : 'secondary'}>
                    {scheme.category === 'central' ? 
                      (language === 'hi' ? 'केंद्रीय' : 'Central') : 
                      (language === 'hi' ? 'राज्य' : 'State')
                    }
                  </Badge>
                </div>
                <CardTitle className="text-lg">
                  {language === 'hi' ? scheme.nameHindi : scheme.name}
                </CardTitle>
                <CardDescription>
                  {language === 'hi' ? scheme.descriptionHindi : scheme.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  <strong>{language === 'hi' ? 'लाभ:' : 'Benefits:'}</strong> {language === 'hi' ? scheme.benefitsHindi : scheme.benefits}
                </p>
                <Button variant="saffron" size="sm" className="w-full">
                  {language === 'hi' ? 'और जानें' : 'Learn More'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button 
            variant="outline" 
            size="lg" 
            onClick={() => setActiveTab('schemes')}
          >
            {language === 'hi' ? 'सभी योजनाएं देखें' : 'View All Schemes'}
          </Button>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12">
        <Card className="bg-gradient-hero border-primary/20 text-center">
          <CardContent className="py-8">
            <h2 className="text-3xl font-bold mb-4">
              {language === 'hi' ? 'आज ही शुरू करें' : 'Get Started Today'}
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              {language === 'hi' 
                ? 'स्वरसाथी के साथ अपनी सरकारी योजनाओं की यात्रा शुरू करें। बस अपनी आवाज़ से पूछें और हम आपकी मदद करेंगे।'
                : 'Start your journey with SwarSaathi to discover government schemes. Just ask with your voice and we will help you.'
              }
            </p>
            <Button 
              variant="hero" 
              size="lg" 
              onClick={() => setActiveTab('voice')}
              className="animate-pulse-glow"
            >
              <Mic className="h-6 w-6 mr-2" />
              {language === 'hi' ? 'अभी शुरू करें' : 'Start Now'}
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );

  const renderContent = () => {
    if (showSuccessPage) {
      return <SuccessPage />;
    }

    switch (activeTab) {
      case 'home':
        return <HomeContent />;
      case 'schemes':
        return <SchemesFinder language={language} onSchemeSelect={handleSchemeSelect} />;
      case 'voice':
        return <VoiceInterface language={language} onLanguageChange={setLanguage} />;
      case 'apply':
        if (selectedScheme) {
          return (
            <ApplicationForm 
              scheme={selectedScheme} 
              language={language} 
              onComplete={handleApplicationComplete}
            />
          );
        } else {
          return (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">
                {language === 'hi' 
                  ? 'पहले कोई योजना चुनें'
                  : 'Please select a scheme first'
                }
              </p>
              <Button onClick={() => setActiveTab('schemes')}>
                {language === 'hi' ? 'योजनाएं देखें' : 'Browse Schemes'}
              </Button>
            </div>
          );
        }
      default:
        return <HomeContent />;
    }
  };

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab} language={language}>
      {renderContent()}
    </Layout>
  );
};

export default Index;
