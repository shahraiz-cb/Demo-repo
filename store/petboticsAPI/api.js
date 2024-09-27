import axios from "axios";

if (axios) {
  axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
  axios.defaults.xsrfCookieName = "csrftoken";
  axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
}

const petboticsAPI = axios.create({
  baseURL: "https://petbotics-40848.botics.co",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
});

function api_v1_pet_list(payload) {
  return petboticsAPI.get(`/api/v1/pet/`);
}

function api_v1_pet_create(payload) {
  return petboticsAPI.post(`/api/v1/pet/`, payload.data);
}

function api_v1_login_create(payload) {
  return petboticsAPI.post(`/api/v1/login/`, payload.data);
}

function api_v1_signup_create(payload) {
  return petboticsAPI.post(`/api/v1/signup/`, payload.data);
}

function rest_auth_user_retrieve(payload) {
  return petboticsAPI.get(`/rest-auth/user/`);
}

function rest_auth_user_update(payload) {
  return petboticsAPI.put(`/rest-auth/user/`, payload.data);
}

function rest_auth_user_partial_update(payload) {
  return petboticsAPI.patch(`/rest-auth/user/`, payload.data);
}

function api_docs_schema_retrieve(payload) {
  return petboticsAPI.get(`/api-docs/schema/`, {
    params: {
      lang: payload.lang
    }
  });
}

function api_v1_pet_retrieve(payload) {
  return petboticsAPI.get(`/api/v1/pet/${payload.id}/`);
}

function api_v1_pet_update(payload) {
  return petboticsAPI.put(`/api/v1/pet/${payload.id}/`, payload.data);
}

function api_v1_pet_partial_update(payload) {
  return petboticsAPI.patch(`/api/v1/pet/${payload.id}/`, payload.data);
}

function api_v1_pet_destroy(payload) {
  return petboticsAPI.delete(`/api/v1/pet/${payload.id}/`);
}

function rest_auth_login_create(payload) {
  return petboticsAPI.post(`/rest-auth/login/`, payload.data);
}

function rest_auth_logout_retrieve(payload) {
  return petboticsAPI.get(`/rest-auth/logout/`);
}

function rest_auth_logout_create(payload) {
  return petboticsAPI.post(`/rest-auth/logout/`);
}

function rest_auth_registration_create(payload) {
  return petboticsAPI.post(`/rest-auth/registration/`, payload.data);
}

function rest_auth_password_reset_create(payload) {
  return petboticsAPI.post(`/rest-auth/password/reset/`, payload.data);
}

function rest_auth_password_change_create(payload) {
  return petboticsAPI.post(`/rest-auth/password/change/`, payload.data);
}

function rest_auth_password_reset_confirm_create(payload) {
  return petboticsAPI.post(`/rest-auth/password/reset/confirm/`, payload.data);
}

function rest_auth_registration_verify_email_create(payload) {
  return petboticsAPI.post(`/rest-auth/registration/verify-email/`, payload.data);
}

export const apiService = {
  api_v1_pet_list,
  api_v1_pet_create,
  api_v1_login_create,
  api_v1_signup_create,
  rest_auth_user_retrieve,
  rest_auth_user_update,
  rest_auth_user_partial_update,
  api_docs_schema_retrieve,
  api_v1_pet_retrieve,
  api_v1_pet_update,
  api_v1_pet_partial_update,
  api_v1_pet_destroy,
  rest_auth_login_create,
  rest_auth_logout_retrieve,
  rest_auth_logout_create,
  rest_auth_registration_create,
  rest_auth_password_reset_create,
  rest_auth_password_change_create,
  rest_auth_password_reset_confirm_create,
  rest_auth_registration_verify_email_create
};