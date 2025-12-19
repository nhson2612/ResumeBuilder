import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useContext, useEffect, useState } from 'react'
import RichTextEditor from '../RichTextEditor'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { useParams } from 'react-router-dom'
import GlobalApi from './../../../../../service/GlobalApi'
import { toast } from 'sonner'
import { LoaderCircle } from 'lucide-react'
import { useAuth } from '@clerk/clerk-react';
import { useTranslation } from 'react-i18next';

const formField = {
    projectName: '',
    techStack: '',
    projectUrl: '',
    startDate: '',
    endDate: '',
    description: '',
}

function Projects() {
    const [projectList, setProjectList] = useState([]);
    const { t } = useTranslation();
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const { getToken } = useAuth();
    const params = useParams();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (resumeInfo?.Projects?.length > 0) {
            setProjectList(resumeInfo.Projects);
        }
    }, [])

    const handleChange = (index, event) => {
        const newEntries = projectList.slice();
        const { name, value } = event.target;
        newEntries[index][name] = value;
        setProjectList(newEntries);
    }

    const AddNewProject = () => {
        setProjectList([...projectList, { ...formField }])
    }

    const RemoveProject = () => {
        setProjectList(projectList => projectList.slice(0, -1))
    }

    const handleRichTextEditor = (e, name, index) => {
        const newEntries = projectList.slice();
        newEntries[index][name] = e.target.value;
        setProjectList(newEntries);
    }

    useEffect(() => {
        setResumeInfo({
            ...resumeInfo,
            Projects: projectList
        });
    }, [projectList]);

    const onSave = async () => {
        setLoading(true)
        const data = {
            data: {
                Projects: projectList.map(({ id, ...rest }) => rest)
            }
        }

        const token = await getToken();
        GlobalApi.UpdateResumeDetail(params?.resumeId, data, token).then(res => {
            setLoading(false);
            toast('Projects updated!')
        }, (error) => {
            setLoading(false);
            toast.error('Failed to save projects');
        })
    }

    return (
        <div>
            <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
                <h2 className='font-bold text-lg'>{t('resume.sections.projects')}</h2>
                <p>{t('resume.sections.projects')}</p>
                <div>
                    {projectList.map((item, index) => (
                        <div key={index}>
                            <div className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>
                                <div className='col-span-2'>
                                    <label className='text-xs'>{t('resume.projects.projectName')}</label>
                                    <Input name="projectName"
                                        onChange={(event) => handleChange(index, event)}
                                        defaultValue={item?.projectName}
                                    />
                                </div>
                                <div className='col-span-2'>
                                    <label className='text-xs'>{t('resume.projects.techStack')}</label>
                                    <Input name="techStack"
                                        placeholder="React, Node.js, MongoDB..."
                                        onChange={(event) => handleChange(index, event)}
                                        defaultValue={item?.techStack}
                                    />
                                </div>
                                <div className='col-span-2'>
                                    <label className='text-xs'>{t('resume.projects.projectUrl')}</label>
                                    <Input name="projectUrl"
                                        placeholder="https://github.com/..."
                                        onChange={(event) => handleChange(index, event)}
                                        defaultValue={item?.projectUrl}
                                    />
                                </div>
                                <div>
                                    <label className='text-xs'>{t('resume.education.startDate')}</label>
                                    <Input type="date"
                                        name="startDate"
                                        onChange={(event) => handleChange(index, event)}
                                        defaultValue={item?.startDate}
                                    />
                                </div>
                                <div>
                                    <label className='text-xs'>{t('resume.education.endDate')}</label>
                                    <Input type="date"
                                        name="endDate"
                                        onChange={(event) => handleChange(index, event)}
                                        defaultValue={item?.endDate}
                                    />
                                </div>
                                <div className='col-span-2'>
                                    <RichTextEditor
                                        index={index}
                                        defaultValue={item?.description}
                                        onRichTextEditorChange={(event) => handleRichTextEditor(event, 'description', index)}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='flex justify-between'>
                    <div className='flex gap-2'>
                        <Button variant="outline" onClick={AddNewProject} className="text-primary">+ {t('resume.form.addMore')}</Button>
                        <Button variant="outline" onClick={RemoveProject} className="text-primary">- {t('resume.form.remove')}</Button>
                    </div>
                    <Button disabled={loading} onClick={() => onSave()}>
                        {loading ? <LoaderCircle className='animate-spin' /> : t('common.save')}
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Projects
