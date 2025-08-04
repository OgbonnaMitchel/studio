import AuthLayout from "@/components/shared/AuthLayout";
import StudentSignupForm from "@/components/auth/StudentSignupForm";

export default function StudentSignupPage() {
    return (
        <AuthLayout 
            title="Create Student Account"
            description="Fill in your details to get started."
        >
            <StudentSignupForm />
        </AuthLayout>
    );
}
