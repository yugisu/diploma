import React from 'react'
import { gql, useQuery } from '@apollo/client'
import { UserAddIcon } from '@heroicons/react/solid'

import { GetCurrentUserSessionDocument } from 'generated/graphql-query-types'

import { Button } from 'components/Common/Button'

const CURRENT_USER_QUERY = gql`
  query getCurrentUserSession {
    currentUserSession {
      id
      user {
        id
        name

        profiles {
          id
          workspace {
            id
            name
          }
        }
      }
      profile {
        id
      }
    }
  }
` as typeof GetCurrentUserSessionDocument

export const WorkspaceSelectionView = () => {
  const currentSessionQuery = useQuery(CURRENT_USER_QUERY)
  const currentSession = currentSessionQuery.data?.currentUserSession

  // In case if the userSession.profile exists, just overwrite the profile field

  return (
    <div className="max-w-2xl w-full">
      <div className="flex flex-col mb-8">
        <h2 className="text-5xl mb-3 opacity-80">Select workspace profile</h2>

        <div className="animate-appear">
          <h6>To proceed, please select a profile to login with:</h6>

          {currentSession && (
            <ul className="animate-appear pl-6 list-disc">
              {currentSession.user.profiles.map((profile) => (
                <li className="my-2" key={profile.id}>
                  <Button compact>
                    {currentSession.user.name} @ {profile.workspace.name}
                  </Button>
                </li>
              ))}

              <li className="my-2">
                <Button compact>
                  <UserAddIcon className="inline align-text-bottom" height="1.2em" /> <span>Create a new profile</span>
                </Button>
              </li>
            </ul>
          )}

          <div>{JSON.stringify(currentSession, null, 2)}</div>
        </div>
      </div>
    </div>
  )
}
