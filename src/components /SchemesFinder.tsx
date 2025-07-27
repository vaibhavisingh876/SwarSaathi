import React, { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, MapPin, Users, DollarSign } from 'lucide-react';
import { searchSchemes, getEligibleSchemes, getAllSchemes } from '@/data/schemes';
import SchemeCard from '@/components/SchemeCard';

interface SchemesFinderProps {
  language: string;
  onSchemeSelect: (scheme: any) => void;
}

const SchemesFinder: React.FC<SchemesFinderProps> = ({ language, onSchemeSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    state: '',
    gender: '',
    ageGroup: ''
  });
  const [userProfile, setUserProfile] = useState({
    age: '',
    gender: '',
    state: '',
    income: '',
    category: ''
  });
  const [showEligibleOnly, setShowEligibleOnly] = useState(false);

  const allSchemes = getAllSchemes();

  const filteredSchemes = useMemo(() => {
    let schemes = allSchemes;

    // Apply search filter
    if (searchQuery.trim()) {
      schemes = searchSchemes(searchQuery);
    }

    // Apply category filter
    if (filters.category && filters.category !== 'all') {
      schemes = schemes.filter(scheme => scheme.category === filters.category);
    }

    // Apply state filter
    if (filters.state && filters.state !== 'all') {
      schemes = schemes.filter(scheme => 
        !scheme.state || scheme.state === filters.state || scheme.category === 'central'
      );
    }

    // Apply gender filter
    if (filters.gender && filters.gender !== 'all') {
      schemes = schemes.filter(scheme => 
        !scheme.gender || scheme.gender === 'all' || scheme.gender === filters.gender
      );
    }

    // Apply eligibility filter
    if (showEligibleOnly && userProfile.age && userProfile.gender) {
      const profile = {
        ...userProfile,
        age: parseInt(userProfile.age),
        income: parseFloat(userProfile.income) || 0
      };
      schemes = getEligibleSchemes(profile);
    }

    return schemes;
  }, [searchQuery, filters, showEligibleOnly, userProfile, allSchemes]);

  const states = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
    'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
    'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
    'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold bg-gradient-saffron bg-clip-text text-transparent mb-2">
          {language === 'hi' ? 'सरकारी योजना खोजें' : 'Find Government Schemes'}
        </h2>
        <p className="text-muted-foreground">
          {language === 'hi' 
            ? 'अपनी आवश्यकताओं के अनुसार योजनाएं खोजें और फिल्टर करें'
            : 'Search and filter schemes according to your needs'
          }
        </p>
      </div>

      {/* Search Bar */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={language === 'hi' 
                ? 'योजना खोजें (जैसे: किसान, आवास, स्वास्थ्य, शिक्षा)' 
                : 'Search schemes (e.g., farmer, housing, health, education)'
              }
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Filter className="h-5 w-5" />
            {language === 'hi' ? 'फिल्टर' : 'Filters'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                {language === 'hi' ? 'श्रेणी' : 'Category'}
              </label>
              <Select value={filters.category} onValueChange={(value) => setFilters({...filters, category: value})}>
                <SelectTrigger>
                  <SelectValue placeholder={language === 'hi' ? 'सभी' : 'All'} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{language === 'hi' ? 'सभी' : 'All'}</SelectItem>
                  <SelectItem value="central">{language === 'hi' ? 'केंद्रीय' : 'Central'}</SelectItem>
                  <SelectItem value="state">{language === 'hi' ? 'राज्य' : 'State'}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                {language === 'hi' ? 'राज्य' : 'State'}
              </label>
              <Select value={filters.state} onValueChange={(value) => setFilters({...filters, state: value})}>
                <SelectTrigger>
                  <SelectValue placeholder={language === 'hi' ? 'सभी राज्य' : 'All States'} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{language === 'hi' ? 'सभी राज्य' : 'All States'}</SelectItem>
                  {states.map(state => (
                    <SelectItem key={state} value={state}>{state}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                {language === 'hi' ? 'लिंग' : 'Gender'}
              </label>
              <Select value={filters.gender} onValueChange={(value) => setFilters({...filters, gender: value})}>
                <SelectTrigger>
                  <SelectValue placeholder={language === 'hi' ? 'सभी' : 'All'} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{language === 'hi' ? 'सभी' : 'All'}</SelectItem>
                  <SelectItem value="male">{language === 'hi' ? 'पुरुष' : 'Male'}</SelectItem>
                  <SelectItem value="female">{language === 'hi' ? 'महिला' : 'Female'}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button
                variant={showEligibleOnly ? 'saffron' : 'outline'}
                onClick={() => setShowEligibleOnly(!showEligibleOnly)}
                className="w-full"
              >
                {language === 'hi' ? 'मेरे लिए उपयुक्त' : 'Eligible for Me'}
              </Button>
            </div>
          </div>

          {/* User Profile for Eligibility Check */}
          {showEligibleOnly && (
            <div className="border-t pt-4">
              <h4 className="font-medium mb-3">
                {language === 'hi' ? 'व्यक्तिगत जानकारी (पात्रता जांच के लिए)' : 'Personal Information (for eligibility check)'}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3">
                <Input
                  placeholder={language === 'hi' ? 'उम्र' : 'Age'}
                  type="number"
                  value={userProfile.age}
                  onChange={(e) => setUserProfile({...userProfile, age: e.target.value})}
                />
                <Select value={userProfile.gender} onValueChange={(value) => setUserProfile({...userProfile, gender: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder={language === 'hi' ? 'लिंग' : 'Gender'} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">{language === 'hi' ? 'पुरुष' : 'Male'}</SelectItem>
                    <SelectItem value="female">{language === 'hi' ? 'महिला' : 'Female'}</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={userProfile.state} onValueChange={(value) => setUserProfile({...userProfile, state: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder={language === 'hi' ? 'राज्य' : 'State'} />
                  </SelectTrigger>
                  <SelectContent>
                    {states.map(state => (
                      <SelectItem key={state} value={state}>{state}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  placeholder={language === 'hi' ? 'मासिक आय (₹)' : 'Monthly Income (₹)'}
                  type="number"
                  value={userProfile.income}
                  onChange={(e) => setUserProfile({...userProfile, income: e.target.value})}
                />
                <Select value={userProfile.category} onValueChange={(value) => setUserProfile({...userProfile, category: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder={language === 'hi' ? 'श्रेणी' : 'Category'} />
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
          )}
        </CardContent>
      </Card>

      {/* Results */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">
            {language === 'hi' ? 'योजनाएं' : 'Schemes'} ({filteredSchemes.length})
          </h3>
          
          {searchQuery && (
            <Badge variant="outline">
              {language === 'hi' ? `खोज: "${searchQuery}"` : `Search: "${searchQuery}"`}
            </Badge>
          )}
        </div>

        {filteredSchemes.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground">
              {language === 'hi' 
                ? 'कोई योजना नहीं मिली। कृपया अलग खोज शब्द या फिल्टर का उपयोग करें।'
                : 'No schemes found. Please try different search terms or filters.'
              }
            </p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSchemes.map((scheme) => (
              <SchemeCard
                key={scheme.id}
                scheme={scheme}
                language={language}
                onApplyClick={onSchemeSelect}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SchemesFinder;
