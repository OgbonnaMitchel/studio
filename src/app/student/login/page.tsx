import AuthLayout from "@/components/shared/AuthLayout";
import StudentLoginForm from "@/components/auth/StudentLoginForm";

export default function StudentLoginPage() {
    return (
        <AuthLayout 
            title="Student Login"
            description="Enter your credentials to access your dashboard."
        >
            <StudentLoginForm />
        </AuthLayout>
    );
}
