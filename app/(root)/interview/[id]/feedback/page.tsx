import React from 'react'
import {getCurrentUser} from "@/lib/actions/auth.action";
import {getFeedbackByInterviewId, getInterviewById} from "@/lib/actions/general.action";
import Image from "next/image";
import dayjs from "dayjs";
import {Button} from "@/components/ui/button";
import Link from "next/link";

const Page = async ({params} : RouteParams) => {
    const { id } = await params;
    const user = await getCurrentUser()

    const interview = await getInterviewById(id);
    if(!interview) redirect('/');

    const feedback = await getFeedbackByInterviewId({
        interviewId: id,
        userId: user?.id!,
    });
    console.log(feedback)
    return (
        <section className="section-feedback">
            <div className="flex flex-row justify-center">
                <h1 className="text-4xl font-semibold">Feedback on the Interview -{" "}
                    <span className="capitalize">{interview?.role}</span>
                </h1>
            </div>

            <div className="flex flex-row justify-center">
                <div className="flex flex-row gap-5">
                    <div className="flex flex-row gap-2 items-center">
                        <Image src="/star.svg" alt="star" width={22} height={22}/>
                        <p>
                            Overall Impresion: {" "}
                            <span className="text-primary-200 font-bold">
                                {feedback?.totalScore ||  '---'}/100
                            </span>
                        </p>

                    </div>
                    <div className="flex flex-row gap-2">
                        <Image src="/calendar.svg" alt="calendar" width={22} height={22}/>
                        <p>
                            {feedback?.createdAt ?
                            dayjs(feedback.createdAt).format('MMM D, YYYY h:mm A') : 'N/A'}
                        </p>
                    </div>
                </div>
            </div>
            <hr/>

            <p>{feedback?.finalAssessment}</p>

            <div className="flex flex-col gap-4">
                <h2>Breakdown of the Interview: </h2>
                {feedback?.categoryScores?.map((category, index) => (
                    <div key={index}>
                        <p className="font-bold">
                            {index + 1}.{category.name} ({category.score}/100))
                        </p>
                        <p>{category.comment}</p>
                    </div>
                ))}
            </div>
            <div className="flex flex-col gap-3">
                <h3>Strengths</h3>
                <ul>
                    {feedback?.strengths?.map((strength, index) => (
                        <li key={index}>{strength}</li>
                    ))}
                </ul>
            </div>
            <div className="flex flex-col gap-3">
                <h3>Areas for improvement</h3>
                <ul>
                    {feedback?.areasForImprovement?.map((area, index) => (
                        <li key={index}>{area}</li>
                    ))}
                </ul>
            </div>
            <div className="buttons">
                <Button className="btn-secondary flex-1">
                    <Link href="/" className="text-sm font-semibold text-primary-200 text-center">
                        <p className="text-sm font-semibold text-primary-200 text-center">Back to dashboard</p>
                    </Link>
                </Button>
                <Button className="btn-primary flex-1">
                    <Link href={`/interview/${id}`} className="text-sm font-semibold  text-center">
                        <p className="text-sm font-semibold text-center">Retake Interview</p>
                    </Link>
                </Button>
            </div>

        </section>
    )
}
export default Page
