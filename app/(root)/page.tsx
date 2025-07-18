import React from 'react'
import {Button} from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import InterviewCard from "@/components/InterviewCard";
import {getInterviewByUserId, getLatestInterviews} from "@/lib/actions/general.action";
import {getCurrentUser} from "@/lib/actions/auth.action";

const Page = async () => {
    const user = await getCurrentUser();
    const [userInterviews,latestInterviews] = await Promise.all([
        await getInterviewByUserId(user?.id!),
        await getLatestInterviews({userId: user?.id!})
    ]);

    const hasPastInterviews = userInterviews?.length > 0;
    const hasUpcomingInterviews = latestInterviews?.length > 0;
    return (
        <>
        <section className="card-cta">
            <div className="flex flex-col gap-6 max-w-lg">
                <h2>Git Interview-Ready with Ai-powered Practice & Feedback</h2>
                <p className="text-lg">Practice on real interview questions & get instant feedback</p>

                <Button asChild className="btn-primary max-sm:w-full">
                    <Link href="/interview">Start an Interview</Link>
                </Button>
            </div>

            <Image src="/robot.png" alt="robo-dude" width={400} height={400} className="max-sm:hidden"/>

        </section>
            <section className="flex-col flex gap-6 mt-8">
                <h2>Your Interviews</h2>
                <div className="interviews-section">
                    {
                        hasPastInterviews ? (
                        userInterviews?.map((interview) => (
                            <InterviewCard {...interview} key={interview.id}/>
                        ))
                        ): (
                            <p>You haven&apos;t taken any interviews yet</p>
                    )}


                </div>
            </section>
            <section className="flex-col flex gap-6 mt-8">
                <h2>Take an interview</h2>
                <div className="interviews-section">
                    {
                        hasUpcomingInterviews ? (
                            latestInterviews?.map((interview) => (
                                <InterviewCard {...interview} key={interview.id}/>
                            ))
                        ): (
                            <p>You haven&apos;t taken any interviews yet</p>
                        )}
                </div>
            </section>
        </>
    )
}
export default Page
