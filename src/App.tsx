import { motion } from "motion/react";
declare global {
  interface Window {
    fbq: any;
  }
}
import { 
  ShoppingBag, 
  TrendingUp, 
  Truck, 
  CreditCard, 
  CheckCircle, 
  ArrowRight, 
  Zap,
  Menu,
  X,
  User,
  ShieldCheck,
  Store,
  BarChart3,
  Globe2,
  Search,
  PieChart,
  ChevronDown,
  Clock,
  HelpCircle,
  Mail,
  Phone,
  MapPin,
  ChevronRight,
  RotateCcw,
  Star,
  Activity,
  Database,
  Smartphone,
  MessageSquare
} from "lucide-react";
import { useState, useEffect, ReactNode, FormEvent } from "react";
import { WebsiteAnalyticsTracker } from "./components/analytics/WebsiteAnalyticsTracker";

const Modal = ({ isOpen, onClose, title, children }: { isOpen: boolean, onClose: () => void, title: ReactNode, children: ReactNode }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={onClose}
        className="absolute inset-0 bg-indigo-950/60 backdrop-blur-sm"
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative w-full max-w-3xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
      >
        <div className="p-4 border-b border-gray-100 flex justify-between items-start bg-gradient-to-r from-white to-gray-50 sticky top-0 z-10">
          <div className="flex-1 pr-4">{title}</div>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-400 hover:text-indigo-900 mt-1">
            <X size={24} />
          </button>
        </div>
        <div className="p-4 overflow-y-auto">
          {children}
        </div>
      </motion.div>
    </div>
  );
};

const ContactForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "",
    fullName: "",
    number: "",
    city: "",
    products: "",
    soldOnline: "",
    email: "",
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Send analytics event for form submission to track as a Lead
      await fetch(`${import.meta.env.VITE_PUBLIC_API_URL || "https://api.sellerslogin.com/api"}/website/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          websiteId: "tukkatech",
          website: "Tukka Tech Website",
          name: formData.fullName,
          email: formData.email,
          phone: formData.number,
          subject: "Tukka Registration",
          message: `Company: ${formData.companyName}, City: ${formData.city}, Products: ${formData.products}, Sold Online: ${formData.soldOnline}`,
          page: window.location.pathname,
          visitorId: window.sessionStorage.getItem("tukkatech_analytics_visitor") || "",
          sessionId: window.sessionStorage.getItem("tukkatech_analytics_session") || ""
        })
      }).catch(e => console.error(e));

      const response = await fetch(`${import.meta.env.VITE_PUBLIC_API_URL || "https://api.sellerslogin.com/api"}/v1/vendors/tukka-register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        if (typeof window.fbq === 'function') {
          window.fbq('track', 'Lead');
        }
        window.location.href = "https://rzp.io/rzp/Zvuarx1";
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to submit form.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-6">
        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle size={32} />
        </div>
        <h3 className="text-2xl font-black text-indigo-950 mb-2">Inquiry Sent!</h3>
        <p className="text-sm text-gray-600 font-medium">Our team will get back to you within 24 hours.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <div>
          <label className="block text-[10px] font-bold text-gray-700 uppercase tracking-widest mb-0.5">Company Name</label>
          <div className="relative">
            <Store className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
            <input value={formData.companyName} onChange={e => setFormData({...formData, companyName: e.target.value})} required type="text" className="w-full pl-10 pr-3 py-2 rounded-xl bg-gray-50 border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all font-bold text-xs" placeholder="Your Business Name" />
          </div>
        </div>
        <div>
          <label className="block text-[10px] font-bold text-gray-700 uppercase tracking-widest mb-0.5">Full Name</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
            <input value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} required type="text" className="w-full pl-10 pr-3 py-2 rounded-xl bg-gray-50 border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all font-bold text-xs" placeholder="John Doe" />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <div>
          <label className="block text-[10px] font-bold text-gray-700 uppercase tracking-widest mb-0.5">Number</label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
            <input value={formData.number} onChange={e => setFormData({...formData, number: e.target.value})} required type="tel" className="w-full pl-10 pr-3 py-2 rounded-xl bg-gray-50 border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all font-bold text-xs" placeholder="+91 98765 43210" />
          </div>
        </div>
        <div>
          <label className="block text-[10px] font-bold text-gray-700 uppercase tracking-widest mb-0.5">City</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
            <input value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} required type="text" className="w-full pl-10 pr-3 py-2 rounded-xl bg-gray-50 border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all font-bold text-xs" placeholder="Mumbai, Delhi, etc." />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <div>
          <label className="block text-[10px] font-bold text-gray-700 uppercase tracking-widest mb-0.5">Email</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
            <input value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required type="email" className="w-full pl-10 pr-3 py-2 rounded-xl bg-gray-50 border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all font-bold text-xs" placeholder="you@example.com" />
          </div>
        </div>
        <div>
          <label className="block text-[10px] font-bold text-gray-700 uppercase tracking-widest mb-0.5">Products</label>
          <div className="relative">
            <ShoppingBag className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
            <input value={formData.products} onChange={e => setFormData({...formData, products: e.target.value})} required type="text" className="w-full pl-10 pr-3 py-2 rounded-xl bg-gray-50 border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all font-bold text-xs" placeholder="What do you sell?" />
          </div>
        </div>
      </div>
      <div>
        <label className="block text-[10px] font-bold text-gray-700 uppercase tracking-widest mb-0.5">Ever sold online?</label>
        <div className="relative">
          <Globe2 className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
          <select value={formData.soldOnline} onChange={e => setFormData({...formData, soldOnline: e.target.value})} required className="w-full pl-10 pr-8 py-2 rounded-xl bg-gray-50 border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all font-bold appearance-none text-xs">
            <option value="">Select Option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={14} />
        </div>
      </div>
      <button disabled={loading} type="submit" className="w-full bg-indigo-900 text-white py-3 rounded-2xl text-sm font-black hover:bg-indigo-950 transition-all shadow-xl shadow-indigo-100 mt-1 disabled:opacity-70">
        {loading ? "Processing..." : "Book Now"}
      </button>
    </form>
  );
};

const HelpCenterContent = () => {
  const faqs = [
    { q: "What is the cost to start?", a: "We build your professional e-commerce store for a flat subscription of just ₹599 per month. There are no upfront setup fees or hidden charges." },
    { q: "How long does it take to go live?", a: "Once you provide your product catalog and business details, our team can have your professional store ready in as little as 48 hours." },
    { q: "Who handles the delivery?", a: "We have a pan-India logistics network. When an order is placed, we handle the pickup from your location and delivery to the customer." },
    { q: "Is there any commission on sales?", a: "We charge a minimal 2% commission on your sales for payment processing and platform maintenance. You keep 98% of your revenue, plus the flat monthly fee." }
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-indigo-50 rounded-2xl border border-indigo-100">
          <Mail className="text-indigo-600 mb-4" />
          <h4 className="font-black text-indigo-950 mb-2">Email Support</h4>
          <p className="text-sm text-gray-600 font-bold">sell@tukka.tech</p>
        </div>
        <div className="p-6 bg-orange-50 rounded-2xl border border-orange-100">
          <Phone className="text-orange-600 mb-4" />
          <h4 className="font-black text-indigo-950 mb-2">Call Us</h4>
          <p className="text-sm text-gray-600 font-bold">+91 9873138444</p>
        </div>
        <div className="p-6 bg-indigo-50 rounded-2xl border border-indigo-100">
          <MapPin className="text-indigo-600 mb-4" />
          <h4 className="font-black text-indigo-950 mb-2">Office</h4>
          <p className="text-xs leading-snug text-gray-600 font-bold">Office no 1042, Gaur City Mall, Office Suits, Greater Noida, Uttar Pradesh, India, 201310</p>
        </div>
      </div>
      
      <div>
        <h3 className="text-2xl font-black text-indigo-950 mb-6">Frequently Asked Questions</h3>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
              <h4 className="font-black text-indigo-950 mb-2 flex items-center gap-2">
                <ChevronRight size={18} className="text-orange-500" />
                {faq.q}
              </h4>
              <p className="text-gray-600 font-medium pl-6">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const PrivacyPolicyContent = () => (
  <div className="prose prose-indigo max-w-none text-gray-600 font-medium leading-relaxed space-y-6">
    <p>At Tukka.tech, we take your privacy seriously. This policy outlines how we collect, use, and protect your data.</p>
    <h4 className="text-xl font-black text-indigo-950">1. Data Collection</h4>
    <p>We collect information necessary to build your store, process payments, and handle logistics. This includes business name, contact details, and product information.</p>
    <h4 className="text-xl font-black text-indigo-950">2. Data Usage</h4>
    <p>Your data is used solely to provide our services. We do not sell your data to third parties. We share necessary info with logistics partners for delivery purposes.</p>
    <h4 className="text-xl font-black text-indigo-950">3. Security</h4>
    <p>We use industry-standard encryption to protect your data and payment information. Our systems are monitored 24/7 for security threats.</p>
  </div>
);

const TermsOfServiceContent = () => (
  <div className="prose prose-indigo max-w-none text-gray-600 font-medium leading-relaxed space-y-6">
    <p>By using Tukka.tech, you agree to the following terms and conditions.</p>
    <h4 className="text-xl font-black text-indigo-950">1. Subscription Model & Fees</h4>
    <p>Tukka.tech operates on a flat monthly subscription of ₹599. This fee covers website maintenance, hosting, and access to our ecosystem tools. In addition, a minimal 2% commission is applied to all sales processed through the platform.</p>
    <h4 className="text-xl font-black text-indigo-950">2. Service Scope</h4>
    <p>We provide website creation, hosting, marketing support, and logistics. The quality and legality of products sold are the sole responsibility of the merchant.</p>
    <h4 className="text-xl font-black text-indigo-950">3. Logistics</h4>
    <p>Merchants must ensure products are packed securely for pickup. Tukka.tech is responsible for the delivery process once the package is handed over.</p>
  </div>
);

const Navbar = ({ onOpenModal }: { onOpenModal: (type: string) => void }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <a href="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
            <div className="w-10 h-10 bg-indigo-900 rounded-xl flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-indigo-200">T</div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold tracking-tight text-indigo-950 leading-none">Tukka.tech</span>
              <span className="text-[11px] font-bold text-gray-600 uppercase tracking-wider mt-0.5">( Sellers Login Authorized Partner )</span>
            </div>
          </a>
          
          <div className="hidden md:flex items-center space-x-10">
            <a href="#how-it-works" className="text-sm font-semibold text-gray-600 hover:text-indigo-900 transition-colors">How it works</a>
            <a href="#services" className="text-sm font-semibold text-gray-600 hover:text-indigo-900 transition-colors">Services</a>
            <a href="#pricing" className="text-sm font-semibold text-gray-600 hover:text-indigo-900 transition-colors">Pricing</a>
            <button 
              onClick={() => onOpenModal('contact')}
              className="bg-orange-500 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-orange-600 transition-all shadow-lg shadow-orange-200 active:scale-95"
            >
              Start Now
            </button>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-indigo-900 p-2">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-white border-b border-gray-100 px-4 pt-4 pb-8 space-y-4 shadow-xl"
        >
          <a href="#how-it-works" className="block text-lg font-semibold text-gray-700 px-4 py-2" onClick={() => setIsOpen(false)}>How it works</a>
          <a href="#services" className="block text-lg font-semibold text-gray-700 px-4 py-2" onClick={() => setIsOpen(false)}>Services</a>
          <a href="#pricing" className="block text-lg font-semibold text-gray-700 px-4 py-2" onClick={() => setIsOpen(false)}>Pricing</a>
          <div className="px-4 pt-2">
            <button 
              onClick={() => { onOpenModal('contact'); setIsOpen(false); }}
              className="w-full bg-orange-500 text-white px-5 py-4 rounded-2xl text-lg font-bold shadow-lg shadow-orange-100"
            >
              Start Now
            </button>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

const Hero = ({ onOpenModal }: { onOpenModal: (type: string) => void }) => {
  return (
    <section className="relative pt-20 pb-20 lg:pt-24 lg:pb-32 overflow-visible bg-white">
      {/* Background Accents */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-indigo-50/30 -skew-x-12 transform origin-top-right -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-900 text-xs font-extrabold uppercase tracking-widest mb-8">
              <Zap size={14} className="fill-indigo-900" />
              Digital Transformation for Bharat
            </div>
            <h1 className="text-5xl lg:text-7xl font-black text-indigo-950 leading-[1.05] mb-8 tracking-tighter">
              Apni Online Dukaan Shuru Karein—<span className="text-orange-500">Sirf ₹599/Month Mein.</span>
            </h1>
            <p className="text-xl lg:text-2xl text-gray-600 mb-10 max-w-xl leading-relaxed font-medium">
              Professional e-commerce website with full support. <br className="hidden lg:block" />
              Flat monthly fee. <span className="text-indigo-900 font-bold underline decoration-orange-500 decoration-4 underline-offset-4">Only 2% Commission on Sales.</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-5">
              <button 
                onClick={() => onOpenModal('contact')}
                className="bg-indigo-900 text-white px-10 py-5 rounded-2xl text-xl font-black hover:bg-indigo-950 transition-all shadow-2xl shadow-indigo-200 flex items-center justify-center gap-3 group"
              >
                Start Now
                <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="bg-white text-indigo-900 border-2 border-indigo-100 px-10 py-5 rounded-2xl text-xl font-black hover:border-indigo-300 transition-all flex items-center justify-center">
                Watch How it Works
              </button>
            </div>
            
            <div className="mt-12 flex items-center gap-8 border-t border-gray-100 pt-8">
              <div>
                <p className="text-3xl font-black text-indigo-950">₹599</p>
                <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">Per Month</p>
              </div>
              <div className="w-px h-12 bg-gray-200"></div>
              <div>
                <p className="text-3xl font-black text-indigo-950">2%</p>
                <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">Commission</p>
              </div>
              <div className="w-px h-12 bg-gray-200"></div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="text-green-600" size={32} />
                <p className="text-sm font-bold text-gray-700 leading-tight">Zero Risk <br /> for Retailers</p>
              </div>
              <div className="w-px h-12 bg-gray-200 hidden sm:block"></div>
              <div className="flex items-center gap-2">
                <RotateCcw className="text-blue-500" size={32} />
                <p className="text-sm font-bold text-gray-700 leading-tight">7 Days <br /> Refund</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="mt-4 lg:-mt-40 relative"
          >
            <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(30,27,75,0.25)] border-8 border-white">
              <img 
                src="/ecom.png" 
                alt="Indian e-commerce team packing orders" 
                className="w-full h-auto object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/40 to-transparent"></div>
            </div>
            
            {/* Floating Trust Card */}
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-10 -right-6 lg:-right-12 bg-white p-6 rounded-3xl shadow-2xl border border-indigo-50 flex items-center gap-5 z-20"
            >
              <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center text-green-600">
                <BarChart3 size={32} />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-bold uppercase tracking-widest">Weekly Settlement</p>
                <p className="text-2xl font-black text-indigo-950">On Time, Always</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Ecosystem = () => {
  const services = [
    {
      icon: <Store className="text-indigo-600" size={32} />,
      title: "Free Storefront",
      description: "High-speed, SEO-optimized website built to showcase your products beautifully. No coding required."
    },
    {
      icon: <TrendingUp className="text-orange-500" size={32} />,
      title: "Marketing Engine",
      description: "Built-in tools for Google & FB ads. We ensure your brand is omnipresent where your customers are."
    },
    {
      icon: <Truck className="text-indigo-600" size={32} />,
      title: "Logistics Hub",
      description: "Automated order booking and nationwide delivery tracking. We handle the pickup and the drop."
    },
    {
      icon: <CreditCard className="text-orange-500" size={32} />,
      title: "Fintech Suite",
      description: "Integrated Payment Gateway with 24-hour settlement cycles. Accept all UPI, Cards, and Wallets."
    },
    {
      icon: <Search className="text-indigo-600" size={32} />,
      title: "Advance SEO Feature",
      description: "Get found on Google with our advanced SEO tools. We optimize your store for maximum search visibility."
    },
    {
      icon: <PieChart className="text-orange-500" size={32} />,
      title: "Advance Analytic Feature",
      description: "Track your growth with real-time data. Understand your customers and sales with deep business insights."
    }
  ];

  return (
    <section id="services" className="py-32 bg-indigo-950 text-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 bg-indigo-500 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-orange-500 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-24">
          <h2 className="text-orange-500 font-black uppercase tracking-[0.3em] text-sm mb-6">The All-in-One Ecosystem</h2>
          <p className="text-4xl lg:text-6xl font-black tracking-tight">360° Services for Your Growth</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-sm p-10 rounded-[2.5rem] border border-white/10 hover:bg-white/10 transition-all group"
            >
              <div className="w-20 h-20 rounded-3xl bg-white flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-xl shadow-indigo-900/50">
                {service.icon}
              </div>
              <h3 className="text-3xl font-black mb-5 tracking-tight">{service.title}</h3>
              <p className="text-indigo-200 text-lg leading-relaxed font-medium">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const AdvancedFeatures = () => {
  const sections = [
    {
      title: "Advanced Analytics",
      description: "Get deep insights into your business performance with our enterprise-grade analytics suite.",
      icon: <Activity className="text-orange-500" size={40} />,
      features: [
        "Real-time visitor tracking & behavior",
        "Detailed sales & revenue breakdown",
        "Conversion rate optimization (CRO) metrics",
        "Heatmaps & customer journey mapping",
        "Custom exportable reports (PDF/Excel)"
      ],
      color: "from-orange-500/20 to-orange-500/5",
      borderColor: "border-orange-500/20"
    },
    {
      title: "Advanced SEO Tools",
      description: "Dominating search results shouldn't be hard. We automate the technical SEO for you.",
      icon: <Database className="text-indigo-600" size={40} />,
      features: [
        "Automatic Meta tag & Title generation",
        "Dynamic XML Sitemaps for Google",
        "Custom URL structures (SEO Friendly)",
        "Image Alt-text & size optimization",
        "Instant indexation on Search Console"
      ],
      color: "from-indigo-500/20 to-indigo-500/5",
      borderColor: "border-indigo-500/20"
    },
    {
      title: "Advanced Marketing",
      description: "Scale your brand with tools that drive high-intent traffic and recover lost sales.",
      icon: <TrendingUp className="text-orange-500" size={40} />,
      features: [
        "One-click FB Pixel & Meta Ads integration",
        "Google Merchant Center Feed (Shopping Ads)",
        "Abandoned Cart Recovery (Email & SMS)",
        "WhatsApp Checkout & Order notifications",
        "Built-in Coupon & Discount engine"
      ],
      color: "from-orange-500/20 to-orange-500/5",
      borderColor: "border-orange-500/20"
    }
  ];

  return (
    <section className="py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-24">
          <h2 className="text-indigo-900 font-black uppercase tracking-[0.3em] text-sm mb-6">Enterprise Grade Tools</h2>
          <p className="text-4xl lg:text-6xl font-black text-indigo-950 tracking-tight">Master Your Marketplace</p>
          <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto font-medium">Standard features are just the beginning. Our advanced suite is designed for serious scaling.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          {sections.map((section, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`relative p-10 rounded-[3rem] border-2 ${section.borderColor} bg-gradient-to-br ${section.color} flex flex-col h-full`}
            >
              <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mb-8 shadow-xl shadow-indigo-100">
                {section.icon}
              </div>
              <h3 className="text-3xl font-black text-indigo-950 mb-4">{section.title}</h3>
              <p className="text-gray-600 font-bold mb-8 leading-relaxed italic">"{section.description}"</p>
              
              <ul className="space-y-4 mb-10 flex-grow">
                {section.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-3 text-indigo-950 font-bold">
                    <CheckCircle size={18} className="text-green-600 mt-1 flex-shrink-0" />
                    <span className="leading-tight">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-6 border-t border-gray-100/50">
                <div className="flex items-center gap-2 text-indigo-900 font-black uppercase tracking-widest text-[10px]">
                  <Zap size={12} className="fill-indigo-900" />
                  Included in ₹599 Plan
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ReviewsCarousel = () => {
  const reviews = [
    { name: "Rajesh Kumar", role: "Owner, Rajesh Furniture", text: "Tukka.tech ne mere traditional business ko online laakar meri sales 3 guna badha di. Supporting staff bahut helpful hai.", rating: 5, location: "Delhi" },
    { name: "Priya Sharma", role: "Founder, Priya Boutique", text: "I was worried about technical stuff, but Tukka handled everything. From website to logistics, it's a complete package.", rating: 5, location: "Mumbai" },
    { name: "Aman Gupta", role: "Manager, Global Sarees", text: "The delivery management is seamless. We don't have to worry about pickups anymore. Highly recommended for retailers.", rating: 5, location: "Jaipur" },
    { name: "Vikram Singh", role: "Wholesaler, VS Electronics", text: "Pehle hum sirf local bechte the, ab pure desh mein delivery hoti hai. Best part is the low 2% commission.", rating: 4, location: "Ludhiana" },
    { name: "Sanya Mallik", role: "Owner, Lush Decor", text: "The SEO features actually work! We started getting organic orders within the first month. Amazing experience.", rating: 5, location: "Bangalore" },
    { name: "Amit Patel", role: "Director, Patel Spices", text: "Weekly settlements are always on time. Very transparent pricing with no hidden charges. Trustworthy partner.", rating: 5, location: "Ahmedabad" },
  ];

  // Double the reviews for infinite scroll
  const duplicatedReviews = [...reviews, ...reviews];

  return (
    <section className="py-32 bg-indigo-50/50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 text-center">
        <h2 className="text-orange-500 font-black uppercase tracking-[0.3em] text-sm mb-6">Success Stories</h2>
        <p className="text-4xl lg:text-6xl font-black text-indigo-950 tracking-tight">Trusted by 100+ Vendors</p>
      </div>

      <div className="relative flex group py-10">
        <div
          className="flex gap-8 animate-marquee group-hover:pause-animation px-4"
        >
          {duplicatedReviews.map((review, idx) => (
            <div
              key={idx}
              className="w-[400px] bg-white p-10 rounded-[2.5rem] shadow-xl shadow-indigo-100/50 border border-indigo-50 flex flex-col gap-6 flex-shrink-0"
            >
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < review.rating ? "fill-orange-500 text-orange-500" : "text-gray-200"}
                  />
                ))}
              </div>
              <p className="text-lg font-bold text-indigo-950 italic whitespace-normal leading-relaxed">
                "{review.text}"
              </p>
              <div className="mt-4 flex items-center gap-4">
                <div className="w-12 h-12 bg-indigo-900 rounded-full flex items-center justify-center text-white font-black text-xl flex-shrink-0">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-black text-indigo-950 leading-none mb-1">{review.name}</h4>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-widest leading-tight">{review.role} • {review.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const HowItWorks = ({ onOpenModal }: { onOpenModal: (type: string) => void }) => {
  const steps = [
    {
      number: "1",
      title: "Sign Up",
      description: "Register your business details and upload your product catalog."
    },
    {
      number: "2",
      title: "We Build Your Store",
      description: "Our experts design and launch your professional e-commerce site in 48 hours."
    },
    {
      number: "3",
      title: "Start Selling",
      description: "We drive traffic and handle marketing. You focus on quality products."
    },
    {
      number: "4",
      title: "Scale with Minimal 2% Commission",
      description: "We handle delivery and payments. You keep 98% of your revenue, alongside a flat ₹599/month."
    }
  ];

  return (
    <section id="how-it-works" className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-24">
          <h2 className="text-indigo-900 font-black uppercase tracking-[0.3em] text-sm mb-6">Simple 4-Step Process</h2>
          <p className="text-4xl lg:text-6xl font-black text-indigo-950 tracking-tight">How Tukka.tech Works</p>
        </div>
        
        <div className="grid md:grid-cols-4 gap-12 relative">
          {/* Connector Line */}
          <div className="hidden lg:block absolute top-12 left-0 right-0 h-1 bg-indigo-50 -z-10"></div>
          
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="w-24 h-24 bg-indigo-900 text-white rounded-3xl flex items-center justify-center text-4xl font-black mx-auto mb-10 shadow-2xl shadow-indigo-200 relative z-10">
                {step.number}
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-black text-indigo-950 mb-5 tracking-tight">{step.title}</h3>
                <p className="text-gray-600 font-medium leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-24 p-10 rounded-[3rem] bg-orange-50 border-2 border-orange-100 flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center text-white">
              <ShieldCheck size={40} />
            </div>
            <div>
              <p className="text-2xl font-black text-indigo-950 tracking-tight">Built for Traditional Businesses</p>
              <p className="text-gray-600 font-bold">Zero Risk for Retailers & Wholesalers</p>
            </div>
          </div>
          <button 
            onClick={() => onOpenModal('contact')}
            className="bg-indigo-900 text-white px-10 py-5 rounded-2xl text-xl font-black hover:bg-indigo-950 transition-all shadow-xl"
          >
            Join the Revolution
          </button>
        </div>
      </div>
    </section>
  );
};

const Pricing = ({ onOpenModal }: { onOpenModal: (type: string) => void }) => {
  return (
    <section id="pricing" className="py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-indigo-900 font-black uppercase tracking-[0.3em] text-sm mb-6">Transparent Pricing</h2>
            <p className="text-4xl lg:text-6xl font-black text-indigo-950 tracking-tight">No Hidden Costs. Ever.</p>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-white rounded-[4rem] shadow-[0_50px_100px_-20px_rgba(30,27,75,0.15)] border-4 border-indigo-900 overflow-hidden"
          >
            <div className="grid lg:grid-cols-2">
              <div className="p-12 lg:p-20 bg-indigo-900 text-white flex flex-col justify-center text-center lg:text-left">
                <h3 className="text-3xl font-black mb-4 tracking-tight">Subscription Plan</h3>
                <div className="text-8xl lg:text-9xl font-black mb-6 tracking-tighter">₹599</div>
                <p className="text-xl text-indigo-200 font-bold uppercase tracking-widest">Per Month Only</p>
              </div>
              
              <div className="p-12 lg:p-20 flex flex-col justify-center">
                <h3 className="text-3xl font-black text-indigo-950 mb-8 tracking-tight">What You Get</h3>
                <div className="flex items-baseline gap-4 mb-10">
                  <span className="text-8xl font-black text-orange-500 tracking-tighter">2%</span>
                  <span className="text-xl font-bold text-gray-500 uppercase tracking-widest">Commission</span>
                </div>
                
                <ul className="space-y-5 mb-12">
                  {[
                    "Professional E-commerce Website",
                    "Free Hosting & SSL",
                    "Marketing & Ads Support",
                    "Advance SEO & Analytics",
                    "Integrated Logistics Chain",
                    "24/7 Priority Support"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-4 text-gray-700 font-bold">
                      <CheckCircle className="text-green-600" size={24} />
                      {item}
                    </li>
                  ))}
                </ul>
                
                <button 
                  onClick={() => onOpenModal('contact')}
                  className="w-full bg-indigo-900 text-white py-6 rounded-3xl text-2xl font-black hover:bg-indigo-950 transition-all shadow-2xl shadow-indigo-100"
                >
                  Get Started Now
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const DeliveryBanner = () => {
  return (
    <section className="py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <div className="w-20 h-20 bg-orange-100 rounded-3xl flex items-center justify-center text-orange-600 mb-10">
              <Truck size={48} />
            </div>
            <h2 className="text-4xl lg:text-6xl font-black text-indigo-950 mb-8 tracking-tight leading-tight">
              From Our Warehouse <br />
              <span className="text-orange-500">To Their Doorstep.</span>
            </h2>
            <p className="text-xl text-gray-600 mb-10 leading-relaxed font-medium">
              Our dedicated delivery partners ensure your customers receive their orders safely and on time. We handle the entire logistics chain so you can focus on creating great products.
            </p>
            <div className="grid grid-cols-2 gap-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-900">
                  <Globe2 size={24} />
                </div>
                <span className="font-black text-indigo-950 uppercase tracking-widest text-xs">Pan-India Network</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-900">
                  <Clock size={24} />
                </div>
                <span className="font-black text-indigo-950 uppercase tracking-widest text-xs">Real-time Tracking</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2 mb-16 lg:mb-0"
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-orange-500/10 rounded-[3rem] rotate-3 -z-10"></div>
              <img 
                src="/ecom2.png" 
                alt="Courier boy delivering package to home" 
                className="relative z-10 rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(249,115,22,0.3)] w-full h-auto object-cover border-8 border-white"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Footer = ({ onOpenModal }: { onOpenModal: (type: string) => void }) => {
  return (
    <footer className="bg-indigo-950 text-white pt-32 pb-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          <div className="col-span-1 lg:col-span-1">
            <a href="/" className="flex items-center gap-3 mb-8 hover:opacity-90 transition-opacity w-fit inline-flex">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-indigo-950 font-black text-2xl">T</div>
              <div className="flex flex-col">
                <span className="text-3xl font-black tracking-tight leading-none">Tukka.tech</span>
                <span className="text-[11px] font-bold text-indigo-200 uppercase tracking-wider mt-1">( Sellers Login Authorized Partner )</span>
              </div>
            </a>
            <p className="text-indigo-200 mb-6 leading-relaxed font-medium text-lg">
              Empowering local brands to go digital with minimal 2% commission and maximum growth.
            </p>
            <div className="flex items-start gap-3 text-indigo-200 font-medium text-sm mb-4">
              <MapPin size={20} className="mt-0.5 text-orange-500 flex-shrink-0" />
              <p>Office no 1042, Gaur City Mall, Office Suits, Greater Noida, Uttar Pradesh, India, 201310</p>
            </div>
            <div className="flex items-center gap-3 text-indigo-200 font-medium text-sm">
              <Mail size={20} className="text-orange-500 flex-shrink-0" />
              <a href="mailto:sell@tukka.tech" className="hover:text-white transition-colors">sell@tukka.tech</a>
            </div>
          </div>
          
          <div>
            <h4 className="text-xl font-black mb-8 tracking-tight">Quick Links</h4>
            <ul className="space-y-5 text-indigo-200 font-bold">
              <li><a href="#how-it-works" className="hover:text-orange-500 transition-colors">How it works</a></li>
              <li><a href="#services" className="hover:text-orange-500 transition-colors">Services</a></li>
              <li><a href="#pricing" className="hover:text-orange-500 transition-colors">Pricing</a></li>
              <li><button onClick={() => onOpenModal('contact')} className="hover:text-orange-500 transition-colors">Success Stories</button></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-xl font-black mb-8 tracking-tight">Support</h4>
            <ul className="space-y-5 text-indigo-200 font-bold">
              <li><button onClick={() => onOpenModal('help')} className="hover:text-orange-500 transition-colors">Help Center</button></li>
              <li><button onClick={() => onOpenModal('contact')} className="hover:text-orange-500 transition-colors">Contact Us</button></li>
              <li><button onClick={() => onOpenModal('privacy')} className="hover:text-orange-500 transition-colors">Privacy Policy</button></li>
              <li><button onClick={() => onOpenModal('terms')} className="hover:text-orange-500 transition-colors">Terms of Service</button></li>
            </ul>
          </div>
          
          <div className="bg-white/5 p-8 rounded-[2rem] border border-white/10">
            <h4 className="text-xl font-black mb-6 tracking-tight">Our Mission</h4>
            <p className="text-indigo-200 font-bold mb-6 italic leading-relaxed">
              "Made for Bharat. Built for the entrepreneurs who are the backbone of our economy."
            </p>
            <div className="flex items-center gap-3 text-orange-500 font-black uppercase tracking-widest text-xs">
              <Globe2 size={16} />
              <span>Digital Bharat Mission</span>
            </div>
          </div>
        </div>
        
        <div className="pt-16 border-t border-white/10 flex flex-col md:row justify-between items-center gap-8">
          <p className="text-indigo-300 font-bold">© 2026 Tukka.tech. All rights reserved.</p>
          <div className="flex items-center gap-2 text-indigo-300 font-bold">
            Made with <span className="text-orange-500">❤</span> in India
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveModal('contact');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const getModalTitle = () => {
    switch (activeModal) {
      case 'contact': 
        return (
          <div className="flex flex-col gap-4 w-full">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full">
              <a href="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
                <div className="w-8 h-8 bg-indigo-900 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-md shadow-indigo-100">T</div>
                <div className="flex flex-col">
                  <span className="text-lg font-bold tracking-tight text-indigo-950 leading-none">Tukka.tech</span>
                  <span className="text-[10px] font-bold text-gray-600 uppercase tracking-wider mt-0.5">( Sellers Login Authorized Partner )</span>
                </div>
              </a>
              <div className="flex items-center gap-1.5 bg-orange-50 px-3 py-1 rounded-full border border-orange-100">
                <Zap className="text-orange-600" size={12} />
                <span className="text-[9px] font-black text-orange-600 uppercase tracking-[0.1em]">Limited Time Offer</span>
              </div>
            </div>
            <div className="text-center sm:text-left">
              <h2 className="text-[20px] lg:text-[24px] font-black text-indigo-950 leading-tight tracking-tight">
                We Create your Ecommerce Website in Just <span className="text-orange-600">Rs 599/month</span>
              </h2>
              <p className="text-xs lg:text-sm font-medium text-gray-500 leading-relaxed">
               You will get Hosting , Live Advance Analytics , Payment Gateway , Courior collection and many features in dashboard
              </p>
            </div>
          </div>
        );
      case 'help': return 'Help Center';
      case 'privacy': return 'Privacy Policy';
      case 'terms': return 'Terms of Service';
      default: return '';
    }
  };

  const renderModalContent = () => {
    switch (activeModal) {
      case 'contact': return <ContactForm />;
      case 'help': return <HelpCenterContent />;
      case 'privacy': return <PrivacyPolicyContent />;
      case 'terms': return <TermsOfServiceContent />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-orange-100 selection:text-orange-900">
      <WebsiteAnalyticsTracker />
      <Navbar onOpenModal={setActiveModal} />
      <main>
        <Hero onOpenModal={setActiveModal} />
        <HowItWorks onOpenModal={setActiveModal} />
        <Ecosystem />
        <Pricing onOpenModal={setActiveModal} />
        <AdvancedFeatures />
        <ReviewsCarousel />
        <DeliveryBanner />
        
        {/* Final CTA Section */}
        <section className="py-32 bg-white">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-indigo-900 rounded-[4rem] p-16 lg:p-24 text-white shadow-[0_50px_100px_-20px_rgba(30,27,75,0.3)] relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/20 blur-[100px] rounded-full"></div>
              
              <div className="relative z-10">
                <h2 className="text-4xl lg:text-6xl font-black mb-8 tracking-tight">Ready to grow your business?</h2>
                <p className="text-xl lg:text-2xl text-indigo-100 mb-12 leading-relaxed font-medium max-w-2xl mx-auto">
                  Join hundreds of successful brands who launched their e-commerce journey with Tukka.tech. No risk, just results.
                </p>
                <div className="flex justify-center">
                  <button 
                    onClick={() => setActiveModal('contact')}
                    className="bg-orange-500 text-white px-12 py-6 rounded-3xl font-black text-2xl hover:bg-orange-600 transition-all shadow-2xl shadow-orange-900/30 hover:scale-105"
                  >
                    Get Started Now
                  </button>
                </div>
                <p className="mt-12 text-sm text-indigo-300 font-bold uppercase tracking-widest">Start your digital journey today. Cancel anytime.</p>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer onOpenModal={setActiveModal} />

      <Modal 
        isOpen={!!activeModal} 
        onClose={() => setActiveModal(null)} 
        title={getModalTitle()}
      >
        {renderModalContent()}
      </Modal>
    </div>
  );
}
