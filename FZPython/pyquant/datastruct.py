# -*- coding: utf-8 -*-


from quantdigger.util import dlogger as logger

class Bar(object):
    """Bar数据。

    :ivar datetime: 开盘时间。
    :ivar open: 开盘价。
    :ivar close: 收盘价。
    :ivar high: 最高价。
    :ivar low: 最低价。
    :ivar volume: 成交量。
    """
    def __init__(self, dt, open, close, high, low, vol):
        self.datetime = dt
        self.open = open
        self.close = close
        self.high = high
        self.low = low
        self.volume = vol



class Contract(object):
    """ 合约。

    :ivar exchange: 市场类型。
    :ivar code: 合约代码
    :ivar is_stock: 是否是股票
    :ivar margin_ratio: 保证金比例。
    :ivar volume_multiple: 合约乘数。
    """
    info = None
    source_type = None

    def __init__(self, code, exchange):


        self.exchange = exchange
        self.code = code
        if self.exchange == 'SZ' or self.exchange == 'SH':
            self.is_stock = True
        elif self.exchange == 'SHFE': # 期货
            self.is_stock = False
        elif self.exchange == 'TEST' and self.code == 'STOCK':
            self.is_stock = True
        elif self.exchange == 'TEST':
            self.is_stock = False
        else:
            logger.error('Unknown exchange: {0}', self.exchange)
            assert(False)

    # @classmethod
    # def _get_info(cls):
    #     if Contract.source_type:
    #         return Contract.info
    #     src, Contract.source_type = get_setting_datasource()
    #     Contract.info = src.get_contracts()
    #     return Contract.info

    @classmethod
    def from_string(cls, strcontract):
        return cls(strcontract)

    def __str__(self):
        """"""
        return "%s.%s" % (self.code, self.exchange)

    def __hash__(self):
        try:
            return self._hash
        except AttributeError:
            self._hash = hash(self.__str__())
            return self._hash

    def __eq__(self, r):
        try:
            return self._hash == r._hash
        except AttributeError:
            return hash(self) == hash(r)

    def __cmp__(self, r):
        return str(self) < str(r)

    @classmethod
    def trading_interval(cls, contract):
        """ 获取合约的交易时段。"""
        pass

    @classmethod
    def long_margin_ratio(cls, strcontract):
        try:
            ## @todo 确保CONTRACTS.csv里面没有重复的项，否则有可能返回数组．
            return cls._get_info().loc[strcontract.upper(), 'long_margin_ratio']
        except KeyError:
            logger.warn("Can't not find contract: %s" % strcontract)
            return 1
            # assert(False)

    @classmethod
    def short_margin_ratio(cls, strcontract):
        try:
            return cls._get_info().loc[strcontract.upper(), 'short_margin_ratio']
        except KeyError:
            logger.warn("Can't not find contract: %s" % strcontract)
            return 1
            # assert(False)

    @classmethod
    def volume_multiple(cls, strcontract):
        try:
            return cls._get_info().loc[strcontract.upper(), 'volume_multiple']
        except KeyError:
            logger.warn("Can't not find contract: %s" % strcontract)
            return 1




# class Deal(object):
#     """ 每笔交易（一开，一平)
#
#
#     :ivar open_datetime: 开仓时间
#     :ivar close_datetime: 平仓时间
#     :ivar open_price: 开仓价格
#     :ivar close_price: 平仓价格
#     :ivar direction: 开仓方向
#     """
#     def __init__(self, buy_trans, sell_trans, quantity):
#         self.open = buy_trans
#         self.close = sell_trans
#         self.quantity = quantity
#
#     def profit(self):
#         """ 盈亏额  """
#         direction = self.open.direction
#         if direction == Direction.LONG:
#             return (self.close.price - self.open.price) * self.open.quantity *\
#                     self.open.order.volume_multiple
#         else:
#             return (self.open.price - self.close.price) * self.open.quantity *\
#                     self.open.order.volume_multiple
#
#     def __str__(self):
#         return "direction: %s\nentry_datetime: %s\nentry_price: %s\nexit_datetime: %s\nexit_price: %s\n" %(Direction.type_to_str(self.direction), self.open_datetime, self.open_price, self.close_datetime, self.close_price)
#
#     @property
#     def open_datetime(self):
#         return self.open.datetime
#
#     @property
#     def open_price(self):
#         return self.open.price
#
#     @property
#     def close_datetime(self):
#         return self.close.datetime
#
#     @property
#     def close_price(self):
#         return self.close.price
#
#     @property
#     def direction(self):
#         return self.open.direction