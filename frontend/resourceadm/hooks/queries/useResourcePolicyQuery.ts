import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { useServicesContext } from "app-shared/contexts/ServicesContext";
import { QueryKey } from "app-shared/types/QueryKey";
import { PolicyBackendType } from "resourceadm/types/global";

/**
 * Query to get a policy of a resource.
 *
 * @param org the organisation of the user
 * @param repo the repo the user is in
 * @param id the id of the resource
 *
 * @returns UseQueryResult with an object of PolicyBackendType
 */
export const useResourcePolicyQuery = (org: string, repo: string, id: string): UseQueryResult<PolicyBackendType> => {
  const { getPolicy } = useServicesContext();

  return useQuery<PolicyBackendType>(
    [QueryKey.ResourcePolicy, org, repo, id],
    () => getPolicy(org, repo, id), { select: (data) => ({
        rules: data.rules ?? [],
        requiredAuthenticationLevelEndUser: '3',
        requiredAuthenticationLevelOrg: '3',
      })
    }
  )
}

