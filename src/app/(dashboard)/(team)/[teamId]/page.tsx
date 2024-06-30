"use client";

import { PageHeader } from "@/components/dashboard/page-header";
import { Button } from "@/components/ui/button";
import { useProject } from "@/features/projects/api/use-project";
import { useProjects } from "@/features/projects/api/use-projects";
import { Folder, PlusIcon } from "lucide-react";
import { useState } from "react";

interface TeamHomePageProps {
  params: { teamId: string };
}

export default function TeamHomePage({ params }: TeamHomePageProps) {
  const [openProjectId, setOpenProjectId] = useState<string | undefined>();
  // const [openProjectEnvName, setOpenProjectEnvName] = useState("");

  const { teamId } = params;
  const projects = useProjects({ teamId: teamId });
  const project = useProject({ projectId: openProjectId });

  return (
    <div>
      <PageHeader
        title="Projects"
        className="pb-6"
        right={
          <Button
            mobile={{ content: <PlusIcon />, props: { size: "icon" } }}
            variant="default"
          >
            New Project
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projects.data?.map((project) => {
          const isOpen = openProjectId === project.id;
          return (
            <div className="rounded border" key={project.id}>
              <button
                className="w-full p-5 text-left"
                onClick={() => setOpenProjectId(project.id)}
              >
                <div className="inline-flex items-center gap-2">
                  <span>
                    <Folder size={20} />
                  </span>
                  <span>{project.name}</span>
                </div>
              </button>

              {isOpen && <div></div>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
