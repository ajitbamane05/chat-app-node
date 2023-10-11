import requests
import json
import datetime

ENDPOINT="http://localhost:3000"

def test_can_call_endpoint():
    response = requests.get(ENDPOINT)
    assert response.status_code == 200

# def test_user_login():
#     payload={
#     "username":"Steve",
#     "password":"password"
#     }
#     response = requests.post(F"{ENDPOINT}api/login", json=payload)

#     current_time = datetime.datetime.now()
#     expires_at = current_time + datetime.timedelta(seconds=60*60*24)
#     token = response.headers['authorization']
#     token_data = {
#         'issued at':current_time.strftime('%Y-%m-%d %H:%M:%S'),
#         'expires at':expires_at.strftime('%Y-%m-%d %H:%M:%S'),
#         'token':token
#     }
#     with open('user-token.json','w') as file:
#         json.dump(token_data, file, indent=4)

#     assert response.status_code == 200

# def test_login_admin():
#     payload={
#     "username":"Admin",
#     "password":"password"
#     }
#     response = requests.post(F"{ENDPOINT}api/login", json=payload)

#     current_time = datetime.datetime.now()
#     expires_at = current_time + datetime.timedelta(seconds=60*60*24)
#     token = response.headers['authorization']
#     token_data = {
#         'issued at':current_time.strftime('%Y-%m-%d %H:%M:%S'),
#         'expires at':expires_at.strftime('%Y-%m-%d %H:%M:%S'),
#         'token':token
#     }
#     with open('admin-token.json','w') as file:
#         json.dump(token_data, file, indent=4)

#     assert response.status_code == 200


def test_get_room_memberships():
    payload = {
    "userId":"86621119-8fc7-4695-b270-3d999d670821"
    }
    with open('user-token.json') as infile:
        token = json.load(infile)
    headers = {}
    headers['authorization'] = token['token']
    response = requests.post(F"{ENDPOINT}/api/room/getmembership",headers=headers, json=payload)
    print(response.json())
    assert response.status_code == 200

def test_create_user_by_user():
    payload = {
    "username": "sid",
    "email": "sid@gmail.com",
    "password": "password"
    }

    with open('user-token.json') as infile:
        token = json.load(infile)
    headers = {}
    headers['authorization'] = token['token']
    response = requests.post(F"{ENDPOINT}/api/user/createuser",headers=headers, json=payload)

    print(response.json())
    assert response.status_code == 401

def test_create_user_by_admin():
    payload = {
    "username": "testuser",
    "email": "testuser@gmail.com",
    "password": "password"
    }

    with open('admin-token.json') as infile:
        token = json.load(infile)
    headers = {}
    headers['authorization'] = token['token']
    response = requests.post(F"{ENDPOINT}/api/user/createuser",headers=headers, json=payload)

    print(response.json())
    assert response.status_code == 200

def test_create_admin_by_admin():
    payload = {
    "username": "testAdmin",
    "email": "testAdmin@gmail.com",
    "password": "password"
    }

    with open('admin-token.json') as infile:
        token = json.load(infile)
    headers = {}
    headers['authorization'] = token['token']
    response = requests.post(F"{ENDPOINT}/api/user/createuser",headers=headers, json=payload)

    print(response.json())
    assert response.status_code == 200

def test_delete_admin_by_user():
    payload = {
    "username": "testAdmin",
    "user_id": "userId"  
    }
    with open('user-token.json') as infile:
        token = json.load(infile)
    headers = {}
    headers['authorization'] = token['token']
    response = requests.post(F"{ENDPOINT}/api/user/deleteuser",headers=headers, json=payload)

    print(response.json())
    assert response.status_code == 401

def test_delete_admin_by_admin():
    payload = {
    "username": "testAdmin",
    "user_id": "testuserId"  
    }
    with open('admin-token.json') as infile:
        token = json.load(infile)
    headers = {}
    headers['authorization'] = token['token']
    response = requests.post(F"{ENDPOINT}/api/user/deleteuser",headers=headers, json=payload)

    print(response.json())
    assert response.status_code == 200

def test_delete_user_by_admin():
    payload = {
    "username": "testuser",
    "user_id": "testuserId"  
    }
    with open('admin-token.json') as infile:
        token = json.load(infile)
    headers = {}
    headers['authorization'] = token['token']
    response = requests.post(F"{ENDPOINT}/api/user/deleteuser",headers=headers, json=payload)

    print(response.json())
    assert response.status_code == 200

def test_send_message_by_different_sender_id():
    payload = {
    "content": "Long Time no see",
    "senderId": "2fcaa677-a53b-4206-8cc9-43dfa210aed0",
    "roomId": "552f12b7-c534-43df-a053-c15f178a9743" 
    }   
    with open('user-token.json') as infile:
        token = json.load(infile)
    headers = {}
    headers['authorization'] = token['token']

    response = requests.post(F"{ENDPOINT}/api/chat/sendmessage",headers=headers, json=payload)

    print(response.json())
    assert response.status_code == 401

def test_send_message_by_loggedin_user():
    payload = {
    "content": "Long Time no see",
    "senderId": "2aabb9b8-a695-4b1b-a6c0-b2215b379634",
    "roomId": "552f12b7-c534-43df-a053-c15f178a9743"
    }   
    with open('user-token.json') as infile:
        token = json.load(infile)
    headers = {}
    headers['authorization'] = token['token']

    response = requests.post(F"{ENDPOINT}/api/chat/sendmessage",headers=headers, json=payload)

    print(response.json())
    assert response.status_code == 200


def test_get_chat_of_room():
    payload={
    "roomId":"552f12b7-c534-43df-a053-c15f178a9743"
    }
    with open('user-token.json') as infile:
        token = json.load(infile)
    headers = {}
    headers['authorization'] = token['token']

    response = requests.post(F"{ENDPOINT}/api/chat/getchat",headers=headers, json=payload)

    print(response.json())
    assert response.status_code == 200








