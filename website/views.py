from django.shortcuts import render
from .decoratos import is_not_session
from tweepy import OAuthHandler
from tweepy import API
from tweepy import Cursor
import re
from datetime import datetime

from . import twitter_credentials

# Create your views here.

@is_not_session
def homepage(request):
    auth = OAuthHandler(twitter_credentials.CONSUMER_KEY, twitter_credentials.CONSUMER_SECRET)
    auth.set_access_token(twitter_credentials.ACCESS_TOKEN, twitter_credentials.ACCESS_TOKEN_SECRET)

    auth_api = API(auth)
    tweets_result = auth_api.user_timeline(screen_name = 'MZ_GOV_PL', include_rts = False, count = 9, tweet_mode = 'extended', is_async = True)
    tweets = [{} for _ in range(len(tweets_result))]
    i = 0
    temp_rep_id = None
    temp_string = ''

    for tweet in tweets_result:
        if temp_rep_id == tweet.id:
            del tweets[i]
            i -= 1
            tweet.full_text += ' ' + temp_string
        tweet.full_text = re.sub(r"http\S+", "", tweet.full_text)
        tweets[i]['id'] = tweet.user.id
        tweets[i]['tweet_id'] = tweet.id
        tweets[i]['name'] = tweet.user.name
        tweets[i]['screen_name'] = tweet.user.screen_name
        tweets[i]['profile_image'] = tweet.user.profile_image_url
        tweets[i]['text'] = tweet.full_text
        tweets[i]['tweet_date'] = tweet.created_at
        tweets[i]['tweet_image'] = tweet.entities['media'][0]['media_url']
        temp_rep_id = tweet.in_reply_to_status_id
        temp_string = tweet.full_text
        i += 1

    context = {'tweets' : tweets}   
    template = 'homepage/homepage.html'
    return render(request, template, context)

def about(request):
    context = {}
    template = 'about/about.html';

    return render(request, template, context)
