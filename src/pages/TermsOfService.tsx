import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText } from 'lucide-react';

const TermsOfService: React.FC = () => {
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
            <FileText size={22} />
          </div>
          <h1 className="text-3xl font-bold">Terms of Service</h1>
        </div>

        <p className="text-sm text-zinc-500 mb-8">Last updated: July 22, 2026</p>

        <div className="space-y-8 text-zinc-300 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing or using STL Pro ("the Application"), you agree to be bound by
              these Terms of Service. If you do not agree with any part of these terms, you
              may not use the Application.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">2. Description of Service</h2>
            <p>
              STL Pro is a browser-based 3D STL file viewer that allows users to upload,
              inspect, and visualize 3D model files entirely within their web browser.
              All processing is performed locally on your device.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">3. User Responsibilities</h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>You are responsible for the files you choose to upload and process.</li>
              <li>You agree not to use the Application for any unlawful purpose.</li>
              <li>You will not attempt to reverse engineer, decompile, or disassemble the Application.</li>
              <li>You will not introduce malware or harmful code to the Application.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">4. Intellectual Property</h2>
            <p>
              The Application, including its design, code, and functionality, is the
              intellectual property of the developers. The STL files you upload remain your
              property. We claim no ownership over any user-uploaded content.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">5. Disclaimer of Warranties</h2>
            <p>
              The Application is provided "as is" and "as available" without warranties of
              any kind, whether express or implied. We do not warrant that the Application
              will be uninterrupted, error-free, or completely secure. You use the
              Application at your own risk.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">6. Limitation of Liability</h2>
            <p>
              In no event shall we be liable for any indirect, incidental, special,
              consequential, or punitive damages arising out of your use of or inability
              to use the Application. This includes, but is not limited to, loss of data,
              loss of profits, or business interruption.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">7. Service Availability</h2>
            <p>
              We reserve the right to modify, suspend, or discontinue the Application at
              any time without prior notice. We shall not be liable for any modification,
              suspension, or discontinuation of the service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">8. Changes to Terms</h2>
            <p>
              We reserve the right to update these Terms of Service at any time. Changes
              will be effective immediately upon posting. Your continued use of the
              Application following any changes constitutes acceptance of the new terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">9. Governing Law</h2>
            <p>
              These Terms of Service shall be governed by and construed in accordance with
              applicable laws, without regard to conflict of law principles.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">10. Contact Us</h2>
            <p>
              If you have any questions about these Terms of Service, please contact us
              through our application's support channels.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
