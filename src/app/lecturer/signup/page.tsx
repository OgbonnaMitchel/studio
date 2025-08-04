import AuthLayout from "@/components/shared/AuthLayout";
import LecturerSignupForm from "@/components/auth/LecturerSignupForm";

export default function LecturerSignupPage() {
    return (
        <AuthLayout 
            title="Create Lecturer Account"
            description="Fill in your details to start managing your courses."
        >
            <LecturerSignupForm />
        </AuthLayout>
    );
}
