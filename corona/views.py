from django.shortcuts import render

from website import twitter_credentials

from tweepy import OAuthHandler
from tweepy import API
from tweepy import Cursor
import re
import time

# Create your views here.
def covid_view(request):
    auth = OAuthHandler(twitter_credentials.CONSUMER_KEY, twitter_credentials.CONSUMER_SECRET)
    auth.set_access_token(twitter_credentials.ACCESS_TOKEN, twitter_credentials.ACCESS_TOKEN_SECRET)

    auth_api = API(auth, wait_on_rate_limit = True)
    search = '#koronawirus OR #coronavirus OR #covid19 AND (lang:en OR lang:pl)'
    nr_of_tweets = 5

    tweets = [{} for _ in range(nr_of_tweets)]
    i = 0

    for tweet in Cursor(auth_api.search, search, tweet_mode = 'extended', result_type = 'popular').items(nr_of_tweets):
        tweet.full_text = re.sub(r"http\S+", "", tweet.full_text) 
        tweets[i]['id'] = tweet.user.id
        tweets[i]['tweet_id'] = tweet.id
        tweets[i]['name'] = tweet.user.name
        tweets[i]['screen_name'] = tweet.user.screen_name
        tweets[i]['profile_image'] = tweet.user.profile_image_url
        tweets[i]['text'] = tweet.full_text
        tweets[i]['tweet_date'] = tweet.created_at
        i += 1

    template = 'covid/covid.html'
    context = {'tweets' : tweets}
    return render(request, template, context)

def global_covid_view(request):
    template = 'covid/globalcovid.html'
    context = {}
    return render(request, template, context)

def compare_covid_view(request):
    template = 'covid/comparecovid.html'
    context = {}
    return render(request, template, context)

def country_covid_view(request):
    template = 'covid/countrycovid.html'
    context = {}
    return render(request, template, context)