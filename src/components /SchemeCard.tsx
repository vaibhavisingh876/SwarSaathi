import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Users, MapPin, DollarSign } from 'lucide-react';
import { GovernmentScheme } from '@/data/schemes';

interface SchemeCardProps {
  scheme: GovernmentScheme;
  language: string;
  onApplyClick?: (scheme: GovernmentScheme) => void;
}

const SchemeCard: React.FC<SchemeCardProps> = ({ scheme, language, onApplyClick }) => {
  const handleVisitWebsite = () => {
    window.open(scheme.applicationUrl, '_blank');
  };

  const handleApplyNow = () => {
    if (onApplyClick) {
      onApplyClick(scheme);
    }
  };

  return (
    <Card className="h-full hover:shadow-glow transition-all duration-300 border-l-4 border-l-primary">
      <CardHeader>
        <div className="flex justify-between items-start mb-2">
          <Badge variant={scheme.category === 'central' ? 'default' : 'secondary'}>
            {scheme.category === 'central' ? 
              (language === 'hi' ? 'केंद्रीय' : 'Central') : 
              (language === 'hi' ? 'राज्य' : 'State')
            }
          </Badge>
          {scheme.state && (
            <Badge variant="outline" className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {scheme.state}
            </Badge>
          )}
        </div>
        
        <CardTitle className="text-lg leading-tight">
          {language === 'hi' ? scheme.nameHindi : scheme.name}
        </CardTitle>
        
        <CardDescription className="text-sm">
          {language === 'hi' ? scheme.descriptionHindi : scheme.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Benefits */}
        <div className="flex items-start gap-2">
          <DollarSign className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium text-sm">
              {language === 'hi' ? 'लाभ:' : 'Benefits:'}
            </p>
            <p className="text-sm text-muted-foreground">
              {language === 'hi' ? scheme.benefitsHindi : scheme.benefits}
            </p>
          </div>
        </div>

        {/* Key Eligibility */}
        <div className="flex items-start gap-2">
          <Users className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium text-sm">
              {language === 'hi' ? 'मुख्य पात्रता:' : 'Key Eligibility:'}
            </p>
            <p className="text-sm text-muted-foreground">
              {language === 'hi' ? 
                scheme.eligibilityHindi[0] : 
                scheme.eligibility[0]
              }
            </p>
          </div>
        </div>

        {/* Income Limit */}
        {scheme.incomeLimit && (
          <div className="bg-muted p-2 rounded text-center">
            <p className="text-xs font-medium">
              {language === 'hi' ? 'आय सीमा:' : 'Income Limit:'} {scheme.incomeLimit}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col gap-2 pt-2">
          <Button 
            variant="saffron" 
            size="sm" 
            onClick={handleApplyNow}
            className="w-full"
          >
            {language === 'hi' ? 'अभी आवेदन करें' : 'Apply Now'}
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleVisitWebsite}
            className="w-full flex items-center gap-2"
          >
            <ExternalLink className="h-3 w-3" />
            {language === 'hi' ? 'आधिकारिक वेबसाइट' : 'Official Website'}
          </Button>
        </div>

        {/* Department */}
        <div className="pt-2 border-t">
          <p className="text-xs text-muted-foreground">
            {language === 'hi' ? 'विभाग:' : 'Department:'} {scheme.department}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SchemeCard;
