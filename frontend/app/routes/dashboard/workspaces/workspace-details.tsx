import { useState } from "react";
import { useParams } from "react-router";
import { Loader } from "~/components/Loader";
import { WorkSpaceHeader } from "~/components/workspace/workspace-hearder";
import { useGetWorkspaeceQuery } from "~/hooks/use-workspace";
import type { Project, Workspace } from "~/types";

const WorkspaceDetails = () => {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const [isCreateProject, setIsCreateProject] = useState(false);
  const [isInviteMembers, setIsInviteMembers] = useState(false);

  if (!workspaceId) {
    return <div>Workspace not found</div>;
  }

  const { data, isLoading } = useGetWorkspaeceQuery(workspaceId) as {
    data: { projects: Project[]; workspace: Workspace };
    isLoading: boolean;
  };

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div>
      <WorkSpaceHeader
        workspace={data.workspace}
        members={data.workspace?.members}
        onCreateProject={() => setIsCreateProject(true)}
        onInviteMembers={() => setIsInviteMembers(true)}
      />
    </div>
  );
};

export default WorkspaceDetails;
