import { CircleInfo, TriangleExclamation } from '@gravity-ui/icons';

export default function Footer() {
    return (
        <footer className="w-full bg-slate-900 text-slate-300 pt-12 border-t border-slate-800">
            <div className="max-w-6xl mx-auto px-4 py-8 md:py-12 grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* সিস্টেম কীভাবে কাজ করে তার বিবরণ */}
                <div className="space-y-4">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <CircleInfo className="h-5 w-5 text-blue-400" />
                        সিস্টেমটি কীভাবে কাজ করে?
                    </h3>
                    <p className="text-sm leading-relaxed text-slate-400">
                        সরকারি আজিজুল হক কলেজের শিক্ষার্থীদের সিট প্ল্যান খোঁজার প্রক্রিয়াকে সহজ করতে এই ডিজিটাল পোর্টালটি তৈরি করা হয়েছে।
                        এখানে আপনার নির্দিষ্ট <strong className="text-blue-400">রেজিস্ট্রেশন নম্বর</strong>&nbsp; দিয়ে সার্চ করার সাথে সাথেই সিস্টেমটি
                        ডাটাবেজ থেকে আপনার তথ্য খুঁজে বের করবে। শুধু তাই নয়, পরীক্ষার হলে আপনার বসার সুবিধার্থে আপনার &nbsp;
                        <strong className="text-green-400">ঠিক আগের সিট</strong>&nbsp; এবং&nbsp; <strong className="text-green-400">ঠিক পরের সিটে</strong>&nbsp;
                        কার রোল বা নাম রয়েছে তাও স্বয়ংক্রিয়ভাবে স্ক্রিনে প্রদর্শন করবে। এর ফলে কোনো ঝামেলা ছাড়াই আপনি আপনার পুরো সারি বা বেঞ্চের অবস্থান জেনে নিতে পারবেন।
                    </p>
                </div>

                {/* ডাটা সাবমিশনের গুরুত্বপূর্ণ নোটিশ (হাইলাইটেড) */}
                <div className="flex flex-col justify-center">
                    <div className="bg-amber-950/40 border-l-4 border-amber-500 p-4 rounded-r-xl shadow-sm text-amber-200">
                        <div className="flex items-center gap-2 mb-2">
                            <TriangleExclamation className="h-5 w-5 text-amber-500 animate-pulse" />
                            <h4 className="text-base font-bold text-amber-400 uppercase tracking-wide">
                                বিশেষ অনুরোধ ও জরুরী বিজ্ঞপ্তি
                            </h4>
                        </div>
                        <p className="text-sm leading-relaxed">
                            এই পোর্টালটির সফলতা সম্পূর্ণ নির্ভর করছে আপনাদের সবার সম্মিলিত অংশগ্রহণের ওপর।
                            <strong> অনুগ্রহ করে সকল শিক্ষার্থী নিজ দায়িত্বে আপনাদের সঠিক নাম এবং রেজিস্ট্রেশন নম্বর দিয়ে ডাটা সাবমিট করুন।</strong>
                            যদি ডাটাবেজে পর্যাপ্ত শিক্ষার্থীর তথ্য জমা না হয়, তবে সার্চ করার পর আগের কিংবা পরের সিটের ফলাফল নির্ভুলভাবে আসবে না (ডাটা পাওয়া যায়নি দেখাবে)।
                            তাই আজই আপনার তথ্য যুক্ত করুন এবং আপনার সহপাঠীদেরও ডাটা এন্ট্রি করতে উৎসাহিত করুন!
                        </p>
                    </div>
                </div>

            </div>

            {/* কপিরাইট অংশ */}
            <div className="border-t border-slate-800 py-4 text-center text-xs text-slate-500">
                &copy; {new Date().getFullYear()} Govt. Azizul Haque College Student Portal. All Rights Reserved.
            </div>
        </footer>
    );
}