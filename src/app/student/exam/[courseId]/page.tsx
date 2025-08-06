'use client';

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ExamInterface from "@/components/student/ExamInterface";
import type { Exam } from "@/lib/types";

export default function ExamPage() {
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
    return <div className="flex items-center justify-center min-h-[60vh]">Loading exam...</div>
  }

  if (!exam) {
    return <div className="flex items-center justify-center min-h-[60vh]">Exam not found for this course.</div>
  }

  return (
    <div>
      <ExamInterface exam={exam} courseId={courseId} />
    </div>
  );
}
