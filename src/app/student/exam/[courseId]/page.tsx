'use client';

import { useEffect, useState } from "react";
import ExamInterface from "@/components/student/ExamInterface";
import type { Exam } from "@/lib/types";

export default function ExamPage({ params }: { params: { courseId: string } }) {
  const [exam, setExam] = useState<Exam | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedExam = localStorage.getItem(`exam_${params.courseId}`);
    if (storedExam) {
      setExam(JSON.parse(storedExam));
    }
    setLoading(false);
  }, [params.courseId]);


  if (loading) {
    return <div className="flex items-center justify-center min-h-[60vh]">Loading exam...</div>
  }

  if (!exam) {
    return <div className="flex items-center justify-center min-h-[60vh]">Exam not found for this course.</div>
  }

  return (
    <div>
      <ExamInterface exam={exam} courseId={params.courseId} />
    </div>
  );
}
