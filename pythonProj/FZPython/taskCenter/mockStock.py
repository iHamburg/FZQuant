"""
模拟每3秒显示一次估价
"""


import json
import time
import random
from kafka import KafkaProducer
# from kafka.errors import KafkaError

producer = KafkaProducer(bootstrap_servers=['111.230.131.15:9092'],
                         value_serializer=lambda m: json.dumps(m).encode('utf-8'), api_version=(0,10))


while True:
    # 每隔3秒执行一次数据
    time.sleep(5)

    price = random.random() * 10
    print(price)
    producer.send('t1', {'price': price})
