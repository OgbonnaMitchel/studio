
import CreateExamForm from "@/components/lecturer/CreateExamForm";
import { Suspense } from "react";

export default function CreateExamPage() {
  return (
    <div className="flex flex-col gap-8">
       <header>
        <h1 className="font-headline text-3xl font-bold tracking-tight">Set a New Exam</h1>
        <p className="text-muted-foreground">Fill out the form below to create a new examination.</p>
      </header>
      <Suspense fallback={<div>Loading...</div>}>
        <CreateExamForm />
      </Suspense>
    </div>
  );
}
