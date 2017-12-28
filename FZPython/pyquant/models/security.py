

class Security(object):
    """

    """

    def __init__(self, code, market, type,  **kwargs):
        self.code = code
        self.market = market
        self.type = type




class Stock(Security):
    """
    股票
    """
    def __init__(self,code,market="SH", **kwargs):
        super(Stock, self).__init__(code,market,'STOCK', **kwargs)


class Future(Security):
    """
    期货
    """