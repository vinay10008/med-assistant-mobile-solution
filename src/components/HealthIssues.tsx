
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Thermometer, Stethoscope, HeartPulse, Pill } from "lucide-react";

const commonHealthIssues = [
  { icon: Thermometer, label: "Fever & Cold", description: "Temperature, chills, or flu-like symptoms" },
  { icon: Stethoscope, label: "Respiratory Issues", description: "Cough, breathing problems, or chest congestion" },
  { icon: HeartPulse, label: "Body Pain", description: "Headache, muscle pain, or general body ache" },
  { icon: Pill, label: "Digestive Issues", description: "Stomach pain, nausea, or digestive problems" },
];

const HealthIssues = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {commonHealthIssues.map((issue) => (
          <Card key={issue.label} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <issue.icon className="h-5 w-5 text-medical-blue" />
                {issue.label}
              </CardTitle>
              <CardDescription>{issue.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="outline">
                Get Help
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Card className="bg-medical-lightBlue/20">
        <CardContent className="p-6">
          <div className="flex items-start space-x-4">
            <AlertTriangle className="h-6 w-6 text-medical-blue flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-semibold mb-2">Need more specific help?</h4>
              <p className="text-sm text-gray-600 mb-4">
                Use our AI Consultation service to get personalized medical advice for your specific condition.
              </p>
              <Button className="bg-medical-blue hover:bg-medical-purple">
                Start AI Consultation
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HealthIssues;
