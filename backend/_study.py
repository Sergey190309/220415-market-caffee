from pprint import pprint as pp
_admin_headers = {
    'Authorization': 'Bearer _admin_access_token',
    'Content-Type': 'application/json',
    'Accept-Language': 'ru'}

result = {**_admin_headers}

result.pop('Authorization')

result2 = {k: v for (k, v) in _admin_headers.items() if k != 'Authorization'}

pp(_admin_headers, width=75)
pp(result, width=50)
pp(result2, width=50)
