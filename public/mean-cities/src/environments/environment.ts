// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  environment: "Stores the current environment",
  base_url_api: "The base URL for the API",
  base_url_users: "The sufix for users API",
  base_url_login_users: "The suffix for the user login API",
  base_url_cities: "The suffix for the cities API",
  base_url_attractions: "The suffix for the attractions API",
  authorization_header_name:"The name of header to include in autorization",
  authorization_bearer: "word used when sending authorization header",
  token_name: "name of the token tag",
  path_root: "path for home",
  path_cities: "path for cities",
  path_register: "path for register",
  path_login: "path for login",
  path_add_city: "path for add city",
  path_city: "path for city component",
  path_update_city: "path for update city",
  path_aupdate_attraction: "path for update attraction",
  path_add_attraction: "path add attraction",
  path_error_page: "path for error page",
  city_id_tag:"tag for city id",
  city_route:"route for city",
  attraction_id_tag:"tag for attraction id"

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
