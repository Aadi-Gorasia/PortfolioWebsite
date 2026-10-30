import { Link } from "react-router-dom";

type LegalPageProps = {
  page: "privacy" | "terms";
};

export default function LegalPage({ page }: LegalPageProps) {
  const isPrivacy = page === "privacy";

  return (
    <main className="min-h-screen bg-[#050505] px-5 pb-20 pt-32 text-[#F3EFE6] sm:px-6 md:px-12 md:pt-40">
      <article className="mx-auto max-w-3xl">
        <Link to="/" className="mb-12 inline-flex min-h-11 items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#D6B97A]">
          ← Home
        </Link>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#D6B97A]">Aadi Gorasia</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
          {isPrivacy ? "Privacy Policy" : "Terms and Conditions"}
        </h1>

        {isPrivacy ? (
          <div className="mt-10 space-y-8 text-base leading-7 text-[#BEB6A8]">
            <p>
              This page describes the information handled by this portfolio. The site does not include an analytics or advertising tracker.
            </p>

            <section>
              <h2 className="mb-2 text-xl font-medium text-[#F3EFE6]">Contact form</h2>
              <p>
                If you submit the contact form, your name, email address, and message are sent to Formspree for delivery. Formspree may process additional technical information as part of providing that service. The portfolio does not set a retention period for submissions. Please review Formspree&apos;s privacy information before using the form, and avoid sending sensitive information.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-xl font-medium text-[#F3EFE6]">Fonts and external links</h2>
              <p>
                The site loads fonts from Google Fonts. Your browser requests those font files from Google when needed. Links to external sites, including social profiles, take you to services with their own privacy practices.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-xl font-medium text-[#F3EFE6]">Local storage and cookies</h2>
              <p>
                The portfolio code does not intentionally save contact form contents in browser storage or set tracking cookies. Third-party services may handle browser or request data under their own policies.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-xl font-medium text-[#F3EFE6]">Questions or requests</h2>
              <p>
                For questions about this page or a contact form submission, email{" "}
                <a className="text-[#D6B97A] underline underline-offset-4" href="mailto:gorasiaaadi@gmail.com">gorasiaaadi@gmail.com</a>.
              </p>
            </section>
          </div>
        ) : (
          <div className="mt-10 space-y-8 text-base leading-7 text-[#BEB6A8]">
            <p>
              This website is a personal portfolio. By using it, you agree to use the site lawfully and not to disrupt its operation or attempt to access non-public systems or information.
            </p>

            <section>
              <h2 className="mb-2 text-xl font-medium text-[#F3EFE6]">Portfolio information</h2>
              <p>
                Project descriptions and other material are provided for general information. Content may change, and you should verify details before relying on them for a decision.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-xl font-medium text-[#F3EFE6]">External services</h2>
              <p>
                This site links to services and websites operated by others. Their content, availability, and terms are controlled by those providers.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-xl font-medium text-[#F3EFE6]">Contact</h2>
              <p>
                Questions about these terms can be sent to{" "}
                <a className="text-[#D6B97A] underline underline-offset-4" href="mailto:gorasiaaadi@gmail.com">gorasiaaadi@gmail.com</a>.
              </p>
            </section>
          </div>
        )}
      </article>
    </main>
  );
}
