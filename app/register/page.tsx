import { Suspense } from "react";
import { RegisterForm } from "./RegisterForm";

export default function RegisterPage() {
  return (
    <main className="container-wide flex justify-center py-12 sm:py-16">
      <Suspense fallback={null}>
        <RegisterForm />
      </Suspense>
    </main>
  );
}
