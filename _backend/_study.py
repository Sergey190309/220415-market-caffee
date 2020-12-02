# import os

import re

path = 'user_2/27420977_1.jpg'

allowed_ext = 'com|exe|zzz'

# regex = r"^[a-zA-Z0-9][a-zA-Z0-9_()-\.]*\.{}$".format(allowed_ext)

regex = r'^[a-zA-Z0-9][a-zA-Z0-9_()-\.]*\.({})$'.format(allowed_ext)
# regex = '^[a-z][0-9]$'

test_string = 'k_issaAspokok0opkpok()pss.zzz'


print('regex -', regex)
print('test_string -', test_string)
# print('allowed_ext -', allowed_ext)

# result = re.search(regex, test_string,)
result = re.match(regex, test_string)

print('result -', result)

if result:
    print('GOOD!')
else:
    print('BAD!')
