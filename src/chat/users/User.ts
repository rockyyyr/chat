export default class User {

  protected userId: string
  protected firstName: string
  protected lastName: string
  protected email: string
  protected accessToken: string
  protected joinedDate: string
  protected imageUrl: string

  constructor({ userId, firstName, lastName, email, joinedDate, imageUrl }) {
    this.userId = userId
    this.firstName = firstName
    this.lastName = lastName
    this.email = email
    this.joinedDate = joinedDate
    this.imageUrl = imageUrl
  }

  public getUserId(): string {
    return this.userId
  }

  public getEmail(): string {
    return this.email
  }

  public setAccessToken(accessToken: string): void {
    this.accessToken = accessToken
  }
}
