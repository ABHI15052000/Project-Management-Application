import { useMutation, useQuery } from "@tanstack/react-query"
import { getData, postData } from "~/lib/fetch-util"
import type { WorkspaceForm } from "~/components/workspace/create-workspace"


export const useCreateWorkspace = () => { 
    return useMutation({
        mutationFn: async(data: WorkspaceForm) => { return postData('/workspaces', data) },
    })
 }

export const useGetWorkspaecesQuery = () => {
    return useQuery({
        queryKey: ['workspaces'],
        queryFn: async () => getData('/workspaces'),
    })
}

export const useGetWorkspaeceQuery = (workspaceId: string) => {
    return useQuery({
        queryKey: ['workspace', workspaceId],
        queryFn: async () => getData(`/workspaces/${workspaceId}/projects`),
    })
}
