'use client';
import { useState } from 'react';
import { Person, Hashtag, Magnifier } from '@gravity-ui/icons';
import toast from 'react-hot-toast';
import { Button } from '@heroui/react';

export default function Home() {
  // In formData = name & reg data
  const [formData, setFormData] = useState({ name: '', regNumber: '' });
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
        setMessage(''); // সাকসেস হলে বাংলা এরর ব্যানার ক্লিয়ার হবে
        toast.success('Registered successfully!');
        setFormData({ name: '', regNumber: '' }); // ফর্ম ক্লিয়ার করা
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

      {/* হেডার টেক্সট এখন ডার্ক থিমে আরও উজ্জ্বল ও ক্লিয়ার */}
      <h1 className="text-3xl pb-5 font-bold text-green-400 mb-8 text-center tracking-wide">
        Govt. Azizul Haque Student Portal
      </h1>

      {/* ডার্ক থিমের সাথে ম্যাচিং করা বাংলা এরর ব্যানার */}
      {message && (
        <div className="mb-6 w-full max-w-2xl rounded-lg bg-red-950/40 border border-red-900/60 p-3 text-red-200 font-medium text-center shadow-md">
          {message}
        </div>
      )}

      {/* ডাটা এন্ট্রি কার্ড */}
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-xl shadow-xl p-6 mb-8">
        <h2 className="text-xl text-slate-100 font-semibold mb-4 border-b border-slate-800 pb-2">
          ডাটাবেজে তথ্য এন্ট্রি করুন
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Person className="h-5 w-5 absolute left-3 top-3 text-slate-500" />
            <input
              type="text"
              placeholder="শিক্ষার্থীর নাম"
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
          <Button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-500 font-medium transition-colors shadow-lg shadow-blue-900/20">
            সাবমিট করুন
          </Button>

        </form>
      </div>

      {/* সিট খোঁজার কার্ড */}
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-xl shadow-xl p-6">
        <h2 className="text-xl text-slate-100 font-semibold mb-4 border-b border-slate-800 pb-2">
          রেজিস্ট্রেশন নম্বর দিয়ে সিট খুঁজুন
        </h2>
        <form onSubmit={handleSearch} className="flex space-x-2 mb-6">
          <input
            type="number"
            placeholder="রেজিস্ট্রেশন নাম্বার দিয়ে খুঁজুন"
            className="flex-1 px-4 py-2 bg-slate-950 border border-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-slate-100 placeholder-slate-500 transition-all"
            value={searchReg}
            onChange={(e) => setSearchReg(e.target.value)}
          />
          <Button type="submit" className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-500 font-medium flex items-center transition-colors shadow-lg shadow-green-900/20">
            <Magnifier className="h-5 w-5 mr-1" /> খুঁজুন
          </Button>
        </form>

        {searchResult && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center items-center">
            {/* আগের সিট */}
            <div className="p-4 border border-slate-800 rounded-lg bg-slate-950/40">
              <h3 className="text-sm text-slate-400 font-medium">আগের সিট</h3>
              <p className="font-bold text-slate-200 mt-1">{searchResult.previous ? searchResult.previous.name : 'ডাটা পাওয়া যায়নি'}</p>
              <p className="text-xs text-slate-500 font-semibold mt-0.5">{searchResult.previous?.regNumber || '—'}</p>
            </div>

            {/* সার্চকৃত মেইন সিট (হাইলাইটেড) */}
            <div className="p-4 border-2 border-blue-500 rounded-lg bg-blue-950/40 shadow-xl shadow-blue-950/50 transform scale-105 z-10">
              <h3 className="text-sm text-blue-400 font-semibold">সার্চকৃত সিট</h3>
              <p className="font-bold text-lg text-white mt-1">{searchResult.current.name}</p>
              <p className="text-sm font-medium text-blue-300 mt-0.5">{searchResult.current.regNumber}</p>
            </div>

            {/* পরের সিট */}
            <div className="p-4 border border-slate-800 rounded-lg bg-slate-950/40">
              <h3 className="text-sm text-slate-400 font-medium">পরের সিট</h3>
              <p className="font-bold text-slate-200 mt-1">{searchResult.next ? searchResult.next.name : 'ডাটা পাওয়া যায়নি'}</p>
              <p className="text-xs text-slate-500 font-semibold mt-0.5">{searchResult.next?.regNumber || '—'}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}