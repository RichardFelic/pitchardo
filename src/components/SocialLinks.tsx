import { Github, Linkedin, FileText } from 'lucide-react';

export function SocialLinks() {
  return (
    <div className="flex justify-center gap-4 p-6 bg-gradient-to-b from-transparent to-blue-50/30 border-t border-blue-100">
      <a
        href="https://www.linkedin.com/in/richard-feliciano-abreu/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all shadow-sm"
      >
        <Linkedin className="w-4 h-4" />
        LinkedIn
      </a>
      <a
        href="https://github.com/RichardFelic"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-gray-700 to-gray-800 rounded-xl hover:from-gray-800 hover:to-gray-900 transition-all shadow-sm"
      >
        <Github className="w-4 h-4" />
        GitHub
      </a>
      {/* <a
        href="https://docs.google.com/document/d/1Lr7HiZAk5YtMUgw1CKEq8QkcA-CU75zA/edit?usp=drive_link&ouid=102986365521631639355&rtpof=true&sd=true"
        className="flex items-center gap-2 px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all shadow-sm"
      >
        
        <FileText className="w-4 h-4" />
        Ver CV
      </a> */}
      <a
          href="https://richardfeliciano.netlify.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all shadow-sm"
        >
          <FileText className="w-4 h-4" />
          Portfolio
        </a>
      
    </div>
  );
}