'use client';

import CreateExamForm from "@/components/lecturer/CreateExamForm";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import type { Exam } from "@/lib/types";


export default function EditExamPage() {
    const params = useParams();
    const courseId = Array.isArray(params.courseId) ? params.courseId[0] : params.courseId;
    const [exam, setExam] = useState<Exam | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (courseId) {
            const storedExam = localStorage.getItem(`exam_${courseId}`);
            if (storedExam) {
                setExam(JSON.parse(storedExam));
            }
        }
        setLoading(false);
    }, [courseId]);

    if (loading) {
        return <div className="flex items-center justify-center min-h-[60vh]">Loading exam data...</div>
    }
    
    if (!exam) {
        return <div className="flex items-center justify-center min-h-[60vh]">Exam data not found.</div>
    }

    return (
        <div className="flex flex-col gap-8">
            <header>
                <h1 className="font-headline text-3xl font-bold tracking-tight">Edit Exam</h1>
                <p className="text-muted-foreground">Modify the details of the existing examination below.</p>
            </header>
            <CreateExamForm existingExam={exam} courseId={courseId}/>
        </div>
    );
}
