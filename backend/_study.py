from uuid import uuid4
from datetime import datetime

ids = []
for i in range(3):
    ids.append(uuid4())

id_to_remove = ids[0]

sessions_ids = [{
    'id': _id,
    'time_stamp': datetime.now().timestamp()
} for _id in ids]
# for id in ids:
#     element = {
#         'id': id,
#         'time_stamp': datetime.now().timestamp()
#     }
#     element['time_stamp'] = datetime.now().timestamp()
#     sessions_ids.append(element)
#     sessions_ids.append(element)

any(print(session) for session in sessions_ids)

print()

ids_fm_session = [item.get('id') for item in sessions_ids]

# any(print(_id) for _id in ids_fm_session)

while True:
    item_to_remove = next(
        (item for item in sessions_ids if item.get('id') == id_to_remove), None)
    if item_to_remove is None:
        break
    print(item_to_remove)
    sessions_ids.remove(item_to_remove)

# result_sessions_ids = list(filter(lambda item: (
#     item.get('id') != id_to_remove), sessions_ids))

# print(result_sessions_ids)

session_list = [x.get('id') for x in sessions_ids]

[print(x) for x in session_list]
