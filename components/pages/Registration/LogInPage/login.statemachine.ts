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
    /** @xstate-layout N4IgpgJg5mDOIC5QBkD2UCWA7AsgQwGMALbMAOgEkIAbMAYmQHkBxCgOQG0AGAXUVAAOqWBgAuGVFn4gAHogBMANgAsZLgGYAjPM2KA7AFYAnAa5GjAGhABPRJqMAOMg4OKHXZefV6lB5QF9-KzRMXEISLHIqWjoAMUYAJWZGABUAfQAFAEEAZRyAdUSAEW4+JBAhEXFJaTkEdS4uPTIjRXUGxSM9FUVNZStbBE0PLhaPTXVFN2UHdQc9QOD0bHxiUjIQ0KgAAgosOghJcmwAN1QAa3IQlfD1zewdvYRT1AI8aqxS0ulKsQkpcp1AC08nULSUykmBl0nUUOn6Njsmj6ZDaemUoMcmlM6gCQRA1zCa0iG3QW12+0OJJel1JoVWESuZIeFOeWDObw+X00ZUEwj+NUBCj8ai0On0xlMXgGiAcqkmyl6mnmfSm0MWBOWRMZdPJezoYAATobUIayAJqO8AGamgC2dJuxKZUD1WDZHPe-y+vB+-I+tQUKlF2l0hhMZksiIQBh8ZEmXHknh8Gj0TQ1hIZd2ZWEe+yNJrNFutdod2qzLpZTxenK9vA4PN9VX+AYQEOD4rDUsjg2UXEUqL0WnMygMk0UffTWszJIAosbTXQZLBRO9yHgraIjQAKYZcACUDCnt1n88N33Kv39QoQDnkozMDnmg4crRcBhlCF7-f0Q6MI7HE74hmx7kLEppQKgojbBkeCwLAADupoQHQCQzjkM4pOefJNoKoB1A0TQtG0HRdD0fQfomqjyNCeiDuoOhdLoBiTvSIFkGBhoQVBMFwYhhoQJQND0KhACKACqaHpAAwowRQzlhFR+s217qAYiZkL4Y5KI0igfqORgad00JcNCRhaHMLGOjqHFcdBsEIUhZAJGAACOACucDiDm2xSagED0FSxzshczpWesNmQXZvGOc57meSyvn+e6ryepI3q8opOEAnhiC9tRGl+CYiZ-h4g4ft08jOHCyh6HKRnYgsQFHk67HgZFPEOfxTmuR5y4JX59D5qa5qWqINqGvawEtRF3H2XxAmxb1Xk7IlYDJTWaV1j6F5Kbhsi5QmBgFZ4ameL2NXqHpnhxiYDjjuYHhGGmTWsdNbWzdFXUzlgm6GtsbBgPBUWdchYkZEUWQpDOmS5AUxQKZeyk5fUtXNMoirJre44Yx+wzjhpKgOMMo6gujRiWWWJIzcD81kN9v3-YDNNIShaEYWk8RJKkMN5IUCQlNt2ECtl+2fhomiGSZKh6BM466VGROjFot5cPYRigj48gU9OoHvczX2nouy6rmQ66-TujQHlN1l6x1tNzgWCO7SLdTKJoMuSwYBguJ06smR+bsGUYeMRvpL7a2x1N245YkCBAnredH-EHEcZA0qFlO65x7VzTHccJzsScQOtqWfFtGWI3truHcdRVnaVl1Rm4YLtG4ijQgqXTky9YVU7buddbH8fLfryFDYWo3jZNzU29nH0g2QQ8F6PJdcuXjbCy2eVHdRJ3FedZVN7oGkND4qa1fIT2KBHb1z6PZBF9sS+btsORuQQBBwLARsrpupsbtuXc+5DyvVnrZIuD8B4QCfvnF+b8P5fydllFsBFmitHaH2UiipyJRnsP2PQrRHruCVJ4BwN8wE50+gJAAangagGBh5gFHinakwVaTW3Cv3KhZBaH0MYSvaspd0obyvMjVS6lNJTG0n2D8UwDJmAxOoVoypEyNSWKAzhd8IG8IYauZh48RrFgmqWHWrUtFQJ4XQ3RL8i6r1rDwJBm8VKnQJqOKR44ZFRjMhLR6XQCENHVmQnumdSyv3fp-OCVo3LUFZkUCgqEpKYUFplJxyMCFHVUmZNUuJbwYlxiZMgMsnx9mot4Hw3d1G93IDkIgqAgYcU-j5IgeAcxMMfhkE0toBCiFZuhJJFdnYtiUHdMg7sTDDF7HMHQ+Tg4tEmJRYwcIdLkPWDUup2wGlMKks01po9oKdO6YJGIYMIZQx5nDfmjjRGi0Uc4DQPstA1W0C4XGDRKreCmaGB8KgVkkjWfU00jTtktJgHsjpqAumiEXrAlkRcWFBTOOwmeqzakAsNECnZoL2kHKhc-WFUC7GbQcckyuLsFBYw0sVYOXd0bo1xhiI6-51amC9u3Lovzqmoo2YCrZmK2lQP2RCw5eLE5QINKeQxY0SwcL+VyzZTSQX8qoYKyF0Lh74qoYSsuxKBnIOvI+CWfhkRdGhG0ZluMYxggxq4RUcJ6Ja2CaY-53L0W8sVWCnFdNDZLl-muABhoLbAJlZy9Z8rgW7OxUKqFDtTRXKRqLHQR0ZYNHondEcu95C4w8aM3EtVXDtDdqpDlZBnVhr5R6qNli+HLzhYFNObCM5OrlTyhVEaBXgtVTo9VorNWCLXjqkR8a6jIgIXGLQhgxkwi9q83Eah5ClNxImJRnhi2lpbeGrF7bPVdprWKgxRYpXGODSW5trrW2buVR2w5O6R62L7fYuNVdEBewMjVJ6xhg5fjpbgvwqhVatE8KRJQ+hi2+SwFaDAE0n6wCNL0jCj6yWtjbqM9JEz7nTKjH4Rljh5CDkHAoy+oHJAQag2JGDZpojCRnOJSSaQZJyQQy2VUTgnpmCmI+Tw86HAfjMk4PsTQCFKHSa4Ij4HIO2mg0abqcU+reVWvC+tiLG1sTAyRiTZGpOLXinJgaWrhE7T1cjZjYw2NuDlOreQ3HcEaCoudPwFV2OibU5Js0WnZMrQGuKgskqp4mJU8R8TLnpNLX6kle9RLGPXjvH+UZ8xvAdy6C4PQPHDDOHoqVdGoJGgVM1BokkqnAsabNPTI02xqFGgwBBjaWAfKeeoTOBIFBYgAE06OyXkiSwZ+r5hkDOoONS3tujBz0qmDSvYXzq08PYCyjr-NidI+RumP1SvlcNJVjA1Xav+Tg+kerjXYgUCkpDCgjBOCdcM6LR8aM-z9eovMTomgPy3kqsHfjo4lGkSc4VxbMbDQ-xNmbQBlsQFVLIAVhbUnfuReRvO3oKGTCTAmCYYwT3lRpcvu7YyCZBxfYh2aVblXrChYCqndOfmWrg-U4tgnVoic6bC8Far+mhbXOHYqFj2X2Pma43pdwcZxzFWTN4Z6lSQmU6CzTunHntv7sntK5F+WAt454RV2nxO9PrwM6k0WxnWOtDM5xyzsjzCohMiZGMakHw5ePeLorKu1tVdLmEhBcF-t-0BwGoBVsFfkFt9T1XG2nfwIibAaHCbkNjOMpM28j2m5uwHAQw3rgvYOvxFgAa8ByjBsHU+hAQJlQSyXTGOE8wcP+yjECI65gHpzHGKrCYajcug8oznxDGODLjuhF7NS7gzIUXbmoV8GPIQKjaMW+43k9it5bPn9oY3VIVVLyrd8UZvCVUaH4W85gVC5uYrNlqv3p-Xj8P2c3Jgvy1SaN2RA7RmjmQxPMS+GI+x79F6YqOUCj9iLvHxzjSjE1NAr6DDtCVSQh9DuzP4TAzZv6RxcILwt5a6s434Mqoj2AxgzAKhcBWaDCuCVRwjYgp59CtDW4+5mLgIWJuYjyrRf6izeBw6Ez2DKh-gazJaYZKI5p1TuzGruzqDFof7cIlZ-QAxAxFw0Guz0SqAxi1TiJtD-q4zDAGRqil5TBuDaCv5N4hL8ELyH6IFDq5QSFkBSGzBqSyH2B6SmDODojGC4auAXx8FwG0wiqFyf66G57xaqAzD6CMHuDzrl6DAqCSHMGJgx4YhKD2HmLcKPzPxMLB5fxiH6GWaFKPJmTnwTCZpNy3hxhqw-5widAELhHkHcI3pKogzxH1DUSn5-7qzYiAE8ZaBjDuDxhtyBzj5ajO4h5RLUBlFexUQDaTBmTUpzBPaVSaz6CNBmDKgJgkF5bkDOQQCQZgAECiBlHeJxil6OD6CdDzrpGDBEy9YEK6DIgfImTIirqnoYruqRqQplGhiFITAaCWYqADZ5K4LwjOB-hwjBzeATDYhnGhrrrlpXGHIIEs56H1CqR3EpqPHpp+AzqVQsq9BuDURKDTGg5rpnobolHzQqrCowo9qlGuGIYhjNCmDBFuCoxuyx6DB9AjIdzoxuAAa4YOowEtTokXFtqXqeo6Ggm57P6GEEQeC4ZAI7F2BTCjATA1QPK4gTDqHHpsluockgw4lQo3oaoEk8mIZFJjDtC5oI61TX5DABJzqlJ+Dzruzhz746h+5GhlHjg7xhjb4AaMQByZF2pTAEJX4Yi-GWnrDWkUZCQ3EdCoiqTeAYjlJaDyy7Ggg3SGCGCJhuA2a45U6aY9TabS5gA3G0T3gYyImOC2pAGIDjJjp3j0RPE1QgY+mK7zbJnFbLZ-Q06B4fBbYZmEktjtxgg2HV6whJhUmIDYy9bew6mOB9guBBIslWlK41leoFhlGYgeF3REyWalnezlR7HtBEyUmGAmSJhJkS6q5S7Nk3HYgd4mC0RMFwijjYHPqjbDCPEeBuwELoi7l24NmbaxFwQ3Fb6FKjiJ5dAJigginRijq4gYK-rtypjdyBBAA */
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
              actions: 'assignAuthToContext',
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
          },
        },

        states: {
          Idle: {
            on: {
              UPDATE_PASSWORD: {
                target: 'Validating Password',
                actions: [
                  'assignPasswordToContext',
                  'assignConfirmPasswordToContext',
                ],
              },
            },
          },

          'Updating Password': {
            invoke: {
              src: 'onForcedPasswordChange',
              onDone: '#LoginMachine.Idle',
              onError: 'Error',
            },
          },

          Error: {
            entry: ['assignErrorToContext', 'onError'],

            after: {
              '100': 'Idle',
            },
          },

          'Validating Password': {
            invoke: {
              src: 'onValidatePassword',
              onDone: 'Updating Password',
              onError: 'Error',
            },
          },
        },

        initial: 'Idle',
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
        return event?.data?.code === 'UserNotConfirmedException'
      },
      isNewPasswordRequired: (context, event) => {
        return event?.data?.ChallengeName === 'NEW_PASSWORD_REQUIRED'
      },
    },
  },
)

export default loginStateMachine
