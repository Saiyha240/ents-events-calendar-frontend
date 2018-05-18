export class SocialUser {
  constructor(
    public id: string,
    public email: string,
    public image: string,
    public name: string,
    public provider: string,
    public token: string
  ) {
  }
}
