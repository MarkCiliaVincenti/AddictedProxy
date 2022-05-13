// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="./custom.d.ts" />
// tslint:disable
/**
 * Addicted Proxy
 * Provide a full system to search and download subtitles from Addi7ed website.
 *
 * OpenAPI spec version: 2.0.0
 *
 *
 * NOTE: This file is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the file manually.
 */

import * as url from "url";
import * as isomorphicFetch from "isomorphic-fetch";
import { Configuration } from "./configuration";

const BASE_PATH = "/".replace(/\/+$/, "");

/**
 *
 * @export
 */
export const COLLECTION_FORMATS = {
  csv: ",",
  ssv: " ",
  tsv: "\t",
  pipes: "|",
};

/**
 *
 * @export
 * @interface FetchAPI
 */
export interface FetchAPI {
  (url: string, init?: any): Promise<Response>;
}

/**
 *
 * @export
 * @interface FetchArgs
 */
export interface FetchArgs {
  url: string;
  options: any;
}

/**
 *
 * @export
 * @class BaseAPI
 */
export class BaseAPI {
  protected configuration?: Configuration;

  constructor(
    configuration?: Configuration,
    protected basePath: string = BASE_PATH,
    protected fetch: FetchAPI = isomorphicFetch
  ) {
    if (configuration) {
      this.configuration = configuration;
      this.basePath = configuration.basePath || this.basePath;
    }
  }
}

/**
 *
 * @export
 * @class RequiredError
 * @extends {Error}
 */
export class RequiredError extends Error {
  constructor(public field: string, msg?: string) {
    super(msg);
  }
}

/**
 * Episode information
 * @export
 * @interface EpisodeDto
 */
export interface EpisodeDto {
  /**
   * Season of the episode
   * @type {number}
   * @memberof EpisodeDto
   */
  season?: number;
  /**
   * Number of the episode
   * @type {number}
   * @memberof EpisodeDto
   */
  number?: number;
  /**
   * Title of the episode
   * @type {string}
   * @memberof EpisodeDto
   */
  title?: string;
  /**
   * For which show
   * @type {string}
   * @memberof EpisodeDto
   */
  show?: string;
  /**
   * When was the Episode discovered
   * @type {Date}
   * @memberof EpisodeDto
   */
  discovered?: Date;
}
/**
 *
 * @export
 * @interface EpisodeWithSubtitlesDto
 */
export interface EpisodeWithSubtitlesDto {
  /**
   * Season of the episode
   * @type {number}
   * @memberof EpisodeWithSubtitlesDto
   */
  season?: number;
  /**
   * Number of the episode
   * @type {number}
   * @memberof EpisodeWithSubtitlesDto
   */
  number?: number;
  /**
   * Title of the episode
   * @type {string}
   * @memberof EpisodeWithSubtitlesDto
   */
  title?: string;
  /**
   * For which show
   * @type {string}
   * @memberof EpisodeWithSubtitlesDto
   */
  show?: string;
  /**
   * When was the Episode discovered
   * @type {Date}
   * @memberof EpisodeWithSubtitlesDto
   */
  discovered?: Date;
  /**
   * Subtitles for this episode
   * @type {Array<SubtitleDto>}
   * @memberof EpisodeWithSubtitlesDto
   */
  subtitles?: Array<SubtitleDto>;
}
/**
 * Returns when there is an error
 * @export
 * @interface ErrorResponse
 */
export interface ErrorResponse {
  /**
   *
   * @type {string}
   * @memberof ErrorResponse
   */
  error?: string;
}
/**
 * Use for the website to provide easy search for the user
 * @export
 * @interface SearchRequest
 */
export interface SearchRequest {
  /**
   * Search for specific subtitle
   * @type {string}
   * @memberof SearchRequest
   */
  search?: string;
  /**
   * Language of the subtitle
   * @type {string}
   * @memberof SearchRequest
   */
  language?: string;
}
/**
 * Represent the information relating to a show
 * @export
 * @interface ShowDto
 */
export interface ShowDto {
  /**
   * Unique ID of the show
   * @type {string}
   * @memberof ShowDto
   */
  id: string;
  /**
   * Name of the show
   * @type {string}
   * @memberof ShowDto
   */
  name: string;
  /**
   * How many season the show has
   * @type {number}
   * @memberof ShowDto
   */
  nbSeasons: number;
}
/**
 * Search for a specific show
 * @export
 * @interface ShowSearchRequest
 */
export interface ShowSearchRequest {
  /**
   * Search run on the shows
   * @type {string}
   * @memberof ShowSearchRequest
   */
  query?: string;
}
/**
 *
 * @export
 * @interface ShowSearchResponse
 */
export interface ShowSearchResponse {
  /**
   *
   * @type {Array<ShowDto>}
   * @memberof ShowSearchResponse
   */
  shows?: Array<ShowDto>;
}
/**
 *
 * @export
 * @interface SubtitleDto
 */
export interface SubtitleDto {
  /**
   * Unique Id of the subtitle
   * @type {string}
   * @memberof SubtitleDto
   */
  subtitleId?: string;
  /**
   * Version of the subtitle
   * @type {string}
   * @memberof SubtitleDto
   */
  version?: string;
  /**
   *
   * @type {boolean}
   * @memberof SubtitleDto
   */
  completed?: boolean;
  /**
   *
   * @type {boolean}
   * @memberof SubtitleDto
   */
  hearingImpaired?: boolean;
  /**
   *
   * @type {boolean}
   * @memberof SubtitleDto
   */
  corrected?: boolean;
  /**
   *
   * @type {boolean}
   * @memberof SubtitleDto
   */
  hd?: boolean;
  /**
   * Url to download the subtitle
   * @type {string}
   * @memberof SubtitleDto
   */
  downloadUri?: string;
  /**
   * Language of the subtitle (in English)
   * @type {string}
   * @memberof SubtitleDto
   */
  language?: string;
  /**
   * When was the subtitle discovered in UTC
   * @type {Date}
   * @memberof SubtitleDto
   */
  discovered?: Date;
  /**
   * Number of times the subtitle was downloaded from the proxy
   * @type {number}
   * @memberof SubtitleDto
   */
  downloadCount?: number;
}
/**
 * Used for different Media Center/Subtitle searchers
 * @export
 * @interface SubtitleQueryRequest
 */
export interface SubtitleQueryRequest {
  /**
   * Name of the show
   * @type {string}
   * @memberof SubtitleQueryRequest
   */
  show: string;
  /**
   * Episode number
   * @type {number}
   * @memberof SubtitleQueryRequest
   */
  episode: number;
  /**
   * Season number
   * @type {number}
   * @memberof SubtitleQueryRequest
   */
  season: number;
  /**
   * Name of the file for which you want subtitle, it help find a version of the subtitle that matches it
   * @type {string}
   * @memberof SubtitleQueryRequest
   */
  fileName?: string;
  /**
   * 3 or 2 letter code of the language
   * @type {string}
   * @memberof SubtitleQueryRequest
   */
  languageISO: string;
}
/**
 *
 * @export
 * @interface SubtitleSearchResponse
 */
export interface SubtitleSearchResponse {
  /**
   * Matching subtitle for the filename and language
   * @type {Array<SubtitleDto>}
   * @memberof SubtitleSearchResponse
   */
  matchingSubtitles?: Array<SubtitleDto>;
  /**
   *
   * @type {EpisodeDto}
   * @memberof SubtitleSearchResponse
   */
  episode?: EpisodeDto;
}
/**
 *
 * @export
 * @interface TvShowSubtitleResponse
 */
export interface TvShowSubtitleResponse {
  /**
   * Episode with their subtitles
   * @type {Array<EpisodeWithSubtitlesDto>}
   * @memberof TvShowSubtitleResponse
   */
  episodes?: Array<EpisodeWithSubtitlesDto>;
}
/**
 * Returned when the search wasn't formatted properly
 * @export
 * @interface WrongFormatResponse
 */
export interface WrongFormatResponse {
  /**
   *
   * @type {string}
   * @memberof WrongFormatResponse
   */
  error?: string;
  /**
   *
   * @type {string}
   * @memberof WrongFormatResponse
   */
  search?: string;
}
/**
 * SubtitlesApi - fetch parameter creator
 * @export
 */
export const SubtitlesApiFetchParamCreator = function (
  configuration?: Configuration
) {
  return {
    /**
     *
     * @summary Download specific subtitle
     * @param {string} subtitleId
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    downloadSubtitle(subtitleId: string, options: any = {}): FetchArgs {
      // verify required parameter 'subtitleId' is not null or undefined
      if (subtitleId === null || subtitleId === undefined) {
        throw new RequiredError(
          "subtitleId",
          "Required parameter subtitleId was null or undefined when calling downloadSubtitle."
        );
      }
      const localVarPath = `/subtitles/download/{subtitleId}`.replace(
        `{${"subtitleId"}}`,
        encodeURIComponent(String(subtitleId))
      );
      const localVarUrlObj = url.parse(localVarPath, true);
      const localVarRequestOptions = Object.assign({ method: "GET" }, options);
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      localVarUrlObj.query = Object.assign(
        {},
        localVarUrlObj.query,
        localVarQueryParameter,
        options.query
      );
      // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
      delete localVarUrlObj.search;
      localVarRequestOptions.headers = Object.assign(
        {},
        localVarHeaderParameter,
        options.headers
      );

      return {
        url: url.format(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     * The routes are ratelimited to 15 call per seconds.
     * @summary Query for subtitle of a specific episode of a show
     * @param {SubtitleQueryRequest} [body]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    subtitlesQueryPost(
      body?: SubtitleQueryRequest,
      options: any = {}
    ): FetchArgs {
      const localVarPath = `/subtitles/query`;
      const localVarUrlObj = url.parse(localVarPath, true);
      const localVarRequestOptions = Object.assign({ method: "POST" }, options);
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      localVarHeaderParameter["Content-Type"] = "application/json";

      localVarUrlObj.query = Object.assign(
        {},
        localVarUrlObj.query,
        localVarQueryParameter,
        options.query
      );
      // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
      delete localVarUrlObj.search;
      localVarRequestOptions.headers = Object.assign(
        {},
        localVarHeaderParameter,
        options.headers
      );
      const needsSerialization =
        <any>"SubtitleQueryRequest" !== "string" ||
        localVarRequestOptions.headers["Content-Type"] === "application/json";
      localVarRequestOptions.body = needsSerialization
        ? JSON.stringify(body || {})
        : body || "";

      return {
        url: url.format(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     *
     * @summary Search for a specific episode
     * @param {SearchRequest} [body]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    subtitlesSearchPost(body?: SearchRequest, options: any = {}): FetchArgs {
      const localVarPath = `/subtitles/search`;
      const localVarUrlObj = url.parse(localVarPath, true);
      const localVarRequestOptions = Object.assign({ method: "POST" }, options);
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      localVarHeaderParameter["Content-Type"] = "application/json";

      localVarUrlObj.query = Object.assign(
        {},
        localVarUrlObj.query,
        localVarQueryParameter,
        options.query
      );
      // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
      delete localVarUrlObj.search;
      localVarRequestOptions.headers = Object.assign(
        {},
        localVarHeaderParameter,
        options.headers
      );
      const needsSerialization =
        <any>"SearchRequest" !== "string" ||
        localVarRequestOptions.headers["Content-Type"] === "application/json";
      localVarRequestOptions.body = needsSerialization
        ? JSON.stringify(body || {})
        : body || "";

      return {
        url: url.format(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
  };
};

/**
 * SubtitlesApi - functional programming interface
 * @export
 */
export const SubtitlesApiFp = function (configuration?: Configuration) {
  return {
    /**
     *
     * @summary Download specific subtitle
     * @param {string} subtitleId
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    downloadSubtitle(
      subtitleId: string,
      options?: any
    ): (fetch?: FetchAPI, basePath?: string) => Promise<Response> {
      const localVarFetchArgs = SubtitlesApiFetchParamCreator(
        configuration
      ).downloadSubtitle(subtitleId, options);
      return (
        fetch: FetchAPI = isomorphicFetch,
        basePath: string = BASE_PATH
      ) => {
        return fetch(
          basePath + localVarFetchArgs.url,
          localVarFetchArgs.options
        ).then((response) => {
          if (response.status >= 200 && response.status < 300) {
            return response;
          } else {
            throw response;
          }
        });
      };
    },
    /**
     * The routes are ratelimited to 15 call per seconds.
     * @summary Query for subtitle of a specific episode of a show
     * @param {SubtitleQueryRequest} [body]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    subtitlesQueryPost(
      body?: SubtitleQueryRequest,
      options?: any
    ): (
      fetch?: FetchAPI,
      basePath?: string
    ) => Promise<SubtitleSearchResponse> {
      const localVarFetchArgs = SubtitlesApiFetchParamCreator(
        configuration
      ).subtitlesQueryPost(body, options);
      return (
        fetch: FetchAPI = isomorphicFetch,
        basePath: string = BASE_PATH
      ) => {
        return fetch(
          basePath + localVarFetchArgs.url,
          localVarFetchArgs.options
        ).then((response) => {
          if (response.status >= 200 && response.status < 300) {
            return response.json();
          } else {
            throw response;
          }
        });
      };
    },
    /**
     *
     * @summary Search for a specific episode
     * @param {SearchRequest} [body]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    subtitlesSearchPost(
      body?: SearchRequest,
      options?: any
    ): (
      fetch?: FetchAPI,
      basePath?: string
    ) => Promise<SubtitleSearchResponse> {
      const localVarFetchArgs = SubtitlesApiFetchParamCreator(
        configuration
      ).subtitlesSearchPost(body, options);
      return (
        fetch: FetchAPI = isomorphicFetch,
        basePath: string = BASE_PATH
      ) => {
        return fetch(
          basePath + localVarFetchArgs.url,
          localVarFetchArgs.options
        ).then((response) => {
          if (response.status >= 200 && response.status < 300) {
            return response.json();
          } else {
            throw response;
          }
        });
      };
    },
  };
};

/**
 * SubtitlesApi - factory interface
 * @export
 */
export const SubtitlesApiFactory = function (
  configuration?: Configuration,
  fetch?: FetchAPI,
  basePath?: string
) {
  return {
    /**
     *
     * @summary Download specific subtitle
     * @param {string} subtitleId
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    downloadSubtitle(subtitleId: string, options?: any) {
      return SubtitlesApiFp(configuration).downloadSubtitle(
        subtitleId,
        options
      )(fetch, basePath);
    },
    /**
     * The routes are ratelimited to 15 call per seconds.
     * @summary Query for subtitle of a specific episode of a show
     * @param {SubtitleQueryRequest} [body]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    subtitlesQueryPost(body?: SubtitleQueryRequest, options?: any) {
      return SubtitlesApiFp(configuration).subtitlesQueryPost(body, options)(
        fetch,
        basePath
      );
    },
    /**
     *
     * @summary Search for a specific episode
     * @param {SearchRequest} [body]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    subtitlesSearchPost(body?: SearchRequest, options?: any) {
      return SubtitlesApiFp(configuration).subtitlesSearchPost(body, options)(
        fetch,
        basePath
      );
    },
  };
};

/**
 * SubtitlesApi - object-oriented interface
 * @export
 * @class SubtitlesApi
 * @extends {BaseAPI}
 */
export class SubtitlesApi extends BaseAPI {
  /**
   *
   * @summary Download specific subtitle
   * @param {string} subtitleId
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof SubtitlesApi
   */
  public downloadSubtitle(subtitleId: string, options?: any) {
    return SubtitlesApiFp(this.configuration).downloadSubtitle(
      subtitleId,
      options
    )(this.fetch, this.basePath);
  }

  /**
   * The routes are ratelimited to 15 call per seconds.
   * @summary Query for subtitle of a specific episode of a show
   * @param {SubtitleQueryRequest} [body]
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof SubtitlesApi
   */
  public subtitlesQueryPost(body?: SubtitleQueryRequest, options?: any) {
    return SubtitlesApiFp(this.configuration).subtitlesQueryPost(body, options)(
      this.fetch,
      this.basePath
    );
  }

  /**
   *
   * @summary Search for a specific episode
   * @param {SearchRequest} [body]
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof SubtitlesApi
   */
  public subtitlesSearchPost(body?: SearchRequest, options?: any) {
    return SubtitlesApiFp(this.configuration).subtitlesSearchPost(
      body,
      options
    )(this.fetch, this.basePath);
  }
}
/**
 * TvShowsApi - fetch parameter creator
 * @export
 */
export const TvShowsApiFetchParamCreator = function (
  configuration?: Configuration
) {
  return {
    /**
     *
     * @summary Search shows that contains the given query
     * @param {ShowSearchRequest} [body]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    showsSearchPost(body?: ShowSearchRequest, options: any = {}): FetchArgs {
      const localVarPath = `/shows/search`;
      const localVarUrlObj = url.parse(localVarPath, true);
      const localVarRequestOptions = Object.assign({ method: "POST" }, options);
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      localVarHeaderParameter["Content-Type"] = "application/json";

      localVarUrlObj.query = Object.assign(
        {},
        localVarUrlObj.query,
        localVarQueryParameter,
        options.query
      );
      // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
      delete localVarUrlObj.search;
      localVarRequestOptions.headers = Object.assign(
        {},
        localVarHeaderParameter,
        options.headers
      );
      const needsSerialization =
        <any>"ShowSearchRequest" !== "string" ||
        localVarRequestOptions.headers["Content-Type"] === "application/json";
      localVarRequestOptions.body = needsSerialization
        ? JSON.stringify(body || {})
        : body || "";

      return {
        url: url.format(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     *
     * @summary Refresh a specific show
     * @param {string} showId
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    showsShowIdRefreshPost(showId: string, options: any = {}): FetchArgs {
      // verify required parameter 'showId' is not null or undefined
      if (showId === null || showId === undefined) {
        throw new RequiredError(
          "showId",
          "Required parameter showId was null or undefined when calling showsShowIdRefreshPost."
        );
      }
      const localVarPath = `/shows/{showId}/refresh`.replace(
        `{${"showId"}}`,
        encodeURIComponent(String(showId))
      );
      const localVarUrlObj = url.parse(localVarPath, true);
      const localVarRequestOptions = Object.assign({ method: "POST" }, options);
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      localVarUrlObj.query = Object.assign(
        {},
        localVarUrlObj.query,
        localVarQueryParameter,
        options.query
      );
      // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
      delete localVarUrlObj.search;
      localVarRequestOptions.headers = Object.assign(
        {},
        localVarHeaderParameter,
        options.headers
      );

      return {
        url: url.format(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     *
     * @summary Get all subtitle of the given season for a specific language
     * @param {string} showId
     * @param {number} seasonNumber
     * @param {string} language
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    showsShowIdSeasonNumberLanguageGet(
      showId: string,
      seasonNumber: number,
      language: string,
      options: any = {}
    ): FetchArgs {
      // verify required parameter 'showId' is not null or undefined
      if (showId === null || showId === undefined) {
        throw new RequiredError(
          "showId",
          "Required parameter showId was null or undefined when calling showsShowIdSeasonNumberLanguageGet."
        );
      }
      // verify required parameter 'seasonNumber' is not null or undefined
      if (seasonNumber === null || seasonNumber === undefined) {
        throw new RequiredError(
          "seasonNumber",
          "Required parameter seasonNumber was null or undefined when calling showsShowIdSeasonNumberLanguageGet."
        );
      }
      // verify required parameter 'language' is not null or undefined
      if (language === null || language === undefined) {
        throw new RequiredError(
          "language",
          "Required parameter language was null or undefined when calling showsShowIdSeasonNumberLanguageGet."
        );
      }
      const localVarPath = `/shows/{showId}/{seasonNumber}/{language}`
        .replace(`{${"showId"}}`, encodeURIComponent(String(showId)))
        .replace(
          `{${"seasonNumber"}}`,
          encodeURIComponent(String(seasonNumber))
        )
        .replace(`{${"language"}}`, encodeURIComponent(String(language)));
      const localVarUrlObj = url.parse(localVarPath, true);
      const localVarRequestOptions = Object.assign({ method: "GET" }, options);
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      localVarUrlObj.query = Object.assign(
        {},
        localVarUrlObj.query,
        localVarQueryParameter,
        options.query
      );
      // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
      delete localVarUrlObj.search;
      localVarRequestOptions.headers = Object.assign(
        {},
        localVarHeaderParameter,
        options.headers
      );

      return {
        url: url.format(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
  };
};

/**
 * TvShowsApi - functional programming interface
 * @export
 */
export const TvShowsApiFp = function (configuration?: Configuration) {
  return {
    /**
     *
     * @summary Search shows that contains the given query
     * @param {ShowSearchRequest} [body]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    showsSearchPost(
      body?: ShowSearchRequest,
      options?: any
    ): (fetch?: FetchAPI, basePath?: string) => Promise<ShowSearchResponse> {
      const localVarFetchArgs = TvShowsApiFetchParamCreator(
        configuration
      ).showsSearchPost(body, options);
      return (
        fetch: FetchAPI = isomorphicFetch,
        basePath: string = BASE_PATH
      ) => {
        return fetch(
          basePath + localVarFetchArgs.url,
          localVarFetchArgs.options
        ).then((response) => {
          if (response.status >= 200 && response.status < 300) {
            return response.json();
          } else {
            throw response;
          }
        });
      };
    },
    /**
     *
     * @summary Refresh a specific show
     * @param {string} showId
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    showsShowIdRefreshPost(
      showId: string,
      options?: any
    ): (fetch?: FetchAPI, basePath?: string) => Promise<Response> {
      const localVarFetchArgs = TvShowsApiFetchParamCreator(
        configuration
      ).showsShowIdRefreshPost(showId, options);
      return (
        fetch: FetchAPI = isomorphicFetch,
        basePath: string = BASE_PATH
      ) => {
        return fetch(
          basePath + localVarFetchArgs.url,
          localVarFetchArgs.options
        ).then((response) => {
          if (response.status >= 200 && response.status < 300) {
            return response;
          } else {
            throw response;
          }
        });
      };
    },
    /**
     *
     * @summary Get all subtitle of the given season for a specific language
     * @param {string} showId
     * @param {number} seasonNumber
     * @param {string} language
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    showsShowIdSeasonNumberLanguageGet(
      showId: string,
      seasonNumber: number,
      language: string,
      options?: any
    ): (
      fetch?: FetchAPI,
      basePath?: string
    ) => Promise<TvShowSubtitleResponse> {
      const localVarFetchArgs = TvShowsApiFetchParamCreator(
        configuration
      ).showsShowIdSeasonNumberLanguageGet(
        showId,
        seasonNumber,
        language,
        options
      );
      return (
        fetch: FetchAPI = isomorphicFetch,
        basePath: string = BASE_PATH
      ) => {
        return fetch(
          basePath + localVarFetchArgs.url,
          localVarFetchArgs.options
        ).then((response) => {
          if (response.status >= 200 && response.status < 300) {
            return response.json();
          } else {
            throw response;
          }
        });
      };
    },
  };
};

/**
 * TvShowsApi - factory interface
 * @export
 */
export const TvShowsApiFactory = function (
  configuration?: Configuration,
  fetch?: FetchAPI,
  basePath?: string
) {
  return {
    /**
     *
     * @summary Search shows that contains the given query
     * @param {ShowSearchRequest} [body]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    showsSearchPost(body?: ShowSearchRequest, options?: any) {
      return TvShowsApiFp(configuration).showsSearchPost(body, options)(
        fetch,
        basePath
      );
    },
    /**
     *
     * @summary Refresh a specific show
     * @param {string} showId
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    showsShowIdRefreshPost(showId: string, options?: any) {
      return TvShowsApiFp(configuration).showsShowIdRefreshPost(
        showId,
        options
      )(fetch, basePath);
    },
    /**
     *
     * @summary Get all subtitle of the given season for a specific language
     * @param {string} showId
     * @param {number} seasonNumber
     * @param {string} language
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    showsShowIdSeasonNumberLanguageGet(
      showId: string,
      seasonNumber: number,
      language: string,
      options?: any
    ) {
      return TvShowsApiFp(configuration).showsShowIdSeasonNumberLanguageGet(
        showId,
        seasonNumber,
        language,
        options
      )(fetch, basePath);
    },
  };
};

/**
 * TvShowsApi - object-oriented interface
 * @export
 * @class TvShowsApi
 * @extends {BaseAPI}
 */
export class TvShowsApi extends BaseAPI {
  /**
   *
   * @summary Search shows that contains the given query
   * @param {ShowSearchRequest} [body]
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof TvShowsApi
   */
  public showsSearchPost(body?: ShowSearchRequest, options?: any) {
    return TvShowsApiFp(this.configuration).showsSearchPost(body, options)(
      this.fetch,
      this.basePath
    );
  }

  /**
   *
   * @summary Refresh a specific show
   * @param {string} showId
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof TvShowsApi
   */
  public showsShowIdRefreshPost(showId: string, options?: any) {
    return TvShowsApiFp(this.configuration).showsShowIdRefreshPost(
      showId,
      options
    )(this.fetch, this.basePath);
  }

  /**
   *
   * @summary Get all subtitle of the given season for a specific language
   * @param {string} showId
   * @param {number} seasonNumber
   * @param {string} language
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof TvShowsApi
   */
  public showsShowIdSeasonNumberLanguageGet(
    showId: string,
    seasonNumber: number,
    language: string,
    options?: any
  ) {
    return TvShowsApiFp(this.configuration).showsShowIdSeasonNumberLanguageGet(
      showId,
      seasonNumber,
      language,
      options
    )(this.fetch, this.basePath);
  }
}
