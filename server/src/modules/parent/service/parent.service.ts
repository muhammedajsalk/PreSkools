// File: server/src/modules/parent/service/parent.service.ts

import mongoose from "mongoose";
import { StudentModel } from "../../academic/model/student.model";
import { AppError } from "../../../utils/AppError";
import Activity from "../../activity/model/activity.model";
import dayjs from "dayjs";

interface StudentLookupQuery {
    parentUserId: string;
    schoolId: string;
}

/**
 * Finds all active students linked to a specific parent user ID within the school.
 */
export const getMyChildrenService = async (query: StudentLookupQuery) => {
    const parentUserId = new mongoose.Types.ObjectId(query.parentUserId);
    
    // Query the Student collection to find documents where the parent's ID is in the parent_ids array
    const children = await StudentModel.find({
        school_id: query.schoolId,
        parent_ids: parentUserId, // Finds the ID within the array
        status: "ACTIVE" 
    })
    .populate("class_id", "name section teacher_id") // Get class info for dashboard display
    .select("-parent_ids -address") 
    .lean(); 

    return children;
};



export const getQuickStatsService = async (studentId: string, schoolId: string) => {
    const startOfDay = dayjs().startOf('day').toDate();
    const endOfDay = dayjs().endOf('day').toDate();

    const studentObjectId = new mongoose.Types.ObjectId(studentId);
    const schoolObjectId = new mongoose.Types.ObjectId(schoolId);

    const baseMatchQuery = {
        school_id: schoolObjectId,
        student_id: studentObjectId,
        date: { $gte: startOfDay, $lte: endOfDay }
    };

    // --- 1. COUNT QUERIES (Parallel execution) ---
    const [
        photosCount, 
        mealsCount, 
        // ✅ NEW: Count all activities EXCLUDING the big three (PHOTO, MEAL, NAP)
        otherActivitiesCount,
        napDurationResult
    ] = await Promise.all([
        Activity.countDocuments({...baseMatchQuery, type: "PHOTO"}), // qs1
        Activity.countDocuments({...baseMatchQuery, type: "MEAL"}), // qs3
        
        // This query counts HYGIENE, LEARNING, NOTE, etc.
        Activity.countDocuments({
            ...baseMatchQuery, 
            type: { $nin: ["PHOTO", "MEAL", "NAP"] } 
        }), 
        
        // AGGREGATION for Nap Duration (SUM)
        Activity.aggregate([
            { $match: {...baseMatchQuery, type: "NAP"} },
            { $group: { _id: null, totalDuration: { $sum: "$data.duration" } } }
        ])
    ]);
    
    // 2. Calculation and Formatting
    const totalNapDurationMinutes = napDurationResult[0]?.totalDuration || 0;
    const totalPlannedActivities = 6; // Mock Denominator (e.g., 6 planned non-routine activities)
    const totalPlannedMeals = 3;     // Mock Denominator
    
    // Format duration
    const napHours = Math.floor(totalNapDurationMinutes / 60);
    const napMins = totalNapDurationMinutes % 60;
    const napTimeValue = napHours > 0 ? `${napHours}h ${napMins}m` : `${totalNapDurationMinutes}m`;


    // 3. Synthesize result to match the UI structure
    return [
        { id: 'qs1', label: 'Photos Today', value: photosCount.toString() },
        // ✅ qs2: Uses the EXCLUSIVE count of other activities
        { id: 'qs2', label: 'Activities', value: `${otherActivitiesCount}/${totalPlannedActivities}` }, 
        { id: 'qs3', label: 'Meals', value: `${mealsCount}/${totalPlannedMeals}` },
        { id: 'qs4', label: 'Nap Time', value: napTimeValue },
    ];
};