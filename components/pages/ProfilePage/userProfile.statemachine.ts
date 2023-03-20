import { assign, createMachine } from 'xstate'
import safeConsole from '../../../helpers/safeConsole'
import { AxiosError } from 'axios'

type UserProfileStateMachineContextType = {
  error: string
  user: Record<string, any> | null
}

const userProfileStateMachine =
  createMachine<UserProfileStateMachineContextType>(
    {
      /** @xstate-layout N4IgpgJg5mDOIC5QFVZgE4AV0HsBmAlgDZgB0AkhCQMQBiAogCoDCAEgPqYBKA8reQBl6AbQAMAXUSgADjlgEALgRwA7KSAAeiAEwAOAOyltAZgAspkxYCMos9oCsAGhABPRKYBsp0gY-G7uvb2oroAnB4AvhHOqBjY+MRktGAKAMYAFgQqUAAE8YQ0EKpkWQBuOADWZLFYuAVJKRlZufmJCGU4qQCGSqpi4v3qsvK9akiaiPr6HqT24aa6HlPGVroLzm4IpqtGa0EL9quhc5HRIDWtJKTJaZnZeXWJ1Bi46KTSRD14OOgAtqQXR5XG5Ne6XMDtFTlbqjfqDcbDRTKMagLQIKYzE4LJb6FZrXQbRAeKzaUjGfT2JaiKymezkvxRGJoWoJYGNO4tIFgZ7oV7vT4Kb5-AHM8HXdnNB6siEdGHIuFWSQIuRI1TqNEY2bzRbLVbrVyISneUJWUKhTxTUSiLynJlxLmkADK6RwAHccjUpfVqMhMAARACCjHonF4-CE8JkKtG6sQx1CZN0xitDhCHhOhIQuispFM+hN9h15tCBn0jPOoodAHUukj7rQfl7Ejk-T0uj7-UGQ9w+IIRBIhtHkbGEKEVj5k7pFsmLPZ9Jn9FZ7KQrcZjiYPEn9KZjOXAdKAdIID0wE3CsVSB0qiL7QfkEeT2eZVDOj15RJIyBETHxmi9IZLAsOwbDsJwDQQMxjX0bQqVMUR7G0Tw90rO8HwUU9wR5PkPi+H5-n3epD2PdCn0haE3z6D8B2VEZh1-HQDCMSDLG0EDZ0zbQHBXDxQitdNEJLZN7GQ29COYdAwEfTCihUEoX2vAjElIcTJJI8EyNfWEqKVKNaLVeiEH-JjzBYtiHEzSkc3gjxRG0M1pjzCkRJZMSJKkrksJ+flcOFRSrhU9zpQ0uVKIGajdNVFEJkMxjANM2x2PAgxjFzPwbLMURTFCClTCiM4VBwCA4HUPywEHPSorRABaDxMxq5yxUoEhysikdVl0WYpznKwrA8bRlm0TMFg6ziaVEfRMuzc1xoah0QQ5J8Wp-VFDX60hQkQoIwisDF4KGrxSFxJNTSy0RwlxWaD2dN0PWZRaaNagyeug2ZWNs1YrUEqwOL6w7pmtfxdBMJd-Euwj6F5H4lrolaEGe0kEJsVjdE+46LJg0hVl6nj9BRvwrDBpSazrXIG3QJ8WzbaH9Nh+HXqRj6zrR8CKRzRdsV6ixxt0QmrnvYiMK5anKvcQbwJsHNaWCCltEy7LPt5sgArUoWHuW6LaR8PQQl8aCsqnCzjjJMcx3g8ITjyiIgA */
      id: 'UserProfile',
      initial: 'Idle',
      states: {
        Idle: {
          on: {
            FETCH_PROFILE: {
              target: 'Fetching Profile',
              actions: 'clearErrorFromContext',
            },
          },
        },
        'Fetching Profile': {
          invoke: {
            src: 'onFetchingProfile',
            onDone: [
              {
                target: 'Show User Profile',
                actions: [
                  'onUserProfile',
                  'logResponse',
                  'assignUserProfileToContext',
                ],
              },
            ],
            onError: [
              {
                target: 'Waiting For Profile Data',
                cond: 'isUserProfileNotExist',
              },
              {
                target: 'Error',
              },
            ],
          },
        },
        'Show User Profile': {
          on: {
            UPDATE_PROFILE: {
              target: 'Update Profile',
              actions: 'clearErrorFromContext',
            },
          },
        },
        Error: {
          entry: ['assignErrorToContext', 'onError'],
          type: 'final',
        },
        'Waiting For Profile Data': {
          on: {
            UPDATE_PROFILE: {
              target: 'Create Profile',
              actions: ['clearErrorFromContext', 'assignUserProfileToContext'],
            },
          },
        },
        'Update Profile': {
          invoke: {
            src: 'onUpdateProfile',
            onDone: [
              {
                target: 'Fetching Profile',
                actions: ['logResponse', 'assignUserProfileToContext'],
              },
            ],
            onError: [
              {
                target: 'Show User Profile',
                actions: ['assignErrorToContext', 'onError'],
              },
            ],
          },
        },
        'Create Profile': {
          invoke: {
            src: 'onCreateProfile',
            onDone: [
              {
                target: 'Fetching Profile',
                actions: ['logResponse', 'assignUserProfileToContext'],
              },
            ],
            onError: [
              {
                target: 'Waiting For Profile Data',
                actions: ['assignErrorToContext', 'onError'],
              },
            ],
          },
        },
      },
      schema: {
        context: {} as {
          error: string
          user: Record<string, any>
        },
        events: {} as { type: 'FETCH_PROFILE' } | { type: 'UPDATE_PROFILE' },
      },
      context: { error: '', user: null },
      predictableActionArguments: true,
      preserveActionOrder: true,
    },
    {
      actions: {
        logResponse: (context, event) => safeConsole()?.log({ context, event }),
        onError: (context, event) => safeConsole()?.error({ context, event }),
        assignErrorToContext: assign({
          error: (context, event) =>
            event?.data?.response?.data?.error || 'Something went wrong',
        }),
        clearErrorFromContext: assign({ error: (_, __) => '' }),
        assignUserProfileToContext: assign({
          user: (context, event) => event?.data || event || null,
        }),
      },
      guards: {
        isUserProfileNotExist: (context, event) =>
          event?.data?.response?.status === 404 &&
          event?.data?.response?.data?.error?.includes('User record not found'),
      },
    },
  )

export default userProfileStateMachine
