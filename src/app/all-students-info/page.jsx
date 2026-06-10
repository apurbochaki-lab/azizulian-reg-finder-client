'use client';
import { useState, useEffect } from 'react';
import { Button, Table } from "@heroui/react";
import { ArrowLeft, CircleInfo } from '@gravity-ui/icons';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function StudentList() {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    // ডাটাবেজ থেকে সকল শিক্ষার্থীর ডাটা ফেচ করার হ্যান্ডলার
    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const serverUrl = process.env.NEXT_PUBLIC_SERVER || 'http://localhost:5000';
                const res = await fetch(`${serverUrl}/api/data/students/info`);
                const data = await res.json();

                if (res.ok) {
                    setStudents(data);
                } else {
                    toast.error('Onlines data load failed!');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                toast.error('Network error!');
            } finally {
                setLoading(false);
            }
        };

        fetchStudents();
    }, []);

    return (
        <div className="min-h-[90vh] bg-slate-950 p-4 md:p-8 flex flex-col items-center text-slate-100 pb-20">

            {/* হেডার টেক্সট */}
            <h1 className="text-3xl pb-2 font-bold text-green-400 mb-2 text-center tracking-wide">
                Registered Student Directory
            </h1>
            <p className="text-sm text-slate-400 mb-8 text-center max-w-md">
                ডাটাবেজে যুক্ত হওয়া সকল শিক্ষার্থীর তালিকা নিচে দেওয়া হলো। সিকিউরিটির স্বার্থে রেজিস্ট্রেশন নাম্বার আংশিক গোপন রাখা হয়েছে।
            </p>

            {/* টেবিল কন্টেইনার কার্ড (মেইন থিম কালার) */}
            <div className="w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-4 md:p-6">

                {loading ? (
                    <div className="text-center py-12 text-slate-400 font-medium animate-pulse">
                        ডাটা লোড হচ্ছে, অনুগ্রহ করে অপেক্ষা করুন...
                    </div>
                ) : students.length === 0 ? (
                    <div className="text-center py-12 text-slate-500 font-medium flex flex-col items-center gap-2">
                        <CircleInfo className="h-6 w-6 text-slate-600" />
                        ডাটাবেজে কোনো শিক্ষার্থীর তথ্য পাওয়া যায়নি।
                    </div>
                ) : (
                    <Table className="!bg-slate-950 text-slate-100 rounded-xl overflow-hidden border border-slate-800/50 shadow-inner">
                        <Table.ScrollContainer className="!bg-slate-950">
                            <Table.Content aria-label="Registered Students List" className="min-w-[600px] !bg-slate-950">

                                {/* টেবিল হেডার */}
                                <Table.Header className="!bg-slate-900 border-b border-slate-800 text-slate-300">
                                    <Table.Column isRowHeader className="text-slate-300 font-semibold text-sm py-3.5 pl-4 !bg-slate-900">Student Name</Table.Column>
                                    <Table.Column className="text-slate-300 font-semibold text-sm py-3.5 !bg-slate-900">Registration Number</Table.Column>
                                    <Table.Column className="text-slate-300 font-semibold text-sm py-3.5 pr-4 !bg-slate-900">Mobile Number</Table.Column>
                                </Table.Header>

                                {/* টেবিল বডি (ফোর্সড ডার্ক ব্যাকগ্রাউন্ড) */}
                                <Table.Body className="!bg-slate-950">
                                    {students.map((student, index) => (
                                        <Table.Row
                                            key={student._id || index}
                                            className="!bg-slate-950 border-b border-slate-800/40 hover:!bg-slate-900/60 transition-colors group"
                                        >
                                            {/* শিক্ষার্থীর নাম */}
                                            <Table.Cell className="py-4 pl-4 text-slate-200 font-medium text-[15px] !bg-slate-950 group-hover:!bg-slate-900/60">
                                                {student.name}
                                            </Table.Cell>

                                            {/* রেজিস্ট্রেশন নম্বর */}
                                            <Table.Cell className="py-4 font-mono text-blue-400 tracking-wider font-semibold !bg-slate-950 group-hover:!bg-slate-900/60">
                                                {student.regNumber
                                                    ? `*******${String(student.regNumber).slice(-4)}`
                                                    : '—'}
                                            </Table.Cell>

                                            {/* মোবাইল নম্বর */}
                                            <Table.Cell className="py-4 pr-4 !bg-slate-950 group-hover:!bg-slate-900/60">
                                                {student.phnNumber || student.phoneNumber ? (
                                                    <span className="font-mono text-slate-300">{student.phnNumber || student.phoneNumber}</span>
                                                ) : (
                                                    <span className="text-slate-400 italic text-xs bg-slate-900 px-2 py-1 rounded border border-slate-800/80">N/A</span>
                                                )}
                                            </Table.Cell>
                                        </Table.Row>
                                    ))}
                                </Table.Body>

                            </Table.Content>
                        </Table.ScrollContainer>
                    </Table>
                )}

            </div>

            <div className='py-8'>
                <Link href="/">
                    <Button variant='primary' className="rounded-lg font-bold">
                        Back to Home <ArrowLeft />
                    </Button>
                </Link>
            </div>
        </div>
    );
}