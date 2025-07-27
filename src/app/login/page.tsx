import LoginForm from '@/components/LoginForm';

export async function generateMetadata() {
    return {
        title: `Dummy Shop | Login`
    };
}

export default function LoginPage() {
    return (
        <LoginForm/>
    );
}
