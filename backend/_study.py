import os

file_name = './application/images/static/images/for_test_landing/01_vblock_pix_001.jpg'

if os.path.exists(file_name):
    os.remove(file_name)
result = os.path.exists(file_name)

print('result ->', result)
