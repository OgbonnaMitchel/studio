import AuthLayout from "@/components/shared/AuthLayout";
import AdminLoginForm from "@/components/auth/AdminLoginForm";

export default function AdminLoginPage() {
    return (
        <AuthLayout 
            title="General Admin Login"
            description="Enter your credentials to manage system data."
        >
            <AdminLoginForm />
        </AuthLayout>
    );
}
