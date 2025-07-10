"use client"

import SectionHeader from '@/components/SectionHeader'
import { Laptop } from 'lucide-react'
import React from 'react'
import { projectsData } from '@/data/projectData'
import { useParams } from 'next/navigation'

const Project = () => {
  const params = useParams()
  const id = Number(params.id)
  const project = projectsData[id]

  return (
    <main className="relative w-full h-auto flex justify-center overflow-x-hidden">
          <div className="mt-32 mb-24 mx-5 sm:mx-10 w-3xl max-w-3xl">
    <SectionHeader text={project.title} icon={<Laptop />} order="normal" />

    COMING SOON ...
    </div>
    </main>
  )
}

export default Project