import React, { useState, useEffect } from 'react';
import { Mail, Lock, User, ArrowRight, ShieldCheck, CheckCircle2, Eye, EyeOff, Loader2 } from 'lucide-react'; 
import emailjs from '@emailjs/browser';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const SERVICE_ID = "service_nxow30d"; 
const TEMPLATE_ID = "template_f6d3v7s";
const PUBLIC_KEY = "G3QdWkhsYJqCLUbeJ";

export default function LoginScreen() {
  const [isLogin, setIsLogin] = useState(true);
  const [regStep, setRegStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [userOtp, setUserOtp] = useState(['', '', '', '', '', '']);
  const [formData, setFormData] = useState({ fullName: '', email: '', password: '' });

  const navigate = useNavigate();
  // useAuth() se context nikal rahe hain
  const auth = useAuth(); 
  const login = auth?.login;
  const register = auth?.register;

  useEffect(() => { emailjs.init(PUBLIC_KEY); }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) return alert("Please fill details.");
    setLoading(true);
    try {
      const result = await login(formData.email, formData.password);
      if (result.success) {
        navigate('/dashboard');
      } else {
        alert(result.error || "Invalid credentials");
      }
    } catch (error) { 
      alert("Login failed. Check if backend is running!"); 
    } finally {
      setLoading(false);
    }
  };

  const handleProceed = (e) => {
    if(e) e.preventDefault();
    if (!formData.email || !formData.fullName || !formData.password) return alert("Fill all fields");
    setLoading(true);
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(otpCode);

    emailjs.send(SERVICE_ID, TEMPLATE_ID, {
      to_email: formData.email,
      to_name: formData.fullName || "User",
      otp: otpCode,
    }, PUBLIC_KEY)
      .then(() => { 
        setLoading(false); 
        setRegStep(2); 
      })
      .catch(() => { 
        setLoading(false); 
        alert("Email error! Check EmailJS credentials."); 
      });
  };

  const handleVerify = async () => {
    const enteredCode = userOtp.join('');
    if (enteredCode === generatedOtp && generatedOtp !== '') {
      setLoading(true);
      try {
        const result = await register(formData.fullName, formData.email, formData.password);
        if (result.success) {
          setRegStep(3);
          setTimeout(() => { navigate('/dashboard'); }, 2500);
        } else {
          alert(result.error || "Registration failed");
        }
      } catch (err) {
        alert("Server error during registration");
      } finally {
        setLoading(false);
      }
    } else { 
      alert("Incorrect OTP!"); 
    }
  };

  const handleOtpInput = (value, index) => {
    const newOtp = [...userOtp];
    newOtp[index] = value.slice(-1); 
    setUserOtp(newOtp);
    if (value && index < 5) document.getElementById(`otp-${index + 1}`)?.focus();
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6 font-sans">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Side: Branding */}
        <div className="space-y-6">
          <h1 className="text-7xl font-black text-slate-900 leading-[1.1] tracking-tighter">
            Your College Life <br />
            <span className="text-indigo-600 italic">Simplified.</span>
          </h1>
          <p className="text-slate-500 text-lg max-w-md font-medium leading-relaxed">
            The ultimate AI assistant for GLA students. Track attendance, 
            calculate CPI, and solve doubts instantly.
          </p>
          
          <div className="flex items-center gap-12 pt-8">
            <div>
              <h3 className="text-3xl font-black text-slate-900">100%</h3>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Secure</p>
            </div>
            <div className="h-10 w-[1px] bg-slate-100"></div>
            <div>
              <h3 className="text-3xl font-black text-slate-900">AI</h3>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Powered</p>
            </div>
          </div>
        </div>

        {/* Right Side: Auth Card */}
        <div className="flex justify-center lg:justify-end">
          <div className="bg-white p-10 rounded-[3.5rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.06)] border border-slate-50 w-full max-w-md min-h-[500px] flex flex-col justify-center">
            
            {regStep !== 3 && (
              <div className="flex bg-slate-50 p-1.5 rounded-2xl mb-8 border border-slate-100">
                <button onClick={() => {setIsLogin(true); setRegStep(1);}} 
                  className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${isLogin ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400'}`}>
                  Login
                </button>
                <button onClick={() => {setIsLogin(false); setRegStep(1);}} 
                  className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${!isLogin ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400'}`}>
                  Register
                </button>
              </div>
            )}

            {regStep === 1 && (
              <form onSubmit={isLogin ? handleLogin : handleProceed} className="space-y-4">
                {!isLogin && (
                  <input name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Full Name" className="w-full p-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-indigo-100 font-medium" />
                )}
                <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="w-full p-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-indigo-100 font-medium" />
                <div className="relative">
                  <input name="password" value={formData.password} type={showPassword ? "text" : "password"} onChange={handleChange} placeholder="Password" className="w-full p-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-indigo-100 font-medium" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-4 text-slate-400">
                    {showPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
                  </button>
                </div>
                <button type="submit" disabled={loading} className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black shadow-lg hover:bg-indigo-600 transition-all active:scale-95 disabled:opacity-70">
                  {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Get Started')}
                </button>
              </form>
            )}

            {regStep === 2 && (
              <div className="text-center space-y-6">
                <h3 className="text-xl font-bold text-slate-800">Verify Email</h3>
                <div className="flex justify-between gap-2">
                  {userOtp.map((digit, i) => (
                    <input key={i} id={`otp-${i}`} maxLength="1" value={digit} onChange={(e) => handleOtpInput(e.target.value, i)}
                      className="w-12 h-14 bg-slate-50 border-none rounded-xl text-center text-xl font-black text-indigo-600 outline-none focus:ring-2 focus:ring-indigo-200" />
                  ))}
                </div>
                <button onClick={handleVerify} disabled={loading} className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-black shadow-lg">
                   {loading ? 'Verifying...' : 'Verify OTP'}
                </button>
              </div>
            )}

            {regStep === 3 && (
              <div className="text-center py-6 flex flex-col items-center animate-in fade-in zoom-in duration-500">
                <div className="mb-8 relative">
                  <div className="h-24 w-24 bg-green-50 rounded-full flex items-center justify-center border-4 border-white shadow-sm">
                    <CheckCircle2 size={48} className="text-green-500" />
                  </div>
                </div>
                <h2 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">Registration Complete!</h2>
                <p className="text-slate-400 font-medium italic">
                  Welcome <span className="text-slate-600 font-bold not-italic">{formData.fullName.split(' ')[0] || 'User'}</span>. Let's build your future.
                </p>
                <div className="mt-12">
                  <div className="h-12 w-12 border-4 border-slate-100 border-t-indigo-600 rounded-full animate-spin"></div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
