import urllib.request
import argparse
from bs4 import BeautifulSoup

__author__ = "Süleyman ERGEN"
__copyright__ = "Copyright 2018 Süleyman ERGEN"
__license__ = "MIT"
__version__ = "1.0.0"
__email__ = "suleymanergen32@gmail.com"


MEMLINK = "https://www.memrise.com"


class LevelStruct:
    """
    Kursun her seviyesinin ismini seviye nosunu ve kelimelerini tutan struct yapısı
    """
    def __init__(self, level_no, level_name, wordlist):
        self.level_no = level_no
        self.level_name = level_name
        self.level_words = wordlist


def parse_level_info(url):
    """
    Kursun her seviyesinin linklerini ve kursun ismini bulan fonksiyon.

    :param url: Kursun linki
    :return: Kursun seviyelerinin listesi ve kursun ismi(str)
    """
    response = urllib.request.urlopen(url)
    soup = BeautifulSoup(response.read(), "html.parser")
    coursename = soup.find('h1', class_="course-name sel-course-name").text
    word_url = soup.find_all("a", {'class': 'level clearfix'})
    return coursename, [u.get('href') for u in word_url]


def parse_words(url):
    """
    Her seviyedeki kelimeleri liste olarak geri döndüren fonksiyon.

    :rtype: dict
    :param url: Kursa ait her seviyenin linki
    :return: kelime ve anlamlarını barındıran tupple listesi
    """
    response = urllib.request.urlopen(MEMLINK+url)
    soup = BeautifulSoup(response.read(), "html.parser")

    levelname = soup.find('h3', class_="progress-box-title").text.strip()
    levelno = soup.find('strong', class_="level-number").text.strip()
    wordrows = soup.find_all('div', {'class': 'thing text-text'})

    wordlist = []
    for wordrow in wordrows:
        word = wordrow.find('div', {'class': 'col_a col text'})
        meaning = wordrow.find('div', {'class': 'col_b col text'})
        wordlist.append((word.text, meaning.text))
    return LevelStruct(levelno, levelname, wordlist)


def write_to_screen(coursename, wordlist):
    print(coursename)
    for lvl in wordlist:
        print(lvl.level_no, lvl.level_name)
        for i in lvl.level_words:
            print(i[0], '=', i[1])
        print("")


def write_to_file(coursename, wordlist):
    file = open(coursename+'.txt', 'w')

    for lvl in wordlist:
        print(lvl.level_no, lvl.level_name, file=file)
        for i in lvl.level_words:
            print(i[0], '=', i[1], file=file)
        print("", file=file)
    file.close()


def write_to_file_for_clevword(coursename, wordlist):
    file = open(coursename + '.txt', 'w')

    for lvl in wordlist:
        print("###", lvl.level_no.replace(',', ''), lvl.level_name.replace(',', ''), file=file)
        for i in lvl.level_words:
            print(i[0].replace(',', ''), ',', i[1].replace(',', ''), file=file)
        print("", file=file)
    file.close()


def define_arguments():
    """
    Komut satırı argümanlarını tanımla.

    :return: argumentparser object
    """
    parser = argparse.ArgumentParser()
    parser.add_argument("link", help="Memrise course link to parse words", type=str)
    group = parser.add_mutually_exclusive_group()
    group.add_argument("-c", "--clevword", action="store_true", help="Write to file for clevword app")
    group.add_argument("-w", "--write", action="store_true", help="Write to file")
    return parser


def run(url):
    """
    Kurs kelimelerini verilen linkten çeken fonksiyon

    :return: kurs ismi ve kura ait kelimelerin listesi
    """
    words = []
    course_name, linklist = parse_level_info(url)

    for link in linklist:
        a = parse_words(link)
        words.append(a)

    return course_name, words


if __name__ == "__main__":
    parser_ = define_arguments()
    args = parser_.parse_args()

    # programı çalıştır.
    print("Getting words. Please wait...")
    courseName, wd = run(args.link)

    if args.write:  # write to file
        write_to_file(courseName, wd)
    elif args.clevword:  # write words for clevword app
        write_to_file_for_clevword(courseName, wd)
    else:  # write to console
        write_to_screen(courseName, wd)
