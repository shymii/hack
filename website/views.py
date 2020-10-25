from django.shortcuts import render
from .decoratos import is_not_session
from tweepy import OAuthHandler
from tweepy import API
from tweepy import Cursor
import re
from datetime import datetime

from . import twitter_credentials
from .models import fact
import random

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
    facts_id_list = list(fact.objects.all().values_list('id', flat=True))
    random_facts_id_list = random.sample(facts_id_list, min(len(facts_id_list), 2))
    random_facts = fact.objects.filter(id__in = random_facts_id_list)
    try:
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
            if 'media' in tweet.entities:
                tweets[i]['tweet_image'] = tweet.entities['media'][0]['media_url']
            temp_rep_id = tweet.in_reply_to_status_id
            temp_string = tweet.full_text
            i += 1
    except:
        tweets = None
    context = {'tweets' : tweets, 'random_facts' : random_facts}
    template = 'homepage/homepage.html'
    return render(request, template, context)

@is_not_session
def about(request):
    context = {}
    template = 'about/about.html';

    return render(request, template, context)
