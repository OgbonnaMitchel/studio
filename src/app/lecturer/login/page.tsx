import AuthLayout from "@/components/shared/AuthLayout";
import LecturerLoginForm from "@/components/auth/LecturerLoginForm";

export default function LecturerLoginPage() {
    return (
        <AuthLayout 
            title="Lecturer Login"
            description="Enter your credentials to manage your courses and exams."
        >
            <LecturerLoginForm />
        </AuthLayout>
    );
}
