import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Home, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

const SuccessPage = () => {
  return (
    <div className="min-h-screen bg-gradient-india flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <Card className="text-center shadow-elegant border-0">
          <CardContent className="p-8 space-y-6">
            {/* Logo */}
            <img 
              src="/uploads/90c0340a-e404-418a-9133-c70394eddf1b.png" 
              alt="SwarSaathi Logo" 
              className="h-16 w-auto mx-auto mb-4"
            />
            
            {/* Success Icon */}
            <div className="flex justify-center">
              <CheckCircle className="h-20 w-20 text-green-500 animate-scale-in" />
            </div>
            
            {/* Success Message */}
            <div className="space-y-3">
              <h1 className="text-2xl font-bold text-primary">
                ✅ Thank you!
              </h1>
              <p className="text-lg font-medium text-foreground">
                Your application has been submitted successfully.
              </p>
              <p className="text-muted-foreground">
                We will get back to you soon.
              </p>
            </div>
            
            {/* Action Buttons */}
            <div className="space-y-3 pt-4">
              <Link to="/" className="block">
                <Button className="w-full" variant="saffron">
                  <Home className="mr-2 h-4 w-4" />
                  Go to Home
                </Button>
              </Link>
              
              <Link to="/apply" className="block">
                <Button className="w-full" variant="outline">
                  <FileText className="mr-2 h-4 w-4" />
                  Fill Another Form
                </Button>
              </Link>
            </div>
            
            {/* Additional Information */}
            <div className="text-xs text-muted-foreground pt-4 border-t">
              <p>Reference ID: SW{Date.now().toString().slice(-6)}</p>
              <p className="mt-1">
                <span className="font-medium">SwarSaathi</span> - Sarkari kaam ab baato se aasaan
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SuccessPage;
