import User from "./User";
import GoogleStrategy from "../../server/authentication/strategies/GoogleStrategy";
import FacebookStrategy from "../../server/authentication/strategies/FacebookStrategy";

export default class UserFactory {

  public static OauthProfile(profile: any): User {
    switch (profile.provider) {

      case GoogleStrategy.PROVIDER_NAME:
        return UserFactory.googleProfile(profile)

      case FacebookStrategy.PROVIDER_NAME:
        return UserFactory.facebookProfile(profile)

      default:
        throw {
          status: 422,
          message: `Oauth provider not supported: ${profile.prodiver}`
        }
    }
  }

  public static googleProfile(profile: any): User {
    return new User({
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      email: profile.emails[0].value,
      joinedDate: Date.now().toString(),
      imageUrl: profile.photos[0].value
    })
  }

  public static facebookProfile(profile: any): User {
    return null
  }
}
