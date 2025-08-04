'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  departments as initialDepartments,
  courses as initialCourses,
  levels as initialLevels,
} from '@/lib/data';

export default function DataManagementTabs() {
  const [departments, setDepartments] = useState(initialDepartments);
  const [courses, setCourses] = useState(initialCourses);
  const [levels, setLevels] = useState(initialLevels);

  const [newDepartment, setNewDepartment] = useState('');
  const [newCourse, setNewCourse] = useState({ code: '', title: '' });
  const [newLevel, setNewLevel] = useState({ value: '', label: '' });

  const handleAddDepartment = () => {
    if (newDepartment.trim()) {
      setDepartments([...departments, { id: String(Date.now()), name: newDepartment }]);
      setNewDepartment('');
    }
  };

  const handleAddCourse = () => {
    if (newCourse.code.trim() && newCourse.title.trim()) {
        setCourses([...courses, { ...newCourse, id: String(Date.now()), departmentId: '', level: 0 }]);
        setNewCourse({ code: '', title: '' });
    }
  };

  const handleAddLevel = () => {
    if (newLevel.value.trim() && newLevel.label.trim()) {
        setLevels([...levels, { ...newLevel, id: String(Date.now()), value: parseInt(newLevel.value, 10) }]);
        setNewLevel({ value: '', label: '' });
    }
  };


  return (
    <Tabs defaultValue="departments" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="departments">Departments</TabsTrigger>
        <TabsTrigger value="courses">Courses</TabsTrigger>
        <TabsTrigger value="levels">Levels</TabsTrigger>
      </TabsList>
      <TabsContent value="departments">
        <Card>
          <CardHeader>
            <CardTitle>Manage Departments</CardTitle>
            <CardDescription>Add or view system departments.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="New department name"
                value={newDepartment}
                onChange={(e) => setNewDepartment(e.target.value)}
              />
              <Button onClick={handleAddDepartment}>Add</Button>
            </div>
            <Table>
              <TableHeader><TableRow><TableHead>Department Name</TableHead></TableRow></TableHeader>
              <TableBody>
                {departments.map((dep) => (
                  <TableRow key={dep.id}><TableCell>{dep.name}</TableCell></TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="courses">
      <Card>
          <CardHeader>
            <CardTitle>Manage Courses</CardTitle>
            <CardDescription>Add or view system courses.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Course code (e.g. CSC101)"
                value={newCourse.code}
                onChange={(e) => setNewCourse({...newCourse, code: e.target.value})}
              />
               <Input
                placeholder="Course title"
                value={newCourse.title}
                onChange={(e) => setNewCourse({...newCourse, title: e.target.value})}
              />
              <Button onClick={handleAddCourse}>Add</Button>
            </div>
            <Table>
              <TableHeader><TableRow><TableHead>Code</TableHead><TableHead>Title</TableHead></TableRow></TableHeader>
              <TableBody>
                {courses.map((c) => (
                  <TableRow key={c.id}><TableCell>{c.code}</TableCell><TableCell>{c.title}</TableCell></TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="levels">
      <Card>
          <CardHeader>
            <CardTitle>Manage Levels</CardTitle>
            <CardDescription>Add or view system levels.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Level value (e.g. 100)"
                type="number"
                value={newLevel.value}
                onChange={(e) => setNewLevel({...newLevel, value: e.target.value})}
              />
               <Input
                placeholder="Level label (e.g. 100 Level)"
                value={newLevel.label}
                onChange={(e) => setNewLevel({...newLevel, label: e.target.value})}
              />
              <Button onClick={handleAddLevel}>Add</Button>
            </div>
            <Table>
              <TableHeader><TableRow><TableHead>Level</TableHead></TableRow></TableHeader>
              <TableBody>
                {levels.map((l) => (
                  <TableRow key={l.id}><TableCell>{l.label}</TableCell></TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
