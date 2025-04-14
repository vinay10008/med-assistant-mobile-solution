
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Clock, Plus, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Appointment {
  id: string;
  date: Date;
  time: string;
  doctor: string;
  department: string;
  status: 'confirmed' | 'pending' | 'completed';
}

const AppointmentManager = () => {
  const [activeTab, setActiveTab] = useState('schedule');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: '1',
      date: new Date(2025, 3, 18), // April 18, 2025
      time: '10:00 AM',
      doctor: 'Dr. Sarah Johnson',
      department: 'Cardiology',
      status: 'confirmed',
    },
    {
      id: '2',
      date: new Date(2025, 3, 25), // April 25, 2025
      time: '2:30 PM',
      doctor: 'Dr. Michael Chen',
      department: 'Orthopedics',
      status: 'pending',
    }
  ]);
  
  const { toast } = useToast();

  const handleScheduleAppointment = () => {
    if (!selectedDate || !selectedTime || !selectedDoctor || !selectedDepartment) {
      toast({
        title: "Missing information",
        description: "Please fill out all fields to schedule an appointment.",
        variant: "destructive",
      });
      return;
    }

    const newAppointment: Appointment = {
      id: Date.now().toString(),
      date: selectedDate,
      time: selectedTime,
      doctor: selectedDoctor,
      department: selectedDepartment,
      status: 'pending',
    };

    setAppointments([...appointments, newAppointment]);
    
    toast({
      title: "Appointment scheduled!",
      description: `Your appointment has been scheduled for ${format(selectedDate, 'PPP')} at ${selectedTime}.`,
    });

    // Reset form
    setSelectedDate(undefined);
    setSelectedTime('');
    setSelectedDoctor('');
    setSelectedDepartment('');
  };

  return (
    <Card className="w-full bg-white shadow-md border border-medical-lightBlue">
      <CardHeader className="bg-medical-blue text-white rounded-t-lg">
        <CardTitle>Upcoming Appointments</CardTitle>
        <CardDescription className="text-medical-lightBlue">
          View and manage your scheduled visits
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs 
          defaultValue="schedule" 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="w-full grid grid-cols-2">
            <TabsTrigger value="schedule" className="flex items-center gap-1">
              <Plus size={16} />
              Schedule New
            </TabsTrigger>
            <TabsTrigger value="view" className="flex items-center gap-1">
              <Eye size={16} />
              View Appointments
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="schedule" className="p-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="date">Select Date</Label>
              <div className="border rounded-md p-2">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => date < new Date()}
                  className="rounded-md p-0"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="time">Select Time</Label>
              <Select value={selectedTime} onValueChange={setSelectedTime}>
                <SelectTrigger id="time" className="w-full">
                  <SelectValue placeholder="Select a time slot" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="9:00 AM">9:00 AM</SelectItem>
                  <SelectItem value="10:00 AM">10:00 AM</SelectItem>
                  <SelectItem value="11:00 AM">11:00 AM</SelectItem>
                  <SelectItem value="1:00 PM">1:00 PM</SelectItem>
                  <SelectItem value="2:00 PM">2:00 PM</SelectItem>
                  <SelectItem value="3:00 PM">3:00 PM</SelectItem>
                  <SelectItem value="4:00 PM">4:00 PM</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger id="department" className="w-full">
                  <SelectValue placeholder="Select a department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Cardiology">Cardiology</SelectItem>
                  <SelectItem value="Dermatology">Dermatology</SelectItem>
                  <SelectItem value="Orthopedics">Orthopedics</SelectItem>
                  <SelectItem value="Neurology">Neurology</SelectItem>
                  <SelectItem value="Pediatrics">Pediatrics</SelectItem>
                  <SelectItem value="General Medicine">General Medicine</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="doctor">Doctor</Label>
              <Select value={selectedDoctor} onValueChange={setSelectedDoctor}>
                <SelectTrigger id="doctor" className="w-full">
                  <SelectValue placeholder="Select a doctor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Dr. Sarah Johnson">Dr. Sarah Johnson</SelectItem>
                  <SelectItem value="Dr. Michael Chen">Dr. Michael Chen</SelectItem>
                  <SelectItem value="Dr. Emily Rodriguez">Dr. Emily Rodriguez</SelectItem>
                  <SelectItem value="Dr. David Kim">Dr. David Kim</SelectItem>
                  <SelectItem value="Dr. Jessica Patel">Dr. Jessica Patel</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </TabsContent>
          
          <TabsContent value="view" className="p-4">
            {appointments.length > 0 ? (
              <ScrollArea className="h-[300px] pr-4">
                <div className="space-y-3">
                  {appointments.map((appointment) => (
                    <div 
                      key={appointment.id} 
                      className="appointment-card p-3 border rounded-lg bg-white"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-gray-900">{appointment.department}</h3>
                          <p className="text-sm text-gray-600">{appointment.doctor}</p>
                        </div>
                        <div className={`px-2 py-1 rounded-full text-xs ${
                          appointment.status === 'confirmed' ? 'bg-green-100 text-green-800' : 
                          appointment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                        </div>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500">
                        <CalendarIcon size={14} className="mr-1" />
                        {format(appointment.date, 'PPP')}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock size={14} className="mr-1" />
                        {appointment.time}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>No appointments scheduled yet.</p>
                <Button 
                  variant="link" 
                  onClick={() => setActiveTab('schedule')}
                  className="mt-2 text-medical-blue"
                >
                  Schedule your first appointment
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
      {activeTab === 'schedule' && (
        <CardFooter className="p-4 border-t">
          <Button 
            onClick={handleScheduleAppointment} 
            className="w-full bg-medical-blue hover:bg-medical-purple"
          >
            Schedule Appointment
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default AppointmentManager;
