import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useContext, useEffect, useState } from 'react'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { useParams } from 'react-router-dom'
import GlobalApi from './../../../../../service/GlobalApi'
import { toast } from 'sonner'
import { LoaderCircle } from 'lucide-react'
import { useAuth } from '@clerk/clerk-react';
import { useTranslation } from 'react-i18next';

const formField = {
    certName: '',
    issuer: '',
    issueDate: '',
    credentialUrl: '',
}

function Certifications() {
    const [certList, setCertList] = useState([]);
    const { t } = useTranslation();
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const { getToken } = useAuth();
    const params = useParams();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (resumeInfo?.Certifications?.length > 0) {
            setCertList(resumeInfo.Certifications);
        }
    }, [])

    const handleChange = (index, event) => {
        const newEntries = certList.slice();
        const { name, value } = event.target;
        newEntries[index][name] = value;
        setCertList(newEntries);
    }

    const AddNewCert = () => {
        setCertList([...certList, { ...formField }])
    }

    const RemoveCert = () => {
        setCertList(certList => certList.slice(0, -1))
    }

    useEffect(() => {
        setResumeInfo({
            ...resumeInfo,
            Certifications: certList
        });
    }, [certList]);

    const onSave = async () => {
        setLoading(true)
        const data = {
            data: {
                Certifications: certList.map(({ id, ...rest }) => rest)
            }
        }

        const token = await getToken();
        GlobalApi.UpdateResumeDetail(params?.resumeId, data, token).then(res => {
            setLoading(false);
            toast('Certifications updated!')
        }, (error) => {
            setLoading(false);
            toast.error('Failed to save certifications');
        })
    }

    return (
        <div>
            <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
                <h2 className='font-bold text-lg'>{t('resume.sections.certifications')}</h2>
                <p>{t('resume.sections.certifications')}</p>
                <div>
                    {certList.map((item, index) => (
                        <div key={index}>
                            <div className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>
                                <div className='col-span-2'>
                                    <label className='text-xs'>{t('resume.certifications.certName')}</label>
                                    <Input name="certName"
                                        placeholder="AWS Solutions Architect"
                                        onChange={(event) => handleChange(index, event)}
                                        defaultValue={item?.certName}
                                    />
                                </div>
                                <div>
                                    <label className='text-xs'>{t('resume.certifications.issuer')}</label>
                                    <Input name="issuer"
                                        placeholder="Amazon Web Services"
                                        onChange={(event) => handleChange(index, event)}
                                        defaultValue={item?.issuer}
                                    />
                                </div>
                                <div>
                                    <label className='text-xs'>{t('resume.certifications.issueDate')}</label>
                                    <Input type="date"
                                        name="issueDate"
                                        onChange={(event) => handleChange(index, event)}
                                        defaultValue={item?.issueDate}
                                    />
                                </div>
                                <div className='col-span-2'>
                                    <label className='text-xs'>{t('resume.certifications.credentialUrl')}</label>
                                    <Input name="credentialUrl"
                                        placeholder="https://..."
                                        onChange={(event) => handleChange(index, event)}
                                        defaultValue={item?.credentialUrl}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='flex justify-between'>
                    <div className='flex gap-2'>
                        <Button variant="outline" onClick={AddNewCert} className="text-primary">+ {t('resume.form.addMore')}</Button>
                        <Button variant="outline" onClick={RemoveCert} className="text-primary">- {t('resume.form.remove')}</Button>
                    </div>
                    <Button disabled={loading} onClick={() => onSave()}>
                        {loading ? <LoaderCircle className='animate-spin' /> : t('common.save')}
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Certifications
