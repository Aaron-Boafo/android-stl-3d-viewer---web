import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield } from 'lucide-react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="h-screen w-screen overflow-y-auto bg-[#0a0a0a] text-zinc-100 font-sans">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft size={18} />
          Back to App
        </Link>

        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center text-black">
            <Shield size={22} />
          </div>
          <h1 className="text-3xl font-bold">Privacy Policy</h1>
        </div>

        <p className="text-sm text-zinc-500 mb-8">Last updated: July 22, 2026</p>

        <div className="space-y-8 text-zinc-300 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">1. Introduction</h2>
            <p>
              Welcome to STL Pro ("we", "our", or "us"). We are committed to protecting your
              privacy. This Privacy Policy explains how we collect, use, disclose, and
              safeguard your information when you use our 3D STL file viewer application.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">2. Information We Collect</h2>
            <p className="mb-3">
              STL Pro is designed to process 3D model files entirely within your browser.
              We want to be transparent about what data we handle:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                <strong className="text-white">STL File Data:</strong> All 3D model files you
                upload are processed locally in your browser. Your files are never transmitted
                to our servers or any third-party services.
              </li>
              <li>
                <strong className="text-white">Local Storage:</strong> We store recent file
                metadata (file name and size only) in your browser's local storage for
                convenience. This data never leaves your device.
              </li>
              <li>
                <strong className="text-white">Usage Data:</strong> We do not collect analytics,
                tracking data, or any personally identifiable information.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">3. How We Use Your Information</h2>
            <p>
              Since we do not collect personal data, we do not use your information for
              marketing, profiling, or any purpose beyond providing the core functionality
              of the STL viewer. The file data you upload is used solely to render the 3D
              model in your browser.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">4. Data Storage and Security</h2>
            <p className="mb-3">
              All processing happens on-device. Your STL files are loaded into your
              browser's memory and are discarded when you close the tab or navigate away.
              We implement reasonable security measures, but please be aware that no method
              of electronic transmission or storage is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">5. Third-Party Services</h2>
            <p>
              STL Pro does not integrate with any third-party analytics, advertising, or
              tracking services. We do not use cookies or similar tracking technologies.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">6. Children's Privacy</h2>
            <p>
              Our application is not directed to children under 13. We do not knowingly
              collect personal information from children under 13. If you are a parent or
              guardian and believe your child has provided us with personal information,
              please contact us so we can take appropriate action.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">7. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of
              any changes by posting the new Privacy Policy on this page and updating the
              "Last updated" date. Your continued use of the application after any changes
              constitutes acceptance of the new policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">8. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us
              through our application's support channels.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
