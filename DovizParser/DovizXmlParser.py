import urllib.request
from xml.etree import ElementTree


__author__ = "Süleyman ERGEN"
__copyright__ = "Copyright 2018 Süleyman ERGEN"
__license__ = "MIT"
__version__ = "1.0.0"
__email__ = "suleymanergen32@gmail.com"


res = urllib.request.urlopen("http://www.tcmb.gov.tr/kurlar/today.xml")
et = ElementTree.parse(res)
root = et.getroot()

unit, name, buy, sel = None, None, None, None

print("|{:5}|{:^30}|{:^10}|{:^10}|".format("BIRIM", "ISIM", "ALIS", "SATIS"))

for c in root:
    unit = int(c.find('Unit').text) or 0
    name = c.find('Isim').text or ""
    buy = float(c.find('ForexBuying').text or 0)
    sel = float(c.find('ForexSelling').text or 0)

    print("|{:<5}|{:30}|{:10.2f}|{:10.2f}|".format(unit, name.strip(), buy, sel))
