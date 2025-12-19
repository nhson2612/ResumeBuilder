import { Loader2Icon, MoreVertical, Notebook, Copy } from 'lucide-react'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import GlobalApi from './../../../service/GlobalApi'
import { toast } from 'sonner'
import { useAuth } from '@clerk/clerk-react'
import { v4 as uuidv4 } from 'uuid'

function ResumeCardItem({ resume, refreshData }) {

  const { t } = useTranslation();
  const navigation = useNavigate();
  const [openAlert, setOpenAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const { getToken } = useAuth();

  const onDelete = async () => {
    setLoading(true);
    const token = await getToken();
    GlobalApi.DeleteResumeById(resume.documentId, token).then(resp => {
      console.log(resp);
      toast('Resume Deleted!');
      refreshData()
      setLoading(false);
      setOpenAlert(false);
    }, (error) => {
      setLoading(false);
    })
  }

  const onClone = async () => {
    setLoading(true);
    const token = await getToken();
    const newResumeId = uuidv4();

    GlobalApi.CloneResume(resume.documentId, newResumeId, token).then(resp => {
      toast('Resume duplicated!');
      refreshData();
      setLoading(false);
    }, (error) => {
      toast.error('Failed to duplicate resume');
      setLoading(false);
    });
  }

  return (

    <div className=''>
      <Link to={'/dashboard/resume/' + resume.documentId + "/edit"}>
        <div className='p-14  bg-gradient-to-b
          from-pink-100 via-purple-200 to-blue-200
        h-[280px] 
          rounded-t-lg border-t-4
        '
          style={{
            borderColor: resume?.themeColor
          }}
        >
          <div className='flex 
        items-center justify-center h-[180px] '>
            {/* <Notebook/> */}
            <img src="/cv.png" width={80} height={80} />
          </div>
        </div>
      </Link>
      <div className='border p-3 flex justify-between  text-white rounded-b-lg shadow-lg'
        style={{
          background: resume?.themeColor
        }}>
        <h2 className='text-sm'>{resume.title}</h2>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreVertical className='h-4 w-4 cursor-pointer' />
          </DropdownMenuTrigger>
          <DropdownMenuContent>

            <DropdownMenuItem onClick={() => navigation('/dashboard/resume/' + resume.documentId + "/edit")}>{t('dashboard.resumeCard.edit')}</DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigation('/my-resume/' + resume.documentId + "/view")}>{t('dashboard.resumeCard.view')}</DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigation('/my-resume/' + resume.documentId + "/view")}>{t('dashboard.resumeCard.download')}</DropdownMenuItem>
            <DropdownMenuItem onClick={onClone} disabled={loading}>
              <Copy className="mr-2 h-4 w-4" /> {t('dashboard.resumeCard.duplicate')}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setOpenAlert(true)} className="text-red-500">{t('dashboard.resumeCard.delete')}</DropdownMenuItem>

          </DropdownMenuContent>
        </DropdownMenu>

        <AlertDialog open={openAlert}>

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                {t('common.confirm')}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setOpenAlert(false)}>{t('common.cancel')}</AlertDialogCancel>
              <AlertDialogAction onClick={onDelete}
                disabled={loading}>
                {loading ? <Loader2Icon className='animate-spin' /> : t('common.delete')}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

      </div>
    </div>

  )
}

export default ResumeCardItem