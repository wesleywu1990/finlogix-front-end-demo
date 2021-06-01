import axios from './axios';

export function login(email:string, password:string) {
    const body = {
        // email:'yuntest@mailinator.com',
        // password:'A123456',
        email: email,
        password: password,
      }
    return axios().post("/v1/auth/email/login", body);
}

export function logout() {
  return axios().post("/v1/auth/logout");
}

export function getUserInfo() {
  return axios().post("/v1/auth/me");
}

export function getPostList(pageNumber:number) {
  return axios().get(`/v1/posts?per_page=12&page=${pageNumber}`);
}

export function addFavorite(id:number) {
  const body = {
      ids:[id],
      model:'post',
  }
  return axios().post("/v1/favourites", body);
}

export function deleteFavorite(id:number) {
  return axios().delete(`/v1/favourites/post/${id}`);
}

export function getFavoritePost(id:number) {
  return axios().get(`/v1/posts?favorited=1&author=${id}`);
}