export function usernameValidator (usernameValue: string): string | null {

  if (!(/^[A-Za-z\s]+$/).test(usernameValue)) {

    return 'User name should contain only letters'

  }

  if (usernameValue.length > 15) {

    return 'Label name should not be longer than 15 symbols'

  }

  return null

}