
from fastapi import FastAPI, APIRouter, Depends, Request, HTTPException
import uvicorn
from fastapi.encoders import jsonable_encoder
from sqlalchemy import and_, desc
from database import SessionLocal
from models import User, Microcontroller, Sensor, SensorValue
from datetime import date
from datetime import datetime
from sqlalchemy.sql.expression import func
import json 
import uuid 

app = FastAPI()

db = SessionLocal()

@app.get('/dashboard')
# async def index(request: Request, db: Session = Depends(get_db)):
def index():
    user_id = 1
    data = db.query(Microcontroller).filter_by(user_id=user_id).all()
    return_data = {}
    micro_count = 0 
    active_count = 0
    inactive_count = 0
    sensor_count = 0
    for record in data:
        micro_count += 1
        id = record.id
        if record.status == True:
            active_count += 1
        else: 
            inactive_count += 1
        all_sensor = db.query(Sensor).filter_by(controller_id=id).all()
        for rec in all_sensor:
            sensor_count += 1

    sensor_data = {}
    other = 0
    for cc in db.query(SensorValue.sensor_id, func.count(SensorValue.sensor_id)).group_by(SensorValue.sensor_id).order_by(desc(func.count(SensorValue.sensor_id))).all():
        if len(sensor_data.keys()) < 3:
            name = db.query(Sensor).filter_by(id=cc[0]).one().name
            sensor_data[name] = cc[1]
        else:
            other += cc[1]
    end_date = datetime.now().timestamp()
    today = date.today()
    start_date = datetime(year=today.year, month=today.month, day=today.day).timestamp()
    second = 24 * 60 * 60
    req_dict = {}

    for i in range(7):
        req_per_day = len(db.query(SensorValue).filter(and_(SensorValue.created_at <= end_date, SensorValue.created_at >= start_date)).all())
        day = datetime.utcfromtimestamp(end_date).strftime('%m/%d')
        req_dict[day] = req_per_day
        end_date = start_date
        start_date = start_date - second
    sensor_data['Бусад'] = other
 
    return_data['micro_count'] = micro_count
    return_data['active_count'] = active_count
    return_data['inactive_count'] = inactive_count
    return_data['sensor_count'] = sensor_count
    return_data['sensor_data'] = sensor_data
    return_data['request_graph'] = req_dict
    print(return_data)
    return jsonable_encoder(return_data)


@app.get('/devices')
# async def index(request: Request, db: Session = Depends(get_db)):
def index_device():
    user_id = 1
    query = db.query(Microcontroller).filter_by(user_id=user_id).all()
    return_list = []
    for record in query:
        sensor_count = len(db.query(Sensor).filter_by(controller_id=record.id).all())
        dict_per = {}
        dict_per['id'] = record.id
        dict_per['name'] = record.name
        dict_per['type'] = record.type
        dict_per['sensorCount'] = sensor_count
        dict_per['sendSecond'] = record.send_second
        dict_per['status'] = record.status
        return_list.append(dict_per)
    return jsonable_encoder(return_list)

@app.post('/devices')
# done
async def add_controller(request: Request):
    data = await request.json()
    user_id = 1
    name = data['name']
    cont_type = data['type']
    sendSecond = data['sendSecond']
    date = datetime.now().timestamp()

    new_data = Microcontroller(
        user_id=user_id,
        created_at=date,
        name=name,
        type=cont_type,
        uuid=uuid.uuid4().hex[:8].upper(),
        send_second=sendSecond,
        status=True
    )
    db.add(new_data)
    db.commit()

    return_dict = {
        'id': new_data.id,
        'user_id': new_data.user_id,
        'created_at': new_data.created_at,
        'name': new_data.name,
        'type': new_data.type,
        'sendSecond': new_data.send_second,
        'status': new_data.status,
        'sensorCount': 0

    }
    return jsonable_encoder(return_dict)

@app.post('/sensors')
# done
async def add_sensor(request: Request):
    data = await request.json()
    print(data)
    return_dict = {}
    user_id = 1
    name = data['name']
    controller_id = data['controller_id']

    new_data = Sensor(
        controller_id=controller_id,
        name=name,
        uuid=uuid.uuid4().hex[:6].upper(),
        status=True
    )
    db.add(new_data)
    db.commit()

    return_dict = {
        'id': new_data.id,
        'name': new_data.name,
        'status': new_data.status,
        'uuid': new_data.uuid,
        'high': 0,
        'low': 0,
        'avg': 0
    }
    return jsonable_encoder(return_dict)

@app.get('/devices/{_id}')
# async def get_sensor(request: Request, _id: int):
async def get_sensor(request: Request, _id: int):
    print("hello")
    user_id = 1
    query = db.query(Microcontroller).filter_by(id=_id).one()
    return_list = []
    end_date = datetime.now().timestamp()
    second = 7 * 24 * 60 * 60 
    start_date = end_date - second

    
    sensors = db.query(Sensor).filter_by(controller_id=_id).all()
    for record in sensors:
    
        sensor_max = db.query(func.max(SensorValue.value)).filter_by(sensor_id=record.id).filter(and_(SensorValue.created_at <= end_date, SensorValue.created_at >= start_date)).one()[0]
        sensor_min = db.query(func.min(SensorValue.value)).filter_by(sensor_id=record.id).filter(and_(SensorValue.created_at <= end_date, SensorValue.created_at >= start_date)).one()[0]
        sensor_avg = db.query(func.avg(SensorValue.value)).filter_by(sensor_id=record.id).filter(and_(SensorValue.created_at <= end_date, SensorValue.created_at >= start_date)).one()[0]
        if sensor_avg == None: 
            sensor_avg = 0
            sensor_min = 0
            sensor_max = 0
        dict_per = {}
        dict_per['id'] = record.id
        dict_per['name'] = record.name
        dict_per['status'] = True
        dict_per['high'] = sensor_max
        dict_per['low'] = sensor_min
        dict_per['uuid'] = record.uuid
        dict_per['avg'] = round(float(sensor_avg), 2)
        return_list.append(dict_per)

    cont_dict = {
        'name': query.name,
        'apiKey': query.uuid,
        'createdAt': query.created_at,
        'active': len(sensors),
        'inActive': 0.,
        'type': query.type,
        'sensorCount': len(sensors),
        'sendSecond': query.send_second 
    }
    return jsonable_encoder({
        'controllerValue': cont_dict,
        'sensorValue': return_list
    })

@app.post('/devices/data')
# done not tested
async def get_sensor(request: Request):
    data = await request.body()
    data = data.decode('latin-1').encode("utf-8").decode("utf-8") 
    data = data.split("POST")[0]
    cleaned_data = data.replace("â", "")
    # .replace("E", "").replace(" ", "")
    index = cleaned_data.find('}')
    diction = cleaned_data[:index+1]
    final_data = json.loads(diction)
    date = datetime.now().timestamp()
    

    for key in final_data.keys():
        record = db.query(Sensor).filter_by(uuid=key).one()
        sensor_id = record.id
        newData = SensorValue(
            created_at=date,
            sensor_id=sensor_id,
            value=final_data[key]
        )
        db.add(newData)   
        db.commit()
      
    return "hello"

@app.get('/devices/detail/{_id}')
# async def get_sensor(request: Request, _id: int):
def get_sensor(_id: int):
    # _id is controller_id
    return_list = []
    final = {}
    labels = []
    s_id = 1
    lb = db.query(SensorValue).filter_by(sensor_id=s_id).order_by(desc(SensorValue.created_at)).limit(20).all()
    for i in lb:
        date_data = datetime.utcfromtimestamp(i.created_at).strftime("%H:%M")
        labels.append(date_data)

    records = db.query(Sensor).filter_by(controller_id=_id).all()
    for record in records:
        diction = {}
        s_id = record.id
        values = []
        
        diction['name'] = record.name
        diction['type'] = 'line'
        sensor_val = db.query(SensorValue).filter_by(sensor_id=s_id).order_by(desc(SensorValue.created_at)).limit(20).all()
        for ss in sensor_val:
            values.append(ss.value)
            
        # if len(values) == 0:
        #     values = [0 for x in range(20)]
        # elif len(values) < 20:
        #     remain = 20 - len(values)
        #     for x in range(remain):
        #         values.append(0)
        diction['data'] = values
        return_list.append(diction)
    final['labels'] = labels
    final['list'] = return_list
    # print(final)
    return jsonable_encoder(final)