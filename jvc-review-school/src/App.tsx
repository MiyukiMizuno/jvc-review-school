/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  BookOpen, 
  CheckCircle, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowRight, 
  Star, 
  Users, 
  Award,
  GraduationCap,
  ChevronRight,
  Send,
  Loader2,
  Facebook
} from 'lucide-react';
import { motion } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const PRODUCTS = [
  {
    id: 'board-exam',
    title: 'Professional Board Review',
    description: 'Comprehensive preparation for Engineering, Nursing, and Accountancy licensure exams.',
    price: '₱12,500',
    features: ['Live Lectures', 'Updated Study Materials', 'Mock Exams', 'Personal Mentorship'],
    icon: GraduationCap,
    color: 'bg-red-600'
  },
  {
    id: 'civil-service',
    title: 'Civil Service Prep',
    description: 'Master the fundamentals for both Professional and Sub-professional levels.',
    price: '₱5,500',
    features: ['Math & Logic Drills', 'English Proficiency', 'General Information', 'Time Management Tips'],
    icon: Award,
    color: 'bg-orange-600'
  },
  {
    id: 'ielts-toefl',
    title: 'English Proficiency (IELTS/TOEFL)',
    description: 'Achieve your target band score for work or study abroad opportunities.',
    price: '₱8,000',
    features: ['Speaking Practice', 'Writing Feedback', 'Listening Exercises', 'Reading Strategies'],
    icon: BookOpen,
    color: 'bg-rose-600'
  }
];

const TESTIMONIALS = [
  {
    name: 'Maria Santos',
    role: 'Registered Nurse',
    text: 'The review materials were spot on. I felt confident walking into the exam room thanks to Elite.',
    avatar: 'https://picsum.photos/seed/nurse/100/100'
  },
  {
    name: 'John Doe',
    role: 'Civil Engineer',
    text: 'The instructors are experts in their fields. They don\'t just teach; they inspire.',
    avatar: 'https://picsum.photos/seed/engineer/100/100'
  }
];

export default function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    product: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setStatusMessage(data.message || 'Thank you! We will contact you soon.');
        setFormData({ name: '', email: '', product: '', message: '' });
      } else {
        throw new Error(data.error || 'Something went wrong');
      }
    } catch (error: any) {
      setStatus('error');
      setStatusMessage(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-600 text-white shadow-lg shadow-red-200">
              <GraduationCap size={24} />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">JVC Review School</span>
          </div>
          <nav className="hidden md:block">
            <ul className="flex gap-8 text-sm font-medium text-slate-600">
              <li><a href="#home" className="transition-colors hover:text-red-600">Home</a></li>
              <li><a href="#products" className="transition-colors hover:text-red-600">Courses</a></li>
              <li><a href="#about" className="transition-colors hover:text-red-600">About</a></li>
              <li><a href="#contact" className="transition-colors hover:text-red-600">Contact</a></li>
            </ul>
          </nav>
          <a 
            href="#contact" 
            className="rounded-full bg-red-600 px-5 py-2 text-sm font-semibold text-white shadow-md transition-all hover:bg-red-700 hover:shadow-lg active:scale-95"
          >
            Enroll Now
          </a>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section id="home" className="relative overflow-hidden bg-white py-20 sm:py-32">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.red.50),white)]" />
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-1 text-sm font-medium text-red-700 ring-1 ring-inset ring-red-700/10">
                  <Star size={14} className="fill-red-700" />
                  <span>Top Rated Review Center 2025</span>
                </div>
                <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl">
                  Your Journey to <span className="text-red-600">Professional Success</span> Starts Here.
                </h1>
                <p className="mt-6 text-lg leading-8 text-slate-600">
                  We provide the most comprehensive and up-to-date review materials and expert-led lectures to help you ace your licensure exams and professional certifications.
                </p>
                <div className="mt-10 flex items-center gap-x-6">
                  <a href="#products" className="rounded-xl bg-red-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-red-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">
                    Explore Courses
                  </a>
                  <a href="#about" className="text-sm font-semibold leading-6 text-slate-900 flex items-center gap-1">
                    Learn more <ArrowRight size={16} />
                  </a>
                </div>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                <img 
                  src="https://scontent.fmnl17-3.fna.fbcdn.net/v/t39.30808-6/633424369_1454753626015550_4658390516534542809_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=13d280&_nc_eui2=AeGiKnfH-Y2dcTv2agLmJDQfgtESahxx-5qC0RJqHHH7mh9z7tg0J-A4a__t0t_Hw73qLf-UqgV5wG7Qe_Krec0P&_nc_ohc=vMj0pfGnptwQ7kNvwEEV0Mh&_nc_oc=AdmCNG0_M4x6KrrZwgBXdyhNfa2hiBFNwHIV5r-4IyMWEsuquBH44xD83SzQmKFapBw&_nc_zt=23&_nc_ht=scontent.fmnl17-3.fna&_nc_gid=ND_A5Jcg2OUlrvikpyc61A&_nc_ss=8&oh=00_Afy9NVlydD8qtcSsJNws2jIPrO-wsaG_uwbrCMaorzh5lA&oe=69B41E0C" 
                  alt="Students studying" 
                  className="rounded-2xl shadow-2xl ring-1 ring-slate-200"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute -bottom-6 -left-6 rounded-2xl bg-white p-6 shadow-xl ring-1 ring-slate-200">
                  <div className="flex items-center gap-4">
                    <div className="flex -space-x-2">
                      {[1, 2, 3].map(i => (
                        <img key={i} src={`https://picsum.photos/seed/user${i}/40/40`} className="h-10 w-10 rounded-full border-2 border-white" referrerPolicy="no-referrer" alt="" />
                      ))}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">5,000+ Passers</p>
                      <p className="text-xs text-slate-500">Join our community</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-slate-50 py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {[
                { label: 'Success Rate', value: '95%' },
                { label: 'Expert Mentors', value: '10+' },
                { label: 'Years Experience', value: '15+' },
                { label: 'Study Centers', value: '12' },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <p className="text-3xl font-bold text-red-600">{stat.value}</p>
                  <p className="text-sm font-medium text-slate-500 uppercase tracking-wider mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section id="products" className="py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-base font-semibold leading-7 text-red-600">Our Offerings</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Choose Your Path to Success
              </p>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                Tailored review programs designed to maximize your potential and ensure you are fully prepared for the big day.
              </p>
            </div>

            <div className="mt-16 grid gap-8 md:grid-cols-3">
              {PRODUCTS.map((product, i) => (
                <motion.div 
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex flex-col rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200 transition-all hover:shadow-xl hover:-translate-y-1"
                >
                  <div className={cn("mb-6 flex h-12 w-12 items-center justify-center rounded-2xl text-white", product.color)}>
                    <product.icon size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">{product.title}</h3>
                  <p className="mt-4 flex-grow text-sm leading-6 text-slate-600">{product.description}</p>
                  <div className="mt-6 border-t border-slate-100 pt-6">
                    <p className="text-sm font-semibold text-slate-900">What's included:</p>
                    <ul className="mt-4 space-y-3">
                      {product.features.map((feature, j) => (
                        <li key={j} className="flex items-center gap-3 text-sm text-slate-600">
                          <CheckCircle size={16} className="text-emerald-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-8 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-slate-500 uppercase">Starting at</p>
                      <p className="text-2xl font-bold text-slate-900">{product.price}</p>
                    </div>
                    <button 
                      onClick={() => {
                        setFormData(prev => ({ ...prev, product: product.title }));
                        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="rounded-full bg-slate-900 p-2 text-white transition-colors hover:bg-red-600"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="bg-slate-900 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-base font-semibold leading-7 text-red-400">Success Stories</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Trusted by Thousands of Professionals
              </p>
            </div>
            <div className="mt-16 grid gap-8 md:grid-cols-2">
              {TESTIMONIALS.map((t, i) => (
                <div key={i} className="rounded-3xl bg-white/5 p-8 ring-1 ring-white/10">
                  <div className="flex gap-1 text-yellow-400 mb-4">
                    {[1, 2, 3, 4, 5].map(star => <Star key={star} size={16} fill="currentColor" />)}
                  </div>
                  <p className="text-lg leading-8 text-slate-300 italic">"{t.text}"</p>
                  <div className="mt-8 flex items-center gap-4">
                    <img src={t.avatar} alt={t.name} className="h-12 w-12 rounded-full" referrerPolicy="no-referrer" />
                    <div>
                      <p className="font-bold text-white">{t.name}</p>
                      <p className="text-sm text-slate-400">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact/Inquiry Form */}
        <section id="contact" className="py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-16 lg:grid-cols-2">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-slate-900">Get in Touch</h2>
                <p className="mt-4 text-lg leading-8 text-slate-600">
                  Interested in one of our programs? Fill out the form and our consultants will get back to you within 24 hours to discuss your review plan.
                </p>

                <div className="mt-10 space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100 text-red-600">
                      <Mail size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">Email Us</p>
                      <p className="text-sm text-slate-600">jvcreviewschool@gmail.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100 text-red-600">
                      <Phone size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">Call Us</p>
                      <p className="text-sm text-slate-600">+63 (02) 8888-9999</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100 text-red-600">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">Visit Us</p>
                      <p className="text-sm text-slate-600">123 Education St., Sampaloc, Manila</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl bg-white p-8 shadow-xl ring-1 ring-slate-200">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-slate-700">Full Name</label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={formData.name}
                        onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        className="mt-1 block w-full rounded-xl border-slate-200 bg-slate-50 px-4 py-3 text-sm transition-focus focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-500/10 outline-none border"
                        placeholder="Juan Dela Cruz"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        className="mt-1 block w-full rounded-xl border-slate-200 bg-slate-50 px-4 py-3 text-sm transition-focus focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-500/10 outline-none border"
                        placeholder="juan@example.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="product" className="block text-sm font-medium text-slate-700">Interested Course</label>
                    <select
                      id="product"
                      required
                      value={formData.product}
                      onChange={e => setFormData(prev => ({ ...prev, product: e.target.value }))}
                      className="mt-1 block w-full rounded-xl border-slate-200 bg-slate-50 px-4 py-3 text-sm transition-focus focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-500/10 outline-none border"
                    >
                      <option value="">Select a course</option>
                      {PRODUCTS.map(p => <option key={p.id} value={p.title}>{p.title}</option>)}
                      <option value="Other">Other Inquiry</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-slate-700">Message (Optional)</label>
                    <textarea
                      id="message"
                      rows={4}
                      value={formData.message}
                      onChange={e => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      className="mt-1 block w-full rounded-xl border-slate-200 bg-slate-50 px-4 py-3 text-sm transition-focus focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-500/10 outline-none border resize-none"
                      placeholder="Tell us about your goals..."
                    />
                  </div>

                  {status !== 'idle' && (
                    <div className={cn(
                      "rounded-xl p-4 text-sm font-medium",
                      status === 'success' ? "bg-emerald-50 text-emerald-700" : 
                      status === 'error' ? "bg-red-50 text-red-700" : "bg-red-50 text-red-700"
                    )}>
                      {status === 'loading' ? (
                        <div className="flex items-center gap-2">
                          <Loader2 className="animate-spin" size={16} />
                          Sending inquiry...
                        </div>
                      ) : statusMessage}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-6 py-4 text-base font-bold text-white shadow-lg shadow-red-200 transition-all hover:bg-red-700 hover:shadow-red-300 active:scale-95 disabled:opacity-50"
                  >
                    Send Inquiry <Send size={18} />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-600 text-white">
                <GraduationCap size={18} />
              </div>
              <span className="text-lg font-bold tracking-tight text-slate-900">JVC Review School</span>
            </div>
            <p className="text-sm text-slate-500">
              © 2026 JVC Review School. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-slate-400 hover:text-red-600 transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-slate-400 hover:text-red-600 transition-colors" aria-label="TikTok">
                <svg
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
