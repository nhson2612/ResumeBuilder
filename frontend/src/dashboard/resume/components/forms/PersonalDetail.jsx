import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { LoaderCircle } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import GlobalApi from './../../../../../service/GlobalApi';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';

function PersonalDetail({ enabledNext }) {

    const params = useParams();
    const { t } = useTranslation();
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
    const { getToken } = useAuth();

    const [formData, setFormData] = useState();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        console.log("---", resumeInfo)
    }, [])

    const handleInputChange = (e) => {
        enabledNext(false)
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        })
        setResumeInfo({
            ...resumeInfo,
            [name]: value
        })
    }

    const onSave = async (e) => {
        e.preventDefault();
        setLoading(true)
        const data = {
            data: formData
        }
        const token = await getToken();
        GlobalApi.UpdateResumeDetail(params?.resumeId, data, token).then(resp => {
            console.log(resp);
            enabledNext(true);
            setLoading(false);
            toast("Details updated")
        }, (error) => {
            setLoading(false);
        })

    }
    return (
        <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
            <h2 className='font-bold text-lg'>{t('resume.sections.personal')}</h2>
            <p>{t('resume.sections.personal')}</p>

            <form onSubmit={onSave}>
                <div className='grid grid-cols-2 mt-5 gap-3'>
                    <div>
                        <label className='text-sm'>{t('resume.form.firstName')}</label>
                        <Input name="firstName" defaultValue={resumeInfo?.firstName} required onChange={handleInputChange} />
                    </div>
                    <div>
                        <label className='text-sm'>{t('resume.form.lastName')}</label>
                        <Input name="lastName" required onChange={handleInputChange}
                            defaultValue={resumeInfo?.lastName} />
                    </div>
                    <div className='col-span-2'>
                        <label className='text-sm'>{t('resume.form.jobTitle')}</label>
                        <Input name="jobTitle" required
                            defaultValue={resumeInfo?.jobTitle}
                            onChange={handleInputChange} />
                    </div>
                    <div className='col-span-2'>
                        <label className='text-sm'>{t('resume.form.address')}</label>
                        <Input name="address" required
                            defaultValue={resumeInfo?.address}
                            onChange={handleInputChange} />
                    </div>
                    <div>
                        <label className='text-sm'>{t('resume.form.phone')}</label>
                        <Input name="phone" required
                            defaultValue={resumeInfo?.phone}
                            onChange={handleInputChange} />
                    </div>
                    <div>
                        <label className='text-sm'>{t('resume.form.email')}</label>
                        <Input name="email" required
                            defaultValue={resumeInfo?.email}
                            onChange={handleInputChange} />
                    </div>
                </div>
                <div className='mt-3 flex justify-end'>
                    <Button type="submit"
                        disabled={loading}>
                        {loading ? <LoaderCircle className='animate-spin' /> : t('common.save')}
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default PersonalDetail