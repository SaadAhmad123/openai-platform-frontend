import { createMachine, assign } from 'xstate'
import safeConsole from '../../../../helpers/safeConsole'

type LoginStateMachineContextType = {
  email: string
  password: string
  error: string
  confirmPassword: string
  verificationCode: string
  auth: any
}

const loginStateMachine = createMachine<LoginStateMachineContextType>(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QBkD2UCWA7AsgQwGMALbMAOgEkIAbMAYmQHkBxCgOQG0AGAXUVAAOqWBgAuGVFn4gAHogBMANgAsZLgGYAjPM2KA7AFYAnAa5GjAGhABPRJqMAOMg4OKHXZefV6lB5QF9-KzRMXEISLHIqWjoAMUYAJWZGABUAfQAFAEEAZRyAdUSAEW4+JBAhEXFJaTkEdS4uPTIjRXUGxSM9FUVNZStbBE0PLhaPTXVFN2UHdQc9QOD0bHxiUjIQ0KgAAgosOghJcmwAN1QAa3IQlfD1zewdvYRT1AI8aqxS0ulKsQkpcp1eR+NRaHT6YymLwDOzaeRkPQTTQ+XoOPrKAJBEDXMJrSIbdBbXb7Q74l6XAmhVYRK6Eh7E55YM5vD5fTRlQTCP41QEKEEabS6QwmMxGdQwhAOVSTZS9TTzPpTAyaRbY5a4mmUol7OhgABOetQerIAmo7wAZkaALaUm542lQbVYRnM97-L68H5cj61BQqUGCiEi8wSgw+MiTLjyTw+DR6JqqnHUu50rCPfb6w3G00W622jUpx30p4vFnu3gcdleqr-X0IJSqAXg4VQyw2RDKLiKMj6LTmZQGSaKLuJ9XJ-EAUQNRroMlgone5Dw5tE+oAFMMuABKBhj26T6d677lX4+3mS+SjMwOeZ6OatFwGCWd7u9+xGAdDkdYpP78ixI0oFQURtgyPBYFgAB3I0IDoBIJxyCcUmPTkax5UA6gaJoWjaDouh6PoJWjVRgWRO91B0LpdAMUcqT-MgAL1ICQLAiDoL1CBKBoeh4IARQAVQQ9IAGFGCKCcUIqb1a3PdQDGjMhfCHJRGkUUN1CMRTumVLhlTFCYHFou1NUY5jQPAqCYLIBIwAARwAVzgcQ022YTUAgehSWOJkLgdYz1lM4DzLYqybIcpz6TcjyXVeN1JA9DkpLQgEMI7KMDEUvwTGjD8PDvCVunhBxFGjPQpW0zQwyMgt8UCliLPYziwsc+dIvc+hMyNE0zVES09RtX97QYwCgtYyyOOsuyWucnYorAGKy3iitPRPaT0NkNLgUyzx5M8TtlHy9sECyiMTGK0UPCMBMfz3Ia6uC8bOInLBVz1bY2DASCHsauh+IyIoshSCdMlyApikk08ZNS+oyuaDF9EvBwVNlPQJWGYdFJUNFdIo9QMSMarx3-Eb6pCibnte97Pu+mC4IQpC0niJJUhBvJCgSEoVtQ7kUo2hBOy0LTdJURFIzUo7sYjeVL3feRvHkeRCfo+6xsasgpyzWd50XMhl1ejdGh3QaTJJmnycPCG1t5uplGRTQhYMAwXE6IxLyfI7bc0ox0dFQdHAJm66Lu03Vas-iBAgN0XNDjiDiOMhyT8mriaY0aGrDiOo52GOIAWuLPmWxLIfWm30u27K9ry8UjrcdQI0mYrlRlLoA6WIOTdT0nHrIcPI5ms3YM67Mer6gbbo7syc57zP+5zvPWUL6sebrTstuBHacv2w7Bl6bs5aaeR4zK+QrsUJXg87geyBz7Ze8XbYcnsggCDgWAtYXVddZXddN23Xd24CiHdOE0b531XA-J+L8IKW2SnWLCzRWjtC7PhWUhEjr2G7HoVol13Byk8IZQO-lapALJpxAAangagGA+5gAHnHMkPkKTG0AZfKeFCqE0IHvPcsPAYHL1krtTGg4pgqS7BKKYmkzDKDlq0aWB1z4TzTqQsg7DqH3xzrqQ83Vcz9XzETYarDgHkMoWo8Bc9Sz5wSkvM80M5IKSUiI4cYijr6TUJ4LoWCGiuwIW3IhScIHP1fuaey1A6ZFAoPBYSyEuZJX4dDLBGU5JiiVHjJG0i0a6QRPKPQ8YSqDhySfBR6wchEFQF9RiL9XJEDwGmWhN8MiGitAIUQdNELRKLlbOsShipkGRCYYYAskaaAyd7FokxiLGBKqpIp+ISllO2BU2hwlqm1IHqBRpzT346z1j-Q2-8-FkDmeUo0lTlk1JgGshpqAmmiD4TYvmrQMq6UcDeQUrsVBo3lE4TQlVXaNCut7eQPi1QAPxG5LA5oMD9VvrAfUrSkJ3Khnzbp3Y+k6UGToUMA4yD4MPt4Lx0jW4goOeCyF0L+KwuNNEHiE4BJCTSKJcSiKS52FlE4K6Zgpg3k8ArBwEoxROC7E0LBSgEmuBmeQUlUKrQwv1JNcKrUXJzXod5M4TDx7rCleSyl8rpptWihYhevCYnF2tqytwYxOVuClK7IFGS8aKX2n4QqXKJVkC1TKilcrmoRSVe1TRWZtG9TzMwsFkgyWep1T6xVs12rcKWsajpsDzyXg-L0+Y3gm5dBcKjFxhhnAUTyhifeZg3UetlcaCm+pthkP1BgSFi0sCuX9WQicCQKCxAAJoMrEhJE1nTzw3jhh+O88knbdG9qGeMjquAOHMDlewcwy3hulRW9WL1q21r1PWjAjbm0eXhekVt7bYgUGEoDCgjBOD9uTdDIdOKR12PHZ0YZEsFYtB9oODS+Fl0QtXV6yth4tmfx2XqA2f9Q2SpXdquVGsjTMrNfWJQ9s0WTAmCYYwEo0ROFmCfZEOkox3l-RGtdW763WH1Z5eOic9H0XLQBlRdbzQUb9QanyjarGrVvXzRU7L-lcptby0M7gIzDhyrGbw11fHJ3ddByNcqyPMcowGrqOZg26Mg7Jv9MHjSKZY7GtjrojUIbrLxy1rRrU8rtTXcwPZdK6TDPJa8RLNP0Z1Yp3d+cAlQLfnOD+S5v5gd-kbDVYbtPyd00xzzHxvOvxMymtwqKEkDI0EM8Rtsew5I-La1wjtFaqiwO1eA5RIPWKRXUAAtOLQYFWMrmHq3jDExUDpArddSsrLL6ze00loQwlU8vuDFERRQTyHx4eUO0Ho6g3X3BcnsDriH0lHW8JpN8UoRu1xUG6uDeoFt1lcHXF8fTsPyTlhKSYmlkRSjlj84qOa3UqyMXt2SiM3Guw0joUwhhzsURxVoFbEx2iu2RA9kh3d2tcbiXzPGW1egmD0DMGUs7QwlR7J9vLfRWgudCynSeRjdW+oM2AZ7tjuj2yxvYeUH45Y5PUpduYB07aU6I4QmTj3lFVreh9L6OcSd8wmwpMMZU7FtC4PYT5ZgewjfmBZtw2gaKs-0ez7uO2+c2woqoIXsx5Ki-F0dR2ox5gDldoYfQSNQeGOUWA+kvPIf3MwoYVQMx9CU-cArXS6XNfU+jEM6RSgLd4+UaAmetDH6BIgmrjsFEnB3kx5J0W8hxFIylvO2dJVOhYID0o7uqjOG2+5vbxAFFXBvZkZ9po7tBiuKuu4MWzX7AzfVLFiCwTqCR+OiCYEwILsaUXXyt9CIFb6EaGYeUUZsegvIDZCAUKwAEFEO31xcwsGOH0J0BWieJb2wOt7OU+LdI-LdUchZJylkrIufUjZC+7flcQG0dlfRGgGSFcVT5OgeyyOPmVXaCxFd0bkxWu3sOBlIfMYOYJ0CoFRM+MniVN4CKgjp2N7MRv+jqhDgXrfkMB0D2HJN4NIj4PpNVogEjHXBpIYIYNGG4BoJiNJvom5t6lNITvusTjfp1mRFeCjLvI4LKCNvysqPXJeBRCoM6voMgTpuupTB5nunNEAYOFpGAVjpAYiOIh4Dik7O0BpLgi4MCq5gAQxqriwYhjIk7ndtoLhtLgVGiPXGiLbPhrpNGKIRFoxtukpqxswegawb8qdELlTnknMFOqMMMECsOBiH0gjg4aRlFnumHj5u3tLJpIYCtjGFGHLJvoMGGD1hNg0H4LKGGKWoEP4EAA */
    id: 'LoginMachine',
    initial: 'Idle',
    states: {
      Idle: {
        on: {
          LOGIN: {
            target: 'Logging In',
            actions: [
              'assignPasswordToContext',
              'assignEmailToContext',
              'clearErrorFromContext',
            ],
          },
          FORGOT_PASSWORD: {
            target: 'Forgot Password',
          },
        },
      },
      'Logging In': {
        invoke: {
          src: 'onLoggingIn',
          onDone: [
            {
              target: 'Show Force Change Password Prompt',
              cond: 'isNewPasswordRequired',
            },
            {
              target: 'Login Successful',
              actions: 'assignAuthToContext',
            },
          ],
          onError: [
            {
              target: 'Confirm User',
              cond: 'isUserNotConfirmed',
            },
            {
              target: 'Error',
            },
          ],
        },
      },
      Error: {
        entry: ['onError', 'assignErrorToContext'],
        after: {
          '100': {
            target: '#LoginMachine.Idle',
            actions: [],
            internal: false,
          },
        },
      },
      'Forgot Password': {
        initial: 'Idle',
        states: {
          Idle: {
            on: {
              REQUEST_CODE: {
                target: 'Requesting Code',
                actions: 'assignEmailToContext',
              },
            },
          },
          'Requesting Code': {
            invoke: {
              src: 'onRequestingCode',
              onDone: [
                {
                  target: 'Enter New Password',
                },
              ],
              onError: [
                {
                  target: 'Error',
                },
              ],
            },
          },
          'Enter New Password': {
            on: {
              UPDATE_PASSWORD: {
                target: 'Validate Password',
                actions: [
                  'assignPasswordToContext',
                  'assignConfirmPasswordToContext',
                  'assignVerificationCodeToContext',
                ],
              },
              RESET_FORGOT_PASSWORD: {
                target: 'Idle',
              },
            },
          },
          Error: {
            entry: ['assignErrorToContext', 'onError'],
            after: {
              '100': {
                target: '#LoginMachine.Forgot Password.Idle',
                actions: [],
                internal: false,
              },
            },
          },
          'Updating Password': {
            invoke: {
              src: 'onUpdatingPassword',
              onDone: [
                {
                  target: 'Password Update Success',
                },
              ],
              onError: [
                {
                  target: 'Error',
                },
              ],
            },
          },
          'Password Update Success': {
            after: {
              '1000': {
                target: '#LoginMachine.Idle',
                actions: [],
                internal: false,
              },
            },
          },
          'Validate Password': {
            invoke: {
              src: 'onValidatePassword',
              onDone: [
                {
                  target: 'Updating Password',
                },
              ],
              onError: [
                {
                  target: 'Enter New Password',
                  actions: 'assignErrorToContext',
                },
              ],
            },
          },
        },
        on: {
          RESET: {
            target: 'Idle',
            actions: 'clearErrorFromContext',
          },
        },
      },
      'Login Successful': {
        entry: 'onLoginSuccessful',
        on: {
          REDIRECT: {
            target: 'Redirect',
          },
        },
      },
      Redirect: {
        entry: 'onRedirect',
        type: 'final',
      },
      'Show Force Change Password Prompt': {
        on: {
          RESET: {
            target: 'Idle',
            actions: 'clearErrorFromContext',
          }
        },

        after: {
          "100": "Forgot Password.Enter New Password"
        }
      },
      'Confirm User': {
        initial: 'Idle',
        states: {
          Idle: {
            on: {
              REQUEST_CODE: {
                target: 'Requesting Code',
                actions: 'assignEmailToContext',
              },
            },
          },
          'Requesting Code': {
            invoke: {
              src: 'onConfirmUserRequestingCode',
              onDone: [
                {
                  target: 'Enter Verification Code',
                },
              ],
              onError: [
                {
                  target: 'Error',
                },
              ],
            },
          },
          'Enter Verification Code': {
            on: {
              VERIFY_CODE: {
                target: 'Verifying Code',
                actions: 'assignVerificationCodeToContext',
              },
              RESET_VERIFICATION: {
                target: 'Idle',
              },
            },
          },
          Error: {
            entry: ['assignErrorToContext', 'onError'],
            after: {
              '100': {
                target: '#LoginMachine.Confirm User.Idle',
                actions: [],
                internal: false,
              },
            },
          },
          'Verifying Code': {
            invoke: {
              src: 'onConfirmUserVerifyingCode',
              onError: [
                {
                  target: 'Error',
                },
              ],
              onDone: [
                {
                  target: 'Verification Success',
                },
              ],
            },
          },
          'Verification Success': {
            after: {
              '1000': {
                target: '#LoginMachine.Idle',
                actions: [],
                internal: false,
              },
            },
          },
        },
        on: {
          RESET: {
            target: 'Idle',
            actions: 'clearErrorFromContext',
          },
        },
      },
    },
    schema: {
      context: {} as {
        email: string
        password: string
        error: string
        confirmPassword: string
        verificationCode: string
        auth: Record<string, any>
      },
      events: {} as
        | { type: 'LOGIN' }
        | { type: 'FORGOT_PASSWORD' }
        | { type: 'RESET' }
        | { type: 'REDIRECT' }
        | { type: 'REQUEST_CODE' }
        | { type: 'VERIFY_CODE' }
        | { type: 'RESET_VERIFICATION' }
        | { type: 'UPDATE_PASSWORD' }
        | { type: 'RESET_FORGOT_PASSWORD' },
    },
    context: {
      email: '',
      password: '',
      error: '',
      confirmPassword: '',
      verificationCode: '',
      auth: null,
    },
    predictableActionArguments: true,
    preserveActionOrder: true,
  },

  {
    actions: {
      assignEmailToContext: assign({ email: (context, event) => event.email }),
      assignPasswordToContext: assign({
        password: (context, event) => event.password,
      }),
      assignErrorToContext: assign({
        error: (context, event) => event?.data?.message || '',
      }),
      clearErrorFromContext: assign({ error: (_, __) => '' }),
      onError: (context, event) => safeConsole()?.error({ context, event }),
      assignConfirmPasswordToContext: assign({
        confirmPassword: (context, event) => event.confirmPassword,
      }),
      assignVerificationCodeToContext: assign({
        verificationCode: (context, event) => event.verificationCode,
      }),
      assignAuthToContext: assign({ auth: (context, event) => event.data }),
    },
    guards: {
      isUserNotConfirmed: (context, event) => {
        console.log(event)
        return event?.data?.code === 'UserNotConfirmedException'
      },
      isNewPasswordRequired: (context, event) => {
        console.log(event)
        return event?.data?.ChallengeName === 'NEW_PASSWORD_REQUIRED'
      }
    },
  },
)

export default loginStateMachine
