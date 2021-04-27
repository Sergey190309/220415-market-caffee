from string import ascii_lowercase
from random import choice

row = ascii_lowercase


def chance_letters():
    result = ''.join(choice(ascii_lowercase) for x in range(5))
    return result


for index in range(5):
    print(chance_letters())
