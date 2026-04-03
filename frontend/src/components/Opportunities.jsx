import React from 'react';
import { ExternalLink, Briefcase, Trophy, Star } from 'lucide-react';

const Opportunities = () => {
  const data = [
    { id: 1, title: "Google STEP Internship", type: "Internship", date: "Deadline: April 25", link: "#", color: "bg-blue-50 text-blue-600" },
    { id: 2, title: "Smart India Hackathon", type: "Hackathon", date: "Starts May 10", link: "#", color: "bg-orange-50 text-orange-600" },
    { id: 3, title: "Microsoft Engage '26", type: "Program", date: "Apply Now", link: "#", color: "bg-purple-50 text-purple-600" }
  ];

  return (
    <div className="bg-white p-6 rounded-[2.5rem] shadow-xl border border-slate-100 h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-black text-xl flex items-center gap-2 tracking-tight">🚀 Career Hub</h3>
        <Star size={18} className="text-yellow-400 fill-yellow-400" />
      </div>
      
      <div className="space-y-4">
        {data.map(item => (
          <div key={item.id} className="p-4 rounded-3xl border border-slate-50 hover:border-indigo-100 hover:bg-slate-50/50 transition-all group cursor-pointer">
            <div className="flex justify-between items-start mb-2">
              <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${item.color}`}>
                {item.type}
              </span>
              <ExternalLink size={14} className="text-slate-300 group-hover:text-indigo-600 transition-colors" />
            </div>
            <h4 className="font-bold text-slate-800 text-sm leading-tight group-hover:text-indigo-900">{item.title}</h4>
            <p className="text-[10px] text-slate-400 mt-1 font-bold">{item.date}</p>
          </div>
        ))}
      </div>
      
      <button className="w-full mt-6 py-4 text-[10px] font-black uppercase tracking-widest text-indigo-600 bg-indigo-50 rounded-2xl hover:bg-indigo-600 hover:text-white transition-all shadow-sm">
        Explore More
      </button>
    </div>
  );
};

export default Opportunities;