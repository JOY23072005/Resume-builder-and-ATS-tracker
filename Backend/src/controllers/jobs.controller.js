import { Job } from "bullmq";
import { pdfQueue } from "../queues/pdf.queue.js";

export const getJobStatus = async (
    req,
    res
)=>{
    try{
    const job = await Job.fromId(
        pdfQueue,
        req.params.jobId
    );

    if(!job){

        return res.status(404).json({
            success:false
        });

    }

    const state =
        await job.getState();

    const result =
        job.returnvalue;

    const progress = job.progress || {
        progress: 0,
        message: "Waiting..."
    };

    res.json({
        success: true,
        state,
        progress,
        result,
    });
    
    } catch(err){
        res.status(500).json({message:"Internal server error"});
        console.error('getJobStatus Error :',err);
    }
}