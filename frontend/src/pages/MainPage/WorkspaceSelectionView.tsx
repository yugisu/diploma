import React from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { useLocation, useNavigate } from 'react-router-dom'

import { Button } from 'components/Common/Button'

import * as Gql from './WorkspaceSelectionView.graphql.module'

export const WorkspaceSelectionView = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const currentSessionQuery = useQuery(Gql.GetUserSessionForProfilesSelectionDocument)
  const currentSession = currentSessionQuery.data?.currentUserSession

  const [runSelectProfileMutation, selectProfileMutation] = useMutation(Gql.SelectProfileDocument)

  const handleSelectProfile = async (profileId: string) => {
    if (currentSession) {
      if (profileId !== currentSession.profileId) {
        await runSelectProfileMutation({ variables: { profileId } })
      }

      navigate((location.state as { next?: string } | null)?.next || '/')
    }
  }

  const mutationLoading = selectProfileMutation.loading

  return (
    <div className="flex-1 p-10 pb-20 flex flex-col justify-center items-center">
      <div className="max-w-lg w-full">
        <div className="flex flex-col mb-8">
          <h2 className="text-6xl mb-6 opacity-90">Welcome</h2>

          <div className="animate-appear">
            <h6>Please, select a workspace profile to continue with:</h6>

            {currentSession && (
              <>
                <ul className="my-6 animate-appear pl-6 list-disc">
                  {currentSession.user.profiles.map((profile) => (
                    <li className="my-2" key={profile.id}>
                      <Button
                        onClick={() => handleSelectProfile(profile.id)}
                        disabled={mutationLoading}
                        loading={mutationLoading}
                        compact
                        primary={profile.id === currentSession.profileId}
                      >
                        {currentSession.user.name} @ {profile.workspace.name}{' '}
                        {profile.id === currentSession.profileId && '(current)'}
                      </Button>
                    </li>
                  ))}
                </ul>

                {/* TODO: Implement workspace creation flow */}
                {/* <span>
                Want to start something new?{' '}
                <button
                  disabled
                  className="px-1 inline-block underline hover:text-primary focus:text-primary"
                  type="button"
                >
                  Create a new workspace
                </button>
              </span> */}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
