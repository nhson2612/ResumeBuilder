import axios from "axios";


const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api/",
    headers: {
        'Content-Type': 'application/json',
    }
})

const CreateNewResume = (data, token) => axiosClient.post('/user-resumes', data, { headers: { Authorization: `Bearer ${token}` } });

const GetUserResumes = (userEmail, token) => axiosClient.get('/user-resumes', { headers: { Authorization: `Bearer ${token}` } });

const UpdateResumeDetail = (id, data, token) => axiosClient.put('/user-resumes/' + id, data, { headers: { Authorization: `Bearer ${token}` } })

const GetResumeById = (id, token) => axiosClient.get('/user-resumes/' + id, { headers: { Authorization: `Bearer ${token}` } })

const DeleteResumeById = (id, token) => axiosClient.delete('/user-resumes/' + id, { headers: { Authorization: `Bearer ${token}` } })

const CloneResume = (id, newResumeId, token) => axiosClient.post('/user-resumes/' + id + '/clone', { newResumeId }, { headers: { Authorization: `Bearer ${token}` } });

const AIChat = (prompt, token) => axiosClient.post('/ai-chat', { prompt: prompt }, { headers: { Authorization: `Bearer ${token}` } });

// Job Application Tracker
const GetJobApplications = (token) => axiosClient.get('/jobs', { headers: { Authorization: `Bearer ${token}` } });
const CreateJobApplication = (data, token) => axiosClient.post('/jobs', data, { headers: { Authorization: `Bearer ${token}` } });
const UpdateJobApplication = (id, data, token) => axiosClient.put('/jobs/' + id, data, { headers: { Authorization: `Bearer ${token}` } });
const DeleteJobApplication = (id, token) => axiosClient.delete('/jobs/' + id, { headers: { Authorization: `Bearer ${token}` } });

export default {
    CreateNewResume,
    GetUserResumes,
    UpdateResumeDetail,
    GetResumeById,
    DeleteResumeById,
    CloneResume,
    AIChat,
    GetJobApplications,
    CreateJobApplication,
    UpdateJobApplication,
    DeleteJobApplication
}