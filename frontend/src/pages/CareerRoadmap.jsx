import { useAuth } from '../context/AuthContext';
import { Target, Code, Terminal, Database, Server, Cpu, Globe, ArrowRight } from 'lucide-react';

const CareerRoadmap = () => {
    const { user } = useAuth();
    
    // Simple branch logic - would be expanded in real app
    const branch = (user?.branch || '').toLowerCase();
    
    const getRoadmap = () => {
        if (branch.includes('computer science') || branch.includes('cs') || branch.includes('it')) {
            return {
                title: "Software Engineering Path",
                skills: [
                    { name: 'Core Languages', desc: 'Java, Python, or C++', icon: <Code className="h-5 w-5 text-indigo-400" /> },
                    { name: 'Web Development', desc: 'HTML/CSS, JS, React, Node.js', icon: <Globe className="h-5 w-5 text-blue-400" /> },
                    { name: 'Databases', desc: 'SQL, MongoDB, PostgreSQL', icon: <Database className="h-5 w-5 text-emerald-400" /> },
                    { name: 'System Design', desc: 'Scalability, Microservices', icon: <Server className="h-5 w-5 text-purple-400" /> }
                ]
            }
        } else if (branch.includes('electrical') || branch.includes('electronics')) {
             return {
                title: "Hardware / Embedded Path",
                skills: [
                    { name: 'Core Knowledge', desc: 'Circuit Design, Signals', icon: <Cpu className="h-5 w-5 text-amber-400" /> },
                    { name: 'Programming', desc: 'C, C++, Assembly', icon: <Terminal className="h-5 w-5 text-green-400" /> },
                    { name: 'Microcontrollers', desc: 'Arduino, STM32, PIC', icon: <Server className="h-5 w-5 text-rose-400" /> }
                ]
            }
        }
        
        // Default
        return {
            title: "General Tech Skills",
            skills: [
                { name: 'Digital Literacy', desc: 'Office Suite, Basic Tools', icon: <Code className="h-5 w-5 text-gray-400" /> },
                { name: 'Data Analysis', desc: 'Excel, Basic Python', icon: <Database className="h-5 w-5 text-indigo-400" /> },
                { name: 'Communication', desc: 'Email, Presentations', icon: <Target className="h-5 w-5 text-rose-400" /> }
            ]
        }
    };

    const roadmap = getRoadmap();

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-center justify-between border-b border-gray-700 pb-4">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight flex items-center">
                        <Target className="mr-3 text-emerald-500 h-8 w-8" />
                        Career Roadmap
                    </h1>
                    <p className="text-gray-400 mt-1 pl-11">Recommended skills based on your profile</p>
                </div>
                <div className="bg-gray-800 border border-gray-700 px-4 py-2 rounded-lg">
                    <span className="text-gray-400 text-sm">Your Branch:</span>
                    <span className="text-indigo-400 font-bold ml-2">{user?.branch || 'Not set'}</span>
                </div>
            </div>

            <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
                
                <h2 className="text-2xl font-bold text-white mb-8 border-l-4 border-indigo-500 pl-4">
                    {roadmap.title}
                </h2>

                <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-600 before:to-transparent">
                    
                    {roadmap.skills.map((skill, index) => (
                        <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-gray-800 bg-gray-900 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 shadow-sm transition-transform group-hover:scale-110">
                                {skill.icon}
                            </div>
                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-gray-700 bg-gray-900/50 hover:bg-gray-800/80 transition-colors shadow-sm">
                                <h3 className="font-bold text-white text-lg">{skill.name}</h3>
                                <p className="text-gray-400 mt-1 flex items-center">
                                     <ArrowRight className="h-3 w-3 mr-2 text-indigo-500" />
                                    {skill.desc}
                                </p>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
            
            <div className="text-center mt-8 p-6 bg-indigo-500/10 border border-indigo-500/20 rounded-xl">
                 <p className="text-indigo-300">
                    Want personalized advice? Try asking the <a href="/study-buddy" className="text-indigo-400 font-bold hover:underline">AI Study Buddy</a> for specific resources to learn these skills!
                 </p>
            </div>
        </div>
    );
};

export default CareerRoadmap;
