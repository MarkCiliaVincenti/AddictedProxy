﻿#region

using AddictedProxy.Database.Model.Credentials;
using Bogus;

#endregion

namespace AddictedProxy.Upstream.Service;

public class HttpUtils
{
    private readonly Faker _faker;

    public HttpUtils(Faker faker)
    {
        _faker = faker;
    }

    public HttpRequestMessage PrepareRequest(AddictedUserCredentials? credentials, string url, HttpMethod method)
    {
        var userAgent = _faker.Internet.UserAgent();
        var request = new HttpRequestMessage(method, url)
        {
            Headers =
            {
                {"Referer", "https://www.addic7ed.com/"},
                { "User-Agent", userAgent },
            }
        };
        if (credentials != null)
        {
            request.Headers.Add("Cookie", credentials.Cookie);
        }

        return request;
    }
}