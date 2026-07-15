import { Star, Send } from "lucide-react";

export default function NoticeBanner() {
  return (
    <div className="px-4 md:px-12 max-w-[1600px] w-full pt-10 pb-6">
      <div className="bg-[#1f1f1f] rounded border border-gray-800 flex flex-col lg:flex-row shadow-xl">
        {/* Left Side */}
        <div className="flex-1 p-6 md:p-8 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-gray-800">
          <h2 className="text-red-600 text-xl font-bold mb-4 tracking-wide">
            We Need Your Support ❤️
          </h2>
          <p className="text-yellow-500 text-sm md:text-base leading-relaxed hidden md:block mb-2">
            We know that ads can sometimes be frustrating, and we truly appreciate your patience. Running and maintaining this platform requires significant time, effort, and resources, and advertising is currently the only way we can keep everything free and continue bringing you new content on a regular basis.
          </p>
          <p className="text-green-500 text-sm md:text-base leading-relaxed mb-2 font-medium">
            Thank you for being part of our community and for helping us continue growing. Your support means more than you know. 🚀
          </p>
        </div>

        {/* Right Side */}
        <div className="flex-1 p-6 md:p-8 flex flex-col justify-center">
          <h3 className="text-xl font-bold text-white mb-4">Join Our Telegram Channel Now</h3>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <a 
              href="https://t.me/ReeloraMS" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-[#24A1DE] hover:bg-[#1a8bc2] text-white rounded px-6 py-3 flex items-center gap-3 transition shadow-md shrink-0 cursor-pointer"
            >
              <Send className="w-5 h-5 -rotate-45" />
              <div className="flex flex-col items-start leading-tight">
                <span className="text-[10px] font-bold tracking-wider uppercase opacity-80">Telegram</span>
                <span className="font-bold text-sm">CHANNEL</span>
              </div>
            </a>
            <div className="text-green-500 text-sm font-medium leading-relaxed">
              You can <Star className="inline w-4 h-4 text-yellow-500 fill-yellow-500 mb-1 mx-1" /> Request Movies and Series, <Star className="inline w-4 h-4 text-yellow-500 fill-yellow-500 mb-1 mx-1" /> Latest App/Website related Update and News, <Star className="inline w-4 h-4 text-yellow-500 fill-yellow-500 mb-1 mx-1" /> Report Bugs and Errors.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
