import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Home, Search, Mic, FileText } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
  language: string;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, onTabChange, language }) => {
  const tabs = [
    {
      id: 'home',
      label: language === 'hi' ? 'होम' : 'Home',
      icon: Home
    },
    {
      id: 'schemes',
      label: language === 'hi' ? 'योजना खोजें' : 'Scheme Finder',
      icon: Search
    },
    {
      id: 'voice',
      label: language === 'hi' ? 'वॉयस असिस्टेंट' : 'Voice Assistant',
      icon: Mic
    },
    {
      id: 'apply',
      label: language === 'hi' ? 'आवेदन करें' : 'Apply Now',
      icon: FileText
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
        <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b">
          <div className="container mx-auto px-4 py-2">
            {/* Logo Header */}
            <div className="flex items-center justify-center mb-4">
              <div className="flex items-center space-x-3">
                <img 
                  src="/lovable-uploads/90c0340a-e404-418a-9133-c70394eddf1b.png" 
                  alt="SwarSaathi Logo" 
                  className="h-10 w-auto"
                />
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-saffron bg-clip-text text-transparent">
                    SwarSaathi
                  </h1>
                  <p className="text-xs text-muted-foreground hidden sm:block">
                    Sarkari kaam ab baato se aasaan
                  </p>
                </div>
              </div>
            </div>
            
            <TabsList className="grid w-full grid-cols-4 h-16 bg-card/50">
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className="flex flex-col gap-1 h-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <tab.icon className="h-5 w-5" />
                  <span className="text-xs font-medium">{tab.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-6">
          {children}
        </div>
      </Tabs>
    </div>
  );
};

export default Layout;
