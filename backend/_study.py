URI = 'sqlite:///testdb.sqlite3'
folder = 'application/'

'''
result should be:
'sqlite:///application/testdb.sqlite3'
'''

split = URI.split('///')

print(split)

result = split[0] + '///' + folder + split[1]
result = URI.split('///')[0] + '///' + folder + split[1]

print(result)
