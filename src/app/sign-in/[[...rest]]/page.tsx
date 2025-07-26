import { SignIn } from "@clerk/nextjs";

type SignInPageProps = {
  searchParams: Promise<{
    redirectUrl?: string;
  }>;
};

export default async function SignInPage({ searchParams }: SignInPageProps) {
  const { redirectUrl } = await searchParams;

  return (
    <section className="py-14">
      <div className="container mx-auto px-4">
        <div className="flex justify-center">
          <SignIn signUpUrl="/sign-up" redirectUrl={redirectUrl} />
        </div>
      </div>
    </section>
  );
}
