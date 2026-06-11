'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode } from 'swiper/modules';
import Image from 'next/image'; // Next.js Image component ইমপোর্ট করা হয়েছে
import 'swiper/css';
import 'swiper/css/free-mode';

export default function SuccessTestimonials() {
    return (
        <div className="w-full max-w-5xl my-10 bg-slate-900 border border-slate-800 rounded-xl shadow-xl p-6 md:p-8">

            {/* 🎯 হেডিং এবং মোটিভেশনাল টেক্সট */}
            <div className="text-center mb-8">
                <h2 className="text-xl md:text-2xl font-bold text-green-400 mb-3">
                    🎉 অনেকেই ইতিমধ্যে তাদের সিট খুঁজে পেয়েছেন!
                </h2>
                <p className="text-slate-300 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
                    নিচের স্ক্রিনশটগুলোতে দেখুন, অনেকেই সফলভাবে তাদের সামনের এবং পেছনের সিটে কে আছে তা খুঁজে বের করেছেন।
                    সিট প্ল্যানিং আরও নির্ভুল করতে <strong className="text-blue-400">আপনার সঠিক ডাটা সাবমিট করা খুবই জরুরি।</strong>
                    নিজে এন্ট্রি করুন এবং বন্ধুদেরও দ্রুত যুক্ত হতে উৎসাহিত করুন!
                </p>
            </div>

            {/* 🚀 টাচ-স্লাইড ও স্মুথ রানিং Marquee সেকশন */}
            <div className="rounded-lg overflow-hidden border border-slate-800 bg-slate-950/50 py-6 cursor-grab active:cursor-grabbing">
                <Swiper
                    modules={[Autoplay, FreeMode]}
                    loop={true}               // ইনফিনিট লুপের জন্য
                    freeMode={true}           // হাত দিয়ে ফ্রিলি টানার জন্য
                    spaceBetween={24}         // ইমেজগুলোর মাঝখানের গ্যাপ
                    slidesPerView={'auto'}    // ইমেজের সাইজ অনুযায়ী অটো সেট হবে
                    speed={4500}              // ৮টা ইমেজের জন্য গতি সামান্য অ্যাডজাস্ট করা হয়েছে (যত বেশি দিবেন তত আস্তে চলবে)
                    autoplay={{
                        delay: 0,               // কোনো থামাথামি ছাড়া অনবরত চলবে
                        disableOnInteraction: false, // টাচ করার পরও অটো-রান বন্ধ হবে না
                        pauseOnMouseEnter: true // মাউস হভার করলে সাময়িক থামবে
                    }}
                    className="flex items-center"
                >
                    {/* ইমেজ ১ */}
                    <SwiperSlide className="!w-auto">
                        <div className="transition-transform duration-300 hover:scale-105 select-none px-2">
                            <Image
                                src="/images/1.png"
                                alt="Success Result 1"
                                width={500}
                                height={300}
                                className="h-64 md:h-80 w-auto object-contain rounded-lg border border-slate-700 shadow-md shadow-green-900/10 pointer-events-none"
                            />
                        </div>
                    </SwiperSlide>

                    {/* ইমেজ ২ */}
                    <SwiperSlide className="!w-auto">
                        <div className="transition-transform duration-300 hover:scale-105 select-none px-2">
                            <Image
                                src="/images/2.png"
                                alt="Success Result 2"
                                width={500}
                                height={300}
                                className="h-64 md:h-80 w-auto object-contain rounded-lg border border-slate-700 shadow-md shadow-blue-900/10 pointer-events-none"
                            />
                        </div>
                    </SwiperSlide>

                    {/* ইমেজ ৩ */}
                    <SwiperSlide className="!w-auto">
                        <div className="transition-transform duration-300 hover:scale-105 select-none px-2">
                            <Image
                                src="/images/3.png"
                                alt="Success Result 3"
                                width={500}
                                height={300}
                                className="h-64 md:h-80 w-auto object-contain rounded-lg border border-slate-700 shadow-md shadow-green-900/10 pointer-events-none"
                            />
                        </div>
                    </SwiperSlide>

                    {/*  ইমেজ ৪ */}
                    <SwiperSlide className="!w-auto">
                        <div className="transition-transform duration-300 hover:scale-105 select-none px-2">
                            <Image
                                src="/images/4.png"
                                alt="Success Result 4"
                                width={500}
                                height={300}
                                className="h-64 md:h-80 w-auto object-contain rounded-lg border border-slate-700 shadow-md shadow-blue-900/10 pointer-events-none"
                            />
                        </div>
                    </SwiperSlide>

                    {/* ইমেজ ৫ */}
                    <SwiperSlide className="!w-auto">
                        <div className="transition-transform duration-300 hover:scale-105 select-none px-2">
                            <Image
                                src="/images/5.png"
                                alt="Success Result 5"
                                width={500}
                                height={300}
                                className="h-64 md:h-80 w-auto object-contain rounded-lg border border-slate-700 shadow-md shadow-green-900/10 pointer-events-none"
                            />
                        </div>
                    </SwiperSlide>

                    {/* ইমেজ ৬ */}
                    <SwiperSlide className="!w-auto">
                        <div className="transition-transform duration-300 hover:scale-105 select-none px-2">
                            <Image
                                src="/images/6.png"
                                alt="Success Result 6"
                                width={500}
                                height={300}
                                className="h-64 md:h-80 w-auto object-contain rounded-lg border border-slate-700 shadow-md shadow-blue-900/10 pointer-events-none"
                            />
                        </div>
                    </SwiperSlide>

                    {/* ইমেজ ৭ */}
                    <SwiperSlide className="!w-auto">
                        <div className="transition-transform duration-300 hover:scale-105 select-none px-2">
                            <Image
                                src="/images/7.png"
                                alt="Success Result 7"
                                width={500}
                                height={300}
                                className="h-64 md:h-80 w-auto object-contain rounded-lg border border-slate-700 shadow-md shadow-green-900/10 pointer-events-none"
                            />
                        </div>
                    </SwiperSlide>

                    {/* ইমেজ ৮ */}
                    <SwiperSlide className="!w-auto">
                        <div className="transition-transform duration-300 hover:scale-105 select-none px-2">
                            <Image
                                src="/images/8.png"
                                alt="Success Result 8"
                                width={500}
                                height={300}
                                className="h-64 md:h-80 w-auto object-contain rounded-lg border border-slate-700 shadow-md shadow-blue-900/10 pointer-events-none"
                            />
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>

        </div>
    );
}