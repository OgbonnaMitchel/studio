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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import {
  departments as initialDepartments,
  courses as initialCourses,
  levels as initialLevels,
} from '@/lib/data';
import type { Course } from '@/lib/types';

export default function DataManagementTabs() {
  const [departments, setDepartments] = useState(initialDepartments);
  const [courses, setCourses] = useState(initialCourses);
  const [levels, setLevels] = useState(initialLevels);

  const [newDepartment, setNewDepartment] = useState('');
  
  const initialNewCourseState: Omit<Course, 'id'> & { departmentIds: string[] } = { 
      code: '', title: '', level: 0, departmentIds: [], departmentId: ''
  };
  const [newCourse, setNewCourse] = useState(initialNewCourseState);

  const [newLevel, setNewLevel] = useState({ value: '', label: '' });

  const handleAddDepartment = () => {
    if (newDepartment.trim()) {
      setDepartments([...departments, { id: String(Date.now()), name: newDepartment }]);
      setNewDepartment('');
    }
  };

  const handleAddCourse = () => {
    if (newCourse.code.trim() && newCourse.title.trim() && newCourse.level && newCourse.departmentIds.length > 0) {
        // In a real app, you would handle the departmentIds array appropriately.
        // For this mock, we'll just join them into the single departmentId string.
        const courseToAdd: Course = { 
            ...newCourse, 
            id: String(Date.now()), 
            departmentId: newCourse.departmentIds.join(','), // Mocking storage of multiple IDs
        };
        setCourses([...courses, courseToAdd]);
        setNewCourse(initialNewCourseState);
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
          </Header>
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
            <div className="space-y-4 p-4 border rounded-lg">
                <h3 className="font-medium">Add New Course</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    <Select onValueChange={(value) => setNewCourse({...newCourse, level: Number(value)})}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select level" />
                        </SelectTrigger>
                        <SelectContent>
                            {levels.map(l => (
                                <SelectItem key={l.id} value={String(l.value)}>{l.label}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <Label className="font-medium">Departments</Label>
                    <div className="mt-2 space-y-2 rounded-md border p-4">
                        {departments.map((dep) => (
                            <div key={dep.id} className="flex items-center space-x-2">
                                <Checkbox 
                                    id={`dep-${dep.id}`}
                                    checked={newCourse.departmentIds.includes(dep.id)}
                                    onCheckedChange={(checked) => {
                                        setNewCourse(prev => ({
                                            ...prev,
                                            departmentIds: checked 
                                                ? [...prev.departmentIds, dep.id]
                                                : prev.departmentIds.filter(id => id !== dep.id)
                                        }))
                                    }}
                                />
                                <Label htmlFor={`dep-${dep.id}`} className="font-normal">{dep.name}</Label>
                            </div>
                        ))}
                    </div>
                </div>
                <Button onClick={handleAddCourse} className="w-full">Add Course</Button>
            </div>
            <Table>
              <TableHeader><TableRow><TableHead>Code</TableHead><TableHead>Title</TableHead><TableHead>Level</TableHead><TableHead>Departments</TableHead></TableRow></TableHeader>
              <TableBody>
                {courses.map((c) => (
                  <TableRow key={c.id}>
                    <TableCell>{c.code}</TableCell>
                    <TableCell>{c.title}</TableCell>
                    <TableCell>{levels.find(l => l.value === c.level)?.label}</TableCell>
                    <TableCell>{c.departmentId.split(',').map(id => departments.find(d => d.id === id)?.name).join(', ')}</TableCell>
                  </TableRow>
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
          </Header>
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
