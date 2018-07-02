export default interface AuthenticationService {

  login(...args: any[]): Promise<Function>
}
