from random import choice

source = (
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. '
    'Blanditiis, iste doloribus? Facilis sapiente fugit commodi et nostrum '
    'amet aspernatur, illum necessitatibus maiores, perspiciatis ipsam, omnis '
    'modi beatae? Saepe, eius neque.')

result = source.replace(',', '').replace('.', '').replace('?', '').split(' ')

domens = ('com', 'ru', 'uk', 'ua', 'org', 'mil')
# for word in result:
#     print(word)

for i in range(len(result)):
    email = choice(result) + '@' + choice(result) + '.' + choice(domens)
    print(email)
