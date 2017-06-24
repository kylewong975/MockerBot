import os, slackclient, time
import random

# delay in seconds before checking for new events 
SOCKET_DELAY = 1

# slackbot environment variables (secret!) 
MOCK_SLACK_NAME = os.environ.get('MOCK_SLACK_NAME')
MOCK_SLACK_TOKEN = os.environ.get('MOCK_SLACK_TOKEN')
MOCK_SLACK_ID = os.environ.get('MOCK_SLACK_ID')

# initialize the stack client
mocker_slack_client = slackclient.SlackClient(MOCK_SLACK_TOKEN)

# generate the message (1 in 2 chance to capitalize random letters!) 
def say_message(event):
    str = ""
    text = event.get('text')
    for i in text:
        rand = random.randint(1, 2)
        if rand == 1: 
            str = str + i
        else: 
            str = str + upper(i)
    return str

# trigger the chatbot
def is_for_me(event):
    type = event.get('type')
    # check to see if the event is a message and that the message is not 
    # said by the mocker bot (otherwise it generates infinite loop!) 
    cond = type and type == 'message' and not(event.get('user')==MOCK_SLACK_ID)
    return cond

# prepare the message to be posted to the channel
def handle_message(message, channel, event):
    post_message(message=say_message(event), channel=channel)

# use the API call to post the message 
def post_message(message, channel):
    mocker_slack_client.api_call('chat.postMessage', channel=channel,
                          text=message, as_user=True)

def run():
    if mocker_slack_client.rtm_connect():
        # uncomment this if you want to warn the users there is a mocker bot
        # if you want to keep it a secret, leave it as is and see what happens
        # print('Get ready to be mocked :)')
        
        while True:
            event_list = mocker_slack_client.rtm_read()
            if len(event_list) > 0:
                for event in event_list:
                    print(event)
                    if is_for_me(event):
                        handle_message(message=event.get('text'), channel=event.get('channel'), event=event)
            time.sleep(SOCKET_DELAY)
    else:
        print('[!] Connection to Slack failed.')

if __name__ == '__main__':
    run()