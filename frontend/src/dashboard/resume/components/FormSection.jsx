import React, { useState } from 'react'
import PersonalDetail from './forms/PersonalDetail'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight, Home, LayoutGrid } from 'lucide-react'
import Summery from './forms/Summery';
import Experience from './forms/Experience';
import Education from './forms/Education';
import Skills from './forms/Skills';
import Projects from './forms/Projects';
import Certifications from './forms/Certifications';
import { Link, Navigate, useParams } from 'react-router-dom';
import ThemeColor from './ThemeColor';
import TemplateSelector from './TemplateSelector';
import AIResumeBuilder from './AIResumeBuilder';
import InterviewPrep from './InterviewPrep';
import { useTranslation } from 'react-i18next';

function FormSection() {
  const [activeFormIndex, setActiveFormIndex] = useState(1);
  const [enableNext, setEnableNext] = useState(true);
  const { resumeId } = useParams();
  const { t } = useTranslation();
  return (
    <div>
      <div className='flex justify-between items-center'>
        <div className='flex gap-2 flex-wrap'>
          <Link to={"/dashboard"}>
            <Button><Home /></Button>
          </Link>
          <ThemeColor />
          <TemplateSelector />
          <AIResumeBuilder />
          <InterviewPrep />
        </div>
        <div className='flex gap-2'>
          {activeFormIndex > 1
            && <Button size="sm" aria-label={t('common.back')}
              onClick={() => setActiveFormIndex(activeFormIndex - 1)}> <ArrowLeft /> </Button>}
          <Button
            disabled={!enableNext}
            className="flex gap-2" size="sm"
            onClick={() => setActiveFormIndex(activeFormIndex + 1)}
          > {t('common.next')}
            <ArrowRight /> </Button>
        </div>
      </div>
      {/* Personal Detail  */}
      {activeFormIndex == 1 ?
        <PersonalDetail enabledNext={(v) => setEnableNext(v)} />
        : activeFormIndex == 2 ?
          <Summery enabledNext={(v) => setEnableNext(v)} />
          : activeFormIndex == 3 ?
            <Experience />
            : activeFormIndex == 4 ?
              <Education />
              : activeFormIndex == 5 ?
                <Skills />
                : activeFormIndex == 6 ?
                  <Projects />
                  : activeFormIndex == 7 ?
                    <Certifications />
                    : activeFormIndex == 8 ?
                      <Navigate to={'/my-resume/' + resumeId + "/view"} />

                      : null
      }


    </div>
  )
}

export default FormSection