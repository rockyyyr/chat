import AuthenticationService from '../../server/authentication/AuthenticationService';
import Database from '../../database'
import User from './User'
import UserFactory from './UserFactory'

export default class UserService implements AuthenticationService {

  private readonly TABLE: string = Database.tables.users
  private database: Database

  constructor(database: Database) {
    this.database = database
  }

  /**
   * Create a RegisteredUser and save it to the database
   * 
   * @param user User object to create
   */
  public async registerUser(user: User): Promise < User > {
    try {
      const userId = await this.database.instance.insert(user).into(this.TABLE)
      const registeredUser = await this.database.instance.select().where('userId', userId).from(this.TABLE)

      return new User(registeredUser[0])

    } catch (err) {
      throw err
    }
  }

  public async login(accessToken, refreshToken, profile, callback): Promise < Function > {
    console.log('logging in...')
    
    let user: User | boolean

    try {
      user = await this.getUserByEmail(profile.emails[0].value)

      if (user) {
        user = await this.setUserAccessToken(user as User, accessToken)

      } else {
        user = await this.registerUser(UserFactory.OauthProfile(profile))
      }

    } catch (err) {
      console.log(err)
      callback(err)
    }

    return callback(null, user)
  }

  private async setUserAccessToken(user: User, accessToken: string): Promise < User > {
    user.setAccessToken(accessToken)

    try {
      await this.database.instance(this.TABLE).where('email', user.getEmail()).update(user)
    } catch (err) {
      throw err
    }
    return user
  }

  public async getUsers(userIds: string[]): Promise<User[]> {
    let response

    try {
      response = await this.database.instance(this.TABLE)
        .select()
        .where(builder => builder.whereIn('userId', userIds))

      response = response.map(user => new User(user))

    } catch (err) {
      throw err
    }

    return response
  }

  /**
   * Return a RegisteredUser by their userId
   * 
   * @param userId userId to search for
   * @return a RegisteredUser object or false if no user was found
   */
  public async getUser(userId: string): Promise < User | boolean > {
    return this.lookupUser('userId', userId)
  }

  /**
   * Return a RegisteredUser by their email
   * 
   * @param email email to search for
   * @return a RegisteredUser object or false if no user was found
   */
  public getUserByEmail(email: string): Promise < User | boolean > {
    return this.lookupUser('email', email)
  }

  /**
   * Return a RegisteredUser from the database by the key specified
   * 
   * @param key the column to query by
   * @param value the value of the column to search for 
   * @return a RegisteredUser object or false if no user was found
   */
  private async lookupUser(key, value): Promise < User | boolean > {
    let users: any[]

    try {
      users = await this.database.instance.select().where(key, value).from(this.TABLE)

    } catch (err) {
      throw err
    }

    return this.foundUser(users)
  }

  /**
   * Check if a user was returned from the database
   * 
   * @param users resulting array returned from the database
   * @return a RegisteredUser or false if no user was found
   */
  private foundUser(users: any[]): User | boolean {
    let result

    if (users.length > 0) {
      result = new User(users[0])
    } else {
      result = false
    }

    return result
  }
}
