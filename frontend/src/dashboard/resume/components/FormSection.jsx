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

function FormSection({ activeFormIndex, onEnableNext }) {
  const { resumeId } = useParams();
  const { t } = useTranslation();

  return (
    <div>
      {/* Personal Detail  */}
      {activeFormIndex == 1 ?
        <PersonalDetail enabledNext={(v) => onEnableNext(v)} />
        : activeFormIndex == 2 ?
          <Summery enabledNext={(v) => onEnableNext(v)} />
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