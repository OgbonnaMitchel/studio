import ExamInterface from "@/components/student/ExamInterface";

export default function ExamPage({ params }: { params: { courseId: string } }) {
  // In a real app, you would fetch exam details using params.courseId
  console.log("Starting exam for course:", params.courseId);

  return (
    <div>
      <ExamInterface />
    </div>
  );
}
