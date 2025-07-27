export interface GovernmentScheme {
  id: string;
  name: string;
  nameHindi: string;
  description: string;
  descriptionHindi: string;
  eligibility: string[];
  eligibilityHindi: string[];
  benefits: string;
  benefitsHindi: string;
  documents: string[];
  documentsHindi: string[];
  applicationUrl: string;
  state?: string;
  category: 'central' | 'state';
  department: string;
  ageGroup?: string;
  incomeLimit?: string;
  gender?: 'male' | 'female' | 'all';
  keywords: string[];
}

export const governmentSchemes: GovernmentScheme[] = [
  {
    id: 'pm-kisan',
    name: 'PM Kisan Samman Nidhi',
    nameHindi: 'प्रधानमंत्री किसान सम्मान निधि',
    description: 'Financial support to small and marginal farmers across India',
    descriptionHindi: 'भारत भर के छोटे और सीमांत किसानों को वित्तीय सहायता',
    eligibility: [
      'Small and marginal farmers',
      'Land holding up to 2 hectares',
      'Valid Aadhaar card required'
    ],
    eligibilityHindi: [
      'छोटे और सीमांत किसान',
      '2 हेक्टेयर तक की भूमि',
      'वैध आधार कार्ड आवश्यक'
    ],
    benefits: '₹6,000 per year in three installments',
    benefitsHindi: 'तीन किस्तों में प्रति वर्ष ₹6,000',
    documents: ['Aadhaar Card', 'Land Documents', 'Bank Account Details'],
    documentsHindi: ['आधार कार्ड', 'भूमि दस्तावेज', 'बैंक खाता विवरण'],
    applicationUrl: 'https://pmkisan.gov.in/',
    category: 'central',
    department: 'Ministry of Agriculture & Farmers Welfare',
    incomeLimit: 'No income limit',
    gender: 'all',
    keywords: ['farmer', 'agriculture', 'kisan', 'money', 'financial support']
  },
  {
    id: 'pradhan-mantri-awas-yojana',
    name: 'Pradhan Mantri Awas Yojana',
    nameHindi: 'प्रधानमंत्री आवास योजना',
    description: 'Housing for All scheme providing affordable housing',
    descriptionHindi: 'सभी के लिए आवास योजना जो किफायती आवास प्रदान करती है',
    eligibility: [
      'Economically Weaker Section (EWS)',
      'Low Income Group (LIG)',
      'Middle Income Group (MIG)',
      'No pucca house owned'
    ],
    eligibilityHindi: [
      'आर्थिक रूप से कमजोर वर्ग (EWS)',
      'निम्न आय समूह (LIG)',
      'मध्यम आय समूह (MIG)',
      'कोई पक्का मकान नहीं'
    ],
    benefits: 'Subsidy up to ₹2.67 lakh for home loan',
    benefitsHindi: 'होम लोन पर ₹2.67 लाख तक की सब्सिडी',
    documents: ['Aadhaar Card', 'Income Certificate', 'Property Documents'],
    documentsHindi: ['आधार कार्ड', 'आय प्रमाण पत्र', 'संपत्ति दस्तावेज'],
    applicationUrl: 'https://pmaymis.gov.in/',
    category: 'central',
    department: 'Ministry of Housing and Urban Affairs',
    incomeLimit: '₹18 lakh annually',
    gender: 'all',
    keywords: ['house', 'home', 'awas', 'housing', 'loan', 'subsidy']
  },
  {
    id: 'ayushman-bharat',
    name: 'Ayushman Bharat - PM JAY',
    nameHindi: 'आयुष्मान भारत - पीएम जय',
    description: 'Health insurance scheme providing free treatment',
    descriptionHindi: 'स्वास्थ्य बीमा योजना जो मुफ्त इलाज प्रदान करती है',
    eligibility: [
      'Families listed in SECC 2011',
      'Rural and urban poor families',
      'No income criteria - automatic inclusion'
    ],
    eligibilityHindi: [
      'SECC 2011 में सूचीबद्ध परिवार',
      'ग्रामीण और शहरी गरीब परिवार',
      'कोई आय मानदंड नहीं - स्वचालित समावेश'
    ],
    benefits: 'Health cover up to ₹5 lakh per family per year',
    benefitsHindi: 'प्रति परिवार प्रति वर्ष ₹5 लाख तक का स्वास्थ्य कवर',
    documents: ['Aadhaar Card', 'Ration Card', 'Family ID'],
    documentsHindi: ['आधार कार्ड', 'राशन कार्ड', 'पारिवारिक पहचान'],
    applicationUrl: 'https://pmjay.gov.in/',
    category: 'central',
    department: 'National Health Authority',
    gender: 'all',
    keywords: ['health', 'medical', 'insurance', 'treatment', 'hospital', 'swasthya']
  },
  {
    id: 'beti-bachao-beti-padhao',
    name: 'Beti Bachao Beti Padhao',
    nameHindi: 'बेटी बचाओ बेटी पढ़ाओ',
    description: 'Scheme for survival, protection and education of girl children',
    descriptionHindi: 'बालिकाओं के अस्तित्व, सुरक्षा और शिक्षा के लिए योजना',
    eligibility: [
      'Girl children',
      'All income groups',
      'Focus on districts with low Child Sex Ratio'
    ],
    eligibilityHindi: [
      'बालिकाएं',
      'सभी आय समूह',
      'कम बाल लिंगानुपात वाले जिलों पर फोकस'
    ],
    benefits: 'Educational support and awareness programs',
    benefitsHindi: 'शैक्षिक सहायता और जागरूकता कार्यक्रम',
    documents: ['Birth Certificate', 'School Documents', 'Aadhaar Card'],
    documentsHindi: ['जन्म प्रमाण पत्र', 'स्कूल दस्तावेज', 'आधार कार्ड'],
    applicationUrl: 'https://wcd.nic.in/bbbp-scheme',
    category: 'central',
    department: 'Ministry of Women and Child Development',
    gender: 'female',
    keywords: ['girl', 'education', 'beti', 'daughter', 'school', 'study']
  },
  {
    id: 'pm-mudra-yojana',
    name: 'PM MUDRA Yojana',
    nameHindi: 'प्रधानमंत्री मुद्रा योजना',
    description: 'Micro-finance scheme for small businesses and entrepreneurs',
    descriptionHindi: 'छोटे व्यवसाय और उद्यमियों के लिए सूक्ष्म वित्त योजना',
    eligibility: [
      'Micro-enterprises',
      'Small business owners',
      'New entrepreneurs',
      'Non-corporate entities'
    ],
    eligibilityHindi: [
      'सूक्ष्म उद्यम',
      'छोटे व्यवसाय मालिक',
      'नए उद्यमी',
      'गैर-कॉर्पोरेट संस्थाएं'
    ],
    benefits: 'Loans up to ₹10 lakh without collateral',
    benefitsHindi: 'बिना गारंटी के ₹10 लाख तक का कर्ज',
    documents: ['Aadhaar Card', 'PAN Card', 'Business Plan', 'Bank Statements'],
    documentsHindi: ['आधार कार्ड', 'पैन कार्ड', 'व्यवसाय योजना', 'बैंक स्टेटमेंट'],
    applicationUrl: 'https://mudra.org.in/',
    category: 'central',
    department: 'Ministry of Finance',
    gender: 'all',
    keywords: ['business', 'loan', 'mudra', 'entrepreneur', 'startup', 'vyavasaya']
  },
  {
    id: 'sukanya-samriddhi-yojana',
    name: 'Sukanya Samriddhi Yojana',
    nameHindi: 'सुकन्या समृद्धि योजना',
    description: 'Savings scheme for girl children with high interest rates',
    descriptionHindi: 'उच्च ब्याज दर के साथ बालिकाओं के लिए बचत योजना',
    eligibility: [
      'Girl child aged 0-10 years',
      'Indian citizen',
      'One account per girl child'
    ],
    eligibilityHindi: [
      '0-10 वर्ष की बालिका',
      'भारतीय नागरिक',
      'प्रति बालिका एक खाता'
    ],
    benefits: 'High interest rate with tax benefits',
    benefitsHindi: 'कर लाभ के साथ उच्च ब्याज दर',
    documents: ['Birth Certificate', 'Aadhaar Card', 'Address Proof'],
    documentsHindi: ['जन्म प्रमाण पत्र', 'आधार कार्ड', 'पता प्रमाण'],
    applicationUrl: 'https://www.indiapost.gov.in/Financial/Pages/Content/Sukanya-Samriddhi-Yojana.aspx',
    category: 'central',
    department: 'Ministry of Finance',
    ageGroup: '0-10 years',
    gender: 'female',
    keywords: ['savings', 'girl', 'investment', 'future', 'education', 'sukanya']
  },
  {
    id: 'pm-ujjwala-yojana',
    name: 'PM Ujjwala Yojana',
    nameHindi: 'प्रधानमंत्री उज्ज्वला योजना',
    description: 'Free LPG connections to women from BPL families',
    descriptionHindi: 'बीपीएल परिवारों की महिलाओं को मुफ्त एलपीजी कनेक्शन',
    eligibility: [
      'Women from BPL families',
      'Age 18 years or above',
      'No LPG connection in household'
    ],
    eligibilityHindi: [
      'बीपीएल परिवारों की महिलाएं',
      '18 वर्ष या उससे अधिक आयु',
      'घर में कोई एलपीजी कनेक्शन नहीं'
    ],
    benefits: 'Free LPG connection with deposit-free cylinder',
    benefitsHindi: 'जमा-मुक्त सिलेंडर के साथ मुफ्त एलपीजी कनेक्शन',
    documents: ['BPL Certificate', 'Aadhaar Card', 'Bank Account Details'],
    documentsHindi: ['बीपीएल प्रमाण पत्र', 'आधार कार्ड', 'बैंक खाता विवरण'],
    applicationUrl: 'https://pmuy.gov.in/',
    category: 'central',
    department: 'Ministry of Petroleum and Natural Gas',
    ageGroup: '18+',
    gender: 'female',
    keywords: ['gas', 'cooking', 'lpg', 'cylinder', 'fuel', 'ujjwala']
  },
  {
    id: 'national-pension-scheme',
    name: 'National Pension Scheme (NPS)',
    nameHindi: 'राष्ट्रीय पेंशन योजना (एनपीएस)',
    description: 'Retirement savings scheme with market-linked returns',
    descriptionHindi: 'बाजार-आधारित रिटर्न के साथ सेवानिवृत्ति बचत योजना',
    eligibility: [
      'Indian citizens aged 18-70',
      'All sectors employees',
      'Self-employed individuals'
    ],
    eligibilityHindi: [
      '18-70 वर्ष के भारतीय नागरिक',
      'सभी क्षेत्र के कर्मचारी',
      'स्व-नियोजित व्यक्ति'
    ],
    benefits: 'Tax benefits and retirement corpus building',
    benefitsHindi: 'कर लाभ और सेवानिवृत्ति कोष निर्माण',
    documents: ['Aadhaar Card', 'PAN Card', 'Bank Account Details'],
    documentsHindi: ['आधार कार्ड', 'पैन कार्ड', 'बैंक खाता विवरण'],
    applicationUrl: 'https://www.npscra.nsdl.co.in/',
    category: 'central',
    department: 'Ministry of Finance',
    ageGroup: '18-70 years',
    gender: 'all',
    keywords: ['pension', 'retirement', 'savings', 'investment', 'nps', 'old age']
  }
];

export const stateSchemes: GovernmentScheme[] = [
  {
    id: 'up-kanya-sumangala',
    name: 'UP Kanya Sumangala Yojana',
    nameHindi: 'उत्तर प्रदेश कन्या सुमंगला योजना',
    description: 'Financial assistance for girl children in UP at different life stages',
    descriptionHindi: 'उत्तर प्रदेश में बालिकाओं के जीवन के विभिन्न चरणों में वित्तीय सहायता',
    eligibility: [
      'Resident of Uttar Pradesh',
      'Girl child',
      'Family income less than ₹3 lakh annually'
    ],
    eligibilityHindi: [
      'उत्तर प्रदेश का निवासी',
      'बालिका',
      'पारिवारिक आय ₹3 लाख प्रति वर्ष से कम'
    ],
    benefits: '₹15,000 in installments from birth to graduation',
    benefitsHindi: 'जन्म से स्नातक तक किस्तों में ₹15,000',
    documents: ['Birth Certificate', 'Aadhaar Card', 'Income Certificate', 'Domicile Certificate'],
    documentsHindi: ['जन्म प्रमाण पत्र', 'आधार कार्ड', 'आय प्रमाण पत्र', 'निवास प्रमाण पत्र'],
    applicationUrl: 'https://mksy.up.gov.in/',
    state: 'Uttar Pradesh',
    category: 'state',
    department: 'Women and Child Development Department, UP',
    incomeLimit: '₹3 lakh annually',
    gender: 'female',
    keywords: ['girl', 'education', 'uttar pradesh', 'kanya', 'financial aid']
  },
  {
    id: 'karnataka-anna-bhagya',
    name: 'Karnataka Anna Bhagya Yojana',
    nameHindi: 'कर्नाटक अन्न भाग्य योजना',
    description: 'Free rice distribution scheme for BPL families in Karnataka',
    descriptionHindi: 'कर्नाटक में बीपीएल परिवारों के लिए मुफ्त चावल वितरण योजना',
    eligibility: [
      'BPL families in Karnataka',
      'Valid ration card',
      'State resident'
    ],
    eligibilityHindi: [
      'कर्नाटक में बीपीएल परिवार',
      'वैध राशन कार्ड',
      'राज्य निवासी'
    ],
    benefits: 'Free rice - 7kg per person per month',
    benefitsHindi: 'मुफ्त चावल - प्रति व्यक्ति प्रति माह 7 किलो',
    documents: ['BPL Ration Card', 'Aadhaar Card', 'Domicile Certificate'],
    documentsHindi: ['बीपीएल राशन कार्ड', 'आधार कार्ड', 'निवास प्रमाण पत्र'],
    applicationUrl: 'https://ahara.kar.nic.in/',
    state: 'Karnataka',
    category: 'state',
    department: 'Food and Civil Supplies Department, Karnataka',
    gender: 'all',
    keywords: ['rice', 'food', 'karnataka', 'anna', 'ration', 'grain']
  }
];

export const getAllSchemes = (): GovernmentScheme[] => {
  return [...governmentSchemes, ...stateSchemes];
};

export const searchSchemes = (query: string, userProfile?: any): GovernmentScheme[] => {
  const allSchemes = getAllSchemes();
  const lowercaseQuery = query.toLowerCase();
  
  return allSchemes.filter(scheme => {
    const matchesKeywords = scheme.keywords.some(keyword => 
      keyword.toLowerCase().includes(lowercaseQuery)
    );
    
    const matchesName = scheme.name.toLowerCase().includes(lowercaseQuery) ||
                       scheme.nameHindi.includes(query);
    
    const matchesDescription = scheme.description.toLowerCase().includes(lowercaseQuery) ||
                              scheme.descriptionHindi.includes(query);
    
    return matchesKeywords || matchesName || matchesDescription;
  });
};

export const getEligibleSchemes = (userProfile: {
  age?: number;
  gender?: string;
  state?: string;
  income?: number;
  category?: string;
}): GovernmentScheme[] => {
  const allSchemes = getAllSchemes();
  
  return allSchemes.filter(scheme => {
    // Gender filter
    if (scheme.gender && scheme.gender !== 'all' && userProfile.gender && 
        scheme.gender !== userProfile.gender) {
      return false;
    }
    
    // State filter (include central schemes for all states)
    if (scheme.state && userProfile.state && 
        scheme.state !== userProfile.state && scheme.category === 'state') {
      return false;
    }
    
    // Income filter (basic implementation)
    if (scheme.incomeLimit && userProfile.income) {
      const limitStr = scheme.incomeLimit.replace(/[₹,]/g, '');
      const limitNum = parseFloat(limitStr) * (limitStr.includes('lakh') ? 100000 : 1);
      if (userProfile.income > limitNum) {
        return false;
      }
    }
    
    return true;
  });
};
