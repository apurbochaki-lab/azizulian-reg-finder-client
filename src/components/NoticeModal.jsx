"use client";

import { useEffect, useState } from "react";

export default function SeatFinderNoticeModal() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const hasSeenNotice = localStorage.getItem(
            "seat-finder-notice-seen"
        );

        if (!hasSeenNotice) {
            setIsOpen(true);
            document.body.style.overflow = "hidden";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    const handleClose = () => {
        localStorage.setItem("seat-finder-notice-seen", "true");
        setIsOpen(false);
        document.body.style.overflow = "auto";
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/75 px-3 py-4 backdrop-blur-sm sm:px-5">
            <div
                className="
                    w-full
                    max-w-sm
                    sm:max-w-md
                    rounded-2xl
                    border border-slate-800
                    bg-slate-900
                    shadow-2xl shadow-black/40
                    overflow-hidden
                "
            >
                {/* Header */}
                <div className="px-4 pt-5 pb-3 text-center sm:px-6 sm:pt-6">
                    <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-blue-500/10 border border-blue-500/20 text-xl sm:h-12 sm:w-12">
                        📝
                    </div>

                    <h2 className="text-xl pb-3 sm:text-2xl font-bold text-slate-100 animate-bounce">
                        গুরুত্বপূর্ণ নির্দেশনা
                    </h2>

                    <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-slate-400">
                        Seat Finder ব্যবহার করার আগে নিচের ধাপগুলো অনুসরণ করুন।
                    </p>
                </div>

                {/* Instructions */}
                <div className="space-y-2.5 px-4 sm:px-6">

                    {/* Step 1 */}
                    <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 px-3.5 py-3 sm:px-4">
                        <p className="text-sm font-semibold text-blue-400 sm:text-[15px]">
                            ✅ ১. আগে নিজের তথ্য Submit করুন
                        </p>

                        <p className="mt-1 text-xs leading-5 text-slate-400 sm:text-sm">
                            নাম + Registration Number দিন।{" "}
                            <span className="text-slate-300">
                                Mobile Number optional।
                            </span>
                        </p>
                    </div>

                    {/* Step 2 */}
                    <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-3.5 py-3 sm:px-4">
                        <p className="text-sm font-semibold text-emerald-400 sm:text-[15px]">
                            🔎 ২. তারপর Registration Number দিয়ে Search করুন
                        </p>

                        <p className="mt-1 text-xs leading-5 text-slate-400 sm:text-sm">
                            আপনার আশেপাশের সিটে থাকা শিক্ষার্থীদের তথ্য দেখতে পারবেন।
                        </p>
                    </div>

                    {/* Step 3 */}
                    <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 px-3.5 py-3 sm:px-4">
                        <p className="text-sm font-semibold text-amber-400 sm:text-[15px]">
                            ⚠️ গুরুত্বপূর্ণ
                        </p>

                        <p className="mt-1 text-xs leading-5 text-slate-400 sm:text-sm">
                            শুধু যারা আগে Data Submit করেছে, তাদের তথ্যই Search-এ পাওয়া যাবে।
                        </p>
                    </div>
                </div>

                {/* Bottom Note */}
                <div className="px-4 pt-3.5 pb-4 sm:px-6 sm:pt-4 sm:pb-5">
                    <p className="text-center text-xs leading-5 text-slate-500 sm:text-sm">
                        আগে নিজের Data Submit করুন → তারপর Seat Search করুন।
                    </p>

                    {/* Close Button */}
                    <button
                        type="button"
                        onClick={handleClose}
                        className="
                            mt-3.5
                            w-full
                            rounded-xl
                            bg-blue-600
                            px-4
                            py-2.5
                            text-sm
                            font-semibold
                            text-white
                            shadow-lg
                            shadow-blue-900/20
                            transition-all
                            duration-200
                            hover:bg-blue-500
                            active:scale-[0.98]
                            sm:py-3
                            sm:text-base
                        "
                    >
                        ঠিক আছে, বুঝেছি
                    </button>
                </div>
            </div>
        </div>
    );
}