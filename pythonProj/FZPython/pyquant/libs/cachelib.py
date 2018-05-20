#!/usr/bin/env python
# coding: utf8


from diskcache import Cache
cache = Cache('/tmp/fzquant')

cache.set('abc','def')