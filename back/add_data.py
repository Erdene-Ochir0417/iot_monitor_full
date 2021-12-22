import models
from database import SessionLocal
from datetime import datetime

db = SessionLocal()

new_data = models.User(
    id=1,
    firstname='Erdene-Ochir',
    lastname='Munkhzul',
    password='hello',
    admin=1,
    email='erdeneochir0417@gmail.com',
    created_at=int(datetime.now().timestamp()),
    image_url='https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.theverge.com%2Ftldr%2F2021%2F2%2F25%2F22302175%2Fcloud-strife-arms-muscles-ps5-final-fantasy-vii-7-remake-intergrade&psig=AOvVaw0Aq0PSgTy_8UugCpcV7a6_&ust=1637635544299000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCNjn4Pr5qvQCFQAAAAAdAAAAABAD',
)
db.add(new_data)
db.commit()

# new_data = models.Microcontroller(
#     id=1,
#     user_id=1,
#     created_at=int(datetime.now().timestamp()),
#     name='Зүрхний цохилт',
#     send_second=5,
#     type='Туршилт',
#     status=True
# )

# db.add(new_data)
# db.commit()

# new_data = models.Microcontroller(
#     id=2,
#     user_id=1,
#     created_at=int(datetime.now().timestamp()),
#     name='Температур',
#     send_second=5,
#     type='Туршилт',
#     status=False
# )

# db.add(new_data)
# db.commit()

# new_data = models.Sensor(
#     controller_id=1,
#     name='Хүчилтөрөгч'
# )

# db.add(new_data)
# db.commit()

# new_data = models.Sensor(
#     controller_id=1,
#     name='Зүрхний цохилт'
# )

# db.add(new_data)
# db.commit()


# new_data = models.SensorValue(
#     sensor_id=1,
#     value=98,
#     created_at=int(datetime.now().timestamp()),
# )

# db.add(new_data)
# db.commit()

# new_data = models.SensorValue(
#     sensor_id=1,
#     value=96,
#     created_at=int(datetime.now().timestamp()),
# )

# db.add(new_data)
# db.commit()

# new_data = models.SensorValue(
#     sensor_id=1,
#     value=98,
#     created_at=int(datetime.now().timestamp()),
# )

# db.add(new_data)
# db.commit()

# new_data = models.SensorValue(
#     sensor_id=2,
#     value=96,
#     created_at=int(datetime.now().timestamp()),
# )

# db.add(new_data)
# db.commit()

# new_data = models.SensorValue(
#     sensor_id=3,
#     value=96,
#     created_at=int(datetime.now().timestamp()),
# )

# db.add(new_data)
# db.commit()