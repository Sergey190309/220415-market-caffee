_list = ['foo', 'bar', 'baz']

for i, j in enumerate(_list):
    if j == 'foo':
        print(i)

print(str(i for i, j in enumerate(_list) if j == 'foo'))
