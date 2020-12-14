import pytz
import time
from datetime import datetime
from dateutil.parser import parse

utc = pytz.UTC


class _time:

    @staticmethod
    def utc_now_localized():
        return utc.localize(datetime.utcnow())

    @staticmethod
    def utc_now():
        return datetime.utcnow()

    @staticmethod
    def time():
        return time.time()

    @staticmethod
    def datetime_parse(value):
        return parse(value)
