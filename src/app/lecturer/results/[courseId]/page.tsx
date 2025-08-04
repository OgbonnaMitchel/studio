import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { courses } from '@/lib/data';
import { Badge } from '@/components/ui/badge';

const mockResults = [
  { name: 'John Doe', reg: '2021/12345', score: 85, grade: 'A' },
  { name: 'Jane Smith', reg: '2021/54321', score: 72, grade: 'B' },
  { name: 'Peter Jones', reg: '2021/67890', score: 45, grade: 'D' },
  { name: 'Mary Brown', reg: '2021/09876', score: 91, grade: 'A' },
  { name: 'David Green', reg: '2021/11223', score: 65, grade: 'C' },
];

function getGradeVariant(grade: string) {
    switch(grade) {
        case 'A': return 'default';
        case 'B': return 'secondary';
        case 'C': return 'secondary';
        case 'D': return 'outline';
        default: return 'destructive';
    }
}

export default function ResultsPage({ params }: { params: { courseId: string } }) {
  const course = courses.find((c) => c.id === params.courseId);

  return (
    <div className="flex flex-col gap-8">
      <header>
        <h1 className="font-headline text-3xl font-bold tracking-tight">Exam Results</h1>
        <p className="text-muted-foreground">
          Showing results for: {course?.code} - {course?.title || 'Unknown Course'}
        </p>
      </header>
      <Card>
        <CardHeader>
            <CardTitle>Student Scores</CardTitle>
            <CardDescription>List of students who took the exam and their grades.</CardDescription>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                <TableRow>
                    <TableHead>Student Name</TableHead>
                    <TableHead>Registration No.</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>Grade</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {mockResults.map((result) => (
                    <TableRow key={result.reg}>
                    <TableCell className="font-medium">{result.name}</TableCell>
                    <TableCell>{result.reg}</TableCell>
                    <TableCell>{result.score}</TableCell>
                    <TableCell>
                        <Badge variant={getGradeVariant(result.grade)}>{result.grade}</Badge>
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </CardContent>
      </Card>
    </div>
  );
}
