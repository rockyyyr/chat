import JWT from 'jsonwebtoken'

export default class JsonWebToken {

  public static create(payload: any): string {
    return JWT.sign(payload, process.env.JWT_SECRET)
  }

  public static verify(token: string): any {
    return JWT.verify(token, process.env.JWT_SECRET)
  }
}
