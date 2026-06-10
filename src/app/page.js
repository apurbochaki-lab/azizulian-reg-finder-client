'use client';
import { useState } from 'react';
import { Person, Hashtag, Magnifier, Handset, ArrowRight } from '@gravity-ui/icons';
import toast from 'react-hot-toast';
import { Button } from '@heroui/react';
import Link from 'next/link';

export default function Home() {
  // In formData = name & reg data
  const [formData, setFormData] = useState({ name: '', regNumber: '', phnNumber: '' });
  const [searchReg, setSearchReg] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [message, setMessage] = useState(''); // বাংলা এরর মেসেজের জন্য স্টেট

  // ফর্ম সাবমিট হ্যান্ডলার
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Name & reg jodi na thake
    if (!formData.name.trim() || !formData.regNumber) {
      setMessage('দয়া করে নাম এবং রেজিস্ট্রেশন নাম্বার পূরণ করুন।');
      toast.error('Required fields missing!');
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/students`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();

      if (res.ok) {
        setMessage('');
        toast.success('Registered successfully!');
        setFormData({ name: '', regNumber: '', phnNumber: '' }); // ফর্ম ক্লিয়ার করা
      } else {
        setMessage(data.error || 'রেজিস্ট্রেশন ব্যর্থ হয়েছে।');
        toast.error('Registration failed!');
      }
    } catch (error) {
      setMessage('নেটওয়ার্ক এরর! সার্ভার চেক করুন।');
      toast.error('Network error!');
    }
  };

  // সার্চ হ্যান্ডলার
  const handleSearch = async (e) => {
    e.preventDefault();

    if (!searchReg) {
      setMessage('দয়া করে রেজিস্ট্রেশন নাম্বার দিন।');
      toast.error('Reg Number required!');
      return;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER}/api/search/${searchReg}`
      );
      const data = await res.json();

      if (res.ok) {
        setSearchResult(data);
        setMessage(''); // ডাটা পাওয়া গেলে এরর ব্যানার চলে যাবে
        toast.success('Record found!');
      } else {
        setSearchResult(null);
        setMessage(data.error || 'ডাটাবেসে কোনো তথ্য পাওয়া যায়নি।');
        toast.error('No record found!');
      }
    } catch (error) {
      setSearchResult(null);
      setMessage('নেটওয়ার্ক এরর! সার্ভার চেক করুন।');
      toast.error('Network error!');
    }
  };

  return (
    <div className="min-h-[90vh] bg-slate-950 p-4 md:p-8 flex flex-col items-center text-slate-100">

      {/* হেডার টেক্সট এখন ডার্ক থিমে আরও উজ্জ্বল ও ক্লিয়ার */}
      <h1 className="text-3xl pb-5 font-bold text-green-400 mb-8 text-center tracking-wide">
        Govt. Azizul Haque Student Portal
      </h1>

      {/* ডার্ক থিমের সাথে ম্যাচিং করা বাংলা এরর ব্যানার */}
      {message && (
        <div className="mb-6 w-full max-w-2xl rounded-lg bg-red-950/40 border border-red-900/60 p-3 text-red-200 font-medium text-center shadow-md">
          {message}
        </div>
      )}

      {/* ডাটা এন্ট্রি CARD */}
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-xl shadow-xl p-6 mb-8">
        <h2 className="text-xl text-slate-100 font-semibold mb-4 border-b border-slate-800 pb-2">
          ডাটাবেজে তথ্য এন্ট্রি করুন
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Person className="h-5 w-5 absolute left-3 top-3 text-slate-500" />
            <input
              type="text"
              placeholder="আপনার নাম"
              className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-100 placeholder-slate-500 transition-all"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div className="relative">
            <Hashtag className="h-5 w-5 absolute left-3 top-3 text-slate-500" />
            <input
              type="number"
              placeholder="রেজিস্ট্রেশন নাম্বার"
              className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-100 placeholder-slate-500 transition-all"
              value={formData.regNumber}
              onChange={(e) => setFormData({ ...formData, regNumber: e.target.value })}
            />
          </div>
          {/* Phone Number (optional) */}
          <div className="relative">
            <Handset className="h-5 w-5 absolute left-3 top-3 text-slate-500" />
            <input
              type="number"
              placeholder="মোবাইল নাম্বার (Optional)"
              className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-100 placeholder-slate-500 transition-all"
              value={formData.phnNumber}
              onChange={(e) => setFormData({ ...formData, phnNumber: e.target.value })}
            />
          </div>
          <Button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-500 font-medium transition-colors shadow-lg shadow-blue-900/20">
            সাবমিট করুন
          </Button>

        </form>
      </div>

      {/* সিট খোঁজার CARD */}
      <div className="mt-10 mb-10 w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-xl shadow-xl p-6">

        {/* 📢 জরুরি নোটিশ বক্স */}
        <div className="mb-6 w-full bg-amber-950/20 border border-amber-600/40 rounded-lg p-4 shadow-lg shadow-amber-900/10">
          <h3 className="text-md md:text-lg font-bold text-amber-400 mb-2 flex items-center">
            <span className="mr-2 text-xl">📢</span> জরুরি আপডেট ও নোটিশ!
          </h3>
          <div className="text-sm md:text-base text-amber-200/80 space-y-2 leading-relaxed">
            <p>
              আমাদের পোর্টালে ইতিমধ্যেই অনেকেই ডেটা সাবমিট করেছেন। সিট প্ল্যানিং আরও নির্ভুল করতে সিস্টেমে আপডেট আনা হয়েছে।
            </p>
            <p>
              এখন সার্চ করলে আপনার সিটের পাশাপাশি <strong>আশেপাশের আরও ৪টি সিট</strong> (আগের ২টি এবং পরের ২টি) দেখতে পাবেন। তবে মনে রাখবেন, ডাটাবেজে যদি আপনার ঠিক আগের বা পরের সিরিয়ালের কারও ডেটা এন্ট্রি করা না থাকে, তবে সেই জায়গাগুলোতে <span className="text-red-400 font-semibold">"ডাটা পাওয়া যায়নি"</span> দেখাবে।
            </p>
            <p className="font-semibold text-amber-300 mt-2">
              💡 সঠিক সিট প্ল্যান দেখতে আপনার বন্ধুদেরও সঠিক রেজিস্ট্রেশন নম্বর দিয়ে ডেটা এন্ট্রি করতে উৎসাহিত করুন।
            </p>
          </div>
        </div>

        <h2 className="text-xl text-slate-100 font-semibold mb-4 border-b border-slate-800 pb-2">
          রেজিস্ট্রেশন নম্বর দিয়ে সিট খুঁজুন
        </h2>
        <form onSubmit={handleSearch} className="flex space-x-2 mb-6">
          <input
            type="number"
            placeholder="রেজিস্ট্রেশন নাম্বার দিয়ে খুঁজুন"
            className="flex-1 px-4 py-2 bg-slate-950 border border-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-slate-100 placeholder-slate-500 transition-all text-sm md:text-[18px]"
            value={searchReg}
            onChange={(e) => setSearchReg(e.target.value)}
          />
          <Button type="submit" className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-500 font-medium flex items-center transition-colors shadow-lg shadow-green-900/20">
            <Magnifier className="h-5 w-5 mr-1" /> খুঁজুন
          </Button>
        </form>

        {searchResult && (
          // ৫ টি কার্ড দেখানোর জন্য grid-cols-1 থেকে md:grid-cols-5 করা হয়েছে
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-center items-center">

            {/* ১. তার আগের সিট (Current - 2) */}
            <div className="p-4 border border-slate-800 rounded-lg bg-slate-950/40">
              <h3 className="text-xs text-slate-400 font-medium">তার আগের সিট</h3>
              <p className="font-bold text-slate-200 mt-1">
                {searchResult.prevTwo ? searchResult.prevTwo.name : 'ডাটা পাওয়া যায়নি'}
              </p>
              <p className="text-xs text-slate-500 font-semibold mt-0.5">
                {searchResult.prevTwo?.regNumber
                  ? `*******${String(searchResult.prevTwo.regNumber).slice(-4)}`
                  : '—'
                }

                {/* {searchResult.prevTwo?.regNumber || '—'} */}
              </p>
              {searchResult.prevTwo && (
                <p className="text-xs text-slate-400 mt-1 border-t border-slate-800/60 pt-1">
                  {searchResult.prevTwo.phnNumber && !isNaN(searchResult.prevTwo.phnNumber)
                    ? `📞 0${searchResult.prevTwo.phnNumber}`
                    : '📞 N/A'}
                </p>
              )}
            </div>

            {/* ২. আগের সিট (Current - 1) */}
            <div className="p-4 border border-slate-800 rounded-lg bg-slate-950/40">
              <h3 className="text-sm text-slate-400 font-medium">আগের সিট</h3>
              <p className="font-bold text-slate-200 mt-1">
                {searchResult.previous ? searchResult.previous.name : 'ডাটা পাওয়া যায়নি'}
              </p>
              <p className="text-xs text-slate-500 font-semibold mt-0.5">
                {searchResult.previous?.regNumber
                  ? `*******${String(searchResult.previous.regNumber).slice(-4)}`
                  : '—'
                }
                {/* {searchResult.previous?.regNumber || '—'} */}
              </p>
              {searchResult.previous && (
                <p className="text-xs text-slate-400 mt-1 border-t border-slate-800/60 pt-1">
                  {searchResult.previous.phnNumber && !isNaN(searchResult.previous.phnNumber)
                    ? `📞 0${searchResult.previous.phnNumber}`
                    : '📞 N/A'}
                </p>
              )}
            </div>

            {/* ৩. সার্চকৃত মেইন সিট (Current) */}
            <div className="p-4 border-2 border-blue-500 rounded-lg bg-blue-950/40 shadow-xl shadow-blue-950/50 transform scale-105 z-10">
              <h3 className="text-sm text-blue-400 font-semibold">সার্চকৃত সিট</h3>
              <p className="font-bold text-lg text-white mt-1">{searchResult.current.name}</p>
              <p className="text-sm font-medium text-blue-300 mt-0.5">{searchResult.current.regNumber}</p>
              <p className="text-xs text-blue-200 mt-1 border-t border-blue-900/40 pt-1">
                {searchResult.current.phnNumber && !isNaN(searchResult.current.phnNumber)
                  ? `📞 0${searchResult.current.phnNumber}`
                  : '📞 N/A'}
              </p>
            </div>

            {/* ৪. পরের সিট (Current + 1) */}
            <div className="p-4 border border-slate-800 rounded-lg bg-slate-950/40">
              <h3 className="text-sm text-slate-400 font-medium">পরের সিট</h3>
              <p className="font-bold text-slate-200 mt-1">
                {searchResult.next ? searchResult.next.name : 'ডাটা পাওয়া যায়নি'}
              </p>
              <p className="text-xs text-slate-500 font-semibold mt-0.5">
                {searchResult.next?.regNumber
                  ? `*******${String(searchResult.next.regNumber).slice(-4)}`
                  : '—'
                }
                {/* {searchResult.next?.regNumber || '—'} */}
              </p>
              {searchResult.next && (
                <p className="text-xs text-slate-400 mt-1 border-t border-slate-800/60 pt-1">
                  {searchResult.next.phnNumber && !isNaN(searchResult.next.phnNumber)
                    ? `📞 0${searchResult.next.phnNumber}`
                    : '📞 N/A'}
                </p>
              )}
            </div>

            {/* ৫. তার পরের সিট (Current + 2) */}
            <div className="p-4 border border-slate-800 rounded-lg bg-slate-950/40">
              <h3 className="text-xs text-slate-400 font-medium">তার পরের সিট</h3>
              <p className="font-bold text-slate-200 mt-1">
                {searchResult.nextTwo ? searchResult.nextTwo.name : 'ডাটা পাওয়া যায়নি'}
              </p>
              <p className="text-xs text-slate-500 font-semibold mt-0.5">
                {searchResult.nextTwo?.regNumber
                  ? `*******${String(searchResult.nextTwo.regNumber).slice(-4)}`
                  : '—'
                }

                {/* {searchResult.nextTwo?.regNumber || '—'} */}
              </p>
              {searchResult.nextTwo && (
                <p className="text-xs text-slate-400 mt-1 border-t border-slate-800/60 pt-1">
                  {searchResult.nextTwo.phnNumber && !isNaN(searchResult.nextTwo.phnNumber)
                    ? `📞 0${searchResult.nextTwo.phnNumber}`
                    : '📞 N/A'}
                </p>
              )}
            </div>

          </div>
        )}
      </div>

      <div className='pb-10'>
        <Link href="/all-students-info">
          <Button variant='primary' className="rounded-lg font-bold">
            সব শিক্ষার্থীর ডাটা <ArrowRight />
          </Button>
        </Link>
      </div>
    </div>
  );
}