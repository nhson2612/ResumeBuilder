import React, { useEffect, useState } from 'react'
import AddResume from './components/AddResume'
import { useUser, useAuth } from '@clerk/clerk-react'
import GlobalApi from './../../service/GlobalApi';
import ResumeCardItem from './components/ResumeCardItem';
import { useTranslation } from 'react-i18next';

function Dashboard() {

  const { user } = useUser();
  const { getToken } = useAuth();
  const { t } = useTranslation();
  const [resumeList, setResumeList] = useState([]);
  useEffect(() => {
    user && GetResumesList()
  }, [user])

  /**
   * Used to Get Users Resume List
   */
  const GetResumesList = async () => {
    const token = await getToken();
    GlobalApi.GetUserResumes(user?.primaryEmailAddress?.emailAddress, token)
      .then(resp => {
        console.log(resp.data.data)
        setResumeList(resp.data.data);
      })
  }
  return (
    <div className='p-10 md:px-20 lg:px-32'>
      <h2 className='font-bold text-3xl'>{t('dashboard.title')}</h2>
      <p>{t('dashboard.empty')}</p>
      <div className='grid grid-cols-2 
      md:grid-cols-3 lg:grid-cols-5 gap-5
      mt-10
      '>
        <AddResume />
        {resumeList.length > 0 ? resumeList.map((resume, index) => (
          <ResumeCardItem resume={resume} key={index} refreshData={GetResumesList} />
        )) :
          [1, 2, 3, 4].map((item, index) => (
            <div className='h-[280px] rounded-lg bg-slate-200 animate-pulse'>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Dashboard