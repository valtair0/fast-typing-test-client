import { FetchService } from "../Fetch/FetchService";

type UserResponse = {
  accessToken: string;
  accessTokenExpiration: string;
  refreshToken: string;
  name: string;
};

export class UserService {
  static async LoginUser(user: {
    usernameOrEmail: string;
    password: string;
  }): Promise<UserResponse> {
    return await FetchService.post(
      {
        controller: "User/Login",
      },
      user
    ).then((response: any) => {
      return response.token;
    });
  }

  static async CreateUser(
    namesurname: string,
    email: string,
    password: string,
    username: string,
    SuccessCallback?: (response: any) => void,
    ErrorCallback?: (error: any) => void
  ) {}

  static async LoginWithGoogle(IdToken?: string) {
    await FetchService.post(
      {
        controller: "User/google-login",
      },
      { IdToken }
    ).then((response) => {
      console.log(response);
      //set token cookie
    });
  }
}
