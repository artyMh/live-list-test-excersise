export interface IUsersStoreService {
  saveUser(username: string): void
  deleteUser(username: string): void
  isUserExist(username: string): boolean
  getUsers(): string[]
}

export class UsersStoreService implements IUsersStoreService {

  #users: string[] = []

  public saveUser (username: string): void {

    this.#users.push(username)

  }

  public deleteUser (username: string): void {

    this.#users = this.#users.filter(value => value !== username)

  }

  public isUserExist (username: string): boolean {

    return this.#users.includes(username)

  }

  public getUsers (): string[] {

    return this.#users

  }

}
